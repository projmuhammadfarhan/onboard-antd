import jwtDecode from 'jwt-decode';

const JWTAuth = () => {
  const getToken = localStorage.getItem('user_token');

  isLogin = false;
  try {
    if (getToken !== '') {
      const decodeToken = jwtDecode(getToken);
      return {
        isLogin: true,
        userId: decodeToken.userId,
      };
    } else {
      return {
        isLogin: false,
        userId: null,
      };
    }
  } catch (error) {
    return {
      isLogin: false,
      userId: null,
    };
  }
};
export default JWTAuth;
