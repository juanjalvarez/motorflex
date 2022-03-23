export type GeoDMSLatitudeSymbol = 'N' | 'S'

export type GeoDMSLongitudeSymbol = 'E' | 'W'

export type GeoDMSDirectionSymbol = GeoDMSLatitudeSymbol | GeoDMSLongitudeSymbol

export type GeoDMSObject<E = GeoDMSDirectionSymbol> = {
    degrees: number
    minutes: number
    seconds: number
    direction: E
}

export type GeoDMSPair = [GeoDMSObject<GeoDMSLatitudeSymbol>, GeoDMSObject<GeoDMSLongitudeSymbol>]

export const coordToDmsObject = <E = GeoDMSDirectionSymbol>(
    originalValue: number,
    positiveSymbol: E,
    negativeSymbol: E,
): GeoDMSObject<E> => {
    const positive = originalValue >= 0
    const degrees = Math.floor(positive ? originalValue : originalValue * -1)
    const minutesRemainder = (originalValue - degrees) * 60
    const minutes = Math.floor(minutesRemainder)
    const seconds = (minutesRemainder - minutes) * 60
    return {
        degrees,
        minutes,
        seconds,
        direction: positive ? positiveSymbol : negativeSymbol,
    }
}

export type GeoLatLngPair = [number, number]

export const convertLatLngToDMS = (pair: GeoLatLngPair): GeoDMSPair => {
    const [lat, lng] = pair
    return [coordToDmsObject(lat, 'N', 'S'), coordToDmsObject(lng, 'E', 'W')]
}

export const convertDMSObjectIntoValue = (obj: GeoDMSObject) => {
    const { seconds, minutes, degrees, direction } = obj
    const value = degrees + (minutes + seconds / 60) / 60
    return direction === 'N' || direction === 'E' ? value : value * -1
}

export const convertDMSPairToLatLng = (pair: GeoDMSPair): GeoLatLngPair => {
    const [lat, lng] = pair
    return [convertDMSObjectIntoValue(lat), convertDMSObjectIntoValue(lng)]
}
