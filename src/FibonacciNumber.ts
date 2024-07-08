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