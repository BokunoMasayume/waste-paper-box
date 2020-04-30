# 首屏白屏相关

## 关于css样式加载

- head中link引用css文件在10秒后返回
白屏，加载中，直到返回后白屏结束（如服务器持续不返回结果，最终也会加载出来，反正我是睡了一觉加载出来了）

- head中link引用其他文件(ass文件)在10s后返回
同上

- 通过js脚本在head中加入link
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

- 将上例中的link在后面的事件循环中加入，会使加载状态也没有，丝滑。
```js
setTimeout(()=>{
    document.head.appendChild(lin);
    lin.outerHTML = ' <link href="a.css" rel="stylesheet"> ';

} , 0);
```

- script 阻塞后面的内容显示
```html
  <p>1</p>
  <p>2</p>

  <script src="returnafter10s"></script>

  <p>3</p>
```

- script 白屏较长，但在十万个打印出来前也显示了
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

# 阶段疑问
js会阻塞dom继续构建，但不会阻塞渲染
css会阻塞cssom，为什么也会阻塞渲染？



