import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadCommentInput({ addComment }) {
  const [content, setContent] = useState('');

  function createComment() {
    if (content === '') {
      alert('Please fill the comment field');
    } else {
      addComment(content.trim());
      setContent('');
    }
  }

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
          value={content}
          onInput={handleContentInput}
        />
        <button type="submit" onClick={createComment}>
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
