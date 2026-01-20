import type {
    Attendance,
    AttendanceRequest,
    Holiday,
    LeaveRequest,
    LeaveBalance,
    Payroll,
    SalaryStructure
} from '../types';

// const API_BASE_URL = '/api'; // Adjust base URL as needed, or use env variable

// Mock function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for API calls
const apiCall = async <T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> => {
    // In a real app, we would use fetch or axios here
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(body)
    // });
    // if (!response.ok) throw new Error('API call failed');
    // return response.json();

    console.log(`[Mock API] ${method} ${endpoint}`, body);
    await delay(500);
    return {} as T; // Return mock/empty data for now since backend might not be ready
};

export const AttendanceService = {
    checkIn: (data: AttendanceRequest) =>
        apiCall<Attendance>('/attendance/checkin', 'POST', data),

    checkOut: (data: AttendanceRequest) =>
        apiCall<Attendance>('/attendance/checkout', 'POST', data),

    getAttendanceById: (id: string) =>
        apiCall<Attendance>(`/attendance/${id}`, 'GET'),

    getAttendanceByEmployee: (employeeId: string) =>
        apiCall<Attendance[]>(`/attendance/employee/${employeeId}`, 'GET'),

    getTodayAttendance: (employeeId: string) =>
        apiCall<Attendance>(`/attendance/today/${employeeId}`, 'GET'),

    getHolidays: () =>
        apiCall<Holiday[]>('/holiday', 'GET'),

    createHoliday: (data: Partial<Holiday>) =>
        apiCall<Holiday>('/holiday', 'POST', data),
};

export const LeaveService = {
    applyLeave: (data: Partial<LeaveRequest>) =>
        apiCall<LeaveRequest>('/leaverequest', 'POST', data),

    getLeaveRequests: (employeeId: string) =>
        apiCall<LeaveRequest[]>(`/leaverequest/employee/${employeeId}`, 'GET'),

    approveLeave: (requestId: string, approverId: string, remarks: string) =>
        apiCall<LeaveRequest>('/leaverequest/approve', 'POST', { leaveRequestId: requestId, approverId, remarks }),

    rejectLeave: (requestId: string, approverId: string, reason: string) =>
        apiCall<LeaveRequest>('/leaverequest/reject', 'POST', { leaveRequestId: requestId, approverId, reason }),

    getLeaveBalances: (employeeId: string) =>
        apiCall<{ employeeId: string, balances: LeaveBalance[] }>(`/leavebalance/employee/${employeeId}`, 'GET'),

    createLeaveType: (data: any) =>
        apiCall<any>('/leavetype', 'POST', data),
};

export const PayrollService = {
    createSalaryStructure: (data: Partial<SalaryStructure>) =>
        apiCall<SalaryStructure>('/salary', 'POST', data),

    generatePayroll: (data: { employeeId: string, month: number, year: number, workingDays: number, presentDays: number }) =>
        apiCall<Payroll>('/payroll/generate', 'POST', data),

    getPayrollById: (id: string) =>
        apiCall<Payroll>(`/payroll/${id}`, 'GET'),

    getPayrollByEmployee: (employeeId: string) =>
        apiCall<Payroll[]>(`/payroll/employee/${employeeId}`, 'GET'),

    getPayrollByPeriod: (month: number, year: number) =>
        apiCall<Payroll[]>(`/payroll/period/${month}/${year}`, 'GET'),
};
