import jwtDecode from 'jwt-decode';
const JWTAuth = () => {
  const getToken = localStorage.getItem('user_token');

  const isLogin = getToken ? true : false; // rubah kyk gini bisaa nga
  if (isLogin) {
    const decodeToken = jwtDecode(getToken);
    const userId = decodeToken?.user_id;
    const nameUser = decodeToken?.name;
    const roleUser = decodeToken?.role;
    // console.log('JWT AUTH USERID : ', userId);
    return {
      isLogin,
      userId,
      nameUser,
      roleUser,
    };
  }
  return {
    isLogin: false,
    userId: null,
    nameUser: null,
    roleUser: null,
  };
};

export default JWTAuth;
