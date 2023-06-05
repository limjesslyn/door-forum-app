import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreadDetail from '../components/thread/detail/ThreadDetail';
import {
  asyncAddComment,
  asyncDownVoteComment,
  asyncDownVoteThread,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThread,
} from '../states/threadDetail/action';

function ThreadDetailPage() {
  const { id } = useParams();

  const { detailThread = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onUpVoteThread = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const onUpVoteComment = (threadId, commentId) => {
    dispatch(asyncUpVoteComment(threadId, commentId));
  };

  const onDownVoteComment = (threadId, commentId) => {
    dispatch(asyncDownVoteComment(threadId, commentId));
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ id, content }));
  };

  if (!detailThread) {
    return null;
  }

  return (
    <div className="thread-detail-page">
      <div className="thread-detail-page__header">
        <h2>Thread Detail</h2>
        <ThreadDetail
          {...detailThread}
          authUser={authUser.id}
          addComment={onAddComment}
          upVoteThread={onUpVoteThread}
          downVoteThread={onDownVoteThread}
          upVoteComment={onUpVoteComment}
          downVoteComment={onDownVoteComment}
        />
      </div>
    </div>
  );
}

export default ThreadDetailPage;
