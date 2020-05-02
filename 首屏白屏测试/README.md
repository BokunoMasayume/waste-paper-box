# 首屏白屏相关

## 关于css样式加载

1.  head中link引用css文件在10秒后返回
白屏，加载中，直到返回后白屏结束（如服务器持续不返回结果，最终也会加载出来，反正我是睡了一觉加载出来了）

2.  head中link引用其他文件(ass文件)在10s后返回
同上

3. 通过js脚本在head中加入link
会导致页面处在加载中，但不影响首屏渲染
```html
<body>
  <p>1</p>
  <p>2</p>

  <script>
      let lin = document.createElement('link');
      
// setTimeout(()=>{
    document.head.appendChild(lin);
    lin.outerHTML = ' <link href="a.css" rel="stylesheet"> ';

// } , 1000);
  </script>
  <body>
```

4.  将上例中的link在后面的事件循环中加入，会使加载状态也没有，丝滑。
```js
setTimeout(()=>{
    document.head.appendChild(lin);
    lin.outerHTML = ' <link href="a.css" rel="stylesheet"> ';

} , 0);
```

5. script 阻塞后面的内容显示
```html
  <p>1</p>
  <p>2</p>

  <script src="returnafter10s"></script>

  <p>3</p>
```

6. script 白屏较长，但在十万个打印出来前也显示了
```html
 <p>1</p>
  <p>2</p>

  <script>
      

for(let i =0 ; i<100000;i++){
    console.log(1);
}
  </script>


  <p>3</p>
```

7. cssom阻塞js
```html
    <link href="a.ass" rel="stylesheet"> // 10s

</head>
<body>
  <p>1</p>
  <p>2</p>
    <div id="test"></div>
  <script>
      let lin = document.createElement('link');
      
    let test = document.getElementById('test')

    for(let i =0 ; i<1000;i++){
        test.innerText = i;
        console.log(i)
    }
  </script>
```


8. 下沉的style sheet （situation 1）
chrome和opera中：在link前的style和dom(p1 p2)显示，script绑定的event可正常使用，10s后接收到a.css后，p3才显示出来

firefox中： p1,2,3都立刻显示，绑定的点击事件也立即可用，10s后接收到a.css后，页面样式相应变化。

```html
<head>
    <style>
        p{
            background-color: blue;
        }
    </style>
  <!-- <script src="returnafter10s"></script> -->

</head>
<body>
  <p>1</p>
  <p>2</p>
    <div id="test">fdsfdsfsdfsd</div>
  <script>
 
    let test = document.getElementById('test')

    test.addEventListener('click',()=>{
        alert('click')
    });

  </script>
  <link href="a.css" rel="stylesheet"> //delay 10 seconds

  <p>3</p>

</body>
```

9. 下沉的style sheet （situation 2）
script没有运行，p3在10s后接收到a.css后显示
```html
<head>
    <style>
        p{
            background-color: blue;
        }
    </style>
  <!-- <script src="returnafter10s"></script> -->

</head>
<body>
  <p>1</p>
  <p>2</p>
    <div id="test">fdsfdsfsdfsd</div>
  <link href="a.css" rel="stylesheet"> //delay 10 seconds

  <script>
 
    let test = document.getElementById('test')

    test.addEventListener('click',()=>{
        alert('click')
    });

  </script>

  <p>3</p>

</body>
```

10. 只有下沉的css时
在firefox中，a.css不阻塞dom解析（即p3立刻显示了），
在chrome和opera中，a.css阻塞dom解析（p3在接收到a.css后才显示）
```html
<head>
    <style>
        p{
            background-color: blue;
        }
    </style>
  <!-- <script src="returnafter10s"></script> -->

</head>
<body>
  <p>1</p>

  <p>2</p>
    <div id="test">fdsfdsfsdfsd</div>
  <link href="a.css" rel="stylesheet"> 

  <p>3</p>
  
</body>
```

# 阶段总结 5/2 
1.  js阻塞dom构建过程
2.  cssom构建阻塞js执行
3.  根据测试8和9，cssom也会阻塞dom构建（就像js）
4.  即使cssom,js阻塞dom构建，但没加入到dom的部分如果有请求资源，仍会先请求，不必等到dom构建到那里
5.  根据我看的博客~们，都没有提到cssom会阻塞dom构建，emmmmm....

# 阶段总结 5/3
1. js阻塞dom
2. cssom阻塞js
3. 在firefox，edge中cssom不会阻塞dom，但在chrome和opera中会阻塞
4. 我听说edge是基于chromium内核的，为什么chrome和edge行为不统一，并且在我看来，edge和firefox才是更符合标准的。


