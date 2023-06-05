import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import {
  AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike,
} from 'react-icons/ai';
import { postedAt } from '../../../utils/postedAt';

function ThreadCommentItem({
  id,
  owner,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  authUser,
  threadID,
  upVoteComment,
  downVoteComment,
}) {
  const isCommentUpVoted = upVotesBy.includes(authUser);
  const isCommentDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVoteComment(threadID, id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVoteComment(threadID, id);
  };

  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <div className="comment-item__header-avatar">
          <div className="comment-item__profile">
            <img src={owner.avatar} alt={id} title={owner.name} />
            <p className="comment-owner_text">{owner.name}</p>
          </div>
        </div>
        <p>{postedAt(createdAt)}</p>
      </div>
      <div className="comment-item__body">
        {parser(content)}
      </div>
      <div className="comment-item__footer">
        <div className="thread-item__icon-content">
          <button type="button" onClick={onUpVoteClick}>
            {isCommentUpVoted ? <AiFillLike /> : <AiOutlineLike />}
          </button>
          <span>{upVotesBy.length}</span>
        </div>
        <div className="thread-item__icon-content">
          <button type="button" onClick={onDownVoteClick}>
            {isCommentDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}
          </button>
          <span>{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};

ThreadCommentItem.propTypes = {
  ...commentItemShape,
  authUser: PropTypes.string.isRequired,
  threadID: PropTypes.string.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
};

export { commentItemShape };

export default ThreadCommentItem;
