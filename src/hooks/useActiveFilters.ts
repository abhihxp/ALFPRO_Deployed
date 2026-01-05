import { useState, useCallback } from 'react';

export interface ActiveFilter {
  columnKey: string;
  filterValue: string;
}

export interface ActiveFiltersState {
  [columnKey: string]: string[];
}

export const useActiveFilters = () => {
  const [activeFilters, setActiveFilters] = useState<ActiveFiltersState>({});

  const updateActiveFilters = useCallback((filters: ActiveFiltersState) => {
    setActiveFilters(filters);
  }, []);

  const clearFilter = useCallback((columnKey: string, filterValue?: string | number) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (filterValue !== undefined) {
        // Clear specific filter value
        if (newFilters[columnKey]) {
          newFilters[columnKey] = newFilters[columnKey].filter(value => value !== filterValue);
          if (newFilters[columnKey].length === 0) {
            delete newFilters[columnKey];
          }
        }
      } else {
        // Clear all filters for the column
        delete newFilters[columnKey];
      }
      return newFilters;
    });
  }, []);

  const clearColumnFilters = useCallback((columnKey: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[columnKey];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
  }, []);

  const getActiveFiltersList = useCallback((): ActiveFilter[] => {
    const filters: ActiveFilter[] = [];
    Object.entries(activeFilters).forEach(([columnKey, values]) => {
      values.forEach(value => {
        filters.push({ columnKey, filterValue: value });
      });
    });
    return filters;
  }, [activeFilters]);

  const getGroupedActiveFilters = useCallback((): { [columnKey: string]: string[] } => {
    return activeFilters;
  }, [activeFilters]);

  return {
    activeFilters,
    updateActiveFilters,
    clearFilter,
    clearColumnFilters,
    clearAllFilters,
    getActiveFiltersList,
    getGroupedActiveFilters,
  };
};
