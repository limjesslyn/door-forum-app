import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ThreadInput from '../components/thread/add/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, category, body }) => {
    if (title === '' || body === '') {
      alert('Please fill the title and content field');
    } else {
      dispatch(asyncAddThread({ title, body, category }));
      navigate('/');
    }
  };

  return (
    <div className="add-thread-page">
      <h2>Add New Thread</h2>
      <ThreadInput addThread={onAddThread} />
    </div>
  );
}

export default AddThreadPage;
