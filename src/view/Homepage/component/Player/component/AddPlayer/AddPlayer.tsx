import React from 'react';

import type { UploadProps } from 'antd';
import { Breadcrumb, Col, DatePicker, Input, Row, Calendar } from 'antd';
import Form from 'antd/es/form';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import RightMenu, { IArrayAction } from '../../../../../../layout/RightMenu';
import { iconMenuRightAdd } from '../../../../../../shared/assets/images';
import './AddPlayer.scss';

const data = require('./data.json');

const arr = [
  {
    text: 'Playlist',
    link: '/playlist',
  },
  {
    text: 'Thêm lịch phát mới',
    link: '',
  },
];

const arrayAction: IArrayAction[] = [
  {
    imgIcon: iconMenuRightAdd,
    name: 'common.add',
    title: 'Áp lịch cho thiết bị',
  },
];

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const onCancel = () => {
  console.log('click');
};

const AddPlayer: React.FC = () => {
  const history = useNavigate();
  return (
    <div className="add-player">
      <div className="breadcrumb">
        <Breadcrumb separator=" >  ">
          {arr.map((bred, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={bred.link}>{bred.text}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="title">Lập lịch phát</div>
      <Row className="content">
        <Col span={4} className="content-left">
          <div className="content-left__info">
            <h2>Thông tin lịch phát</h2>
            <Form.Item
              className="content-left__info--mb4"
              label="Tên lịch phát:"
              name="title-add"
              rules={[
                {
                  max: 99,
                  whitespace: true,
                },
              ]}
            >
              <Input maxLength={100} />
            </Form.Item>

            <Form.Item
              className="content-left__info--mb4"
              label="Từ ngày"
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
                defaultValue={moment('22/05/2021', dateFormatList[0])}
                format={dateFormatList}
              />
            </Form.Item>

            <Form.Item
              className="content-left__info--mb4"
              label="Đến ngày"
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
                defaultValue={moment('30/05/2021', dateFormatList[0])}
                format={dateFormatList}
              />
            </Form.Item>
          </div>
          <div className="content-left__list">
            <h2> Danh sách Playlist</h2>
            <div className="playlist">
              <div className="list-item">
                <h3>Top USUK</h3>
                <div className="list-duration">
                  <p>Thời lượng:</p>
                  <span>02:00:00</span>
                </div>
              </div>
              <div className="list-item">
                <h3>Top USUK</h3>
                <div className="list-duration">
                  <p>Thời lượng:</p>
                  <span>02:00:00</span>
                </div>
              </div>
              <div className="list-item">
                <h3>Top USUK</h3>
                <div className="list-duration">
                  <p>Thời lượng:</p>
                  <span>02:00:00</span>
                </div>
              </div>

              <div className="new-playlist">
                <h2> Playlist mới</h2>
                <div className="list-item">
                  <h3>Top USUK</h3>
                  <div className="list-duration">
                    <p>Thời lượng:</p>
                    <span>02:00:00</span>
                  </div>
                </div>
                <div className="list-item">
                  <h3>Top USUK</h3>
                  <div className="list-duration">
                    <p>Thời lượng:</p>
                    <span>02:00:00</span>
                  </div>
                </div>
                <div className="list-item">
                  <h3>Top USUK</h3>
                  <div className="list-duration">
                    <p>Thời lượng:</p>
                    <span>02:00:00</span>
                  </div>
                </div>
                <div className="list-item">
                  <h3>Top USUK</h3>
                  <div className="list-duration">
                    <p>Thời lượng:</p>
                    <span>02:00:00</span>
                  </div>
                </div>
                <div className="list-item">
                  <h3>Top USUK</h3>
                  <div className="list-duration">
                    <p>Thời lượng:</p>
                    <span>02:00:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={20} className="content-right">
          <div className="main-card">
            <Calendar />
          </div>
          <Link to="/playlist/add-playlist">
            <RightMenu arrayAction={arrayAction} />
          </Link>
        </Col>
      </Row>
      <div className="button-center__box">
        <button
          type="button"
          className="ant-btn ant-btn-default cancel-button mx-5"
          onClick={() => history('/player')}
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
    </div>
  );
};

export default AddPlayer;
