import { Search } from 'lucide-react';
import React from 'react';

type Props = {};

function SearchBar({}: Props) {
  return (
    <div>
      <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
    </div>
  );
}

export default SearchBar;
