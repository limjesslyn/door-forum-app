import React from 'react';
import PropTypes from 'prop-types';

function CategoryItem({ category, catClicked }) {
  const onCategoryClicked = () => {
    catClicked(category);
  };
  return (
    <div className="category-item">
      <button type="button" className="category-name" onClick={onCategoryClicked}>
        #
        {category}
      </button>
    </div>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  catClicked: PropTypes.func.isRequired,
};

export default CategoryItem;
