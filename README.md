
# フィボナッチ数を返すAPIサービスの開発 
## サービスURL
こちらのURLから確認することができます   https://fib-api-bn62.onrender.com/

## 概要
このアプリケーションは指定されたn番目のフィボナッチ数を計算するシンプルなREST APIです。<br>
以下の技術を用いて構築しました。
- TypeScript
- Express.js
- jest(単体テスト)
- Render(デプロイ)

## ディレクトリ構造
```
fib_api/
├── src/
│   ├── index.ts
│   └── test.ts
├── jest.config.js
├── package.json
└── tsconfig.json
```
## セットアップ
- リポジトリをクローン
  ```
  git clone https://github.com/shunmakk/fib_api.git
  ```
- 依存関係をインストール
  ```
  npm install
  ```
- アプリケーションを起動する
  ```
  npm run start
  ```
- テストを実行する
  ```
  npm run test
  ```
## セットアップ(ローカル環境)
- リクエスト例:
  ```sh
  curl -X GET "http://localhost:3000/fib?n=12"
  ```
- 期待するレスポンス：
  ```json
   {
   "result": 144
   }
  ```
## ソースコード概要
### src/index.ts
### src/test.ts
## 直面した課題と工夫
### 　フィボナッチ数列の計算速度
### nが103を超えると正常に数値がでない
### Jestのエラーメッセージ「Jest did not exit one second after the test run has completed.」は、テストが完了した後も非同期操作が続いている

## 参考文献等
https://tech.012grp.co.jp/entry/rest_api_basics

https://utano.jp/entry/2018/02/hello-typescript-tsconfig/

https://qiita.com/suzuki0430/items/403984045d3bc0be2f24

https://note.com/strictlyes/n/n8ed7f6b7068f

https://sbfl.net/blog/2018/06/18/javascript-bigint/

https://www.agent-grow.com/self20percent/2019/03/25/only-express-and-jest-testing/

https://zenn.dev/kento_mm_ninw/articles/6308dd8cfeb916

https://zenn.dev/kento_mm_ninw/articles/81549c4ed0ee12

https://stackoverflow.com/questions/53935108/jest-did-not-exit-one-second-after-the-test-run-has-completed-using-express


