import { useState, useMemo } from 'react';
import type { TableProps } from 'antd/es/table';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Employee } from '../pages/EmployeesPage'; // Adjust import path as needed

export const useEmployeeFilters = (employeesData: Employee[]) => {
    // --- Filter State ---
    const [tableFilters, setTableFilters] = useState<Record<string, (string | number)[] | null>>({});
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // --- Filter Employees by Date Range and Search ---
    const filteredEmployees = useMemo(() => {
        let filtered = employeesData;

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(emp =>
                emp.fullNameEn.toLowerCase().includes(query) ||
                emp.fullNameAr.includes(query) ||
                emp.employeeCode.toLowerCase().includes(query) ||
                emp.email.toLowerCase().includes(query)
            );
        }

        // Filter by date range
        if (dateRange && dateRange[0] && dateRange[1]) {
            filtered = filtered.filter(emp => {
                const joiningDate = dayjs(emp.joiningDate).startOf('day');
                const startDate = dateRange[0]!.startOf('day');
                const endDate = dateRange[1]!.startOf('day');
                return (joiningDate.isSame(startDate) || joiningDate.isAfter(startDate)) &&
                    (joiningDate.isSame(endDate) || joiningDate.isBefore(endDate));
            });
        }

        // Apply table filters
        Object.keys(tableFilters).forEach(key => {
            const filterValue = tableFilters[key];
            if (filterValue && Array.isArray(filterValue) && filterValue.length > 0) {
                filtered = filtered.filter(emp => {
                    const empValue = String(emp[key as keyof Employee]);
                    return filterValue.includes(empValue);
                });
            }
        });

        return filtered;
    }, [searchQuery, dateRange, tableFilters, employeesData]);

    // --- Filter Helpers ---
    const getFilters = useMemo(() => (key: keyof Employee) => {
        const uniqueValues = Array.from(new Set(employeesData.map(e => e[key])));
        return uniqueValues.map(v => ({ text: String(v), value: String(v) }));
    }, [employeesData]);

    // --- Active Filters (derived from tableFilters only, excluding date range) ---
    const activeFilters = useMemo(() => {
        const filters: Record<string, (string | number)[]> = {};
        Object.keys(tableFilters).forEach(key => {
            const filterValue = tableFilters[key];
            if (filterValue && Array.isArray(filterValue) && filterValue.length > 0) {
                filters[key] = filterValue as (string | number)[];
            }
        });
        return filters;
    }, [tableFilters]);

    // --- Handle Filter Change ---
    const handleTableChange: TableProps<Employee>['onChange'] = (_pagination, filters) => {
        const convertedFilters: Record<string, (string | number)[] | null> = {};
        Object.keys(filters).forEach(key => {
            const filterValue = filters[key];
            if (filterValue && Array.isArray(filterValue) && filterValue.length > 0) {
                convertedFilters[key] = filterValue as (string | number)[];
            } else {
                convertedFilters[key] = null;
            }
        });
        setTableFilters(convertedFilters);
    };

    // --- Clear Single Filter ---
    const clearFilter = (columnKey: string, value?: string | number) => {
        const currentFilter = tableFilters[columnKey];

        if (value && Array.isArray(currentFilter) && currentFilter.length > 1) {
            // Remove specific value from array
            const newValues = currentFilter.filter(v => v !== value);
            setTableFilters({
                ...tableFilters,
                [columnKey]: newValues.length > 0 ? newValues : null
            });
        } else {
            // Clear entire filter
            setTableFilters({
                ...tableFilters,
                [columnKey]: null
            });
        }
    };

    // --- Handle Date Range Change (preserve other date when one is changed) ---
    const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        if (!dates) {
            setDateRange(null);
            return;
        }

        const [newStart, newEnd] = dates;
        const [currentStart, currentEnd] = dateRange || [null, null];

        // If both dates are provided, use them directly
        if (newStart && newEnd) {
            setDateRange([newStart, newEnd]);
            return;
        }

        // If only start date is provided and we have a current end date, preserve it
        if (newStart && !newEnd && currentEnd) {
            setDateRange([newStart, currentEnd]);
            return;
        }

        // If only end date is provided and we have a current start date, preserve it
        if (!newStart && newEnd && currentStart) {
            setDateRange([currentStart, newEnd]);
            return;
        }

        // Otherwise, set the partial selection (for initial selection)
        setDateRange([newStart, newEnd]);
    };

    // --- Clear All Filters ---
    const clearAllFilters = () => {
        setTableFilters({});
        setDateRange(null);
        setSearchQuery('');
    };

    return {
        tableFilters,
        dateRange,
        searchQuery,
        setSearchQuery,
        filteredEmployees,
        activeFilters,
        getFilters,
        handleTableChange,
        clearFilter,
        handleDateRangeChange,
        clearAllFilters,
    };
};
