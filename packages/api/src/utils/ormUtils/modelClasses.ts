import { Field, Int, ObjectType } from 'type-graphql'
import { PrimaryKey, Property } from '@mikro-orm/core'

@ObjectType()
export abstract class BaseModel {
    @PrimaryKey()
    @Field(() => Int)
    id: number

    @Property()
    @Field(() => String)
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    @Field(() => String)
    updatedAt = new Date()
}

@ObjectType()
export abstract class DeletableModel extends BaseModel {
    @Property()
    @Field(() => String, { nullable: true })
    deletedAt?: Date
}
