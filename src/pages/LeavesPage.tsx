import { Search, Filter, Calendar as CalendarIcon, Download, Plus, List, Grid } from 'lucide-react';
import { Button, Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

// --- Types ---
interface LeaveRecord {
    key: string;
    name: string;
    avatar: string;
    designation: string;
    type: string;
    reason: string;
    startDate: string;
    endDate: string; // Screenshot says "Start Date" twice, assuming second is End Date
    days: number;
    status: 'Approved' | 'Pending' | 'Rejected';
}

// --- Mock Data ---
const getApprovalData = (t: any) => [
    { name: t('leavesPage.table.status.requested'), value: 258, color: '#6366f1' }, // Blue
    { name: t('leavesPage.table.status.approved'), value: 184, color: '#22c55e' }, // Green
    { name: t('leavesPage.table.status.pending'), value: 62, color: '#f59e0b' },   // Yellow
    { name: t('leavesPage.table.status.rejected'), value: 12, color: '#ef4444' },  // Red
];

const getLeaveTypeData = (t: any) => [
    { name: t('leavesPage.types.sickLeave'), value: 42, color: '#8b5cf6' },
    { name: t('leavesPage.types.maternityLeave'), value: 22, color: '#10b981' },
    { name: t('leavesPage.types.otherLeave'), value: 62, color: '#f97316' },
];

const holidays = [
    { day: '9', month: 'Aug', name: 'Raksha Bandhan', type: 'Full Day', weekday: 'Saturday' },
    { day: '15', month: 'Aug', name: 'Independence Day', type: 'Full Day', weekday: 'Friday' },
    { day: '16', month: 'Aug', name: 'Janmashtami', type: 'Full Day', weekday: 'Saturday' }, // Assuming date based on logic
];

const LeavesPage = () => {
    const { t } = useTranslation();

    // Data needing translation
    const approvalData = getApprovalData(t);
    const leaveTypeData = getLeaveTypeData(t);

    // --- Table Configuration ---
    const columns: ColumnsType<LeaveRecord> = [
        {
            title: t('leavesPage.table.employee'),
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <Avatar src={record.avatar} />
                    <span className="font-medium text-gray-700 dark:text-gray-200">{text}</span>
                </div>
            ),
        },
        { title: t('leavesPage.table.designation'), dataIndex: 'designation', key: 'designation', className: 'text-gray-500 dark:text-gray-400' },
        { title: t('leavesPage.table.type'), dataIndex: 'type', key: 'type', className: 'text-gray-600 dark:text-gray-300' },
        {
            title: t('leavesPage.table.reason'),
            dataIndex: 'reason',
            key: 'reason',
            width: 250,
            ellipsis: true,
            className: 'text-gray-500 dark:text-gray-400'
        },
        { title: t('leavesPage.table.startDate'), dataIndex: 'startDate', key: 'startDate', className: 'text-gray-600 dark:text-gray-300' },
        { title: t('leavesPage.table.endDate'), dataIndex: 'endDate', key: 'endDate', className: 'text-gray-600 dark:text-gray-300' },
        { title: t('leavesPage.table.days'), dataIndex: 'days', key: 'days', className: 'text-gray-600 dark:text-gray-300 font-medium' },
        {
            title: t('leavesPage.table.action'),
            key: 'action',
            render: (_, record) => (
                record.status === 'Pending' ? (
                    <div className="flex gap-2">
                        <button className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors">{t('leavesPage.table.approve')}</button>
                        <button className="text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-2 py-1 rounded transition-colors">✕</button>
                    </div>
                ) : (
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${record.status === 'Approved' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400'
                        }`}>
                        {record.status === 'Approved' ? t('leavesPage.table.status.approved') : t('leavesPage.table.status.rejected')}
                    </span>
                )
            ),
        },
    ];

    const data: LeaveRecord[] = [
        {
            key: '1',
            name: 'Samantha Paul',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            designation: 'Sr.UI Developer',
            type: t('leavesPage.types.sickLeave'),
            reason: 'To support my spouse and care...',
            startDate: 'July 10,2025',
            endDate: 'July 12,2025',
            days: 2,
            status: 'Pending',
        },
        {
            key: '2',
            name: 'Gray Noal',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
            designation: 'React Developer',
            type: t('leavesPage.types.casualLeave'),
            reason: 'Attending a family function out...',
            startDate: 'July 14,2025',
            endDate: 'July 30,2025',
            days: 15,
            status: 'Approved',
        },
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
                            placeholder={t('leavesPage.searchPlaceholder')}
                            className="bg-transparent border-none text-sm ml-2 w-full focus:outline-none text-gray-600 dark:text-gray-200 placeholder:text-gray-400"
                        />
                        <span className="text-xs text-gray-400">⌘/</span>
                    </div>
                    <Button icon={<Filter size={14} />} className="flex items-center text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
                        {t('leavesPage.advanceFilter')}
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Button icon={<CalendarIcon size={14} />} className="flex items-center text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
                        {t('leavesPage.thisMonth')}
                    </Button>
                    <Button icon={<Download size={14} />} className="flex items-center text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
                        {t('leavesPage.export')}
                    </Button>
                    <Button type="primary" icon={<Plus size={16} />} className="bg-primary hover:bg-purple-700 h-9">
                        {t('leavesPage.addLeaveRequest')}
                    </Button>
                </div>
            </div>

            {/* Widgets Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Widget 1: Approval Status */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-primary pl-2 mb-4">{t('leavesPage.approvalStatus')}</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-32 h-32 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={approvalData}
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={0}
                                        dataKey="value"
                                    >
                                        {approvalData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-2xl font-bold text-gray-800 dark:text-white">516</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            {approvalData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                        <span className="text-gray-500 dark:text-gray-400">{item.name}</span>
                                    </div>
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Widget 2: Leave Type */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-primary pl-2 mb-4">{t('leavesPage.leaveType')}</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-32 h-32 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[{ value: 100 }]} // Orange ring
                                        innerRadius={45}
                                        outerRadius={60}
                                        startAngle={90}
                                        endAngle={-270}
                                        fill="#f97316"
                                        strokeWidth={0}
                                    />
                                    {/* Overlay segments if needed, for now just simple mock to look like screenshot */}
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{t('leavesPage.totalTimeOff')}</span>
                                <span className="text-2xl font-bold text-gray-800 dark:text-white">126</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {leaveTypeData.map((item) => (
                                <div key={item.name} className="flex justify-between items-center text-sm">
                                    <span className="text-primary font-medium">{item.name}</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-300">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Widget 3: Upcoming Holidays */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-primary pl-2 mb-4">{t('leavesPage.upcomingHolidays')}</h3>
                    <div className="space-y-4">
                        {holidays.map((holiday, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="text-center min-w-[32px]">
                                    <div className="text-sm font-bold text-gray-800 dark:text-white">{holiday.day}</div>
                                    <div className="text-xs text-gray-400">{holiday.month}</div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-800 dark:text-gray-200">{holiday.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{holiday.weekday}</div>
                                </div>
                                <div className="text-xs text-gray-400">{holiday.type}</div>
                            </div>
                        ))}
                        <div className="pt-2 text-center">
                            <button className="text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-primary">{t('leavesPage.viewAll')}</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white border-l-4 border-primary pl-2">{t('leavesPage.employeesLeaveList')}</h3>
                    <div className="flex gap-2">
                        <Button icon={<List size={16} />} className="text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600" />
                        <Button icon={<Grid size={16} />} className="text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600" />
                        <Button type="primary" className="bg-primary hover:bg-purple-700">{t('leavesPage.approveAll')}</Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="custom-table"
                />
            </div>
        </div>
    );
};

export default LeavesPage;
