import {
  // AlipayCircleOutlined,
  LockOutlined,
  // MobileOutlined,
  // TaobaoCircleOutlined,
  UserOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, useModel } from 'umi';
// import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';

// const LoginMessage = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const msg = await login({ ...values });
      if (msg.status === 'ok') {
        localStorage.setItem('user_token', msg.data.token);

        const defaultLoginSuccessMessage = 'Login Success';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();

        // console.log('HISTORY : ', history);
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }
      setUserLoginState(msg);
    } catch (error) {
      // const defaultLoginFailureMessage = 'Login Failed !';
      // message.error(defaultLoginFailureMessage);
    }
  };

  // const { status } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="FSE"
          subTitle={intl.formatMessage({
            id: 'pages.layouts.userLayout.title',
          })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <>
            <ProFormText
              name="personalNumber"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Personal Number ..."
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Your Password ..."
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>

          <div
            style={{
              marginBottom: 24,
            }}
          />
        </LoginForm>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
