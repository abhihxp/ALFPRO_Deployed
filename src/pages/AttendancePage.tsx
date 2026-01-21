/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Card, Button, Table, Tag, message, Row, Col, Statistic } from 'antd';
import { Clock, Calendar as CalendarIcon, LogIn, LogOut } from 'lucide-react';
import { AttendanceService } from '../services/apiService';
import type { Attendance } from '../types';
import dayjs from 'dayjs';

const AttendancePage = () => {
    const [loading, setLoading] = useState(false);
    const [attendanceHistory, setAttendanceHistory] = useState<Attendance[]>([]);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [currentAttendanceId, setCurrentAttendanceId] = useState<string | null>(null);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);

    // Mock Employee ID - in real app, get from auth context
    const EMPLOYEE_ID = 'mock-employee-id';

    useEffect(() => {
        fetchAttendanceHistory();
        checkTodayStatus();
    }, []);

    const fetchAttendanceHistory = async () => {
        setLoading(true);
        try {
            const data = await AttendanceService.getAttendanceByEmployee(EMPLOYEE_ID);
            // Mock data if service returns empty (since we have a mock service)
            const mockData = data && data.length > 0 ? data : [
                { id: '1', employeeId: EMPLOYEE_ID, date: '2026-01-18', checkInTime: '2026-01-18T09:00:00Z', checkOutTime: '2026-01-18T18:00:00Z', workHours: 9, status: 0 },
                { id: '2', employeeId: EMPLOYEE_ID, date: '2026-01-19', checkInTime: '2026-01-19T09:15:00Z', checkOutTime: '2026-01-19T18:30:00Z', workHours: 9.25, status: 0 },
            ];
            setAttendanceHistory(mockData);
        } catch (error) {
            message.error('Failed to fetch attendance history');
        } finally {
            setLoading(false);
        }
    };

    const checkTodayStatus = async () => {
        try {
            // In a real app, we'd check if there's an active session for today
            // For now, we'll just leave it as default (not checked in) or simulate based on logic
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckIn = async () => {
        setLoading(true);
        try {
            const now = new Date().toISOString();
            const response = await AttendanceService.checkIn({
                employeeId: EMPLOYEE_ID,
                checkInTime: now,
                workMode: 1, // Defaulting to Office for now
                location: 'Bangalore Office',
                ipAddress: '192.168.1.10'
            });
            message.success('Checked in successfully!');
            setIsCheckedIn(true);
            setCheckInTime(now);
            setCurrentAttendanceId(response.id || 'mock-id');
            fetchAttendanceHistory(); // Refresh list
        } catch (error) {
            message.error('Check-in failed');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckOut = async () => {
        setLoading(true);
        try {
            const now = new Date().toISOString();
            await AttendanceService.checkOut({
                attendanceId: currentAttendanceId || 'mock-id',
                checkOutTime: now,
                employeeId: EMPLOYEE_ID,
                workMode: 1
            });
            message.success('Checked out successfully!');
            setIsCheckedIn(false);
            setCheckInTime(null);
            setCurrentAttendanceId(null);
            fetchAttendanceHistory(); // Refresh list
        } catch (error) {
            message.error('Check-out failed');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => dayjs(text).format('DD MMM YYYY'),
        },
        {
            title: 'Check In',
            dataIndex: 'checkInTime',
            key: 'checkInTime',
            render: (text: string) => text ? dayjs(text).format('HH:mm:ss') : '-',
        },
        {
            title: 'Check Out',
            dataIndex: 'checkOutTime',
            key: 'checkOutTime',
            render: (text: string) => text ? dayjs(text).format('HH:mm:ss') : '-',
        },
        {
            title: 'Work Hours',
            dataIndex: 'workHours',
            key: 'workHours',
            render: (hours: number) => hours ? `${hours.toFixed(2)} hrs` : '-',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => {
                const statusMap: { [key: number]: { text: string, color: string } } = {
                    0: { text: 'Present', color: 'green' },
                    1: { text: 'Absent', color: 'red' },
                    2: { text: 'Half Day', color: 'orange' }
                };
                const s = statusMap[status] || { text: 'Unknown', color: 'default' };
                return <Tag color={s.color}>{s.text}</Tag>;
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Attendance</h1>
                <div className="text-sm text-gray-500">
                    {dayjs().format('dddd, DD MMMM YYYY')}
                </div>
            </div>

            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Card className="h-full shadow-sm border-gray-100 dark:border-gray-700 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900">
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                            <div className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-md">
                                <Clock className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {isCheckedIn ? 'You are Checked In' : 'You are Checked Out'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {isCheckedIn
                                        ? `Since ${dayjs(checkInTime).format('HH:mm')}`
                                        : 'Time to start your day!'}
                                </p>
                            </div>

                            {!isCheckedIn ? (
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<LogIn className="w-4 h-4" />}
                                    onClick={handleCheckIn}
                                    loading={loading}
                                    className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-200 dark:shadow-none"
                                >
                                    Message Check-In
                                </Button>
                            ) : (
                                <Button
                                    danger
                                    size="large"
                                    icon={<LogOut className="w-4 h-4" />}
                                    onClick={handleCheckOut}
                                    loading={loading}
                                    className="w-full max-w-xs shadow-lg shadow-red-100 dark:shadow-none"
                                >
                                    Check-Out
                                </Button>
                            )}
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card bordered={false} className="bg-white dark:bg-gray-800 shadow-sm mb-4">
                                <Statistic
                                    title="Average Work Hours"
                                    value={8.5}
                                    precision={1}
                                    suffix="hrs"
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Clock size={18} />}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false} className="bg-white dark:bg-gray-800 shadow-sm mb-4">
                                <Statistic
                                    title="Days Present"
                                    value={22}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<CalendarIcon size={18} />}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Card
                        title="Attendance History"
                        className="shadow-sm border-gray-100 dark:border-gray-700"
                        extra={<Button type="link">View All</Button>}
                    >
                        <Table
                            dataSource={attendanceHistory}
                            columns={columns}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                            size="small"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AttendancePage;
