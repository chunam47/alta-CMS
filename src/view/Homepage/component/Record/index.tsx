import './Record.scss';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';

import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';

import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import { UnorderedListOutlined, TableOutlined } from '@ant-design/icons';

import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';

import ListenComponent from '@shared/components/ListenComponent';
import { iconMenuRight1 } from '../../../../shared/assets/images';
import EditComponent from '../../../../shared/components/EditComponent';
import { Link } from 'react-router-dom';
// import ApprovalManagementComponent from '../../../../shared/components/ApprovalManagementComponent';

const dataTable = require('./data.json');

const Record = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  const idChooses = 'id';
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
      dataIndex: 'ISRC',
      title: 'Mã ISRC',
    },
    {
      dataIndex: 'time',
      title: 'Thời lượng',
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
      dataIndex: 'category',
      title: 'Thể loại',
    },
    {
      dataIndex: 'format',
      title: 'Định dạng',
    },
    {
      dataIndex: 'usedTime',
      title: 'Thời gian sử dụng',
      render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode="blue" />,
    },
    {
      render: () => (
        <>
          <EditComponent />
        </>
      ),
    },
    {
      render: () => (
        <>
          <ListenComponent />
        </>
      ),
    },
  ];

  const arrayAction: IArrayAction[] = [
    {
      imgIcon: iconMenuRight1,
      name: 'Quản lý phê duyệt',
      title: 'Quản lý phê duyệt',
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
    { textLabel: 'Thời gian sử dụng', dataString },
    { textLabel: 'Trạng thái', dataString },
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
  return (
    <>
      <div className="record">
        <h1 className="title">Kho bản ghi</h1>
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
              {arraySelectFilter.map((item, index) => (
                <SelectAndLabelComponent
                  onChange={onChangeSelectStatus(item.name)}
                  key={index}
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
            dataSource={dataTable}
          />
          {/* <GridComponent register={table} columns={columns} dataSource={dataTable} /> */}
        </div>
      </div>
      <Link to="/record/approval-management">
        <RightMenu arrayAction={arrayAction} />
      </Link>
      {/* <ModalComponents /> */}
    </>
  );
};

export default Record;
