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

test('view', t => {
    const a = L.lensPath(['a', 'b'])
    t.deepEqual(L.view(a)({ a: { b: 'x' } }), 'x')
})

test('over', t => {
    const a = L.lensPath(['a', 'b'])

    t.deepEqual(L.over(a)(v => v.toUpperCase())({ a: { b: 'x' } }), {
        a: { b: 'X' }
    })
})

test('assoc', t => {
    t.deepEqual(L.assoc('c')(3)({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
})

test('lensProp', t => {
    const a = L.lensProp('a')
    t.deepEqual(L.view(a)({ a: { b: 1 } }), { b: 1 })
})

test('lensIndex', t => {
    const a = L.lensIndex(1)
    t.deepEqual(L.view(a)([0, 1, 2, 3]), 1)
    t.deepEqual(L.view(a)([0]), undefined)
})
