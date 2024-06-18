import express ,{Request, Response}  from 'express'

const app = express();
const port =  process.env.PORT || 3000;


//フィボナッチ数のアルゴリズムを作成する
const FibonacciNumber =  (n:number) => {
    if(n <= 0){
        throw new Error('エラー');
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

//こっちはJSON形式で返すためのapi (n=103を超えると正常に計算できなくなる課題がある）
app.get(
    '/fib', (req: Request, res: Response) => {
        //reqからクエリパラメータnを取得して、キャストした文字列を整数に変換する
        const n = parseInt(req.query.n as string);
        //レスポンスを返す
        if(isNaN(n) || n <= 0){
        res.status(400).json({ status:400 , message: 'Bad request'})
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

app.listen(port, () => {
    console.log(`ポート番号${port}`);
})