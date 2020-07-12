## basic data type \(1/[37](https://www.typescriptlang.org/docs/handbook)\)
- string:   `:string`
- number:   `:number`
- boolean:  `:boolean`
- array:    `:number[]` / `Array<number>`
- tuple:    `:[string, number]`
    -   finite ordered array with fixed number of member
    - e.g. let x:[string, number]; 
    - x = ['hello',10];//ok
    - x= [10, 'hello'];//error
- enum: `enum Color {Red , Green , Blue} ; let c:Color = Color.Green`
    - by default,  enums begin numbering their members starting at `0`.
    -   you can change the starting number by setting the value of one of its members.
    - `tips:set one position's member's value, only affect the value of the members behind it `
    - e.g. enum Color {Green , Blue= 4, Red}, then Color.Green = 0 ; Color.Blue = 4; Color.Red = 5;
    - about the above sample, use `let colorName:string = Color[4]`,you can get that value's name.
- any:  `:any`
    - just can be any type and won't get a error
    - the difference between `:object` and `:any` is that , any is totally free, but object, you cannot call properties or methods that are not exits on Object'prototype
- void: `:void`
    - only `null` and `undefined` is allowed
    - commonly used as the return type of functions that do not return a value
- null and undefined: `:null / :undefined`
    - in ts, both `undefined` and `null` have their own types 
    - by default , `null and undefined are subtypes of all other types`
    - when using the `--strictNullChecks` flag, null and undefined are only assignable to `any` and `their respective types` ,and undefined can still assign to void, but null can not assign to void.
- never: `:never`
    - type of the values never occur.e.g. a function that never return 's return type.
    - means the type of values that never occur.  
    - never is a subtype of , and assignable to, every type
    - no type is a subtype of , or assignbale to never , even any isn't assignable to never  

- object: `:object`
    - non-primitive type

### type assertion
 type asssertions have two forms .
 - one is the `angle-bracket` syntax
 ```js
let someValue :any = "this is a stirng";

let strLength :number = (<string>someValue).length;
 ```
 - and the other is the as -syntax
 ```js
let someValue :any = "this is a stirng";
let strLength :number = (someValue as string).length;
 ```
 these two way are equivalent.

## variable declarations(2/[37](https://www.typescriptlang.org/docs/handbook)\)

little tip: 
```js
//case 1
console.log(a);//thrown  referenceerror

//case 2 
console.log(b);//undefined
var b = 10;//undefined
console.log(b)//10

//case 3
console.log(c);//thrown reference error
let c = 10;

//case 4 var scope is function scope
function sum (mat){
    var sum = 0;
    for(var i=0 ; i<mat.length; i++){
        var currentRow = mat[i];
        for (var i=0 ; i<currentRow.length ; i++){
            sum += currentRow[i];
        }
    }
    return sum;
}
sum([[1,2,3],[4,5,6],[7,8,9]])//6

//case 5 let is block scope1
function sum (mat){
    var sum = 0;
    for(let i=0 ; i<mat.length; i++){
        var currentRow = mat[i];
        for (let i=0 ; i<currentRow.length ; i++){
            sum += currentRow[i];
        }
    }
    return sum;
}
sum([[1,2,3],[4,5,6],[7,8,9]])//45
```

### shadowing
the act of introducing a new name in a more nested scope is called shadowing.
在更内部的作用域中引入和上级作用域同名的新变量，上面的case 5就是个例子，嵌套的for遮蔽了上级for的i。

in js, variable declarated by const can be modified internally, in ts, u can set it as readonly, and cannot be modified totally anymore.
### destructing
- array destructing
```js
//case 1 normal
let arr = [1,2];
let [first , second] = arr;
console.log(first , second);//1 2
console.log(...arr);//1 2 same

//case 2 switch values
[first , second] = [second , first]//2,1

//case 3 point out argument array 's member 's name
function f ([first,second]:[number, number]){
    console.log(first);
    console.log(second);
} 
f([1,2])//1 2

//case 4 ... to collect in a list or unpack from a list
//collect
let [first , ...rest] = [1,2,3,4]
console.log(rest)//[2,3,4]
//unpack
console.log(...rest)//2 3 4

//case 5 不匹配或跳序赋值
let [first] = [1,2,3]
console.log(first)//1

let [, second , ,fourth] = [1,2,3,4];
console.log(second , fourth);//2 4
```
- tuple destructing
tuple is ts 's feature, js doesnt have ,tuple destructing just like array destructing, and the destructing variables get the types of the corresponding tuple elements
就是不单单分配值了，把人家的类型限制也分配过来了
```js
let tuple:[number, string, boolean] = [5, 'a' , true];

//case 1
let [a ,b,c] = tuple;//a:number , b:string, c:boolean

//case 2 pack cause a new tuple
let [a,..bc] = tuple;//a:number, bc:[string, boolean]
let [a, b ,c ,...d] = tuple;//d:[], an empty tuple
let [,b] = tuple;//b:string
```

- object destructing
```js
let {a ,b} = {
    a:"foo",
    b:"bar",
    c:12
}
let {a1,...bc} = {
    a:"foo",
    b:"bar",
    c:12
}//bc:object with property b and c
```

- object destructing 的属性重命名
```js
let {a :newNamea , b:newNameb} = {
    a:"foo",
    b:"bar",
    c:12
}

//same as

newNamea = "foo";
newNameb = "bar";
```

- object destructing 的默认值
```js
function keepWholeObject(wholeObject:{a:string , b?:number}){
    let {a, b = 1001} = wholeObject;
    
}
keepWholeObject({a:"hello"})//a:hello , b :1001
```
in this example the `b?` indicatess that b is optional , so it may be `undefined` .
### function declarations
```js
type C = {a:string , b?:number}

//case 1 one argument , destructing to 2 variables, with argument's type declaration
function f({a,b}:C){
    console.log(a,b);
}
f({a:"hi",b:111});

//case 2 one argument, destructing to 2 variables, with argument's tpye declaration,and b as a variable has a default value
function f({a,b=111}:C){
    console.log(a,b);
}
f({a:"hello"});

//case 3 one argument, destructing to 2 variables ,the argument has a default value
function f({a,b=111}:C={a:"bye"}){
    console.log(a,b);
}
f();

//case 4 two arguments , the second destructs to 2 variables and has a default value.
function f( c:number,{a,b=111}:C={a:"bye"} ){
    console.log(a,b,c);
}
f(123);
```

**this operator (...)'s name is spread operator**

object spread in object , array spread in array. e.g. 
```js
let obj = {a:1, b:"hello"}
let res = {...obj, c:true}//look ,spread operator in the {}

let arr = [1,"hello"]
let res2 = [...arr , true]// spread operator surrounded by []
```
## interfaces(3/[37](https://www.typescriptlang.org/docs/handbook)\)

定义一个模式，用于指定需要的格式
```ts
interface LabeledValue {
    label:string; //分号
}

function printLabel(labeledObj : LabeledValue){
    console.log(labeledObj.label);
}

let myObj = {size :10 , label:"Size 10 Object"};

printLabel(myObj);
```
- optional properties 可选属性
```ts
interface SquareConfig{
    color? :string;
    width?: number;
}
function createSquare(config:SquareConfig):{color:string ; area:number}{
    let newSquare = {color:"white", area:100};
    //....
    return newSquare;
}
createSquare({color:"black"})
```
interface中没有标出的属性并不能赋值，标出的属性则必须赋值，只有可选属性可以赋值或不赋值。
```ts
interface SquareConfig{
    color:string;
    width?:number;
}

function creaateSquare(config:SquareConfig){
    //...
    config.color //ok
    config.width //ok
    config.heigth//no error
}
```
- readonly properties
```ts

interface Point {
    readonly x: number;
    readonly y :number;
}
let p:Point  = {x:10 , y:20}

p.x = 0//error
```
- ReadonlyArray<T>
```TS
let a:number[] = [1,2,3,4]
let ro:ReadonlyArray<number> = a

ro[0]=9;//error
ro.push(2)//error
ro.length = 44//error
//... error
a  = ro //error

a = ro as Array<number> //ok
a = ro as number[] // ok
```
- 额外的类型检查
默认情况下，interface 不允许有多余的属性，如果允许对象有interface声明以外的属性，则需要一些其他的步骤：
```ts
interface SquareConfig{
    color?:string;
    width?:number;
    [propName:string]:any;
}
function createSquare(config:SquareConfig){
    config.colour
}

createSquare({colour:"black" })//ok
```
或者将参数额外赋值给其他变量：
```ts
interface SquareConfig{
    color?:string;
    width?:number;
}
function createSquare(config:SquareConfig){
    config.colour
}

createSquare({colour:"black" })//error

let opt = {
    colour:"black"
}
createSquare(opt);//ok, but still cannot use colour property by config object
```
- function types
之前是用interface描述对象，现在也使用 interface描述函数类型
```ts
interface  SearchFunc {
    (source:string , subString:string):boolean;
}

let mySearch : SearchFunc;

mySearch  = function (src:string , subs:string):boolean{
    //...
}
//or 
mySearch = function (src , subs){
    //...
}
```
此例形容了函数的参数类型和返回类型，和函数声明比起来就少了函数名称，所以说叫函数的interface嘛

- 可索引类型
ts支持两种索引签名：字符串和数字，可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
```ts
interface NotOkay{
    [x:number]:string;
    [y:string]:boolean;
}
```
- 类可以实现interface

`tip :constructor in an instance is the function created it , constructor in the prototype is also the function creates its instance`

```ts
interface yyy{

}

class xxx implements yyy{
    ...
}

//interface只能检查class实例侧的属性和方法，静态侧的不会被检查
```
- 接口可以互相扩展
```ts
interface Shape {
    color:string;
}

interface Square extends Shape{
    sideLength :number;
}
//it means Square includes sideLength and color properties
```
- 一个接口可以用多个接口扩展
```ts
interface Shape{
    color:string;
}
interface PenStroke{
    penWidth:number;
}
interface Square extends Shape , PenStroke{
    sideLength:number;
}
//Square has sideLength , color and penWidth
```

- 混合类型
接口能够描述js里丰富的类型，因为js动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种属性， 比如是一个带有特定属性和属性值的对象。
```ts
interface Counter{

    (start :number):string;//the function ,accept a number and return a string
    interval:number;//a property on the function object
    reset():void;//a method on the function object.

}

function getCounter () : Counter{
    let counter = <Counter>function (start:number){
        //do something ...
    }
    counter.reset = function(){};
    counter.interval = 300;
    return counter;
}


let c = getCounter();

```
- ts的接口可以继承类
当一个接口继承类一个类类型时，它会继承类的成员但不包含其实现。接口同样可以继承类的private和protected成员，故只有该类及其子类可以implements这个接口（`为啥？ private和protected都是symbol吗？为啥把这放在接口里讲，我还没看到class那章啊`）

## classes(4/[37](https://www.typescriptlang.org/docs/handbook)\)
- classes in typescript have public/private/protected modifiers
- public is the default modifier
- private in `js` : #propertyName (and of course , ts support this too)
```ts
class Animal {
    #name :string;
    constructor(theName:string){
        this.#name = theName;
    }
}

new Animal("cat").#name;//error
```
- private in `ts`: private modifier
```ts
class Animal{
    private name:string;
    constructor(theName:string){
        this.name = theName;
    }
}
new Animal("elephant").name;//error
```
typescript是一个structural type system(结构化类型系统)，当我们比较两个不同的类型时， 会忽略他们来自哪里，如果类型的所有成员的类型相兼容，我们就认为这些类型本身也兼容。
但当比较的类型有private或protected成员时，我们对待这种类型的策略发生了变化。如果他们中的一个有private成员，那么另一个中也要有一个private成员起源于同一个声明。这一策略同样适用于protected成员。
ps:这个起源于同一个声明（originated in the same declaration）起源于同一个声明，还挺绕的，就是说得是起源于同一个base class的某个private字段呗，可以看作symbol值的那种感觉。

- protected 
有时会有将class的constructor标记为protected ,这意味着该类不能普通的实例化，而只能实例化它的子类，在子类实例中调用该类的construtor。

- readonly modifier
readonly 修饰的属性只能在声明或constructor中初始化。
```ts
class Octopus{
    readonly name:string;
    readonly numberOfLegs :number = 8;
    constructor (theName :string){
        this.name = theName;
    }
}
let dad =  new Octopus("a1");
dad.name = "a2"//error

//能“初始化”几次呢？
class Octopus{
    readonly name:string;
    readonly numberOfLegs :number = 8;
    constructor (theName :string){
        this.name = theName;
        this.name = "a3"
        this.numberOfLegs = 11111;
    }
}
let dad =  new Octopus("a1");
//no error
//能初始化无数次
```
- parameter properties 参数属性
在上一个例子中，我们必须声明一个readonly成员name和一个constructor参数thenName。参数属性允许你创建和初始化一个成员一步到位。
```ts
class Octopus{
    readonly numberOfLegs :number = 8;
    constructor (readonly name:string){// the matter line

    }
}
```
ps: readonly 和 可访问性修饰符（public / private/ protected）可以同时使用.
在constructor参数前添加可访问性修饰符或readonly就可以声明一个参数属性。

- accessors（访问器 getter setter)
ts支持getter/setter作为截取到一个成员或对象的访问的方法。这给你类细粒度的控制一个成员在对象上怎么被访问的能力。
```ts
const fullNameMaxLength = 10;

class Employee {
    private _fullName:string;
    get fullName():string{
        return this._fullName;
    }
    set fullName(newName :string){
        if(newName && newName.length > fullNameMaxLength){
            throw new Error(`full name has a max length of ${fullNameMaxLength}`)
        }

        this._fullName = newName;
    }
}

let employee = new Employee();

employee.fullName = "Bob Smith";
if(employee.fullName){
    console.log(employee.fullName);
}
```
只有getter没有setter的自动认为是readonly属性。

- static properties 静态属性
```ts

class Grid {
    static origin = {x:0 , y:0};

    constructor (public scale :number){

    }
}

let grid1 = new Grid(1.0);
//origin 编译后放在了Grid函数上 ， Grid.origin
```

- abstract classes 抽象类
抽象类和接口的区别在于抽象类可以包含成员的实现细节，abstract关键字可以用于定义抽象类和在抽象类中定义抽象方法（从实际coding角度讲，抽象类就是可以在内部定义抽象函数的类）。
```ts
abstract class Animal {
    abstract makeSound():void;

    move () :void{
        console.log("walk walk walk");
    }

    constructor(public sound:string){}
}

class Human extends Animal{
    constructor(sound){
        super(sound);
    }
    makeSound():void{
        console.log(`${this.sound},${this.sound},${this.sound}`);
    }
}

let h:Animal = new Human("ying");
h.makeSound();
```

### 进阶技巧 advanced techniques
#### 构造函数 constructor functions
当你在ts中声明一个类时，你实际上同时创建了多个声明。
1.  首先是这个类的实例的type
```ts
class Greeter {
    greeting: string;
    constructor(message :string){
        this.greeting = message;
    }
    greet(){
        return "Hello," + this.greeting;
    }
}
let greeter:Greeter;// at here, we're using Greeter as teh type of instances of the class Greeter . 
greeter = new Greeter("world");
console.log(greeter.greet())
```
2.  其次，我们也创建了构造函数。（指js中那个和类同名的创建类实例的函数。
    - ps: 静态变量直接放在构造函数上
    - pps: in ts, `typeof ClassName` will get the class's type 

- 将类当作接口使用
像之前提到的，类在声明时创建类两个东西：一个表示这个类的实例的type和一个构造函数。因为类创建了type，你也可以像使用interface一样使用他们。
```ts
class Point{
    x:number;
    y:number;
    constructor(){

    }
}

interface Point3d extends Point{
    z:number;
}

let point3d :Point3d = {
    x:1,
    y:2,
    z:3
}
```


## intersection types `&`
an intersection type combines multiple tpes into one . this allows you to add together existing types to get a single type that has all the features you need. for example, Person & Serializable & Loggable is a Person and SErializable and Loggable. . that means an object of this type will have all members of all three types.


## functions(5/[37](https://www.typescriptlang.org/docs/handbook)\)

### funtion types
#### 为函数定义类型
```ts
function add(x:number, y:number):number{
    //...
}
let myAdd = function (x:number , y:number):number {
    //...
}
```
ts可以根据return语句自动判断返回类型， 所以返回值的类型指定一般可以省略。
#### 书写函数类型
```ts
let myAdd : (x:number , y :number)=>number = function(x:number , y:number):number{//...
}
//in above code , (x:number , y :number)=>number is function type 


let myAdd : (x:number , y :number)=>number = function(x11:number , y11:number):number{//...
}
//in above code, you see , argument names dont need to be same.
```
#### 类型推断 inferring the types
ts会自动进行类型推断，所以不需要把类型信息写两遍。
```ts
let myAdd = function (x:number , y:number):number {return x+y};
//or
let myAdd :(x:number , y:number)=>number = function(x, y){return x+y}
```
#### 可选和默认参数 optional and default parameters
在js中函数的所有参数都是可选的，用和定义不同的参数数量来调用函数也不会造成报错，但在ts中，这是不可行的。
在ts中，可以在参数名后面添加`?`来声明该参数是可选的
```ts
function buildName (firstName:stirng , lastName?:string){
    //...
}

let res1 = buildName("allen");//ok
let res2 = buildName("allen","walker")//ok
let res3 = buildName ("Allen","walker","aa")//error
```
#### 默认参数
```ts
function buildName(first:string, last:string = "allen"){
    //...
}
```
在尾部的带有默认值的参数被视作可选参数，但是有默认值,他们的type是相同的。
但默认初始化的参数并不一定要在参数列表的尾部，如果在其他位置出现，用户需要在该位置的参数设置为undefined来使用其默认值。
#### 剩余参数 rest parameters
required,optional , default参数都有一个共同点：都是关于1个参数的。有时，你想把多个参数视作一组，或者你不知道到底会有多少个参数。在js中，可以直接使用arguments变量，在ts中，你可以
把他们收集在一个变量中（js里也是一样）
```ts
function buildName(firstName :string , ...rest:string[]){
    //rest is a array of string
}
buildName("allen","walker","kanda","auther")
```

#### 重载 overloads
js原声就非常动态，同一个函数可以根据传入的参数不同返回不同类型的对象。
ts重载就是在同一个函数上应用不同的函数type，就和其他语言的声明方式相同。
方法如下，多次声明函数头，且在最后一次添加函数体,`必须在最后一次声明的函数头下添加函数体,且各个函数头声明语句间不能插入其他语句`,感觉文档性大于实用性吧
```ts
function pickCard(x:{suit:string ; card:number;}[]):number;

function pickCard(x:number):{suit:string; card:number;};

function pickCard(x):any{
    //
}
```
## generics 泛型
引入类型变量（type variable)。
```ts
function identity<T>(arg:T):T{
    return arg;
}
//the T in 'identity<T>' is the type variable
```


P
## void 0（external knowledge）






