import React from 'react';
import PropTypes from 'prop-types';
import ThreadCommentItem, { commentItemShape } from './ThreadCommentItem';

function ThreadCommentList({
  commentList, authUser, threadID, upVoteComment, downVoteComment,
}) {
  return (
    <div className="comment-list">
      <h2>
        Comment
        (
        {commentList.length}
        )
      </h2>
      <div className="comment-list__body">
        {commentList.map((comment) => (
          <ThreadCommentItem
            key={comment.id}
            {...comment}
            authUser={authUser}
            threadID={threadID}
            upVoteComment={upVoteComment}
            downVoteComment={downVoteComment}
          />
        ))}
      </div>
    </div>
  );
}

ThreadCommentList.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  threadID: PropTypes.string.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
};

export default ThreadCommentList;
