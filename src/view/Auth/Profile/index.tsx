import './style.scss';

import { Button, Col, Form, Input, Row, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import store from '@core/store/redux';
import { useSingleAsync } from '@hook/useAsync';
import HeaderComponent from '@layout/Header';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { RootState } from '@modules';
import authenticationPresenter from '@modules/authentication/presenter';
import { removeProfile } from '@modules/authentication/profileStore';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';

import AvatarUser from './components/AvatarUser';
import ModalChangePassWord from './components/ModalChangePassWord';
import { routerViewProfile } from './router';
import Navbar from '../../../layout/navBar';
import moment from 'moment';

const UserProfile = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const { formatMessage } = useAltaIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [isDisableForm, setIsDisableForm] = useState(true);
  const user = useSelector((state: RootState) => state.profile.user);
  const updateAccounts = useSingleAsync(authenticationPresenter.updateProfile);

  const showModal = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (user != null) {
      setIsDisableForm(true);
      form.setFieldsValue(user);
    }
  }, [form, user]);

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'edit',
      name: 'common.edit',
      handleAction: () => setIsDisableForm(false),
    },
    {
      iconType: 'key',
      name: 'common.change.password',
      handleAction: () => showModal(),
    },
    {
      iconType: 'logOut',
      name: 'common.logout',
      handleAction: () => {
        DeleteConfirm({
          title: formatMessage('common.logout.title'),
          content: formatMessage('common.logout.content'),
          handleOk: () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            store.dispatch(removeProfile()), history('/login');
          },
        });
      },
    },
  ];

  const chooseFile = (file: any) => {
    form.setFieldsValue({ avatar: file });
  };

  const onUpdateProfile = (values: any) => {
    if (values) {
      updateAccounts.execute(values).then(() => {
        authenticationPresenter.getProfile().then(() => {
          setIsDisableForm(true);
        });
      });
    }
  };

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  return (
    <Row>
      <Col flex="170px" className="nav-bar__header">
        <Navbar />
      </Col>
      <Col flex="auto" className="main-profile">
        <div>
          <div className="all-page-component">
            <div className="w-100 d-flex flex-row-reverse">
              <HeaderComponent />
            </div>
          </div>
          <Row>
            <Col span={16}>
              <div className="profile-page">
                <h1>Thông tin cơ bản</h1>
                <div className="">
                  <div className="profile-user__box">
                    <Form
                      name="userProfileForm"
                      initialValues={user}
                      layout="vertical"
                      requiredMark={false}
                      form={form}
                      onFinish={onUpdateProfile}
                      onResetCapture={() => {
                        setIsDisableForm(true);
                      }}
                      id="userProfileForm"
                    >
                      <Row className="profile-form__box">
                        <Col flex="273px" className="profile-avatar">
                          <AvatarUser disabled={isDisableForm} chooseFile={chooseFile} />
                        </Col>
                        <Col flex="auto">
                          <div className="info-input">
                            <Form.Item
                              label="Họ:"
                              name="userName"
                              rules={[
                                {
                                  max: 99,
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input maxLength={100} defaultValue="Nguyễn" />
                            </Form.Item>
                            <Form.Item
                              label="Tên:"
                              name="name"
                              rules={[
                                {
                                  max: 99,
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input defaultValue="Tuyết" maxLength={100} />
                            </Form.Item>
                          </div>
                          <div className="info-input">
                            <Form.Item
                              label="Ngày sinh:"
                              name=""
                              rules={[
                                {
                                  max: 99,
                                  whitespace: true,
                                },
                              ]}
                            >
                              <DatePicker
                                className="info-date"
                                defaultValue={moment('02/02/1998', dateFormatList[0])}
                                format={dateFormatList}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Số điện thoại:"
                              name="number-phone"
                              rules={[
                                {
                                  max: 99,
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input defaultValue="+84 250 123 151" maxLength={100} />
                            </Form.Item>
                          </div>
                          <Form.Item
                            label={formatMessage('email:')}
                            name="email"
                            rules={[
                              {
                                type: 'email',
                              },
                            ]}
                          >
                            <Input
                              defaultValue="tuyetnguyenngoc@alta.com.vn"
                              value="tuyetnguyenngoc@alta.com.vn"
                              disabled
                            />
                          </Form.Item>
                          <Form.Item label="Tên đăng nhập:" name="" rules={[]}>
                            <Input disabled defaultValue="tuyetnguyenngoc@alta.com.vn" />
                          </Form.Item>
                          <Form.Item label="Vai trò:" name="" rules={[]} className="user-role">
                            <Input defaultValue="Admin" disabled />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                    <RightMenu arrayAction={arrayAction} />
                  </div>
                  <ModalChangePassWord
                    isModalVisible={isVisible}
                    setIsModalVisible={setIsVisible}
                  />

                  <div className="button-center__box profile-button-update">
                    {!isDisableForm && (
                      <>
                        <Button
                          className="cancel-button mx-5"
                          onClick={() => setIsDisableForm(true)}
                        >
                          {formatMessage('common.cancel')}
                        </Button>
                        <Button
                          type="primary"
                          className="normal-button"
                          htmlType="submit"
                          form="userProfileForm"
                          loading={updateAccounts?.status === 'loading'}
                        >
                          {formatMessage('common.save')}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default React.memo(UserProfile);
