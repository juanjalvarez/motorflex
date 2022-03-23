export const applyObjectUpdate = <E = Object>(tgt: E, src: Partial<E>) => {
    Object.keys(tgt).forEach(_key => {
        const key = _key as keyof E
        if (src[key] !== undefined) {
            tgt[key] = src[key]!
        }
    })
}
