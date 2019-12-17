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

test('set', t => {
    const a = L.lensProp('x')
    t.deepEqual(L.set(a)(4)({ x: 1, y: 2 }), { x: 4, y: 2 })
    t.deepEqual(L.set(a)()({ x: 1, y: 2 }), { x: undefined, y: 2 })
    t.deepEqual(L.set(a)({ y: 1 })({ x: 1, y: 2 }), { x: { y: 1 }, y: 2 })
})

test('see', t => {
    const target = { a: { b: { c: 0 } } }
    t.deepEqual(L.see`a.b`(target), { c: 0 })
})

test('fix', t => {
    const target = { a: { b: { c: 0 } } }
    t.deepEqual(L.fix`a.b`(1)(target), { a: { b: 1 } })
})

test('off', t => {
    const target = { a: { b: { c: 0 } } }
    t.deepEqual(L.off`a.b`(v => ({ ...v, d: 1 }))(target), {
        a: { b: { c: 0, d: 1 } }
    })
})

test('fix by template', t => {
    const target = { a: { b: { c: 0 } } }
    const x = 'b'
    t.deepEqual(L.fix`a.${x}`(1)(target), { a: { b: 1 } })
})

test('fix by template 2', t => {
    const target = { a: { b: { c: 0 } } }
    const x = 'a'
    t.deepEqual(L.fix`${x}`(1)(target), { a: 1 })
})

test('fix by template 3', t => {
    const target = { a: { b: { c: 0 } } }
    const x = 'a'
    t.deepEqual(L.fix`${x}.b.c`(1)(target), { a: { b: { c: 1 } } })
})

test('fix as array', t => {
    const target = { a: { b: { c: 0 } } }
    t.deepEqual(L.fix(['a', 'b'])(1)(target), { a: { b: 1 } })
})

test('fix test cache', t => {
    const target = { a: { b: { c: 0 } } }
    const x = 'a'
    const y = 'b'
    t.deepEqual(L.fix`${x}.b`(1)(target), { a: { b: 1 } })
    t.deepEqual(L.fix`a.${y}`(1)(target), { a: { b: 1 } })
    t.deepEqual(L.fix`${x}.${y}`(1)(target), { a: { b: 1 } })
})
