module.exports = {
  // 入口文件
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // 定义转换jsx 的插件pragma,为自定义的编译jsx pragma.JSX Pragma 是指把jsx 编译成js 的函数
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'ToyReact.createElement', // 自己定义名字,用来修改 webpack 后,编译的 js 中,创建的一个方法名
                },
              ],
            ],
          },
        },
      },
    ],
  },
  // 开发模式
  mode: 'development',
  // 不压缩打包后的文件
  optimization: {
    minimize: false,
  },
}
