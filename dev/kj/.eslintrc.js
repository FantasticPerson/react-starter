// 配置参考: http://eslint.org/docs/user-guide/configuring.html

module.exports = {
  "parser":"babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "rules":{
    //"注释不需要空格",
    "spaced-comment": [0, "never"],
    //括号前需要空格
    "space-before-blocks":[0,{ "functions": "never", "keywords": "always"}],
    //逗号后面需要空格?
    "comma-spacing": [0, {"before": false, "after": true}],
    //未使用变量函数
    "no-unused-vars":[1],
    //switch 缩进
    "indent":[2,2,{"SwitchCase":1}],
    //
    "comma-dangle":[2,"never"],
    "no-empty":[1],
    //
    "semi":[1,"always"],
    "space-before-function-paren":[0],
    "brace-style":[0],
    "guard-for-in":[0],
    "vars-on-top":[0],
    "prefer-const":[1],
    "one-var":[1],
    "no-param-reassign":[1],
    "space-infix-ops":[1],
    "no-use-before-define":[0],

    //react
    "react/prop-types":[1],
    "react/sort-comp":[0],
    "react/wrap-multilines":[0],
  },
  "globals":{
    "_DEBUG_": true
  }
};
