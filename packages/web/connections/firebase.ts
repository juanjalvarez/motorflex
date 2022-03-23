import { appConfig } from '../config'
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth'

export const firebaseApp = initializeApp(appConfig.firebase, 'TruckPass')

export const firebaseAuth = getAuth(firebaseApp)

if (appConfig.firebase.emulatorUrl) {
    connectAuthEmulator(firebaseAuth, appConfig.firebase.emulatorUrl, {
        disableWarnings: true,
    })
}

firebaseAuth.setPersistence(browserLocalPersistence)
firebaseAuth.useDeviceLanguage()

export const authProviders = {
    google: new GoogleAuthProvider(),
}
