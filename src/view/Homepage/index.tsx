import React from 'react';
import { Row, Col } from 'antd';
import Navbar from '../../layout/navBar';
import { Route, Routes } from 'react-router-dom';
import Record from './component/Record';
import HeaderComponent from '@layout/Header';
import Playlist from './component/Playlist';
import ApprovalManagement from './component/Record/component/ApprovalManagement';
import './Homepage.scss';
import AddPlaylist from './component/Playlist/component/AddPlaylist';
import Updateinfo from './component/Record/component/UpdateInfo';
import Profile from '../Auth/Profile';
import Player from './component/Player';

const Homepage = () => {
  return (
    <>
      <Row>
        <Col flex="170px">
          <Navbar />
        </Col>
        <Col flex="auto">
          <div>
            <div className="all-page-component">
              <div className="w-100 d-flex flex-row-reverse">
                <HeaderComponent />
              </div>
            </div>
            <div>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/record" element={<Record />} />
                <Route path="/record/recordId" element={<Updateinfo />} />
                <Route path="/record/approval-management" element={<ApprovalManagement />} />
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/playlist/add-playlist" element={<AddPlaylist />} />
                <Route path="/playlist/player" element={<Player />} />
              </Routes>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
