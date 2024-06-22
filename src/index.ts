import express ,{Request, Response}  from 'express'

const app = express();
const port =  process.env.PORT || 3000;


//フィボナッチ数のアルゴリズムを作成
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

//こっちはJSON形式で返すためのAPI
app.get(
    '/fib', (req: Request, res: Response) => {
        //クエリパラメータnを取得して、キャストした文字列を整数に変換する
        const n = parseInt(req.query.n as string);
        //レスポンスを返す
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