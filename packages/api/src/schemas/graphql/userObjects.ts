import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class UpdateUserProfileInput {
    @Field({
        nullable: true,
    })
    uniqueSlug?: string
}
