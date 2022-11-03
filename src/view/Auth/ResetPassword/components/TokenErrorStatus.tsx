import React from 'react';
import { useNavigate } from 'react-router';

import { Button } from 'antd';

import { imgLogo } from '../../../../shared/assets/images';
import Language from '../../components/Language';
import '../../styles.scss';
import NavLinkBottom from '../../components/NavLinkBottom';

const TokenErrorStatus = () => {
  const history = useNavigate();

  return (
    <div className="auth-form">
      <div className="content error-token__box">
        <Language />
        <div className="main-content">
          <img className="img" src={imgLogo} alt="login" />

          <h3 className="main-title-err">Không thể kết nối !!</h3>

          <p className="description">
            Dường như đã có chút trục trặc hoặc link này đã hết hạn. Vui lòng thử lại hoặc yêu cầu
            gửi lại link để đặt lại mật khẩu của bạn.
          </p>

          <Button htmlType="submit" className="button-err__resetPassword">
            Yêu cầu gửi lại link
          </Button>
        </div>
      </div>
      <NavLinkBottom navLink="Quay lại đăng nhập" onClick={() => history('/login')} />
    </div>
  );
};

export default TokenErrorStatus;
