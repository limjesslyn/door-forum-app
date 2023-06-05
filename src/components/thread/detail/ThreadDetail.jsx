/* eslint-disable react/prop-types */
import React from 'react';
import parser from 'html-react-parser';
import {
  AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike,
} from 'react-icons/ai';
import ThreadCommentInput from './ThreadCommentInput';
import ThreadCommentList from './ThreadCommentList';
import { postedAt } from '../../../utils/postedAt';

function ThreadDetail({
  id,
  title,
  body,
  category,
  comments,
  createdAt,
  downVotesBy,
  upVotesBy,
  owner,
  authUser,
  addComment,
  upVoteThread,
  downVoteThread,
  upVoteComment,
  downVoteComment,
}) {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onUpVoteThreadClick = (event) => {
    event.stopPropagation();
    upVoteThread(id);
  };

  const onDownVoteThreadClick = (event) => {
    event.stopPropagation();
    downVoteThread(id);
  };

  return (
    <div className="thread-detail">
      <div className="thread-detail__header">
        <p className="thread-detail__category">
          #
          {category}
        </p>
      </div>
      <div className="thread-detail__content">
        <p className="thread-detail__title">{title}</p>
        <div className="thread-detail__body">{parser(body)}</div>
      </div>
      <div className="thread-detail__icon">
        <div className="thread-detail__icon-left">
          <div className="thread-detail__icon-content">
            <button type="button" onClick={onUpVoteThreadClick}>
              {isThreadUpVoted ? <AiFillLike /> : <AiOutlineLike />}
            </button>
            <span>{upVotesBy.length}</span>
          </div>
          <div className="thread-detail__icon-content">
            <button type="button" onClick={onDownVoteThreadClick}>
              {isThreadDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>
            <span>{downVotesBy.length}</span>
          </div>
        </div>
        <div className="thread-detail__icon-right">
          <div className="thread-detail__icon-right__content">
            by
            <img src={owner.avatar} alt={id} title={owner.name} />
            <span className="thread-owner_text">{owner.name}</span>
          </div>
          <p>{postedAt(createdAt)}</p>
        </div>
      </div>
      <div>
        <ThreadCommentInput addComment={addComment} />
        <ThreadCommentList
          commentList={comments}
          authUser={authUser}
          threadID={id}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
        />
      </div>
    </div>
  );
}

export default ThreadDetail;
