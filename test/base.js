'use strict';

const git = require('../index');

describe('base', () => {
    it('clone', function (next) {
        this.timeout(0);
        git.clone('./repo', 'git@github.com:VisualSJ/v-git.git').then(() => {
            next();
        }).catch(() => {
            next(`clone failed...`);
        });
    });

    it('repo', () => {
        git.init('./repo/v-git');
    });
});