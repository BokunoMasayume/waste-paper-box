## 1
```ts

export declare type Abc = string;
export type Bcd = string;

```
here ,The declare keyword here serves no purpose.

`declare` keyword is useful when you need to say that there will be a variable or constant at execution time.

Example: Let's say you want to import library someExternalLib, but it is not on npm (you have to manually include it via script tag). You know that it will be accessible as global variable someExternalLib with functions fun1 and fun2. The problem is that Typescript doesn't know - that's why you have to help it by declaring the global someExternalLib:
```ts
declare const someExternalLib: { fun1: () => number, fun2: () => number }
```
This is usually necessary in definition files to declare variables, constants, classes, functions. It is redundant for types and interfaces.


## 2
unknown 类型类似于any，但unknown类型的变量只能赋值给unknown或any类型的变量。
