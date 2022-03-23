import { HealthController } from './healthController'
import { DebugController } from './debugController'
import { Controller, Get, ChildControllers } from '@overnightjs/core'
import { Request, Response } from 'express'
import { AdminController } from './adminController'
import { PhotoUploadController } from './photoUploadController'
import { runtimeConfig } from '../../runtime/config'

@Controller('api')
@ChildControllers([
    new HealthController(),
    new AdminController(),
    new PhotoUploadController(),
    runtimeConfig.debug ? new DebugController() : null,
])
export class RootAPIController {}
