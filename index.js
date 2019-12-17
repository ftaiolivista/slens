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

const updateArray = idx => v => a => {
    const o = [...a]
    o[idx] = v
    return o
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
        return updateArray(idx)(value)(obj)
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

function Identity (x) {
    return {
        value: x,
        map: function (f) {
            return Identity(f(x))
        }
    }
}

const over = l => fn => target => l(y => Identity(fn(y)))(target).value

function _map (fn, functor) {
    var idx = 0
    var len = functor.length
    var result = Array(len)
    while (idx < len) {
        result[idx] = fn(functor[idx])
        idx += 1
    }
    return result
}

function map (fn, functor) {
    if (functor['fantasy-land/map']) {
        return functor['fantasy-land/map'](fn)
    }
    switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
        return fn.call(this, functor.apply(this, arguments))
    case '[object Object]':
        return Object.keys(functor).reduce((acc, key) => {
            acc[key] = fn(functor[key])
            return acc
        }, {})
    default:
        return _map(fn, functor)
    }
}

const lensPath = p => lens(path(p))(assocPath(p))

const lens = getter => setter => toFunctorFn => target =>
    map(focus => setter(focus)(target), toFunctorFn(getter(target)))

function Const (x) {
    return {
        value: x,
        'fantasy-land/map': function () {
            return this
        }
    }
}

const view = l => target => l(Const)(target).value

const prop = p => obj => path([p])(obj)

const lensProp = p => lens(prop(p))(assoc(p))

const lensIndex = n => lens(a => a[n])(updateArray(n))

export {
    assoc,
    assocPath,
    path,
    lens,
    over,
    lensPath,
    lensProp,
    view,
    lensIndex
}
