const isProduction = process.env['NODE_ENV'] === 'production'

export const appConfig = {
    isProduction,
    apiOrigin: 'http://localhost:3001',
    googleMapsAPIKey: 'AIzaSyBsFoCVqD0CdFt5-dDGg1DYXWb5-TztXp8',
    firebase: {
        apiKey: 'AIzaSyAYYwmZJXjGMR3E8D2KHqqAA3gCqja1S_k',
        authDomain: 'jja-dev-firebase.firebaseapp.com',
        projectId: 'jja-dev-firebase',
        storageBucket: 'jja-dev-firebase.appspot.com',
        messagingSenderId: '380560900367',
        appId: '1:380560900367:web:afe692d7bc25eebd8bbe7a',
        measurementId: 'G-769ZJRTY5S',
        emulatorUrl: !isProduction ? 'http://localhost:9099' : null,
    },
}
