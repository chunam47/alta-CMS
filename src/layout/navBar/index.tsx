import React from 'react';

import './navBar.scss';
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
import { NavLink } from 'react-router-dom';

const items = [
  {
    label: 'Kho bản ghi',
    link: 'record',
    src: iconMenu1,
  },
  {
    label: 'Playlist',
    link: 'playlist',
    src: iconMenu2,
  },
  {
    label: 'Lập lịch phát',
    link: 'player',
    src: iconMenu3,
  },
  {
    label: 'Quản lý',
    link: 'manage',
    src: iconMenu4,
  },
  {
    label: 'Doanh thu',
    link: 'turnover',
    src: iconMenu5,
  },
  {
    label: 'Cài đặt',
    link: 'setting',
    src: iconMenu6,
  },
  {
    label: 'Hỗ trợ',
    link: 'contact',
    src: iconMenu7,
  },
];

const Navbar: React.FC = () => {
  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={imgLogo} width={96} alt="" />
      </div>
      {/* <Menu className="menu" mode="inline" items={items} />; */}
      <ul
        className="ant-menu ant-menu-root ant-menu-inline ant-menu-light menu"
        role="menu"
        data-menu-list="true"
      >
        {items.map((e, index) => (
          <li key={index} className="list-menu">
            <>
              <NavLink
                to={`/${e.link}`}
                className="ant-menu-item"
                role="menuitem"
                data-menu-id="rc-menu-uuid-44079-2-record"
              >
                <img src={e.src} alt={e.label} />
                <span>{e.label}</span>
              </NavLink>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
