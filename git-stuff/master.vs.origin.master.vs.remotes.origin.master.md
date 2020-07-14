# master origin.master remotes.origin.master
clone来一个远程仓库并运行`git branch -a`，有时会像下面这样显示：
```bash
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```
在这里面，`master`是本地仓库的分支，`remotes/origin/master`是名为`origin`的远程仓库上的`master`分支，你也可以把它叫做`origin/master`。
`remotes/origin/HEAD`是`origin`远程仓库的默认分支，通过它能让你把`origin/master`用`origin`简化。