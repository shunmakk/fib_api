import express ,{Request, Response}  from 'express'
import { FibonacciNumber } from './FibonacciNumber';

const app = express();
const port =  process.env.PORT || 3000;

//JSON形式で返すためのAPI
app.get(
    '/fib', (req: Request, res: Response) => {
        //クエリパラメータnを取得して、キャストした文字列を整数に変換する
        const n = parseFloat(req.query.n as string);
        //レスポンスを返す
        if(isNaN(n) || n <= 0){
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