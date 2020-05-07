# 网站性能优化 Udacity课程笔记

## [课程地址](https://classroom.udacity.com/courses/ud884)

## 用pc端chrome调试安卓chrome页面设置
-   安卓端：
1.  设置->系统->关于手机 连续点击版本号7次，开启开发者模式
2.  返回`系统`页面，找到新出现的`开发人员选项`，进入，开启`USB调试`和`“仅充电”模式下允许ADB调试`
3.  用usb连接到pc
-   pc端：
1.  打开chrome,在地址栏输入`chrome://inpect`,回车
2.  点击port forwarding，设置将pc上的ip:port映射到安卓机的本地某端口，将打开的模态框下方的enable port forwarding多选框选中，点击done
-   完事

## 关键渲染路径(critical rendering path (CRP))
