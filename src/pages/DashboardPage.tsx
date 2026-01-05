import { useTranslation } from 'react-i18next';
import employeesData from '../data/employees.json';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { Employee } from './EmployeesPage';

export const StatCard = ({
  title,
  data,
  showTotal = false,
  total,
}: {
  title: string;
  data: { name: string; value: number; color: string }[];
  showTotal?: boolean;
  total?: number;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
    <h3 className="font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-primary pl-2 mb-4">
      {title}
    </h3>
    <div className="flex items-center gap-4 flex-1">
      <div className="w-32 h-32 relative flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#374151",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {showTotal && (
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-xs text-gray-400">Total</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {total}
            </span>
          </div>
        )}
      </div>
      {/* Legend Section */}
      <div className="flex-1 overflow-auto max-h-32 custom-scrollbar flex flex-col justify-center">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-xs mb-1 last:mb-0"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
              <span
                className="text-gray-500 dark:text-gray-400 truncate"
                title={item.name}
              >
                {item.name}
              </span>
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300 ml-2">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/*interface Employee {
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
}*/

// --- Stats Helpers ---
const getDesignationStats = (data: Employee[]) => {
    const stats: Record<string, number> = {};
    data.forEach(e => {
        stats[e.designation] = (stats[e.designation] || 0) + 1;
    });
    const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
    return sorted.map(([name, value], index) => ({
        name,
        value,
        color: ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#f97316', '#3b82f6'][index % 8]
    }));
};

const getDepartmentStats = (data: Employee[]) => {
    const stats: Record<string, number> = {};
    data.forEach(e => {
        stats[e.department] = (stats[e.department] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value], index) => ({
        name: name.toUpperCase(),
        value,
        color: ['#8b5cf6', '#10b981', '#f97316', '#3b82f6', '#ec4899'][index % 5]
    }));
};

const getStatusStats = (data: Employee[]) => {
    const stats = {
        active: 0,
        on_leave: 0,
        probation: 0
    };
    data.forEach(e => {
        if (e.status === 'active') stats.active++;
        else if (e.status === 'on_leave') stats.on_leave++;
        else if (e.status === 'probation') stats.probation++;
    });
    return [
        { name: 'Active', value: stats.active, color: '#22c55e' },
        { name: 'On Leave', value: stats.on_leave, color: '#f59e0b' },
        { name: 'Probation', value: stats.probation, color: '#8b5cf6' }
    ];
};

const DashboardPage = () => {
    const { t } = useTranslation();

    const designationData = getDesignationStats(employeesData);
    const departmentData = getDepartmentStats(employeesData);
    const statusData = getStatusStats(employeesData).map(item => ({
        ...item,
        name: item.name === 'Active' ? t('employeesPage.stats.active') :
            item.name === 'On Leave' ? t('employeesPage.stats.onLeave') :
                item.name === 'Probation' ? t('employeesPage.stats.probation') : item.name
    }));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title={t("employeesPage.stats.designation")}
                    data={designationData}
                />
                <StatCard
                    title={t("employeesPage.stats.department")}
                    data={departmentData}
                />
                <StatCard
                    title={t("employeesPage.stats.statusOverview")}
                    data={statusData}
                    showTotal
                />
            </div>
        </div>
    );
};

export default DashboardPage;
