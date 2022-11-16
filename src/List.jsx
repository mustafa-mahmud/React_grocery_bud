import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ grocery, removeItem, editItem }) => {
  return (
    <div className="grocery">
      {grocery.map((item) => {
        const { id, bud } = item;

        return (
          <article className="grocery-item" key={id}>
            <p className="title">{bud}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => removeItem(id)}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
