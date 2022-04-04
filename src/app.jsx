import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import JWTAuth from './services/auth/jwt_auth';
const loginPath = '/user/login';
const welcomePath = '/';

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      if (JWTAuth().isLogin) {
        return JWTAuth();
      }
      history.push(loginPath);
    } catch (error) {
      history.push(loginPath);
    }
  };

  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
}

export const layout = ({ initialState, setInitialState }) => {
  // console.log('initialState: ' + JSON.stringify(JWTAuth()));

  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login\
      // console.log('INISIALSTATE :', initialState);
      // console.log('HISTORY :', location);

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
      if (initialState?.currentUser && location.pathname == loginPath) {
        history.push(welcomePath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/user/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
