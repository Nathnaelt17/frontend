import React, { createContext, useState, useContext } from 'react';

export const TimelineSearchContext = createContext({
  search: '',
  setSearch: () => {},
  activeType: 'All',
  setActiveType: () => {}
});
export default TimelineSearchContext;
export const TimelineSearchProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');

  return (
    <TimelineSearchContext.Provider value={{ search, setSearch, activeType, setActiveType }}>
      {children}
    </TimelineSearchContext.Provider>
  );
};

export const useTimelineSearch = () => useContext(TimelineSearchContext);
