import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadCommentInput({ addComment }) {
  const [content, setContent] = useState('');

  function handleContentInput({ target }) {
    setContent(target.innerHTML);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const container = document.getElementById('comment-content');
    container.innerHTML = '';
  }

  return (
    <div className="thread-comment">
      <form className="comment-input" onSubmit={handleSubmit}>
        <div
          contentEditable
          id="comment-content"
          className="comment-input__body"
          data-placeholder="write comment here ..."
          data-testid="commentEditTest"
          value={content}
          onInput={handleContentInput}
        />
        <button type="submit" onClick={() => addComment({ content })}>
          Send
        </button>
      </form>
    </div>
  );
}

ThreadCommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default ThreadCommentInput;
