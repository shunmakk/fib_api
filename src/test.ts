//テストコードを書く jestを使用しています
//パターンは7個ほど用意

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