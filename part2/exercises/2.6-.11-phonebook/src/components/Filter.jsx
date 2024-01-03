import React, { useState } from 'react';

const Filter = (props) => {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    const word = event.target.value;
    if (word !== '') {
      const results = props.persons.filter((person) => {
        return person.name.toLowerCase().includes(word.toLowerCase());
      });

      console.log(results, 'are the results');
      // Assuming setFilteredPersons is a state updater in the same component
      props.setFilteredPersons(results);
    } else {
      // Assuming setFilteredPersons is a state updater in the same component
      props.setFilteredPersons(props.persons);
    }

    setSearch(word);
  };

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={handleSearch}
        className="input"
        placeholder="Filter"
      />
    </div>
  );
};

export default Filter;
