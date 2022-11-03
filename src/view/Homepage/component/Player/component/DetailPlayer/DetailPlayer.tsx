import React from 'react';

import { Input, Breadcrumb } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import type { UploadProps } from 'antd';
import './DetailPlayer.scss';
import { Link } from 'react-router-dom';
import RightMenu, { IArrayAction } from '../../../../../../layout/RightMenu';
import TableComponent from '../../../../../../shared/components/TableComponent';
import { iconMenuRightAdd } from '../../../../../../shared/assets/images';

const data = require('./data.json');

const arr = [
  {
    text: 'Lập lịch phát',
    link: '/player',
  },
  {
    text: 'Chi tiết',
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
    dataIndex: 'PlaylistName',
    title: 'Tên lịch',
  },
  {
    dataIndex: 'playlistDate',
    title: 'Ngày phát Playlist',
  },
  {
    dataIndex: 'startEnd',
    title: 'Bắt đầu - Kết thúc',
  },
  {
    dataIndex: 'playbackCycle',
    title: 'Chu kỳ phát',
  },
  {
    dataIndex: 'device',
    title: 'Thiết bị',
  },
];

const arrayAction: IArrayAction[] = [
  {
    imgIcon: iconMenuRightAdd,
    name: 'common.add',
    title: 'Thêm Playlist',
  },
];

const DetailPlayer: React.FC = () => {
  return (
    <div className="detail-player">
      <div className="breadcrumb">
        <Breadcrumb separator=" >  ">
          {arr.map((bred, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={bred.link}>{bred.text}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="title">Lịch phát số 1 </div>
      <div className="main-card">
        <TableComponent columns={columns} dataSource={data} />
      </div>
      <Link to="/playlist/add-playlist">
        <RightMenu arrayAction={arrayAction} />
      </Link>
    </div>
  );
};

export default DetailPlayer;
