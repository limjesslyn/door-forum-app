import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useState('');

  function handleBodyInput({ target }) {
    setBody(target.innerHTML);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="thread-input" onSubmit={handleSubmit}>
      <input type="text" placeholder="title" value={title} onChange={setTitle} />
      <input type="text" placeholder="category" value={category} onChange={setCategory} />
      <div
        contentEditable
        className="thread-input__body"
        data-placeholder="write here ..."
        data-testid="contentEditTest"
        value={body}
        onInput={handleBodyInput}
      />
      <button type="submit" onClick={() => addThread({ title, category, body })}>
        Create
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
