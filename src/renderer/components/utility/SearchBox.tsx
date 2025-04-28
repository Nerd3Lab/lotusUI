import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const [search, setSearch] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onChange(e);
  };

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <div className="flex gap-2 items-center border border-gray-300 rounded-xl p-2 text-gray-500 bg-white">
      <label htmlFor="search">
        <Icon icon="bx:bx-search" className="text-xl" />
      </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search"
        className="border-none outline-none placeholder-gray-300 text-gray-800 flex-1 bg-transparent"
      />
    </div>
  );
};

export default SearchBox;
