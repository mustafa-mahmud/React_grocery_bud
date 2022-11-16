import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [value, setValue] = useState('');
  const [grocery, setGrocery] = useState(
    localStorage.getItem('bud') ? JSON.parse(localStorage.getItem('bud')) : []
  );
  const [edit, setEdit] = useState({ bool: false, id: '' });
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const alertFunc = (show = false, msg = '', type = 'danger') => {
    setAlert({ show, msg, type });
  };

  const removeItem = (id) => {
    const newGrocery = grocery.filter((item) => item.id !== id);

    localStorage.setItem('bud', JSON.stringify(newGrocery));
    setGrocery(newGrocery);
    alertFunc(true, 'Grocery removed successfully', 'danger');
  };

  const editItem = (id) => {
    const editValue = grocery.find((item) => item.id === id);
    setValue(editValue.bud);
    setEdit({ bool: true, id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) alertFunc(true, 'Pls fill the input');
    else if (value && edit.bool) {
      const { id } = edit;

      const editedGrocery = JSON.parse(localStorage.getItem('bud')).map(
        (item) => {
          if (item.id === id) item.bud = value;
          return item;
        }
      );

      localStorage.setItem('bud', JSON.stringify(editedGrocery));
      setGrocery(editedGrocery);

      setValue('');
      alertFunc(true, 'Grocery changed successfully', 'success');
      setEdit({ bool: false, id: '' });
    } else {
      const newGrocery = {
        bud: value,
        id: Date.now(),
      };

      localStorage.setItem('bud', JSON.stringify([...grocery, newGrocery]));

      setGrocery([...grocery, newGrocery]);
      setValue('');
      alertFunc(true, 'Grocery addedd successfully', 'success');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => alertFunc(), 3000);

    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g eggs"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="grocery"
          />
          <button className="submit-btn" type="submit">
            {edit.bool ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {grocery.length > 0 && (
        <div className="grocery-container">
          <List grocery={grocery} removeItem={removeItem} editItem={editItem} />
          <button
            className="clear-btn"
            type="button"
            onClick={() => {
              localStorage.setItem('bud', JSON.stringify([]));
              setGrocery([]);
              alertFunc(true, 'clear all items', 'danger');
            }}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
