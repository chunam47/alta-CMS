import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  onClick?: () => void;
  disable?: boolean;
}
const EditComponent = (props: IProps) => {
  if (props?.disable) {
    return <></>;
  }
  return (
    <Link to="/record/recordId" className={`icon-edit ${props?.disable ? 'icon-disable' : ''}`}>
      Cập nhật
    </Link>
  );
};

export default EditComponent;
