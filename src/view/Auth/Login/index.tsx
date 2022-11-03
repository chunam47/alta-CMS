import React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
// import authenticationPresenter from '@modules/authentication/presenter';

import { imgLogo } from '@shared/assets/images';
import Language from '../components/Language';
import NavLinkBottom from '../components/NavLinkBottom';
import RenderError from '../components/RenderError';

import '../styles.scss';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { formatMessage } = useAltaIntl();
  // const { login } = authenticationPresenter;
  // const loginByAccount = useSingleAsync(login);
  const [errorStatus, setErrorStatus] = useState('');
  const onFinishFailed = () => {
    setErrorStatus('');
  };

  const onSubmitAccount = () => {
    navigate('/');
  };

  return (
    <>
      <div className="main-login auth-form">
        <div className="content">
          <Language />
          <div className="main-content">
            <img className="img" src={imgLogo} alt="login" />
            <h3 className="main-title">{formatMessage('login.title')}</h3>
            <Form
              name="loginByAccount"
              layout="vertical"
              onFinish={onSubmitAccount}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
              initialValues={{
                remember: false,
              }}
            >
              <Form.Item label={formatMessage('auth.email')} name="username">
                <Input className="login__input" />
              </Form.Item>

              <Form.Item label={formatMessage('auth.password')} name="password">
                <Input.Password className="login__input" />
              </Form.Item>

              {errorStatus && <RenderError errorStatus={errorStatus} />}

              <Form.Item name="remember" valuePropName="checked" className="remember__login">
                <Checkbox>{formatMessage('login.remember')}</Checkbox>
              </Form.Item>

              <Button htmlType="submit" className="submit">
                Đăng nhập
              </Button>
            </Form>
          </div>
        </div>
        <NavLinkBottom navLink="Quên mật khẩu?" onClick={() => navigate('/forgot-password')} />
      </div>
    </>
  );
};
export default Login;
