export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: string;
    designationId: string;
}

// Attendance Types
export interface Attendance {
    id: string;
    employeeId: string;
    date: string; // YYYY-MM-DD
    checkInTime?: string; // ISO string
    checkOutTime?: string; // ISO string
    workHours?: number;
    status: number; // 0: Present, 1: Absent, 2: Half Day, etc.
}

export interface AttendanceRequest {
    employeeId: string;
    checkInTime?: string;
    checkOutTime?: string;
    workMode: number; // 0: Office, 1: Remote
    location?: string;
    ipAddress?: string;
    attendanceId?: string; // For checkout or update
}

export interface Holiday {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    description?: string;
    isOptional: boolean;
}

// Leave Types
export interface LeaveType {
    id: string;
    name: string;
    code: string;
    maxDaysPerYear: number;
    isPaid: boolean;
    requiresApproval: boolean;
}

export interface LeaveBalance {
    leaveTypeId: string;
    leaveType?: LeaveType; // Optional enriched data
    availableBalance: number;
    used: number;
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    leaveTypeId: string;
    leaveType?: LeaveType; // Optional enriched data
    fromDate: string; // YYYY-MM-DD
    toDate: string; // YYYY-MM-DD
    numberOfDays: number;
    reason: string;
    reportingManagerId: string;
    status: number; // 0: Pending, 1: Approved, 2: Rejected
    approvalRemarks?: string;
    rejectionReason?: string;
}

// Payroll Types
export interface PayrollComponent {
    componentName: string;
    amount: number;
    type?: 'EARNING' | 'DEDUCTION';
}

export interface SalaryStructure {
    id: string;
    employeeId: string;
    basicSalary: number;
    hra: number;
    conveyanceAllowance: number;
    medicalAllowance: number;
    specialAllowance: number;
    pfContribution: number;
    esicContribution: number;
    professionalTax: number;
    incomeTax: number;
    grossSalary: number;
    netSalary: number;
    effectiveFrom: string;
    isActive: boolean;
}

export interface Payroll {
    id: string;
    employeeId: string;
    month: number;
    year: number;
    workingDays: number;
    presentDays: number;
    grossSalary: number;
    totalEarnings: number;
    totalDeductions: number;
    netSalary: number;
    status: number; // 0: Draft, 1: Processed, 2: Paid
    components?: PayrollComponent[];
}
