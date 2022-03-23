export const formatDataSize = (bytes: number) => {
    const names = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'yb']
    let idx = 0
    let ctr = bytes
    while (ctr > 1000) {
        idx++
        ctr /= 1000
    }
    const num = Math.round(ctr)
    return `${num}${names[idx]}`
}
