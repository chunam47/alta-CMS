import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import RenderError from '@view/Auth/components/RenderError';
import { IUpdatePasswordForm } from '@view/Auth/interface';
import Language from '../../components/Language';
import { imgLogo } from '../../../../shared/assets/images';

const UpdatePasswordForm: React.FC<IUpdatePasswordForm> = props => {
  const history = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { resetPass } = authenticationPresenter;
  const resetPasswordCall = useSingleAsync(resetPass);

  const [errorStatus, setErrorStatus] = useState('');
  const onSubmitResetPassword = values => {
    resetPasswordCall?.execute(values, props.recoveryToken).then(() => {
      history('/login');
    });
  };

  const onFinishFailed = () => {
    setErrorStatus('');
  };

  return (
    <div className="main-form auth-form">
      <div className="content">
        <Language />
        <div className="main-content">
          <img className="img" src={imgLogo} alt="login" />
          <h3 className="main-title">{formatMessage('reset.password.title')}</h3>
          <div className="content-form">
            <Form
              name="resetPassword"
              layout="vertical"
              onFinish={onSubmitResetPassword}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              <Form.Item label="Mật khẩu mới:" name="accountPassword" rules={[]}>
                <Input.Password
                  className="login__input"
                  placeholder={formatMessage('auth.password.new')}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu mới:"
                dependencies={['accountPassword']}
                rules={[
                  {},
                  ({ getFieldValue }) => ({
                    validator(_, passwordConfirm) {
                      if (
                        !passwordConfirm ||
                        getFieldValue('accountPassword') === passwordConfirm
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(formatMessage('auth.password.not.match')));
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="login__input"
                  placeholder={formatMessage('auth.password.confirm')}
                />
              </Form.Item>
              {errorStatus && <RenderError errorStatus={errorStatus} />}
              <Button htmlType="submit" className="submit">
                Lưu mật khẩu
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
