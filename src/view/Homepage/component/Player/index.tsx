import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import './Player.scss';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';

import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { iconMenuRightAdd } from '../../../../shared/assets/images';
const { confirm } = Modal;

const dataTable = require('./data.json');

const Player = () => {
  const table = useTable();

  const [search, setSearch] = useState<string>('');

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const idChooses = 'id';
  const columns: ColumnsType = [
    {
      dataIndex: 'id',
      title: 'STT',
    },
    {
      dataIndex: 'playerTitle',
      title: 'Tên lịch',
    },
    {
      dataIndex: 'timePlay',
      title: 'Thời gian phát',
    },
    {
      render: () => (
        <>
          <Link to="/player/detail-player" className="icon-edit">
            Xem chi tiết
          </Link>
        </>
      ),
    },
    {
      render: () => (
        <>
          <div className="delete-item" onClick={showConfirm}>
            Xóa
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    table.fetchData({ option: { search: search } });
  }, [search, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const arrayAction: IArrayAction[] = [
    {
      imgIcon: iconMenuRightAdd,
      name: 'common.add',
      title: 'Thêm lịch phát',
    },
  ];

  return (
    <>
      <div className="player">
        <h1 className="title">Danh sách lịch phát</h1>
        <div className="main-card">
          <TableComponent
            rowKey={res => res[idChooses]}
            register={table}
            columns={columns}
            dataSource={dataTable}
          />
        </div>
      </div>
      <Link to="/player/add-player">
        <RightMenu arrayAction={arrayAction} />
      </Link>
      {/* <ModalComponents /> */}
    </>
  );
};

export default Player;
