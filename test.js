import test from 'ava'
import * as L from './index.js'

test('assocPath', t => {
    const a = L.assocPath(['a', 'b', 'c'])(42)
    t.deepEqual(a({ a: { b: { c: 0 } } }), { a: { b: { c: 42 } } })
    t.deepEqual(a({ a: 5 }), { a: { b: { c: 42 } } })
})

test('path', t => {
    const a = L.path(['a', 'b'])
    t.deepEqual(a({ a: { b: 2 } }), 2)
    t.deepEqual(a({ c: { b: 2 } }), undefined)
})
