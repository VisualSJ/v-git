# 简单的 GIT 操作

## Clone

```javascript
const vGit = require('v-git');

vGit.clone('https://github.com/VisualSJ/v-git.git').then(() => {
    // todo somethings
}).catch(() => {
    // todo somethings
});
```

## Repo

```javascript
const vGit = require('v-git');

let repo = vGit.init('./v-git');

console.log(repo.branch); // master
```

### branch

只读属性，当前的分支名字

### origin

可读写，关联的远程分支，默认 'origin'

### branchList

只读属性，本地的分支列表

### createBranch(name, branch)

创建一个新分支，传入分支名字 {name}，以及从哪个分支切出 {branch}。{branch} 默认为当前分支

### removeBranch(name)

删除分支，传入分支名字 {name}。如果删除的是当前分支，则会报错并终止。

### createTag(tag, info)

创建 tag，传入 tag 名字 {tag}，以及 tag 的说明 {info}。创建的同时，会在当前控制的远程分支上也创建一个一样的 tag。

### removeTag(tag)

删除 tag，传入一个 tag 名字 {tag}。删除本地以及当前控制的远程仓库里面的同名 tag。

### push(branch)

push 操作，将本地当前分支推送到远程，如果不传入 {branch}，则默认将本地分支推送到远端同名分支上。

### reset(file)

丢弃一个文件的修改。

### resetAll()

丢弃所有文件的修改。