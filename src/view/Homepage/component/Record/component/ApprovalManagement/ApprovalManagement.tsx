import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';

import { Breadcrumb } from 'antd';

import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { UnorderedListOutlined, TableOutlined } from '@ant-design/icons';

import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';

import { iconMenuRightDelete } from '../../../../../../shared/assets/images';
import ListenComponent from '@shared/components/InformationIcon';
import SearchComponent from '../../../../../../shared/components/SearchComponent';
import { DeleteConfirm } from '../../../../../../shared/components/ConfirmDelete';
import './ApprovalManagement.scss';
import { Link } from 'react-router-dom';

const dataTable = require('../../data.json');

const ApprovalManagement = () => {
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
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
    {
      dataIndex: 'ISRC',
      title: 'Mã ISRC',
    },
    {
      dataIndex: 'contract',
      title: 'Số hợp đồng',
    },
    {
      dataIndex: 'uploadDate',
      title: 'Ngày tải',
    },
    {
      render: () => (
        <>
          <ListenComponent />
        </>
      ),
    },
  ];

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
    setSelectedRowKeys([]);
  };

  const arrayAction: IArrayAction[] = [
    {
      imgIcon: iconMenuRightDelete,
      name: 'common.delete',
      title: 'Xóa',
      disable: selectedRowKeys?.length === 0,
      handleAction: () => {
        DeleteConfirm({
          content: 'Xóa',
          handleOk: () => {
            // call Api Delete here
            handleRefresh();
          },
          handleCancel: () => {},
        });
      },
    },
  ];
  const dataString: ISelect[] = [
    { label: 'Tất cả', value: undefined },
    { label: 'Âm Thanh', value: undefined },
    { label: 'Video', value: undefined },
  ];
  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'Thể loại', dataString },
    { textLabel: 'Định dạng', dataString },
  ];

  useEffect(() => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  }, [search, filter, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    if (name && status) {
      setFilterOption((pre: any) => ({ ...pre, [name]: status }));
    }
  };

  const arr = [
    {
      text: 'Kho bản ghi',
      link: '/record',
    },
    {
      text: 'Quản lý phê duyệt',
      link: '',
    },
  ];
  return (
    <div className="management-record">
      <div className="breadcrumb">
        <Breadcrumb separator=" >  ">
          {arr.map((bred, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={bred.link}>{bred.text}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="title">Phê duyệt bản ghi</div>
      <div className="main-card">
        <div className="d-flex flex-column ">
          <SearchComponent
            onSearch={handleSearch}
            placeholder="Tên bản ghi, ca sĩ,..."
            classNames="mb-0 search-table"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="filter">
            {arraySelectFilter.map(item => (
              <SelectAndLabelComponent
                onChange={onChangeSelectStatus(item.name)}
                key={item.name}
                className="margin-select"
                dataString={item.dataString}
                textLabel={item.textLabel}
              />
            ))}
          </div>
          <div>
            <UnorderedListOutlined
              style={{ color: '#fff', fontSize: '24px', marginRight: '20px' }}
            />
            <TableOutlined style={{ color: '#fff', fontSize: '24px' }} />
          </div>
        </div>
        <TableComponent
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          onRowSelect={setSelectedRowKeys}
          dataSource={dataTable}
        />
      </div>
      <RightMenu arrayAction={arrayAction} />
    </div>
  );
};

export default ApprovalManagement;
