import os from 'os'

export const getInternalIP = () => {
    const networkInterfaces = os.networkInterfaces()
    for (const interfaceName of Object.keys(networkInterfaces)) {
        const networkInterface = networkInterfaces[interfaceName] ?? []
        for (const iFace of networkInterface) {
            if ('IPv4' !== iFace.family || iFace.internal !== false) {
                return
            }
            return iFace.address
        }
    }
}
