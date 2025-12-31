import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ActiveFiltersProps {
  activeFilters: Record<string, (string | number)[]>;
  onClearFilter: (columnKey: string, value?: string | number) => void;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  activeFilters,
  onClearFilter,
  onClearAll,
}) => {
  const { t, i18n } = useTranslation();

  const filterColumnMap: Record<string, string> = {
    location: t('employeesPage.table.location'),
    department: t('employeesPage.table.department'),
    designation: t('employeesPage.table.designation'),
    status: t('employeesPage.table.status'),
    visaType: t('employeesPage.table.visaStatus'),
  };

  const getFilterLabel = (columnKey: string, value: string): string => {
    if (columnKey === 'status') {
      switch (value) {
        case 'active':
          return t('employeesPage.stats.active');
        case 'on_leave':
          return t('employeesPage.stats.onLeave');
        case 'probation':
          return t('employeesPage.stats.probation');
        default:
          return value;
      }
    }
    return value;
  };

  const filterEntries = Object.entries(activeFilters);
  if (filterEntries.length === 0) return null;

  return (
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium mr-1">Active Filters:</span>
        {filterEntries.map(([columnKey, values]) => (
          <div
            key={columnKey}
            className="flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300"
          >
            <span className="font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{filterColumnMap[columnKey]}:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {values.map((value) => (
                <div
                  key={`${columnKey}-${value}`}
                  className="flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                >
                  <span>{getFilterLabel(columnKey, String(value))}</span>
                  <button
                    onClick={() => onClearFilter(columnKey, value)}
                    className="ml-0.5 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors flex-shrink-0"
                    aria-label={`Remove ${filterColumnMap[columnKey]} filter: ${value}`}
                  >
                    <X size={12} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
            {values.length > 1 && (
              <button
                onClick={() => onClearFilter(columnKey)}
                className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors flex-shrink-0"
                aria-label={`Clear all ${filterColumnMap[columnKey]} filters`}
              >
                <X size={12} className="text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={onClearAll}
          className={`px-3 py-1.5 text-sm text-white ant-btn-primary ant-btn-color-primary ant-btn-variant-solid bg-primary hover:bg-purple-700 h-9 rounded-lg ${i18n.dir() === 'rtl' ? 'mr-auto' : 'ml-auto'}`}
        >
          {t('employeesPage.clearAll')}
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;
