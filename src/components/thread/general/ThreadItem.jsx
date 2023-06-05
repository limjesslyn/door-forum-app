import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

import {
  AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { postedAt } from '../../../utils/postedAt';

function ThreadItem({
  id,
  category,
  createdAt,
  title,
  body,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUser,
  upVote,
  downVote,
}) {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  return (
    <div className="thread-item">
      <div className="thread-item__header">
        <p className="thread-item__header-category">
          #
          {category}
        </p>
        <p>{postedAt(createdAt)}</p>
      </div>
      <div className="thread-item__content">
        <Link to={`/thread/${id}`}>
          <p className="thread-item__content-title">{title}</p>
        </Link>
        <div className="thread-item__content-body">{parser(body)}</div>
      </div>
      <div className="thread-item__footer">
        <div className="thread-item__profile">
          <img src={user.avatar} alt={id} title={user.name} />
          <p>{user.name}</p>
        </div>
        <div className="thread-item__icon">
          <div className="thread-item__icon-content">
            <button type="button" onClick={onUpVoteClick}>
              {isThreadUpVoted ? <AiFillLike /> : <AiOutlineLike />}
            </button>
            <span>{upVotesBy.length}</span>
          </div>
          <div className="thread-item__icon-content">
            <button type="button" onClick={onDownVoteClick}>
              {isThreadDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>
            <span>{downVotesBy.length}</span>
          </div>
          <p>
            comments
            (
            {totalComments}
            )
          </p>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export { threadItemShape };

export default ThreadItem;
