module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "angular"],
    //"parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "babel", "angular"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        // "semi": [
        //     "error",
        //     "always"
        // ],
        "vars-on-top": 2,
        "keyword-spacing": ["error", { "after": true }],
        "space-before-blocks": [ 2, 'always' ],
        // "space-before-function-paren": [ 2, 'always' ],
        "eol-last": 2,
        "eqeqeq": 2,
        "max-len": [ 2, 120, 4 ],
        "new-cap": [ 2, { capIsNew: false } ],
        "no-eq-null": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-multiple-empty-lines": [ 2, { max: 2 } ],
        "no-trailing-spaces": 2,
        "no-use-before-define": [ 2, 'nofunc' ],
        "no-undef": 2,
        "no-underscore-dangle": 0,
        "no-unused-vars": 1,
        "no-var": 2,
        "object-curly-spacing": [ 2, 'always' ],

        // angular
        "angular/controller-as-route": 0
    }
};