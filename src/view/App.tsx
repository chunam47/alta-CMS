import '@shared/assets/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '@styles/styles.scss';

import { ConfigProvider } from 'antd';
import React, { useEffect, useMemo, Suspense, memo } from 'react';

import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import locale from '@locale/index';
import lodash from 'lodash';
import { TokenSelector } from '@modules/authentication/profileStore';
import { LanguageSelector } from '@modules/setting/settingStore';
import Homepage from './Homepage';
import PublicPage from '../routers/component/PublicPage';
import Profile from './Auth/Profile';
import Record from './Homepage/component/Record';
import Updateinfo from './Homepage/component/Record/component/UpdateInfo';
import ApprovalManagement from './Homepage/component/Record/component/ApprovalManagement';
import Playlist from './Homepage/component/Playlist';
import AddPlaylist from './Homepage/component/Playlist/component/AddPlaylist';
import PrivatePage from '../routers/component/PrivatePage';
import Player from './Homepage/component/Player';
import DesPlayer from './Homepage/component/Player/component/DetailPlayer/DetailPlayer';
import AddPlayer from './Homepage/component/Player/component/AddPlayer/AddPlayer';
import DetailPlaylist from './Homepage/component/Playlist/component/DetailPlaylist';

const MainView = memo(({ statusLogin }: { statusLogin: boolean }) => {
  return (
    <>
      {statusLogin ? (
        <Suspense fallback={<></>}>
          <PrivatePage />
        </Suspense>
      ) : (
        <Suspense fallback={<></>}>
          <PublicPage />
        </Suspense>
      )}
    </>
  );
});

// For Test
const App: React.FC = () => {
  const { token } = useSelector(TokenSelector);
  const { language } = useSelector(LanguageSelector);
  const history = useNavigate();
  const memoLangData = useMemo(() => {
    return locale[language];
  }, [language]);
  useEffect(() => {
    if (!token) {
      history('/login');
    }
  }, [token]);

  return (
    <IntlProvider locale={language} messages={memoLangData}>
      <ConfigProvider locale={memoLangData}>
        <MainView statusLogin={!lodash.isEmpty(token)} />
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="/profile" element={<Profile />} />

            <Route path="/record" element={<Record />} />
            <Route path="/record/recordId" element={<Updateinfo />} />
            <Route path="/record/approval-management" element={<ApprovalManagement />} />

            <Route path="/playlist" element={<Playlist />} />
            <Route path="/playlist/detail-playlist" element={<DetailPlaylist />} />
            <Route path="/playlist/add-playlist" element={<AddPlaylist />} />

            <Route path="/player" element={<Player />} />
            <Route path="/player/detail-player" element={<DesPlayer />} />
            <Route path="/player/add-player" element={<AddPlayer />} />
          </Route>
        </Routes>
        {/* <Homepage /> */}
      </ConfigProvider>
    </IntlProvider>
  );
};

export default App;
