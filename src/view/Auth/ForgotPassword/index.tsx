import React from 'react';

import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { imgLogo } from '../../../shared/assets/images';
import Language from '../components/Language';
import NavLinkBottom from '../components/NavLinkBottom';
import RenderError from '../components/RenderError';

import '../styles.scss';
import './forgotPassword.scss';

const ForgotPassword = () => {
  const history = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { forgotPass } = authenticationPresenter;
  const forgotPasswordCall = useSingleAsync(forgotPass);
  const [errorStatus, setErrorStatus] = useState('');
  const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);

  const onFinishFailed = () => {
    setErrorStatus('');
  };

  const onSubmitEmail = (values: any) => {
    forgotPasswordCall
      ?.execute(values)
      .then(() => {
        setCheckSuccessEmail(true);
        console.log('hihi');
      })
      .catch(() => {
        setErrorStatus(formatMessage('forgot.password.email.not.exit'));
      });
  };

  return (
    <>
      <div className="main-forgot-password auth-form">
        <div className="content">
          <Language />
          <div className="main-content">
            <img className="img" src={imgLogo} alt="login" />
            <h3 className="main-title">Khôi phục mật khẩu</h3>
            {!checkSuccessEmail ? (
              <>
                <p className="description">
                  Vui lòng nhập địa chỉ email đã đăng ký để yêu cầu khôi phục mật khẩu
                </p>
                <div className="">
                  <Form
                    name="forgotPassword"
                    layout="vertical"
                    onFinish={onSubmitEmail}
                    onFinishFailed={onFinishFailed}
                    requiredMark={false}
                  >
                    <Form.Item
                      label={formatMessage('forgot.password.email')}
                      name="email"
                      rules={[
                        {
                          type: 'email',
                        },
                      ]}
                    >
                      <Input className="login__input" placeholder="tuyetnguyenngoc@gmail.com.vn" />
                    </Form.Item>
                    {errorStatus && <RenderError errorStatus={errorStatus} />}
                    <Button htmlType="submit" className="submit">
                      {formatMessage('forgot.password.button.accept')}
                    </Button>
                  </Form>
                </div>
              </>
            ) : (
              <div className="status__box">
                <p>{formatMessage('forgot.password.notification')}</p>
              </div>
            )}
          </div>
        </div>
        <NavLinkBottom navLink="Quay lại đăng nhập" onClick={() => history('/login')} />
      </div>
    </>
  );
};
export default ForgotPassword;
