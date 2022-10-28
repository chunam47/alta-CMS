import React from 'react';

import './navBar.scss';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {
  iconMenu1,
  iconMenu2,
  iconMenu3,
  iconMenu4,
  iconMenu5,
  iconMenu6,
  iconMenu7,
  imgLogo,
} from '../../shared/assets/images';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: ':',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Kho bản ghi', 'sub1', <img src={iconMenu1} alt="" />),

  getItem('Playlist', 'sub2', <img src={iconMenu2} alt="" />),

  getItem('Lập lịch phát', 'sub3', <img src={iconMenu3} alt="" />),

  getItem('Quản lý', 'sub4', <img src={iconMenu3} alt="" />),
  getItem('Quản lý', 'sub5', <img src={iconMenu4} alt="" />),
  getItem('Doanh thu', 'sub6', <img src={iconMenu5} alt="" />),
  getItem('Cài đặt', 'sub7', <img src={iconMenu6} alt="" />),
  getItem('Hỗ trợ', 'sub8', <img src={iconMenu7} alt="" />),
];

const Navbar: React.FC = () => {
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
  };

  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={imgLogo} width={96} alt="" />
      </div>
      <Menu className="menu" onClick={onClick} mode="inline" items={items} />;
    </div>
  );
};

export default Navbar;
