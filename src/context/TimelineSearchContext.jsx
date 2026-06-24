// src/context/TimelineSearchContext.jsx
import React, { createContext, useContext, useState } from 'react';

const TimelineSearchContext = createContext();

export const TimelineSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({});
  };

  return (
    <TimelineSearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        clearAllFilters,
      }}
    >
      {children}
    </TimelineSearchContext.Provider>
  );
};

export const useTimelineSearch = () => {
  const ctx = useContext(TimelineSearchContext);
  if (!ctx) {
    throw new Error('useTimelineSearch must be used within TimelineSearchProvider');
  }
  return ctx;
};