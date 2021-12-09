module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-plus',
        styleLibraryName: 'theme-chalk'
      }
    ],
    [
      'prismjs',
      {
        languages: 'all',
        plugins: ['line-numbers'] //配置显示行号插件
      }
    ]
  ]
}
