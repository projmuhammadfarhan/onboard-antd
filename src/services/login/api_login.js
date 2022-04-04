import { request } from 'umi';

const setDB = 'http://localhost:8001/';

export async function login(body) {
  // console.log('Check Body Request : ', body);
  return request(setDB + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(body),
  });
}
