import React from 'react';

import { Breadcrumb, Col, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import RightMenu, { IArrayAction } from '../../../../../../layout/RightMenu';
import {
  iconInteraction,
  iconMenuRight1,
  iconMenuRightDelete,
  iconPublic,
  iconRandom,
  imgDetailPlaylist,
} from '../../../../../../shared/assets/images';
import CircleLabel from '../../../../../../shared/components/CircleLabel';
import TableComponent from '../../../../../../shared/components/TableComponent';
import './DetailPlaylist.scss';
import { DeleteConfirm } from '../../../../../../shared/components/ConfirmDelete';

const data = require('./data.json');

const arr = [
  {
    text: 'Playlist',
    link: '/playlist',
  },
  {
    text: 'Chi tiết playlist',
    link: '',
  },
];

const columns: ColumnsType = [
  {
    dataIndex: 'id',
    title: 'STT',
  },
  {
    dataIndex: 'recordName',
    title: 'Tên bản ghi',
  },
  {
    dataIndex: 'singer',
    title: 'Ca sĩ',
  },
  {
    dataIndex: 'author',
    title: 'Tác giả',
  },
];

const arrayAction: IArrayAction[] = [
  {
    imgIcon: iconMenuRight1,
    name: 'common.edit',
    title: 'Chỉnh sửa',
  },
  {
    imgIcon: iconMenuRightDelete,
    name: 'Từ chối',
    title: 'Từ chối',
    handleAction: () => {
      DeleteConfirm({
        content: 'Hủy bỏ',
        handleOk: () => {
          // call Api Delete here
        },
        handleCancel: () => {},
      });
    },
  },
];

const DetailPlaylist: React.FC = () => {
  return (
    <div className="detail-playlist">
      <div className="breadcrumb">
        <Breadcrumb separator=" >  ">
          {arr.map((bred, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={bred.link}>{bred.text}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="title">Playlist Top ca khúc 2021</div>
      <Row className="content">
        <Col span={4} className="content-left">
          <div className="content-left__img">
            <img src={imgDetailPlaylist} alt="" />
            <h2>Top ca khúc 2021</h2>
          </div>
          <div className="content-left__info-playlist">
            <div>
              <p>Người tạo:</p>
              <span>Super Admin</span>
            </div>
            <div>
              <p>Người tạo:</p>
              <span>Super Admin</span>
            </div>
            <div>
              <p>Người tạo:</p>
              <span>Super Admin</span>
            </div>
          </div>
          <div className="content-left__des">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt labore et dolore magna aliqua.
            </span>
          </div>
          <div className="content-left__topic">
            <CircleLabel text="Chủ đề1" colorCode="blue" />
          </div>
          <div className="content-left__acction">
            <div>
              <img src={iconPublic} alt="" />
              <span>Hiển thị ở chế độ công khai</span>
            </div>
            <div>
              <img src={iconRandom} alt="" />
              <span>Phát ngẫu nhiên</span>
            </div>
            <div>
              <img src={iconInteraction} alt="" />
              <span>Lặp lại</span>
            </div>
          </div>
        </Col>

        <Col span={20} className="content-right">
          <div className="main-card">
            <TableComponent columns={columns} dataSource={data} />
          </div>
        </Col>
      </Row>
      <RightMenu arrayAction={arrayAction} />
    </div>
  );
};

export default DetailPlaylist;
