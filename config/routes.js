export default [
  // User Login
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },

  // Menu Welcome
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },

  // Menu Data Users
  {
    // path: '/user',
    name: 'dataUser',
    path: '/users',
    component: './user/userList',
  },

  // Menu Data Product
  {
    // path: '/product',
    name: 'dataProduct',
    path: '/products',
    component: './product/productList',
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
