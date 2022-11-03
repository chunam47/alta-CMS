import React from 'react';

import { Col, Row, Button, Upload, Input, Switch, Breadcrumb } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { CloudUploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Form from 'antd/es/form';
import './AddPlaylist.scss';
import { Link } from 'react-router-dom';
import RightMenu, { IArrayAction } from '../../../../../../layout/RightMenu';
import TableComponent from '../../../../../../shared/components/TableComponent';
import { iconMenuRightAdd } from '../../../../../../shared/assets/images';

const { TextArea } = Input;

const data = require('./data.json');

const arr = [
  {
    text: 'Playlist',
    link: '/playlist',
  },
  {
    text: 'Thêm playlist mới',
    link: '',
  },
];

const props: UploadProps = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then(res => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};

const columns: ColumnsType = [
  {
    dataIndex: 'id',
    title: 'STT',
  },
  {
    dataIndex: 'nameRecord',
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
    imgIcon: iconMenuRightAdd,
    name: 'common.add',
    title: 'Thêm Playlist',
  },
];

const AddPlaylist: React.FC = () => {
  return (
    <div className="add-playlist">
      <div className="breadcrumb">
        <Breadcrumb separator=" >  ">
          {arr.map((bred, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={bred.link}>{bred.text}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="title">Thêm playlist</div>
      <Row className="content">
        <Col span={4} className="content-left">
          <div className="content-left__cover-img">
            <p>Ảnh bìa:</p>
            <Upload {...props}>
              <Button icon={<CloudUploadOutlined />}>Tải lên</Button>
            </Upload>
          </div>
          <div className="content-left__title">
            <Form.Item
              label="Tiêu đề:"
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
          </div>
          <div className="content-left__sub-title">
            <div>
              <p>Tổng số</p>
              <span>0 bản ghi</span>
            </div>
            <div>
              <p>Tổng thời lượng:</p>
              <span>--:--:--</span>
            </div>
          </div>
          <div className="content-left__des">
            <Form.Item
              label="Mô tả:"
              name="title-add"
              rules={[
                {
                  max: 99,
                  whitespace: true,
                },
              ]}
            >
              <TextArea rows={4} maxLength={6} />
            </Form.Item>
          </div>
          <div className="content-left__topic">
            <Form.Item
              label="Chủ đề:"
              name="title-add"
              rules={[
                {
                  max: 99,
                  whitespace: true,
                },
              ]}
            >
              <TextArea rows={4} maxLength={6} />
            </Form.Item>
          </div>
          <div className="content-left__switch">
            <Switch defaultChecked />
            <p>Chế độ công khai</p>
          </div>
        </Col>
        <Col span={20} className="content-right">
          <div className="main-card">
            <TableComponent columns={columns} dataSource={data} />
          </div>
          <Link to="/playlist/add-playlist">
            <RightMenu arrayAction={arrayAction} />
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default AddPlaylist;
