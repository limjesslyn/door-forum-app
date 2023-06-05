import React from 'react';
import PropTypes from 'prop-types';
import {
  MdHomeFilled,
  MdLeaderboard,
  MdOutlineLogout,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

function SideNavigation({ authUser, signOut }) {
  const {
    id,
    name,
    email,
    avatar,
  } = authUser;

  return (
    <div className="side-navigation">
      <div className="profile">
        <img src={avatar} title={name} alt={id} />
        <div className="profile-content">
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </div>
      <ul className="menu">
        <Link to="/">
          <li>
            <span className="menu-icon">
              <MdHomeFilled />
            </span>
            Home
          </li>
        </Link>
        <Link to="/leaderboards">
          <li>
            <span className="menu-icon">
              <MdLeaderboard />
            </span>
            Leaderboards
          </li>
        </Link>
        <button type="button" className="logout-btn" onClick={signOut}>
          <span className="menu-icon">
            <MdOutlineLogout />
          </span>
          Logout
        </button>
      </ul>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

SideNavigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export { authUserShape };

export default SideNavigation;
