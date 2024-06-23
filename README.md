
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
├── gitignore
├── .env //gitignoreで隠してる
├── jest.config.js //gitignoreで隠してる
├── package-lock.json 
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
```typescript
import express ,{Request, Response}  from 'express'
const app = express();
const port =  process.env.PORT || 3000;

export const FibonacciNumber =  (n:number) => {
    if(n <= 0){
        throw new Error('数値が0以下だから処理できないです');
    } else if(n === 1 || n === 2){
        return 1;
    } else {
        let a = 1;
        let b = 1;
        for(let i = 3; i <= n; i++){
            [a,b] = [b,a+b];
        }
        return b;
    }
}
app.get(
    '/fib', (req: Request, res: Response) => {
        const n = parseInt(req.query.n as string);
        if(isNaN(n) || n <= 0){
            res.status(400).json({ status:400 , message: 'Bad request'})
        }else if (n >= 103) {
            res.status(400).json({ status: 400, message: 'nを103以下にしてください' });
        } else {
            try{
                const CorrectResult = FibonacciNumber(n);
                res.json({ "result" : CorrectResult})
            }
            catch(e){
                res.status(400).json({status:400})
            }
        }
    }
)
if (require.main === module) {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
export default app;
```

##### フィボナッチ数の計算
fibonacci関数は、指定されたn番目のフィボナッチ数を計算します。無効な入力に対してはエラーをスローします。
#####  エンドポイントの定義
/fibエンドポイントを定義し、リクエストパラメータから取得したnに基づいてフィボナッチ数を計算します。無効な入力に対しては400エラーを返す仕様になっています。
#####  サーバーの起動
モジュールが直接実行された場合にサーバーを起動します。
##### エクスポート
テストで使用するためにアプリケーションをエクスポートします。

### src/test.ts
```typescript
import request from 'supertest';
import app from '.';
describe('成功するケース', () => {
let server:any;
  beforeAll((done) => {
    server = app.listen(4000, done);
  });
  afterAll((done) => {
    server.close(done);
  });
    it('nが1の場合', async () => {
      const res = await request(app).get('/fib?n=1');
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(1);
    });
    it('nが2の場合', async () => {
        const res = await request(app).get('/fib?n=2');
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(1);
      });
    it('nが10の場合', async () => {
        const res = await request(app).get('/fib?n=10');
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(55);
      });
    it('nが100の場合', async () => {
        const res = await request(app).get('/fib?n=100');
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(354224848179262000000);
      });
});
describe('エラーになるケース', () => {
    let server:any;
      beforeAll((done) => {
        server = app.listen(4000, done);
      });
      afterAll((done) => {
        server.close(done);
      });
      it('nが103を超える場合', async () => {
        const res = await request(app).get('/fib?n=5129');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('nを103以下にしてください');
    });
      it('文字列を入力した場合',  async () => {
        const res = await request(app).get('/fib?n=kajioka');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Bad request');
      });
      it('負の数を入力した場合', async () => {
        const res = await request(app).get('/fib?n=-5');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Bad request');
      });
    });
```
##### テストサーバーの起動と停止
beforeAllフックでテストサーバーを起動し、afterAllフックでテストサーバーを停止します。これにより、非同期操作がテスト終了後に続かないようにします。
##### ユニットテストの実行
GET /fibエンドポイントに対するリクエストを送信し、期待されるレスポンスが返されるかをテストします。
無効な入力に対して400エラーが返されることを確認します。

## その他工夫点など
### フィボナッチ数列の計算速度
### nが103を超えると正常に数値がでない
### Jestのエラーメッセージ「Jest did not exit one second after the test run has completed.」は、テストが完了した後も非同期操作が続いている
### なぜRebderにhostingした？

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


