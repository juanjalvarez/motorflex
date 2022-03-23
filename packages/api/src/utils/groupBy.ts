export const groupBy = <E = any>(data: E[], getKey: (item: E) => string) => {
    const map: {
        [key: string]: E[]
    } = {}
    data.forEach(item => {
        const key = getKey(item)
        if (!map[key]) {
            map[key] = []
        }
        map[key] = [...map[key], item]
    })
    return map
}
