import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CreateVehicleInput {
    @Field()
    vin: string

    @Field(() => Int)
    year: number

    @Field()
    make: string

    @Field()
    model: string

    @Field()
    name: string

    @Field()
    description: string

    @Field(() => Boolean)
    isManual: boolean

    @Field(() => Boolean)
    isListed: boolean

    @Field()
    isElectric: boolean
}

@InputType()
export class UpdateVehicleInput {
    @Field(() => Int, {
        nullable: true,
    })
    year?: number

    @Field({
        nullable: true,
    })
    make?: string

    @Field({
        nullable: true,
    })
    model?: string

    @Field({
        nullable: true,
    })
    name?: string

    @Field({
        nullable: true,
    })
    description?: string

    @Field(() => Boolean, {
        nullable: true,
    })
    isManual?: boolean

    @Field(() => Boolean, {
        nullable: true,
    })
    isListed?: boolean

    @Field({
        nullable: true,
    })
    isElectric?: boolean
}
