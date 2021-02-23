const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  //entry: './src/index.js',
  entry:
  {
    // app : './src/index.js'
    //,print:'./src/print.js'
    Hello : './resource/components/Hello.js',
    Hello2 : './resource/components/Hello2.js',
  },
  output: {
    //filename: 'bundle.js',
    //path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'resource/components/dist'),
    // library: "bundle", // 이름을 지정 할 경우 bundle.es6Code() 형태로 호출
    library: "MyHello",
    libraryExport:'default',
    libraryTarget: "umd", // output.libraryTarget을 umd로 설정하면 모듈은 <script src=""> 로드 뿐만 아니라 모든 방식의 로더에서 사용할 수 있음
  },
  resolve : // 모듈을 찾는 방법에 관련된 설정
  {
    alias : // 특정 경로에 별칭을 만들어줌.
    {
    }
  },
  optimization: {
    minimize: false
  },
  module :
  {
    rules : [
        {
            test: /\.js$/,                          // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
            exclude: /node_module/,                 // node module 폴더는 babel 컴파일에서 제외
            use:{
                loader: 'babel-loader',				// babel loader가 파이프를 통해 js 코드를 불러옴
                options: {
                    presets: ['@babel/env', '@babel/react']
                }
            }
        }
      /* {
        test : /\.css$/,
        use : [
          'style-loader',
          'css-loader'
        ]
      }, */
      /* {
        test : /\.s[ac]ss$/,
        use : [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, */
      /* {
        test : /\.(png|svg|jpg|gif)$/,
        use : [
          'file-loader'
        ]
      }, */
      /* {
        test : /\.xml$/,
        use : [
          'xml-loader'
        ]
      } */
    ]
  },
  plugins : [
    // dist폴더 정리해주는 플러그인
    // new CleanWebpackPlugin(),

    // output폴더에 번들js파일이 <script>태그로 import되어있는 html을 만들어주는 플러그인
    
    /* 
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    */

    // 특정 모듈을 전역에 import한것처럼 작업해줌.
    
    new webpack.ProvidePlugin({
      //$ : 'jquery',
      'eggplant' : 'Hello'
    })
    
    
  ],
  
  devServer : {
    contentBase : './dist',
    compress : false,
    port : 8300
  },
};