import { request } from 'umi';

const setDB = 'http://localhost:8001/';
const user_token = localStorage.getItem('user_token');

export async function POST_Product(body) {
  // console.log('USER TOKEN API : ', JSON.stringify(user_token));
  return request(setDB + 'products', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + user_token,
    },
    data: JSON.stringify(body),
  });
}
