import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardsItem, { leaderboardsShape } from './LeaderboardsItem';
import { authUserShape } from '../SideNavigation';

function LeaderboardsList({ list, authUser }) {
  return (
    <div className="leaderboards-list">
      <div className="leaderboards-list__header">
        <p>Name</p>
        <p>Score</p>
      </div>
      {list.map((li) => (
        <LeaderboardsItem {...li} key={li.user.id} authUser={authUser} />
      ))}
    </div>
  );
}

LeaderboardsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(leaderboardsShape)).isRequired,
  authUser: PropTypes.shape(authUserShape).isRequired,
};

export default LeaderboardsList;
