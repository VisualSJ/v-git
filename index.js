'use strict';

const Repo = require('./lib/repo');
const cmd = require('./lib/cmd');
const config = require('./lib/config');

/**
 * 初始化一个仓库
 * @param {string} root 仓库的根目录地址
 * @return {Repo}
 */
let init = function (root) {
    return new Repo(root);
};

/**
 * 克隆一个新仓库
 * @param {string} root 克隆仓库的存放地址
 * @param {string} url 仓库的远程地址
 */
let clone = function (root, url) {
    return cmd.spawn(root, 'clone', url);
};

exports.init = init;
exports.clone = clone;
exports.config = config;