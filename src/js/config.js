seajs.config({

  // 别名配置
  alias: {
    'jquery': 'src/js/jq'
  },

  // 路径配置
  paths: {
    //简写目录 引用更方便
    'common': 'https://a.alipayobjects.com/gallery'
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  map: [
    ['http://example.com/js/app/', 'http://localhost/js/app/']
  ],

  // 预加载项
  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ],

  // 调试模式
  debug: true,

  // Sea.js 的基础路径
  base: 'https://raw.githubusercontent.com/jun880529/maxtp-web/master/',

  // 文件编码
  charset: 'utf-8'
});