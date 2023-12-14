export default {
  //继承
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order"
  ],
  rules: {
    // 无视优先级顺序(因为有大量嵌套)
    'no-descending-specificity': null,
    //always(必须加上引号)|never(不能带引号) 
    'function-url-quotes': 'always',
  },
}
