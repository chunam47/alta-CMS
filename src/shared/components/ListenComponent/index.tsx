import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Player } from 'video-react';
interface IProps {
  onClick?: () => void;
  disable?: boolean;
}
const ListenComponent = (props: IProps) => {
  // const onClick = e => {
  //   if (props?.onClick) {
  //     props?.onClick();
  //   }
  //   e.stopPropagation();
  // };

  // if (props?.disable) {
  //   return <></>;
  // }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`icon-edit ${props?.disable ? 'icon-disable' : ''}`} onClick={showModal}>
        Nghe
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <video width="100%" controls>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
        </video>
      </Modal>
    </>
  );
};

export default ListenComponent;
