'use strict';

const git = require('../index');
const assert = require('assert');

describe('branch', () => {
    let repo = git.init('./repo/v-git');
    
    it('current branch', function () {
        assert.equal(repo.branch, 'master');
    });

    it('new branch', function (next) {
        repo.createBranch('test').then(() => {
            assert.equal(repo.branch, 'test');
            next();
        }).catch((error) => {
            console.log(error)
            next(`Create branch failed.`);
        });
    });
});