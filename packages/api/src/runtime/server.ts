import { buildGraphQLSchema } from './../controllers/graphql/schema'
import { authMiddleware } from '../controllers/rest/middleware/authMiddleware'
import * as bodyParser from 'body-parser'
import { Server } from '@overnightjs/core'
import { RootAPIController } from '../controllers/rest/rootAPIController'
import express from 'express'
import { RequestContext } from '@mikro-orm/core'

import { corsMiddleware } from '../controllers/rest/middleware/cors'
import { RuntimeContext } from './context'
import { getRequestContextMiddleware } from '../controllers/rest/middleware/reqContextMiddleware'
import { runtimeConfig } from './config'
import { logger } from '../connections/logger'
import { graphqlHTTP } from 'express-graphql'
import { apiResponseDelayMiddleware } from '../controllers/rest/middleware/apiResponseDelayMiddleware'

export default class APIServer extends Server {
    runtimeContext: RuntimeContext

    constructor(runtimeContext: RuntimeContext) {
        super(true)
        this.runtimeContext = runtimeContext
    }

    public async init() {
        this.app.disable('x-powered-by')
        this.app.disable('etag')
        this.app.use((req, __, next) => {
            req.startTimestamp = new Date()
            next()
        })
        this.app.use(bodyParser.json())
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        )
        this.app.use(corsMiddleware)
        this.app.use(express.static(runtimeConfig.staticSitePath))
        this.app.use(getRequestContextMiddleware(this.runtimeContext))
        this.app.use(authMiddleware)
        this.app.use((_, __, next) => {
            RequestContext.create(this.runtimeContext.db.em, next)
        })
        if (runtimeConfig.debug) {
            this.app.use(apiResponseDelayMiddleware)
        }
        this.addControllers(new RootAPIController())
        const schema = await buildGraphQLSchema()
        this.app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
    }

    public async start(port: number) {
        await this.init()
        await new Promise<void>(resolve => this.app.listen(port, resolve))
        logger.info(`Server started on port ${port}`)
    }
}
