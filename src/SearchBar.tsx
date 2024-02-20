import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Perform search as user types
  };

  return (
    <div className="d-flex">
      <input
        type="search"
        className="form-control me-2"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange} // Use handleChange to dynamically search
      />
      {/* Removed the button since search happens on type */}
    </div>
  );
};
