function _has (prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
}

function isNil (x) {
    return x == null
}

const assoc = prop => val => obj => ({
    ...obj,
    [prop]: val
})

function nextObj (path, obj) {
    const idx = path[0]
    return !isNil(obj) && _has(idx, obj)
        ? obj[idx]
        : Number.isInteger(path[1])
            ? []
            : {}
}

const assocPath = path => val => obj => {
    if (path.length === 0) {
        return val
    }
    const idx = path[0]
    const value =
        path.length > 1
            ? assocPath(Array.prototype.slice.call(path, 1))(val)(
                nextObj(path, obj)
            )
            : val
    if (Number.isInteger(idx) && Array.isArray(obj)) {
        const arr = [...obj]
        arr[idx] = value
        return arr
    } else {
        return assoc(idx)(value)(obj)
    }
}

const path = paths => obj => {
    let val = obj
    let idx = 0
    let p
    while (idx < paths.length) {
        if (val == null) {
            return
        }
        p = paths[idx]
        val = val[p]
        idx += 1
    }
    return val
}

const over = lens => fn => target =>
    lens(function (y) {
        return () => fn(y)
    })(target)

// const set = lens => v => target =>

const lens = getter => setter => functor => target =>
    functor(getter(target)).map(function (focus) {
        return setter(focus)(target)
    })

export { assoc, assocPath, path, lens, over }
