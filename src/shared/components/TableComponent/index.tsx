/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { PaginationEntity } from '@core/pagination/entity';
import { OptionEntity } from '@core/table';
import { CheckPermissionFunc } from '@hoc/CheckPermission';
import { useSingleAsync } from '@hook/useAsync';

import Pagination from './Component/Pagination';
import { IBEColumnsType, IBEPaginationTable, InitOption, InitPagination } from './interface';

interface IState {
  pagination: PaginationEntity;
  option: OptionEntity;
  selection: Array<any>;
  rowKey?: any;
}

const getDataWithCurrentState = (state: any, setState: (state: any) => any, repository: any) => {
  const { option, pagination } = state;
  setState((prev: any) => ({ ...prev, option }));
  if (repository) {
    return repository.execute(pagination, option).then((res: any) => {
      setState((prev: any) => {
        return {
          ...prev,
          pagination: {
            ...pagination,
            ...res?.info,
          },
        };
      });
      return Promise.resolve(res);
    });
  } else {
    setState((prev: any) => ({ ...prev, pagination }));
    return Promise.resolve(undefined);
  }
};

// eslint-disable-next-line no-unused-vars
function toColumns<T = any>(columns: IBEColumnsType<T> | undefined, listPermissionCode?: string[]) {
  const col = columns?.filter((item: any) => {
    const permissionCode = item?.permissionCode || null;
    if (permissionCode) {
      return CheckPermissionFunc(permissionCode, listPermissionCode);
    }
    return true;
  });

  // translate title
  const columnTranslate: any = col?.map((item: any) => {
    const key = item?.title;
    // ưu tiên nếu dev truyền vào title trước nha
    const title = key;
    return { ...item, title };
  });

  return columnTranslate;
}

const TableComponent: React.FC<IBEPaginationTable> = <T extends object>(
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  props: IBEPaginationTable<T>,
) => {
  const { apiServices, defaultOption, getDataAfter, disableFirstCallApi = false } = props;

  const repository = useSingleAsync(apiServices);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: any = React.useMemo(() => {
    if (props.onRowSelect || props.onRowSelectDetail) {
      return {
        selectedRowKeys,
        onChange: (pSelectedRowKeys: React.Key[]) => {
          setSelectedRowKeys(pSelectedRowKeys);
        },
      };
    }
  }, [props, selectedRowKeys]);

  const [state, setState] = useState<IState>({
    pagination: { ...InitPagination, ...props.pagination },
    option: { ...defaultOption, ...InitOption },
    selection: [],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const fetchData = useCallback(
    pState => {
      if (apiServices) {
        getDataWithCurrentState(pState, setState, repository).then((rs: any) => {
          if (rs != null && getDataAfter != null) {
            getDataAfter(rs);
          }
        });
      }
    },
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    [apiServices, repository, getDataAfter],
  );

  useEffect(() => {
    if (!disableFirstCallApi && apiServices) {
      fetchData({
        pagination: { ...InitPagination },
        option: { ...defaultOption, ...InitOption },
      });
    }
  }, [disableFirstCallApi, apiServices, defaultOption, fetchData]);

  const handleChangePage = (newPagination: PaginationEntity, _filter?: any, _sorter?: any) => {
    const option = state.option;
    if (option) {
      option.sorter = _sorter;
    }
    let newCurrent = newPagination.current;
    if (newPagination.pageSize !== state.pagination.pageSize) {
      newCurrent = 1;
    }

    fetchData({
      pagination: { ...state.pagination, ...newPagination, current: newCurrent },
      option,
    });
    setState(prev => ({ ...prev, selection: [] }));
  };

  return (
    <div className={`card-main-table ${props?.className}`}>
      <Table<T>
        {...props}
        rowSelection={rowSelection}
        className="main-table"
        locale={{ emptyText: <div>Vui lòng chọn bản ghi để thêm vào Playlist *</div> }}
      />
      {props.pagination !== false && (
        <Pagination pagination={state.pagination} onChange={handleChangePage} />
      )}
    </div>
  );
};

export default React.memo(TableComponent);
