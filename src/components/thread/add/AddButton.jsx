import React from 'react';
import { BiCommentAdd } from 'react-icons/bi';

function AddButton() {
  return (
    <div className="add-button">
      <button type="button">
        <BiCommentAdd />
      </button>
    </div>
  );
}

export default AddButton;
