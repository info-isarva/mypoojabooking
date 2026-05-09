'use client';

import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [activeDeity, setActiveDeity] = useState(null);
  const [templeSearchQuery, setTempleSearchQuery] = useState('');
  const [bhajanSearchQuery, setBhajanSearchQuery] = useState('');

  const toggleDeity = (deity) => {
    setActiveDeity(prev => prev === deity ? null : deity);
  };

  return (
    <FilterContext.Provider value={{ 
      activeDeity, 
      setActiveDeity, 
      toggleDeity,
      templeSearchQuery,
      setTempleSearchQuery,
      bhajanSearchQuery,
      setBhajanSearchQuery,
      // Legacy support if needed
      searchQuery: templeSearchQuery, 
      setSearchQuery: setTempleSearchQuery
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
