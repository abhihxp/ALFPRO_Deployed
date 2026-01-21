import { Search, Download, Plus, List, Grid, MoreVertical, X } from 'lucide-react';
import { Button, Table, Avatar, Tag, Dropdown, DatePicker, Modal, Tabs } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useActiveFilters, type ActiveFiltersState } from '../hooks/useActiveFilters';
import ActiveFilters from '../components/ActiveFilters';
import employeesDataRaw from '../data/employees.json';
const employeesData: Employee[] = employeesDataRaw as Employee[];

// --- Types ---
export interface Employee {
  id: string;
  fullNameEn: string;
  fullNameAr: string;
  employeeCode: string;
  nationality: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  email: string;
  phone: string;
  emiratesId: string;
  emiratesIdExpiry: string;
  passportNumber: string;
  passportExpiry: string;
  visaFileNumber: string;
  visaExpiry: string;
  visaType: string;
  joiningDate: string;
  department: string;
  designation: string;
  location: string;
  reportingTo: string | null;
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowances: number;
  bankName: string;
  iban: string;
  wpsAgentId: string;
  status: string;
  tenantId: string;
}

const EmployeesPage = () => {
  const { t, i18n } = useTranslation();
  const { activeFilters, updateActiveFilters, clearFilter, clearAllFilters, getGroupedActiveFilters } = useActiveFilters();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // --- Filter Helpers ---
  const getFilters = (key: keyof Employee) => {
    const uniqueValues = Array.from(new Set(employeesData.map(e => e[key])));
    return uniqueValues.map(v => ({ text: String(v), value: String(v) }));
  };

  // --- Handle Table Filter Changes ---
  const handleTableChange: TableProps<Employee>['onChange'] = (_pagination, filters) => {
    const newActiveFilters: ActiveFiltersState = { ...activeFilters };
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key].length > 0) {
        newActiveFilters[key] = filters[key] as string[];
      } else {
        delete newActiveFilters[key];
      }
    });
    updateActiveFilters(newActiveFilters);
  };

  // --- Filter Data Based on Active Filters ---
  const filteredData = employeesData.filter(employee => {
    // Check active filters
    const activeFilterMatch = Object.entries(activeFilters).every(([key, values]) => {
      if (!values || values.length === 0) return true;
      return values.includes(employee[key as keyof Employee] as string);
    });

    // Check date range filter
    let dateRangeMatch = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const joiningDate = dayjs(employee.joiningDate);
      dateRangeMatch = joiningDate.isAfter(dateRange[0].subtract(1, 'day')) && joiningDate.isBefore(dateRange[1].add(1, 'day'));
    }

    return activeFilterMatch && dateRangeMatch;
  });

  // --- Handle View Profile ---
  const handleViewProfile = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };



  // --- Table Configuration ---
  const columns: ColumnsType<Employee> = [
    {
      title: t('employeesPage.table.employee'),
      dataIndex: i18n.language === 'ar' ? 'fullNameAr' : 'fullNameEn',
      key: 'fullName',
      fixed: 'left',
      width: 250,
      render: (text: string, record: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-primary flex-shrink-0">{text.charAt(0)}</Avatar>
          <div>
            <div className="font-medium text-gray-700">{text}</div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: t('employeesPage.table.location'),
      dataIndex: 'location',
      key: 'location',
      width: 120,
      className: 'text-gray-600 dark:text-gray-300',
      filters: getFilters('location'),
      filteredValue: activeFilters.location || [],
      onFilter: (value, record) => record.location === value
    },
    { title: t('employeesPage.table.joiningDate'), dataIndex: 'joiningDate', key: 'joiningDate', width: 120, className: 'text-gray-600 dark:text-gray-300' },
    {
      title: t('employeesPage.table.department'),
      dataIndex: 'department',
      key: 'department',
      width: 120,
      render: (text: string) => <span className="capitalize">{text}</span>,
      className: 'text-gray-600 dark:text-gray-300',
      filters: getFilters('department'),
      filteredValue: activeFilters.department || [],
      onFilter: (value, record) => record.department === value
    },
    {
      title: t('employeesPage.table.designation'),
      dataIndex: 'designation',
      key: 'designation',
      width: 180,
      className: 'text-gray-600 dark:text-gray-300',
      filters: getFilters('designation'),
      filteredValue: activeFilters.designation || [],
      onFilter: (value, record) => record.designation === value
    },
    {
      title: t('employeesPage.table.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: t('employeesPage.stats.active'), value: 'active' },
        { text: t('employeesPage.stats.onLeave'), value: 'on_leave' },
        { text: t('employeesPage.stats.probation'), value: 'probation' }
      ],
      filteredValue: activeFilters.status || [],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = 'green';
        let label = t('employeesPage.stats.active');
        switch (status) {
          case 'active': color = 'success'; label = t('employeesPage.stats.active'); break;
          case 'on_leave': color = 'warning'; label = t('employeesPage.stats.onLeave'); break;
          case 'probation': color = 'processing'; label = t('employeesPage.stats.probation'); break;
          default: color = 'default'; label = status;
        }
        return <Tag color={color}>{label}</Tag>;
      }
    },
    {
      title: t('employeesPage.table.visaStatus'),
      dataIndex: 'visaType',
      key: 'visaType',
      width: 120,
      render: (text) => <span className="capitalize text-gray-600 dark:text-gray-300">{text}</span>,
      filters: getFilters('visaType'),
      filteredValue: activeFilters.visaType || [],
      onFilter: (value, record) => record.visaType === value
    },
    {
      title: t('employeesPage.table.action'),
      key: 'action',
      fixed: 'right',
      width: 80,
      render: (record: Employee) => (
        <Dropdown menu={{
          items: [
            { key: '1', label: t('employeesPage.table.viewProfile'), onClick: () => handleViewProfile(record) },
            { key: '2', label: t('employeesPage.table.editDetails') },
            { key: '3', label: t('employeesPage.table.delete'), danger: true },
          ]
        }}>
          <Button type="text" icon={<MoreVertical size={16} />} className="text-gray-400 hover:text-primary" />
        </Dropdown>
      ),
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="bg-white dark:bg-gray-800 flex items-center px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700 flex-1 md:w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("employeesPage.searchPlaceholder")}
              className="bg-transparent border-none text-sm ml-2 w-full focus:outline-none text-gray-600 dark:text-gray-200 placeholder:text-gray-400"
            />
            <span className="text-xs text-gray-400">⌘/</span>
          </div>
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates || [null, null])}
            placeholder={["Joined After", "Joined Before"]}
            className="md:w-128 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            icon={<Download size={14} />}
            className="flex items-center text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
          >
            {t("employeesPage.export")}
          </Button>
          {/* <Button
              type="primary"
              icon={<Plus size={16} />}
              className="bg-primary hover:bg-purple-700 h-9"
              onClick={() => (window.location.href = "/employees/new")} // Using window location for simplicity as useNavigate is inside child
            >
              {t("employeesPage.addEmployee")}
            </Button> */}
          <Button
            type="primary"
            icon={<Plus size={16} />}
            className="bg-primary hover:bg-purple-700 h-9"
            onClick={() => (window.location.href = "/employees/new2")} // Route to new form
          >
            Add Employee 2
          </Button>
        </div>
      </div>

      {/* Table Section - Ensure max-w-full to prevent horizontal scroll on body */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden w-full">
        <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white border-l-4 border-primary pl-2">
            {t("employeesPage.allEmployees")}
          </h3>
          <div className="flex gap-2">
            <Button
              icon={<List size={16} />}
              className="text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
            />
            <Button
              icon={<Grid size={16} />}
              className="text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Active Filters */}
        {Object.keys(getGroupedActiveFilters()).length > 0 && (
          <div className="p-4">
            <ActiveFilters
              activeFilters={getGroupedActiveFilters()}
              onClearFilter={clearFilter}
              onClearAll={clearAllFilters}
            />
          </div>
        )}

        <div className="h-[600px]">
          {" "}
          {/* Fixed height for sticky header effectiveness */}
          <Table
            key={JSON.stringify(activeFilters)}
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 15 }}
            size="middle"
            scroll={{ x: 1300, y: 500 }} // Increased x width slightly to ensure scrolling happens inside
            sticky
            onChange={handleTableChange}
          />
        </div>
      </div>

      {/* Employee Details Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered={true}
        width={1000}
        closable={false}
        maskClosable={true}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        destroyOnClose={true}
      >
        {selectedEmployee && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-600 p-6 text-white relative">
              <Button
                type="text"
                icon={<X size={20} />}
                onClick={handleModalClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              />
              <div className="flex items-center gap-4">
                <Avatar
                  size={80}
                  className="bg-white text-primary text-2xl font-bold"
                >
                  {selectedEmployee.fullNameEn.charAt(0)}
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">
                    {i18n.language === "ar"
                      ? selectedEmployee.fullNameAr
                      : selectedEmployee.fullNameEn}
                  </h1>
                  <p className="text-purple-100">
                    {selectedEmployee.designation}
                  </p>
                  <p className="text-purple-100">
                    {selectedEmployee.department}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Tabs */}
            <div className="p-6">
              <Tabs
                defaultActiveKey="1"
                type="line"
                className="employee-details-tabs"
                tabPlacement={"end"}
                items={[
                  {
                    key: "1",
                    label: "Personal Information",
                    children: (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Employee Code
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.employeeCode}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Nationality
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.nationality}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Date of Birth
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.dateOfBirth}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Marital Status
                          </label>
                          <p className="text-gray-800 dark:text-white capitalize">
                            {selectedEmployee.maritalStatus}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Gender
                          </label>
                          <p className="text-gray-800 dark:text-white capitalize">
                            {selectedEmployee.gender}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "2",
                    label: "Contact Information",
                    children: (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Email
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.email}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Phone
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.phone}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Location
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.location}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "3",
                    label: "Employment Information",
                    children: (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Joining Date
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.joiningDate}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Department
                          </label>
                          <p className="text-gray-800 dark:text-white capitalize">
                            {selectedEmployee.department}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Designation
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.designation}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Reporting To
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.reportingTo || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Status
                          </label>
                          <Tag
                            color={
                              selectedEmployee.status === "active"
                                ? "success"
                                : selectedEmployee.status === "on_leave"
                                  ? "warning"
                                  : "processing"
                            }
                          >
                            {selectedEmployee.status === "active"
                              ? t("employeesPage.stats.active")
                              : selectedEmployee.status === "on_leave"
                                ? t("employeesPage.stats.onLeave")
                                : t("employeesPage.stats.probation")}
                          </Tag>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "4",
                    label: "Documents",
                    children: (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Emirates ID
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.emiratesId}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Expires: {selectedEmployee.emiratesIdExpiry}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Passport
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.passportNumber}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Expires: {selectedEmployee.passportExpiry}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Visa
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.visaType}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            File #: {selectedEmployee.visaFileNumber} |
                            Expires: {selectedEmployee.visaExpiry}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "5",
                    label: "Salary Information",
                    children: (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Basic Salary
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            AED{" "}
                            {selectedEmployee.basicSalary.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Housing Allowance
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            AED{" "}
                            {selectedEmployee.housingAllowance.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Transport Allowance
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            AED{" "}
                            {selectedEmployee.transportAllowance.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Other Allowances
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            AED{" "}
                            {selectedEmployee.otherAllowances.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "6",
                    label: "Banking Information",
                    children: (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Bank Name
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.bankName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            IBAN
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.iban}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            WPS Agent ID
                          </label>
                          <p className="text-gray-800 dark:text-white">
                            {selectedEmployee.wpsAgentId}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmployeesPage;
