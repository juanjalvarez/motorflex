import { loadEnvVariable, parseBool } from './secrets'

export const runtimeConfig = {
    apiOrigin: loadEnvVariable('APP__API_ORIGIN'),
    webOrigin: loadEnvVariable('APP__WEB_ORIGIN'),
    debug: loadEnvVariable('APP__DEBUG', parseBool),
    staticSitePath: loadEnvVariable('APP__STATIC_SITE_PATH'),
    debugDataPath: loadEnvVariable('APP__DEBUG_DATA_PATH'),
}
