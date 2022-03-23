import { Photo } from './photo'
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { BaseModel } from '../../utils/ormUtils/modelClasses'
import { Field, ID, ObjectType } from 'type-graphql'
import { Vehicle } from './vehicle'

@Entity()
@ObjectType()
export class User extends BaseModel {
    @Property({
        unique: true,
    })
    @Field(() => ID)
    firebaseUid: string

    @Property()
    @Field()
    displayName: string

    @Property()
    @Field()
    email: string

    @Property({
        nullable: true,
    })
    @Field({
        nullable: true,
    })
    profilePhotoURL?: string

    @OneToMany(() => Photo, photo => photo.uploadUser)
    uploadedPhotos = new Collection<Photo>(this)

    @OneToMany(() => Vehicle, v => v.ownerUser)
    ownedVehicles = new Collection<Vehicle>(this)
}
