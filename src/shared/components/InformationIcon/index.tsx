import { Tooltip } from 'antd';
import React from 'react';
interface IProps {
  onClick?: () => void;
  disable?: boolean;
}
const ListenComponent = (props: IProps) => {
  const onClick = e => {
    if (props?.onClick) {
      props?.onClick();
    }
    e.stopPropagation();
  };

  if (props?.disable) {
    return <></>;
  }
  return (
    <Tooltip>
      <div className={`icon-edit ${props?.disable ? 'icon-disable' : ''}`} onClick={onClick}>
        Nghe
      </div>
    </Tooltip>
  );
};

export default ListenComponent;
