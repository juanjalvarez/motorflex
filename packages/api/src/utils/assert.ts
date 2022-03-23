type Condition = any

export const assert = (condition: Condition, err: string) => {
    if (!condition) {
        throw new Error(`Assertion error: ${err}`)
    }
}

export const assertAll = (conditions: Condition[], err: string) => {
    for (const condition of conditions) {
        assert(condition, err)
    }
}

export const assertAny = (conditions: Condition[], err: string) => {
    for (const condition of conditions) {
        try {
            assert(condition, err)
            return
        } catch (e) {}
    }
}

export const getAssert = <E>(val: E, err: string) => {
    assert(val, err)
    return val!
}
