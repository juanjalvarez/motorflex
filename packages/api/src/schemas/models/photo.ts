import { User } from './user'
import { Entity, ManyToOne, Property, t } from '@mikro-orm/core'
import { BaseModel } from '../../utils/ormUtils/modelClasses'
import { Field, Int, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Photo extends BaseModel {
    @Property()
    @Field()
    originalFileName: string

    @Property()
    @Field()
    s3Path: string

    @Property()
    @Field()
    mimeType: string

    @Property({
        type: t.integer,
    })
    @Field(() => Int)
    size: number

    @ManyToOne({
        nullable: true,
    })
    uploadUser?: User
}
