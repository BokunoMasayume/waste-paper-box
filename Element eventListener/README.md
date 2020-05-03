# 元素 事件

一个普通的div元素的原型链：
> HTMLDivElement -> HTMLElement -> Element -> Node -> EventTarget -> Object

## 关于绑定和触发事件
addEventListener , removeEventListener 和 dispatchEvent 都在EventTarget上，鉴于EventTarget没有其他属性，比如listener map或queue，所以大概所有的handler都存储在一个闭包里，没法直接访问的。

addEventListener 可以绑定非标准的事件，然后用dispatchEvent触发,用removeEventListener移除，
onevent可以用dispatchEvent触发标准事件，但不能触发非标准事件，且不能用removeEventListener移除，如下为尝试：
```js
window.test = document.getElementById('test');

//test 1
test.onppp = function(){console.log('ppp')};
test.onclick = test.onppp;

test.dispatchEvent(new Event('ppp'));
//nothing happened

test.dispatchEvent(new Event('click'));
//log : ppp



//test 2
test.onclick = function(){console.log('ppp')};
test.removeEventListener('click' , test.onclick);
//cannot remove the handler by removeEventListener
```
或许有像dispatchEvent之于addEventListener的方法，但目前我还没有找到
。。。等等，test.onclick()不就可以吗，我是傻子吗？

另，HTMLElement上最开始有完整的onevent句柄，
Element有一下几个超级通用句柄
```
onbeforecopy: (...)
onbeforecut: [Exception: TypeError: Illegal invocation at HTMLDivElement.invokeGetter (<anonymous>:1:142)]
onbeforepaste: (...)
onfullscreenchange: [Exception: TypeError: Illegal invocation at HTMLDivElement.invokeGetter (<anonymous>:1:142)]
onfullscreenerror: (...)
onsearch: (...)
onwebkitfullscreenchange: (...)
onwebkitfullscreenerror: (...)
```
Node就没有onevent句柄了。

## 阶段总结

-   如果要清除addEventListener添加的事件句柄，或许没什么魔法方法，
要么用cloneNode克隆一个顶替原来的元素，这样所有绑在原来元素的句柄都在新元素触发不了了，
要么把EventTarget原型上的addEventListener 和 removeEventlistener 拿下来，包装一下再安上去，在包装函数中暴露listeners
要么就普通的把特定元素的addEventListener 和 removeEventlistener包装下 ,不兴师动众劳烦到EventTarget的原型

-   根据在edge，chrome,opera和firefox上的测试，onevent是在冒泡阶段触发的
```js
// document.onclick = function (){console.log('first ,on click')};

document.addEventListener('click',()=>{console.log( 'bubble'      )} , false);
document.addEventListener('click',()=>{console.log(    'capture'     )} , true);

document.onclick = function (){console.log('last ,on click')};
```