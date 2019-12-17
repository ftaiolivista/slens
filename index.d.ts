// export as namespace slens
//
// export const assoc: <T>(prop: string) => (val: any) => (target: T) => T
//
// export const assocPath: <T>(path: Array<string>) => (val: any) => (obj: T) => T
//
// export const path: <T>(path: Array<string>) => (obj: T) => any
//
// export const lens: <T>(getter: (target: T) => any) => (setter: (value: any) => (target: T) => T) => (toFunctorFn: )
// // const lens = getter => setter => toFunctorFn => target =>
// //     map(focus => setter(focus)(target), toFunctorFn(getter(target)))
//
// // export const over: <T>(path: Array<string>) => (obj: T) => any
// // const over = l => fn => target => l(y => Identity(fn(y)))(target).value
