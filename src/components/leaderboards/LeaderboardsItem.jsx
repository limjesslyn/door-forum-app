import React from 'react';
import PropTypes from 'prop-types';
import { authUserShape } from '../SideNavigation';

function LeaderboardsItem({ score, user, authUser }) {
  return (
    <div className="leaderboards-item">
      <div className="leaderboards-item__profile">
        <img src={user.avatar} alt={user.id} title={user.name} />
        {user.id === authUser.id ? (
          <p className="leaderboards-profile__me">
            {user.name}
            {' '}
            (You)
          </p>
        )
          : <p>{user.name}</p>}
      </div>
      <p className="score-text">{score}</p>
    </div>
  );
}

const leaderboardsShape = {
  score: PropTypes.number.isRequired,
  user: PropTypes.shape(authUserShape).isRequired,
};

LeaderboardsItem.propTypes = {
  ...leaderboardsShape,
  authUser: PropTypes.shape(authUserShape).isRequired,
};

export { leaderboardsShape };

export default LeaderboardsItem;
