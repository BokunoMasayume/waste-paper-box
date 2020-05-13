# stream

## 类型
-   Readable
>   a readable stream is an abstraction for a source from which data can be consumed.
-   Writable
>   a writable stream is an abstraction for a destination to which data can be written.
-   Duplex  进来的流和出去的流不要求有关系
> a dubplex stream is both readable and writable.   

-   Transform  出去的流是进来的流处理后的流
> a transform stream is basically a duplex stream that can be used to modify or transform the data as it is written and read.

>   An example of that is the zlib.createGzip stream to compress the data using gzip.You can think of a transform stream as a function where the input is the writable stream part and the output is readable stream part.You might also hear transform streams referred to as "**through streams**"

所有类型的stream都是`EventEmitter`的实例。他们发射可以被用来读取和写入数据的事件。当然，我们也可以用`pipe`方法更简单的使用stream的数据。

## pipe method

先来看看这个魔法
`readableSrc.pipe(writableDest)`

通过这简单的一行，我们把一个可读流的输出（数据源），作为了一个可写流的输入。源必须是一个可读流， 目的必须是一个可写流。当然，他们也都可以是duplex或transform流。双向的流可以连接成更长的管道,例：
```js
readableSrc
    .pipe(transformStream1)
    .pipe(transformStream2)
    .pipe(finalWritableDest);
```
`pipe`方法返回后面的目的流，因此我们可以像上面这样做连接。它等价于：
```js
readableSrc.pipe(transformStream1);
transformStream1.pipe(tranformStream2);
transformStream2.pipe(finalWritableDest);
```
使用`pipe`方法是最简单的使用流的方法。一般来说推荐使用`pipe`方法，或者用event操作流，但要避免混合使用他们俩。通常当你使用`pipe`方法时不需要使用events，但如果你需要更定制化的使用流，最好使用events的方法。

## 流的事件
主要的事件和方法
 / |  readable streams | writable streams
---|---|---
events|data, end , error , close, readable| drain, finish,error, close,pipe,unpipe
methods|pipe(),unpipe(),wrap(),destroy(),read(),unshift(),resume(),pause(),isPaused(),setEncoding()| write(),destroy(),end(),cork(),uncork(),setDefaultEncoding()

表格中的事件和方法间看起来有一定的联系，因为他们总是一起使用。

在可读流中最重要的事件有：
-   `data`事件，当流把一块数据传递给使用者时触发
-   `end`事件，当该流没有更多的数据要传递给使用者时触发

在可写流中最终要的事件有：
-   `drain`事件，当这个可写流可以接收更多数据时触发
-   `finish`事件，当所有数据都推给下游系统后触发

## paused 和 flowing 模式

readable streams have two main modes that affect the way we can consume them:
-   they can be either in the paused mode 
-   or in the flowing mode

这两种模式也被称为`pull`和`push`模式。

默认情况下，所有可读流都在`paused`模式下启动。但当需要的时候，他们也可以简单的在两种模式中反复横跳。有时候，这种横跳是自动发生的（？？？）。

当一个可读流处在paused模式下时，我们可以使用`read()`
方法按需求从流读取。
当其在flowing模式下时，数据会持续的流动，需要通过监听事件来处理。

在flowing模式下，如果没有使用者处理数据，数据就会丢失。所以当使用flowing模式下的可读流时，我们需要`data`事件的句柄。
事实上，只需添加一个`data`事件的句柄，流就会从paused模式转入`flowing`模式。移除`data`句柄，可读流就会转回paused模式。这样做的部分原因是为了和旧的node流接口兼容（我不知道旧的流接口长什么样）。

手动切换可读流的这两种模式，可以使用`resume()`和`pause()`方法。

## 实现流
当在Node中讨论流时，有两种主要的用途：
-   实现流
-   使用流

实现流要使用`stream`模块

### 实现可写流
要实现可写流，先从stream模块拿writable类。
```js
const {Writable} = require('stream');
```
一种实现方法是类继承
```js
class myWritableStream extends Writable {
    /**/
}
```

另一种方式是在创建writable ,readable ,duplex或transform实例时，传入对应的方法作为构造函数的选项。
```js
const outStream = new Writable({
    write(chunk , encoding , callback){
        console.log(chunk.toString());

        callback();
    }
})

process.stdin.pipe(outStream);
```
write 方法有三个参数：
-   `chunk`不进行特殊配置的话会是一个buffer
-   `encoding`一般可以忽略，使用默认值
-   `callback`是处理完数据块后调用的函数，它用来表示写入是否成功。

### 实现可读流
```js
const {Readable} = require('stream');

const inStream = new Readable({})

inStream.push('abcd');
inStream.push('efghi');
inStream.push(null);// no more data, end

inStream.pipe(process.stdout)
```
push null意味着这个流没有更多数据了。

更近一步，实现read方法
```js
const inStream = new Readable({
    read(size){
        //like below
        //this.push('something')
        //if end {this.push(null)}
    }
})

inStream.pipe(process.stdout)
```

### 实现duplex/transform 流

```js
const inoutStream = new Duplex({
    write(){},

    read(){}
})
```

```js
const transStream = new Transform({
    transform(chunk , encoding , callback){
        this.push(chunk);
        callback();
    }
})
```
## streams object mode
默认情况下，streams接受buffer/string 的值，但可以将`readableObjectMode`或`writableObjectMode`设置为true,这样就可以使流接受javascript对象类型的数据(或者说按对象的方式解释数据？)。

一个例子，将用逗号分隔的字符串转为js对象，如`"a,b,c,d" => {a:b,c:d}`
```js
const {Transform} = require('stream');

const commaSplitter = new Transform({
    //出流
    readableObjectMode : true,

    transform(chunk, encoding ,callback){
        this.push(
            chunk.toString().trim().split(',')
        );
        callback();
    }
})

const arrayToObject = new Transform({
    readableObjectMode : true,
    writableObjectMode : true,
    //chunk is an array
    transform(chunk, encoding, callback){
        const obj = {};

        for (let i=0 ; i<chunk.length;i+=2 ){
            obj[chunk[i]] = chunk[i+1];
        }
        this.push(obj);
        callback();
    }
})

const objectToString = new Transform({
    //进流
    writableObjectMode : true,

    transform(chunk , encoding , callback){
        this.push(JSON.stringify(chunk)+"\n");
        callback();
    }
});


process.stdin
    .pipe(commaSplitter)
    .pipe(arrayToObject)
    .pipe(objectToString)
    .pipe(process.stdout)
```

## references
[https://jscomplete.com/learn/node-beyond-basics/node-streams](https://jscomplete.com/learn/node-beyond-basics/node-streams)
