import { Entity, Enum, ManyToOne, Property, t } from '@mikro-orm/core'
import { Field, Int, ObjectType, registerEnumType } from 'type-graphql'
import { DB_COLUMN_LENGTHS } from '../../constants/columnLengths'
import { BaseModel } from '../../utils/ormUtils/modelClasses'
import { User } from './user'

@Entity()
@ObjectType()
export class Vehicle extends BaseModel {
    @Property()
    @Field()
    vin: string

    @Property({
        type: t.integer,
    })
    @Field(() => Int)
    year: number

    @Property()
    @Field()
    make: string

    @Property()
    @Field()
    model: string

    @Property()
    @Field()
    name: string

    @Property({
        length: DB_COLUMN_LENGTHS.markdownDescription,
    })
    @Field()
    description: string

    @Property({
        default: false,
    })
    @Field(() => Boolean)
    isManual: boolean

    @Property({
        default: true,
    })
    @Field(() => Boolean)
    isListed: boolean

    @Property()
    @Field()
    isElectric: boolean

    @ManyToOne(() => User)
    ownerUser: User
}
