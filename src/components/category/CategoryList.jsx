import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import { threadItemShape } from '../thread/general/ThreadItem';

function CategoryList({ threads, catClicked }) {
  const uni = [];
  threads.map((thread) => uni.push(thread.category));

  const filteredCategory = uni.filter((item, pos) => uni.indexOf(item) === pos);

  return (
    <div className="category-list">
      <p className="category-list__header">Popular Discussion</p>
      <div className="category-list__container">
        {filteredCategory.map((category, index) => (
          <CategoryItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            category={category}
            catClicked={catClicked}
          />
        ))}
      </div>
    </div>
  );
}

CategoryList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  catClicked: PropTypes.func.isRequired,
};

export default CategoryList;
