import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadList from '../components/thread/general/ThreadList';
import AddButton from '../components/thread/add/AddButton';
import asyncFillThreadsList from '../states/shared/action';
import { asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';
import CategoryList from '../components/category/CategoryList';

function HomePage() {
  const { threads = [], users = [], authUser } = useSelector((states) => states);

  const dispatch = useDispatch();

  const [category, setCategory] = useState('');

  const onUpVote = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const onCategoryClicked = (text) => {
    setCategory(text);
    if (category === text) {
      setCategory('');
    }
  };

  useEffect(() => {
    dispatch(asyncFillThreadsList());
  }, [dispatch]);

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const filteredThreads = threadsList.filter((thread) => {
    if (thread.category.includes(category)) {
      return thread;
    }
    return null;
  });

  if (filteredThreads.length === 0 || threadsList.length === 0) {
    return null;
  }

  return (
    <div className="home-page">
      <div className="home-content">
        <h2>Threads</h2>
        <CategoryList threads={threadsList} catClicked={onCategoryClicked} />
        <ThreadList threads={filteredThreads} upVote={onUpVote} downVote={onDownVote} />
        <Link to="/add-thread">
          <AddButton />
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
