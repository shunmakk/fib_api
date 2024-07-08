import express ,{Request, Response}  from 'express'
import { FibonacciNumber } from './FibonacciNumber';

const app = express();
const port =  process.env.PORT || 3000;

//JSON形式で返すためのAPI
app.get(
    '/fib', (req: Request, res: Response) => {
      // クエリパラメータ n を取得して、数値として解釈できない場合はエラー
      const nString = req.query.n as string;
      // 数値を表す正規表現パターン
      const numberPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)$/
      // 文字列が有効な数値表現であるかを確認する
      if (!numberPattern.test(nString)) {
        res.status(400).json({ status: 400, message: '正しい数値を入力してください' });
        return;
     }

       const n = parseFloat(nString);

        //レスポンスを返す
        if(!Number.isFinite(n) ||isNaN(n) || n <= 0){
            res.status(400).json({ status:400 , message: 'Bad request'})
        }else if (n >= 103) {
            res.status(400).json({ status: 400, message: 'nを103以下にしてください' });
        }else if(!Number.isInteger(n)){
            res.status(400).json({ status: 400, message: 'nに小数点を含めないでください' });
        }
        else {
            try{
                const CorrectResult = FibonacciNumber(n);
                res.json({ "result" : CorrectResult})
            }
            catch(e:any){
                res.status(400).json({status:400 , message: e.message})
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