'use strict';

const cp = require('child_process');

/**
 * 传入执行的根目录以及参数
 * 直接使用 git 命令调用
 * @param {string} root 根目录
 * @param {*} args 传入的参数数组
 * @return {Promise}
 */
let spawn = function (root, ...args) {
    return new Promise((resolve, reject) => {
        let child = cp.spawn('git', args, {
            // stdio: [process.stdin, process.stdout, process.stderr],
            stdio: 'ignore',
            cwd: root,
        });

        child.on('exit', (code) => {
            if (code != 0) {
                reject(code);
            } else {
                resolve(code);
            }
        });
    });
};

let spawnSync = function (root, ...args) {
    let childSync = cp.spawnSync('git', args, {
        cwd: root,
    });
    return childSync.stdout.toString().trim();
};

exports.spawn = spawn;
exports.spawnSync = spawnSync;