import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SideNavigation from './components/SideNavigation';
import LeaderboardsPage from './pages/LeaderboardsPage';
import AddThreadPage from './pages/AddThreadPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import Loading from './components/Loading';

function App() {
  const { authUser = null, isPreload = false } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser !== null) {
    return (
      <>
        <Loading />
        <div className="container">
          <Header />
          <SideNavigation authUser={authUser} signOut={onSignOut} />
          <main>
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
              <Route path="/add-thread" element={<AddThreadPage />} />
              <Route path="/thread/:id" element={<ThreadDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="container">
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
