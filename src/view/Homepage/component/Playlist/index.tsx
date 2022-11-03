import './Playlist.scss';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import RightMenu, { IArrayAction } from '@layout/RightMenu';

import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import { UnorderedListOutlined, TableOutlined } from '@ant-design/icons';

import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';

import ListenComponent from '@shared/components/ListenComponent';
import { iconMenuRightAdd } from '../../../../shared/assets/images';
import { Link } from 'react-router-dom';
// import ApprovalManagementComponent from '../../../../shared/components/ApprovalManagementComponent';

const dataTable = require('./data.json');

const Playlist = () => {
  const table = useTable();

  const [search, setSearch] = useState<string>('');

  const idChooses = 'id';
  const columns: ColumnsType = [
    {
      dataIndex: 'id',
      title: 'STT',
    },
    {
      dataIndex: 'playlisTitle',
      title: 'Tiêu đề',
    },
    {
      dataIndex: 'mumberRecord',
      title: 'Số bản ghi',
    },
    {
      dataIndex: 'time',
      title: 'Thời lượng',
    },
    {
      dataIndex: 'topic',
      title: 'Chủ đề',
    },
    {
      dataIndex: 'dateCreated',
      title: 'Ngày tạo',
    },
    {
      dataIndex: 'creator',
      title: 'Người tạo',
    },
    {
      render: () => (
        <>
          <Link to="/playlist/detail-playlist" className="icon-edit">
            Chi tiết
          </Link>
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
      title: 'Thêm Playlist',
    },
  ];

  return (
    <>
      <div className="record">
        <h1 className="title">Playlist</h1>
        <div className="main-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <SearchComponent
              onSearch={handleSearch}
              placeholder="Tên chủ đề, người tạo,..."
              classNames="mb-0 search-table"
            />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <UnorderedListOutlined
                  style={{ color: '#fff', fontSize: '24px', marginRight: '20px' }}
                />
                <TableOutlined style={{ color: '#fff', fontSize: '24px' }} />
              </div>
            </div>
          </div>
          <TableComponent
            rowKey={res => res[idChooses]}
            register={table}
            columns={columns}
            dataSource={dataTable}
          />
          {/* <GridComponent register={table} columns={columns} dataSource={dataTable} /> */}
        </div>
      </div>
      <Link to="/playlist/add-playlist">
        <RightMenu arrayAction={arrayAction} />
      </Link>
      {/* <ModalComponents /> */}
    </>
  );
};

export default Playlist;
