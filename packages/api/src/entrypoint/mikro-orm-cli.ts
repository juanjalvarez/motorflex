import 'reflect-metadata'
import { createDbOptions } from '../connections/db'
import { loadSecrets } from '../runtime/secrets'

export default async () => {
    const secrets = await loadSecrets()
    return await createDbOptions(secrets)
}
