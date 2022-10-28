import React from 'react';
import { Option } from 'antd/lib/mentions';
import { Select } from 'antd';
import '../styles.scss';

const provinceData = ['Tiếng Việt ', 'English'];
const Language = () => {
  return (
    <div className="language">
      <Select className="language__select" defaultValue={provinceData[0]}>
        {provinceData.map(province => (
          <Option key={province}>{province} </Option>
        ))}
      </Select>
    </div>
  );
};
export default Language;
