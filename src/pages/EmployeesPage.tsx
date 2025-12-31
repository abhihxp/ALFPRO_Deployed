import { Search, Download, Plus, List, Grid, MoreVertical } from 'lucide-react';
import { Button, Table, Avatar, Tag, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

// --- Types ---
interface Employee {
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

// --- Data ---
const employeesData: Employee[] = [
    {
        "id": "emp-001",
        "fullNameEn": "Mohammed Ali",
        "fullNameAr": "محمد علي",
        "employeeCode": "EMP-001",
        "nationality": "AE",
        "dateOfBirth": "1990-05-15",
        "maritalStatus": "married",
        "gender": "male",
        "email": "mohammed.ali@alftek.ae",
        "phone": "+971501234567",
        "emiratesId": "784-1990-1234567-1",
        "emiratesIdExpiry": "2026-03-20",
        "passportNumber": "A12345678",
        "passportExpiry": "2028-06-10",
        "visaFileNumber": "VF-112233",
        "visaExpiry": "2025-09-15",
        "visaType": "employment",
        "joiningDate": "2023-01-10",
        "department": "it",
        "designation": "Senior Software Engineer",
        "location": "Dubai",
        "reportingTo": "emp-010",
        "basicSalary": 15000,
        "housingAllowance": 5000,
        "transportAllowance": 1500,
        "otherAllowances": 500,
        "bankName": "emirates_nbd",
        "iban": "AE070331234567890123456",
        "wpsAgentId": "WPS-1234",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-002",
        "fullNameEn": "Fatima Hassan",
        "fullNameAr": "فاطمة حسن",
        "employeeCode": "EMP-002",
        "nationality": "AE",
        "dateOfBirth": "1995-08-22",
        "maritalStatus": "single",
        "gender": "female",
        "email": "fatima.hassan@alftek.ae",
        "phone": "+971509876543",
        "emiratesId": "784-1995-2345678-2",
        "emiratesIdExpiry": "2027-01-15",
        "passportNumber": "B87654321",
        "passportExpiry": "2029-02-20",
        "visaFileNumber": "VF-223344",
        "visaExpiry": "2025-02-10",
        "visaType": "employment",
        "joiningDate": "2023-03-15",
        "department": "hr",
        "designation": "HR Manager",
        "location": "Dubai",
        "reportingTo": null,
        "basicSalary": 12000,
        "housingAllowance": 4000,
        "transportAllowance": 1200,
        "otherAllowances": 300,
        "bankName": "adcb",
        "iban": "AE070441234567890123456",
        "wpsAgentId": "WPS-1235",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-003",
        "fullNameEn": "Rajesh Kumar",
        "fullNameAr": "راجيش كومار",
        "employeeCode": "EMP-003",
        "nationality": "IN",
        "dateOfBirth": "1988-11-30",
        "maritalStatus": "married",
        "gender": "male",
        "email": "rajesh.kumar@alftek.ae",
        "phone": "+971503334455",
        "emiratesId": "784-1988-3456789-3",
        "emiratesIdExpiry": "2025-01-10",
        "passportNumber": "C11223344",
        "passportExpiry": "2027-12-05",
        "visaFileNumber": "VF-334455",
        "visaExpiry": "2024-12-20",
        "visaType": "employment",
        "joiningDate": "2022-06-01",
        "department": "finance",
        "designation": "Finance Analyst",
        "location": "Dubai",
        "reportingTo": "emp-011",
        "basicSalary": 10000,
        "housingAllowance": 3500,
        "transportAllowance": 1000,
        "otherAllowances": 200,
        "bankName": "mashreq",
        "iban": "AE070551234567890123456",
        "wpsAgentId": "WPS-1236",
        "status": "on_leave",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-004",
        "fullNameEn": "Sarah Johnson",
        "fullNameAr": "سارة جونسون",
        "employeeCode": "EMP-004",
        "nationality": "US",
        "dateOfBirth": "1992-03-18",
        "maritalStatus": "single",
        "gender": "female",
        "email": "sarah.johnson@alftek.ae",
        "phone": "+971504445566",
        "emiratesId": "784-1992-4567890-4",
        "emiratesIdExpiry": "2029-06-30",
        "passportNumber": "D99887766",
        "passportExpiry": "2030-04-15",
        "visaFileNumber": "VF-445566",
        "visaExpiry": "2026-11-25",
        "visaType": "golden",
        "joiningDate": "2023-09-20",
        "department": "marketing",
        "designation": "Marketing Director",
        "location": "Dubai",
        "reportingTo": null,
        "basicSalary": 18000,
        "housingAllowance": 6000,
        "transportAllowance": 2000,
        "otherAllowances": 1000,
        "bankName": "emirates_nbd",
        "iban": "AE070661234567890123456",
        "wpsAgentId": "WPS-1237",
        "status": "probation",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-005",
        "fullNameEn": "Ahmad Khalil",
        "fullNameAr": "أحمد خليل",
        "employeeCode": "EMP-005",
        "nationality": "AE",
        "dateOfBirth": "1993-07-12",
        "maritalStatus": "married",
        "gender": "male",
        "email": "ahmad.khalil@alftek.ae",
        "phone": "+971505556677",
        "emiratesId": "784-1993-5678901-5",
        "emiratesIdExpiry": "2027-09-10",
        "passportNumber": "E12312312",
        "passportExpiry": "2028-11-20",
        "visaFileNumber": "VF-556677",
        "visaExpiry": "2026-05-30",
        "visaType": "employment",
        "joiningDate": "2022-08-15",
        "department": "operations",
        "designation": "Operations Manager",
        "location": "Abu Dhabi",
        "reportingTo": null,
        "basicSalary": 14000,
        "housingAllowance": 4500,
        "transportAllowance": 1500,
        "otherAllowances": 500,
        "bankName": "adcb",
        "iban": "AE070771234567890123456",
        "wpsAgentId": "WPS-1238",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-006",
        "fullNameEn": "Priya Sharma",
        "fullNameAr": "بريا شارما",
        "employeeCode": "EMP-006",
        "nationality": "IN",
        "dateOfBirth": "1994-02-28",
        "maritalStatus": "single",
        "gender": "female",
        "email": "priya.sharma@alftek.ae",
        "phone": "+971506667788",
        "emiratesId": "784-1994-6789012-6",
        "emiratesIdExpiry": "2026-12-25",
        "passportNumber": "F23423423",
        "passportExpiry": "2027-08-15",
        "visaFileNumber": "VF-667788",
        "visaExpiry": "2025-07-20",
        "visaType": "employment",
        "joiningDate": "2023-02-20",
        "department": "it",
        "designation": "UI/UX Designer",
        "location": "Dubai",
        "reportingTo": "emp-010",
        "basicSalary": 11000,
        "housingAllowance": 3800,
        "transportAllowance": 1100,
        "otherAllowances": 300,
        "bankName": "mashreq",
        "iban": "AE070881234567890123456",
        "wpsAgentId": "WPS-1239",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-007",
        "fullNameEn": "Omar Abdullah",
        "fullNameAr": "عمر عبدالله",
        "employeeCode": "EMP-007",
        "nationality": "AE",
        "dateOfBirth": "1991-09-05",
        "maritalStatus": "married",
        "gender": "male",
        "email": "omar.abdullah@alftek.ae",
        "phone": "+971507778899",
        "emiratesId": "784-1991-7890123-7",
        "emiratesIdExpiry": "2028-03-15",
        "passportNumber": "G34534534",
        "passportExpiry": "2029-06-25",
        "visaFileNumber": "VF-778899",
        "visaExpiry": "2026-08-10",
        "visaType": "employment",
        "joiningDate": "2021-11-10",
        "department": "sales",
        "designation": "Sales Executive",
        "location": "Abu Dhabi",
        "reportingTo": "emp-012",
        "basicSalary": 9000,
        "housingAllowance": 3200,
        "transportAllowance": 1000,
        "otherAllowances": 200,
        "bankName": "emirates_nbd",
        "iban": "AE070991234567890123456",
        "wpsAgentId": "WPS-1240",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-008",
        "fullNameEn": "Jennifer Lee",
        "fullNameAr": "جينيفر لي",
        "employeeCode": "EMP-008",
        "nationality": "CA",
        "dateOfBirth": "1989-12-15",
        "maritalStatus": "married",
        "gender": "female",
        "email": "jennifer.lee@alftek.ae",
        "phone": "+971508889900",
        "emiratesId": "784-1989-8901234-8",
        "emiratesIdExpiry": "2026-07-20",
        "passportNumber": "H45645645",
        "passportExpiry": "2028-09-30",
        "visaFileNumber": "VF-889900",
        "visaExpiry": "2025-04-15",
        "visaType": "employment",
        "joiningDate": "2022-04-05",
        "department": "hr",
        "designation": "HR Specialist",
        "location": "Dubai",
        "reportingTo": "emp-002",
        "basicSalary": 10500,
        "housingAllowance": 3600,
        "transportAllowance": 1100,
        "otherAllowances": 250,
        "bankName": "adcb",
        "iban": "AE071001234567890123456",
        "wpsAgentId": "WPS-1241",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-009",
        "fullNameEn": "Khalid Mansoor",
        "fullNameAr": "خالد منصور",
        "employeeCode": "EMP-009",
        "nationality": "AE",
        "dateOfBirth": "1987-04-20",
        "maritalStatus": "married",
        "gender": "male",
        "email": "khalid.mansoor@alftek.ae",
        "phone": "+971509990011",
        "emiratesId": "784-1987-9012345-9",
        "emiratesIdExpiry": "2029-01-10",
        "passportNumber": "I56756756",
        "passportExpiry": "2030-03-15",
        "visaFileNumber": "VF-990011",
        "visaExpiry": "2027-02-28",
        "visaType": "employment",
        "joiningDate": "2021-07-20",
        "department": "marketing",
        "designation": "Content Strategist",
        "location": "Dubai",
        "reportingTo": "emp-004",
        "basicSalary": 12500,
        "housingAllowance": 4200,
        "transportAllowance": 1300,
        "otherAllowances": 400,
        "bankName": "mashreq",
        "iban": "AE071101234567890123456",
        "wpsAgentId": "WPS-1242",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-010",
        "fullNameEn": "David Chen",
        "fullNameAr": "ديفيد تشين",
        "employeeCode": "EMP-010",
        "nationality": "SG",
        "dateOfBirth": "1985-06-08",
        "maritalStatus": "married",
        "gender": "male",
        "email": "david.chen@alftek.ae",
        "phone": "+971500112233",
        "emiratesId": "784-1985-0123456-0",
        "emiratesIdExpiry": "2028-11-05",
        "passportNumber": "J67867867",
        "passportExpiry": "2029-12-20",
        "visaFileNumber": "VF-001122",
        "visaExpiry": "2026-10-15",
        "visaType": "employment",
        "joiningDate": "2020-03-10",
        "department": "it",
        "designation": "IT Director",
        "location": "Dubai",
        "reportingTo": null,
        "basicSalary": 22000,
        "housingAllowance": 8000,
        "transportAllowance": 2500,
        "otherAllowances": 1500,
        "bankName": "emirates_nbd",
        "iban": "AE071201234567890123456",
        "wpsAgentId": "WPS-1243",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-011",
        "fullNameEn": "Aisha Al Mansoori",
        "fullNameAr": "عائشة المنصوري",
        "employeeCode": "EMP-011",
        "nationality": "AE",
        "dateOfBirth": "1990-11-22",
        "maritalStatus": "married",
        "gender": "female",
        "email": "aisha.almansoori@alftek.ae",
        "phone": "+971501223344",
        "emiratesId": "784-1990-1234567-1",
        "emiratesIdExpiry": "2027-06-15",
        "passportNumber": "K78978978",
        "passportExpiry": "2028-08-25",
        "visaFileNumber": "VF-112233",
        "visaExpiry": "2026-04-30",
        "visaType": "employment",
        "joiningDate": "2021-01-15",
        "department": "finance",
        "designation": "Finance Director",
        "location": "Dubai",
        "reportingTo": null,
        "basicSalary": 20000,
        "housingAllowance": 7000,
        "transportAllowance": 2200,
        "otherAllowances": 1200,
        "bankName": "adcb",
        "iban": "AE071301234567890123456",
        "wpsAgentId": "WPS-1244",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-012",
        "fullNameEn": "Hassan Youssef",
        "fullNameAr": "حسن يوسف",
        "employeeCode": "EMP-012",
        "nationality": "AE",
        "dateOfBirth": "1988-08-30",
        "maritalStatus": "married",
        "gender": "male",
        "email": "hassan.youssef@alftek.ae",
        "phone": "+971502334455",
        "emiratesId": "784-1988-2345678-2",
        "emiratesIdExpiry": "2028-02-10",
        "passportNumber": "L89089089",
        "passportExpiry": "2029-05-15",
        "visaFileNumber": "VF-223344",
        "visaExpiry": "2026-12-20",
        "visaType": "employment",
        "joiningDate": "2020-09-01",
        "department": "sales",
        "designation": "Sales Manager",
        "location": "Abu Dhabi",
        "reportingTo": null,
        "basicSalary": 16000,
        "housingAllowance": 5500,
        "transportAllowance": 1800,
        "otherAllowances": 700,
        "bankName": "mashreq",
        "iban": "AE071401234567890123456",
        "wpsAgentId": "WPS-1245",
        "status": "active",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-013",
        "fullNameEn": "Maria Garcia",
        "fullNameAr": "ماريا غارسيا",
        "employeeCode": "EMP-013",
        "nationality": "ES",
        "dateOfBirth": "1993-03-14",
        "maritalStatus": "single",
        "gender": "female",
        "email": "maria.garcia@alftek.ae",
        "phone": "+971503445566",
        "emiratesId": "784-1993-3456789-3",
        "emiratesIdExpiry": "2026-05-20",
        "passportNumber": "M90190190",
        "passportExpiry": "2027-10-10",
        "visaFileNumber": "VF-334455",
        "visaExpiry": "2025-01-15",
        "visaType": "employment",
        "joiningDate": "2023-06-12",
        "department": "operations",
        "designation": "Operations Coordinator",
        "location": "Abu Dhabi",
        "reportingTo": "emp-005",
        "basicSalary": 9500,
        "housingAllowance": 3300,
        "transportAllowance": 1050,
        "otherAllowances": 220,
        "bankName": "emirates_nbd",
        "iban": "AE071501234567890123456",
        "wpsAgentId": "WPS-1246",
        "status": "probation",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-014",
        "fullNameEn": "Yusuf Ahmed",
        "fullNameAr": "يوسف أحمد",
        "employeeCode": "EMP-014",
        "nationality": "AE",
        "dateOfBirth": "1995-01-18",
        "maritalStatus": "single",
        "gender": "male",
        "email": "yusuf.ahmed@alftek.ae",
        "phone": "+971504556677",
        "emiratesId": "784-1995-4567890-4",
        "emiratesIdExpiry": "2027-08-30",
        "passportNumber": "N01201201",
        "passportExpiry": "2028-12-05",
        "visaFileNumber": "VF-445566",
        "visaExpiry": "2026-06-25",
        "visaType": "employment",
        "joiningDate": "2023-10-01",
        "department": "it",
        "designation": "Junior Developer",
        "location": "Dubai",
        "reportingTo": "emp-010",
        "basicSalary": 8500,
        "housingAllowance": 3000,
        "transportAllowance": 950,
        "otherAllowances": 180,
        "bankName": "adcb",
        "iban": "AE071601234567890123456",
        "wpsAgentId": "WPS-1247",
        "status": "probation",
        "tenantId": "tenant-1"
    },
    {
        "id": "emp-015",
        "fullNameEn": "Noura Salem",
        "fullNameAr": "نورة سالم",
        "employeeCode": "EMP-015",
        "nationality": "AE",
        "dateOfBirth": "1992-10-25",
        "maritalStatus": "married",
        "gender": "female",
        "email": "noura.salem@alftek.ae",
        "phone": "+971505667788",
        "emiratesId": "784-1992-5678901-5",
        "emiratesIdExpiry": "2028-04-12",
        "passportNumber": "O12312312",
        "passportExpiry": "2029-07-18",
        "visaFileNumber": "VF-556677",
        "visaExpiry": "2026-09-05",
        "visaType": "employment",
        "joiningDate": "2022-02-15",
        "department": "finance",
        "designation": "Accountant",
        "location": "Dubai",
        "reportingTo": "emp-011",
        "basicSalary": 10000,
        "housingAllowance": 3500,
        "transportAllowance": 1000,
        "otherAllowances": 250,
        "bankName": "mashreq",
        "iban": "AE071701234567890123456",
        "wpsAgentId": "WPS-1248",
        "status": "active",
        "tenantId": "tenant-1"
    }
];

// --- Stats Helpers ---
const getDesignationStats = (data: Employee[]) => {
    const stats: Record<string, number> = {};
    data.forEach(e => {
        stats[e.designation] = (stats[e.designation] || 0) + 1;
    });
    // Pick top 4 and aggregate others if needed, but for now just show all
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


const EmployeesPage = () => {
    const { t, i18n } = useTranslation();

    // --- Stats Data ---
    const designationData = getDesignationStats(employeesData);
    const departmentData = getDepartmentStats(employeesData);
    const statusData = getStatusStats(employeesData).map(item => ({
        ...item,
        name: item.name === 'Active' ? t('employeesPage.stats.active') :
            item.name === 'On Leave' ? t('employeesPage.stats.onLeave') :
                item.name === 'Probation' ? t('employeesPage.stats.probation') : item.name
    }));
    const totalEmployees = employeesData.length;

    // --- Filter Helpers ---
    const getFilters = (key: keyof Employee) => {
        const uniqueValues = Array.from(new Set(employeesData.map(e => e[key])));
        return uniqueValues.map(v => ({ text: String(v), value: String(v) }));
    };

    // --- Table Configuration ---
    const columns: ColumnsType<Employee> = [
        {
            title: t('employeesPage.table.employee'),
            dataIndex: i18n.language === 'ar' ? 'fullNameAr' : 'fullNameEn',
            key: 'fullName',
            fixed: 'left',
            width: 250,
            render: (text, record) => (
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
            onFilter: (value, record) => record.location === value
        },
        { title: t('employeesPage.table.joiningDate'), dataIndex: 'joiningDate', key: 'joiningDate', width: 120, className: 'text-gray-600 dark:text-gray-300' },
        {
            title: t('employeesPage.table.department'),
            dataIndex: 'department',
            key: 'department',
            width: 120,
            render: (text) => <span className="capitalize">{text}</span>,
            className: 'text-gray-600 dark:text-gray-300',
            filters: getFilters('department'),
            onFilter: (value, record) => record.department === value
        },
        {
            title: t('employeesPage.table.designation'),
            dataIndex: 'designation',
            key: 'designation',
            width: 180,
            className: 'text-gray-600 dark:text-gray-300',
            filters: getFilters('designation'),
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
            onFilter: (value, record) => record.visaType === value
        },
        {
            title: t('employeesPage.table.action'),
            key: 'action',
            fixed: 'right',
            width: 80,
            render: () => (
                <Dropdown menu={{
                    items: [
                        { key: '1', label: t('employeesPage.table.viewProfile') },
                        { key: '2', label: t('employeesPage.table.editDetails') },
                        { key: '3', label: t('employeesPage.table.delete'), danger: true },
                    ]
                }}>
                    <Button type="text" icon={<MoreVertical size={16} />} className="text-gray-400 hover:text-primary" />
                </Dropdown>
            ),
        }
    ];

    const StatCard = ({ title, data, showTotal = false }: { title: string, data: { name: string, value: number, color: string }[], showTotal?: boolean }) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-primary pl-2 mb-4">{title}</h3>
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
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    {showTotal && (
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-xs text-gray-400">{t('employeesPage.stats.total')}</span>
                            <span className="text-xl font-bold text-gray-800 dark:text-white">{totalEmployees}</span>
                        </div>
                    )}
                </div>
                {/* Legend Section */}
                <div className="flex-1 overflow-auto max-h-32 custom-scrollbar flex flex-col justify-center">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-xs mb-1 last:mb-0">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                                <span className="text-gray-500 dark:text-gray-400 truncate" title={item.name}>{item.name}</span>
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 ml-2">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="bg-white dark:bg-gray-800 flex items-center px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700 flex-1 md:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('employeesPage.searchPlaceholder')}
                            className="bg-transparent border-none text-sm ml-2 w-full focus:outline-none text-gray-600 dark:text-gray-200 placeholder:text-gray-400"
                        />
                        <span className="text-xs text-gray-400">⌘/</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button icon={<Download size={14} />} className="flex items-center text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
                        {t('employeesPage.export')}
                    </Button>
                    <Button
                        type="primary"
                        icon={<Plus size={16} />}
                        className="bg-primary hover:bg-purple-700 h-9"
                        onClick={() => window.location.href = '/employees/new'} // Using window location for simplicity as useNavigate is inside child
                    >
                        {t('employeesPage.addEmployee')}
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title={t('employeesPage.stats.designation')} data={designationData} />
                <StatCard title={t('employeesPage.stats.department')} data={departmentData} />
                <StatCard title={t('employeesPage.stats.statusOverview')} data={statusData} showTotal />
            </div>

            {/* Table Section - Ensure max-w-full to prevent horizontal scroll on body */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden w-full">
                <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white border-l-4 border-primary pl-2">{t('employeesPage.allEmployees')}</h3>
                    <div className="flex gap-2">
                        <Button icon={<List size={16} />} className="text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600" />
                        <Button icon={<Grid size={16} />} className="text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
                <div className="h-[600px]"> {/* Fixed height for sticky header effectiveness */}
                    <Table
                        columns={columns}
                        dataSource={employeesData}
                        rowKey="id"
                        pagination={{ pageSize: 15 }}
                        size="middle"
                        scroll={{ x: 1300, y: 500 }} // Increased x width slightly to ensure scrolling happens inside
                        sticky
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeesPage;
