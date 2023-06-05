import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardsList from '../components/leaderboards/LeaderboardsList';
import { asyncFillLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const { leaderboardList = [], authUser } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFillLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboards-page">
      <div className="leaderboards-content">
        <h2>Leaderboards</h2>
        <LeaderboardsList list={leaderboardList} authUser={authUser} />
      </div>
    </div>
  );
}

export default LeaderboardsPage;
