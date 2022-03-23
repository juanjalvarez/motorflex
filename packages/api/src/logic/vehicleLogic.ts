import { EntityManager } from '@mikro-orm/core'
import {
    CreateVehicleInput,
    UpdateVehicleInput,
} from '../schemas/graphql/vehicleObjects'
import { User } from '../schemas/models/user'
import { Vehicle } from '../schemas/models/vehicle'
import { applyObjectUpdate } from './entityOperations'

export const getVehiclesOwnedByUser = async (em: EntityManager, user: User) => {
    return await em.find(Vehicle, {
        ownerUser: user,
    })
}

export const getVehicleByID = async (em: EntityManager, id: number) => {
    const result = await em.findOne(Vehicle, {
        id,
    })
    return result as Vehicle | null
}

export const getUserBySlug = async (em: EntityManager, slug: string) => {
    const user = await em.findOne(User, {
        uniqueSlug: slug,
    })
    return user as User | null
}

export const createVehicle = async (
    em: EntityManager,
    creationUser: User,
    newVehicleInput: CreateVehicleInput,
) => {
    const vehicle = new Vehicle()
    vehicle.vin = newVehicleInput.vin
    vehicle.year = newVehicleInput.year
    vehicle.make = newVehicleInput.make
    vehicle.model = newVehicleInput.model
    vehicle.name = newVehicleInput.name
    vehicle.description = newVehicleInput.description
    vehicle.isListed = newVehicleInput.isListed
    vehicle.isManual = newVehicleInput.isManual
    vehicle.isElectric = newVehicleInput.isElectric
    vehicle.ownerUser = creationUser
    await em.persistAndFlush(vehicle)
    return vehicle
}

export const updateVehicle = async (
    em: EntityManager,
    vehicle: Vehicle,
    updateVehicleInput: UpdateVehicleInput,
) => {
    applyObjectUpdate(vehicle, updateVehicleInput)
    await em.persistAndFlush(vehicle)
    return vehicle
}

export const getOwnerOfVehicle = async (
    em: EntityManager,
    vehicle: Vehicle,
) => {
    return await em.findOne(User, {
        id: vehicle.ownerUser.id,
    })
}
