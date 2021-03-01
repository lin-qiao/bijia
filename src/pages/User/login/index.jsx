import {
  AlipayCircleOutlined,
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { connect, useIntl, FormattedMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const intl = useIntl();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
			<>
			  <ProFormText
			    name="username"
			    fieldProps={{
			      size: 'large',
			      prefix: <UserOutlined className={styles.prefixIcon} />,
			    }}
			    placeholder={intl.formatMessage({
			      id: 'pages.login.username.placeholder',
			      defaultMessage: '用户名: admin or user',
			    })}
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
			      prefix: <LockTwoTone className={styles.prefixIcon} />,
			    }}
			    placeholder={intl.formatMessage({
			      id: 'pages.login.password.placeholder',
			      defaultMessage: '密码: ant.design',
			    })}
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
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
