import { React, useState } from 'react';
import { Search } from 'react-bootstrap-icons';

function AdminSearchBarProduct({ setFilter }) {
  const [input, setInput] = useState('');

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFilter('search', input);
  }
  return (
    <div className="pt-4 mb-4">
      <input
        className="search__input ps-2"
        type="text"
        placeholder="Busca tu hamburguesa"
        value={input}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(e);
        }}
      />

      <button
        className="search__btn"
        name="search"
        type="submit"
        onClick={handleSubmit}
      >
        <Search />
      </button>
    </div>
  );
}

export default AdminSearchBarProduct;
