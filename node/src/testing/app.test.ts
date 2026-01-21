import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../testing/app';  

describe('Express App', () => {
  it('should return { ok: true } on /ping', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  // it('should return {ok:false} on /ping',async()=>{
  //   const response = await request(app).get('/ping');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({ok:false})
  // })
});
