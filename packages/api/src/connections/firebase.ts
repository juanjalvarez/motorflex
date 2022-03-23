import { initializeApp, cert } from 'firebase-admin/app'
import { SecretsObject } from '../runtime/secrets'

export const createFirebaseApp = async (secrets: SecretsObject) => {
    return initializeApp({
        credential: cert(secrets.firebase.serviceAccountJson),
        projectId: secrets.firebase.projectId,
    })
}
