'use strict';

const cmd = require('./cmd');

class Repo {

    /**
     * @param {string} root 仓库的目录地址
     */
    constructor (root) {
        this._root = root;
    }

    /**
     * 设置一个远程分支
     */
    get origin () {
        return this._origin || 'origin';
    }
    set origin (origin) {
        this._origin = origin;
    }

    /**
     * 当前分支名
     * @return {string}
     */
    get branch () {
        return cmd.spawnSync(this._root, 'symbolic-ref', '--short', '-q', 'HEAD');
    }

    /**
     * 拿到当前的分支列表
     * @return {array}
     */
    get branchList () {
        let string = cmd.spawnSync(this._root, 'branch', '--list');
        let list = string.split(/(\n|\r)/);
        list = list.map((item) => {
            let name = item.replace(/^\*( )?/, '');
            return name.trim();
        });
        return list.filter((item) => {
            return item;
        });
    }

    /**
     * 切出一个新分支，并切换到这个分支
     * @param {string} name 分支名字
     * @param {string} branch 从哪个分支切出，默认从当前分支
     * @return {Promise}
     */
    createBranch (name, branch) {
        if (branch) {
            return cmd.spawn(this._root, 'checkout', branch, '-b', name);
        } else {
            return cmd.spawn(this._root, 'checkout', '-b', name);
        }
    }

    /**
     * 删除分支，如果分支是当前分支，则无法删除
     * @param {string} name 分支名字
     */
    removeBranch (name) {
        return cmd.spawn(this._root, 'branch', '-d', name);
    }

    /**
     * 新建一个 tag
     * @param {string} tag 要打上的 tag 名字
     * @param {string} info 打 tag 的 commit 的信息
     */
    createTag (tag, info) {
        info = info || `Create tag '${tag}'`;
        return cmd.spawn(this._root, 'tag', '-a', tag, '-m', info).then(() => {
            return cmd.spawn(this._root, 'push', this.origin, tag);
        });
    }

    /**
     * 删除 tag
     * @param {string} tag 
     */
    removeTag (tag) {
        return cmd.spawn(this._root, 'tag', '-d', tag).then(() => {
            return cmd.spawn(this._root, 'push', this.origin, `:refs/tags/${tag}`);
        });
    }

    /**
     * 推送修改到远程分支
     * @param {string} branch 推送到那个远程分支，默认是同名
     */
    push (branch) {
        branch = branch || this.branch;
        return cmd.spawn(this._root, 'push', this.origin, `${this.branch}:${branch}`);
    }

    /**
     * 丢弃某个文件的修改
     * @param {string} file 
     */
    reset (file) {
        return cmd.spawn(this._root, 'checkout', file)
    }

    /**
     * 丢弃所有文件修改
     */
    resetAll () {
        return cmd.spawn(this._root, 'checkout', '*');
    }

};

module.exports = Repo;