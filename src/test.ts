//テストコードを書く jestを使用しています
//パターンは7個ほど用意

import request from 'supertest';
import express from 'express';
import { Response,Request } from 'express';
import { FibonacciNumber } from '.';

const app = express();
app.get(
    '/fib', (req: Request, res: Response) => {
        const n = parseInt(req.query.n as string);
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

    it('nが1000の場合', async () => {
        const res = await request(app).get('/fib?n=1000');
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(4.346655768693743e+208);
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

      it('文字列を入力した場合',  async () => {
        const res = await request(app).get('/fib?n=kajioka');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Bad request');
      })

      it('負の数を入力した場合', async () => {
        const res = await request(app).get('/fib?n=-5');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Bad request');
      });

    });