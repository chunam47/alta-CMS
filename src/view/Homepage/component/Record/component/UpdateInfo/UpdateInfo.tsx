import React from 'react';

import { Col, Row, Card, Form, Input, Select, Breadcrumb } from 'antd';

import './updateInfo.scss';
import { iconMenuRightDelete, iconMusic, imgLogo } from '../../../../../../shared/assets/images';
import CircleLabel from '../../../../../../shared/components/CircleLabel';
import RightMenu, { IArrayAction } from '../../../../../../layout/RightMenu';

import { Link, useNavigate } from 'react-router-dom';

const { Option } = Select;

const arrayAction: IArrayAction[] = [
  {
    imgIcon: iconMenuRightDelete,
    name: 'common.delete',

    title: 'Xóa bản ghi',
  },
];

const Updateinfo = () => {
  const history = useNavigate();

  const onCancel = () => {
    history('/record');
  };

  const arr = [
    {
      text: 'Kho bản ghi',
      link: '/record',
    },
    {
      text: 'Cập nhật thông tin',
      link: '',
    },
  ];
  return (
    <div className="update-record">
      <div className="breadcrumb">
        <Breadcrumb separator=" >  ">
          {arr.map((bred, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={bred.link}>{bred.text}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="title">Bản ghi - Mất em</div>
      <Row className="update-record__content">
        <Col span={10} className="content__left">
          <div className="info-record">
            <Card
              title="Thông tin bản ghi"
              cover={
                <div className="info-record__box">
                  <img src={imgLogo} alt="" className="card-img" />
                  <div className="button-icon-upload">
                    <label id="input-media-record">
                      <span role="img" aria-label="camera" className="anticon anticon-camera">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="40" height="40" rx="20" fill="#347AFF" />
                          <path
                            d="M31 27C31 27.5304 30.7893 28.0391 30.4142 28.4142C30.0391 28.7893 29.5304 29 29 29H11C10.4696 29 9.96086 28.7893 9.58579 28.4142C9.21071 28.0391 9 27.5304 9 27V16C9 15.4696 9.21071 14.9609 9.58579 14.5858C9.96086 14.2107 10.4696 14 11 14H15L17 11H23L25 14H29C29.5304 14 30.0391 14.2107 30.4142 14.5858C30.7893 14.9609 31 15.4696 31 16V27Z"
                            stroke="#F5F5FF"
                            stroke-width="2"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M20 25C22.2091 25 24 23.2091 24 21C24 18.7909 22.2091 17 20 17C17.7909 17 16 18.7909 16 21C16 23.2091 17.7909 25 20 25Z"
                            stroke="#F5F5FF"
                            stroke-width="2"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </label>
                    <input
                      type="file"
                      id="input-media-record"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </div>
                  <div className="info-record__name">
                    <img src={iconMusic} alt="" />
                    <p>Matem.mp3</p>
                  </div>
                </div>
              }
            >
              <div className="info-record__card">
                <div>
                  <p>Ngày thêm:</p>
                  <span>07/04/2021 - 17:45:30</span>
                </div>
                <div>
                  <p>Người tải lên:</p>
                  <span>Super Admin</span>
                </div>
                <div>
                  <p>Người duyệt:</p>
                  <span>
                    Hệ thống <br />
                    (Tự động phê duyệt)
                  </span>
                </div>
                <div>
                  <p>Ngày phê duyệt:</p>
                  <span>07/04/2021 - 17:45:50</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="info-author">
            <Card title="Thông tin ủy quyền">
              <div className="info-record__card">
                <div>
                  <p>Số hợp đồng:</p>
                  <span>BH123</span>
                </div>
                <div>
                  <p>Ngày nhận ủy quyền:</p>
                  <span>01/05/2021</span>
                </div>
                <div>
                  <p>Ngày hết hạn:</p>
                  <span>01/08/2025</span>
                </div>
                <div>
                  <p>Trạng thái:</p>
                  <span>
                    <CircleLabel text="Còn thời hạn" colorCode="blue" />
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={14} className="content__right">
          <div className="title">Chỉnh sửa thông tin</div>
          <div className="form-info">
            <Form name="recordInfoForm" layout="vertical" requiredMark={false} id="recordInfoForm">
              <Form.Item
                label="Tên bản ghi:"
                name="nameRecord"
                rules={[
                  {
                    required: true,
                    max: 99,
                    whitespace: true,
                  },
                ]}
              >
                <Input maxLength={100} defaultValue="Mắt em" />
              </Form.Item>
              <Form.Item
                label="Mã ISRC:"
                name="ISRC"
                rules={[
                  {
                    required: true,
                    max: 99,
                    whitespace: true,
                  },
                ]}
              >
                <Input maxLength={100} defaultValue="KRA40105463" />
              </Form.Item>
              <Form.Item
                label="Ca sĩ:"
                name="singer"
                rules={[
                  {
                    required: true,
                    max: 99,
                    whitespace: true,
                  },
                ]}
              >
                <Input maxLength={100} defaultValue="Noo Phước Thịnh" />
              </Form.Item>
              <Form.Item
                label="Tác giả:"
                name="author"
                rules={[
                  {
                    required: true,
                    max: 99,
                    whitespace: true,
                  },
                ]}
              >
                <Input maxLength={100} defaultValue="Chu Bin" />
              </Form.Item>
              <Form.Item
                label="Nhà sản xuất:"
                name="producer:"
                rules={[
                  {
                    required: true,
                    max: 99,
                    whitespace: true,
                  },
                ]}
              >
                <Input maxLength={100} defaultValue="Nguyễn Nam Minh Thụy" />
              </Form.Item>
              <Form.Item
                label="Thể loại:"
                name="category"
                rules={[
                  {
                    required: true,
                    max: 99,
                    whitespace: true,
                  },
                ]}
              >
                <Select defaultValue="Ballad" allowClear>
                  <Option value="Pop">Pop</Option>
                  <Option value="Ballad">Ballad</Option>
                  <Option value="Rock">Rock</Option>
                  <Option value="EDM">EDM</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      <div className="button-center__box">
        <button
          type="button"
          className="ant-btn ant-btn-default cancel-button mx-5"
          onClick={() => onCancel()}
        >
          <span>Hủy</span>
        </button>
        <button
          form="userProfileForm"
          type="submit"
          className="ant-btn ant-btn-primary normal-button save-button"
        >
          <span>Lưu</span>
        </button>
      </div>
      <RightMenu arrayAction={arrayAction} />
    </div>
  );
};

export default Updateinfo;
