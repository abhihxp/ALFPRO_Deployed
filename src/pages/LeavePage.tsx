/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Card, Button, Table, Tag, message, Row, Col, Statistic, Form, Select, DatePicker, Input, Modal } from 'antd';
import { PlusCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { LeaveService } from '../services/apiService';
import type { LeaveRequest, LeaveBalance } from '../types';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const LeavePage = () => {
    const [loading, setLoading] = useState(false);
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [balances, setBalances] = useState<LeaveBalance[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const EMPLOYEE_ID = 'mock-employee-id';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [requests, balanceData] = await Promise.all([
                LeaveService.getLeaveRequests(EMPLOYEE_ID),
                LeaveService.getLeaveBalances(EMPLOYEE_ID)
            ]);

            // Mock data if empty
            const mockRequests = requests && requests.length > 0 ? requests : [
                { id: '1', employeeId: EMPLOYEE_ID, leaveTypeId: 'annual', fromDate: '2026-02-10', toDate: '2026-02-12', numberOfDays: 3, reason: 'Vacation', reportingManagerId: 'manager-1', status: 0 },
                { id: '2', employeeId: EMPLOYEE_ID, leaveTypeId: 'sick', fromDate: '2026-01-05', toDate: '2026-01-05', numberOfDays: 1, reason: 'Fever', reportingManagerId: 'manager-1', status: 1, approvalRemarks: 'Get well soon' },
            ];

            const mockBalances = balanceData?.balances || [
                { leaveTypeId: 'annual', availableBalance: 12, used: 4, leaveType: { name: 'Annual Leave', code: 'AL', id: 'annual', maxDaysPerYear: 24, isPaid: true, requiresApproval: true } },
                { leaveTypeId: 'sick', availableBalance: 8, used: 2, leaveType: { name: 'Sick Leave', code: 'SL', id: 'sick', maxDaysPerYear: 10, isPaid: true, requiresApproval: true } },
                { leaveTypeId: 'casual', availableBalance: 5, used: 1, leaveType: { name: 'Casual Leave', code: 'CL', id: 'casual', maxDaysPerYear: 6, isPaid: true, requiresApproval: true } }
            ];

            setLeaveRequests(mockRequests);
            setBalances(mockBalances);

        } catch (error) {
            message.error('Failed to fetch leave data');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyLeave = async (values: any) => {
        setLoading(true);
        try {
            await LeaveService.applyLeave({
                employeeId: EMPLOYEE_ID,
                leaveTypeId: values.leaveTypeId,
                fromDate: values.dates[0].format('YYYY-MM-DD'),
                toDate: values.dates[1].format('YYYY-MM-DD'),
                numberOfDays: values.dates[1].diff(values.dates[0], 'day') + 1,
                reason: values.reason,
                reportingManagerId: 'manager-1' // Mock
            });
            message.success('Leave requested successfully');
            setIsModalOpen(false);
            form.resetFields();
            fetchData();
        } catch (error) {
            message.error('Failed to apply for leave');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Leave Type',
            dataIndex: 'leaveTypeId',
            key: 'leaveType',
            render: (id: string) => {
                const type = balances.find(b => b.leaveTypeId === id)?.leaveType;
                return type ? type.name : id;
            }
        },
        {
            title: 'From',
            dataIndex: 'fromDate',
            key: 'fromDate',
            render: (text: string) => dayjs(text).format('DD MMM YYYY'),
        },
        {
            title: 'To',
            dataIndex: 'toDate',
            key: 'toDate',
            render: (text: string) => dayjs(text).format('DD MMM YYYY'),
        },
        {
            title: 'Days',
            dataIndex: 'numberOfDays',
            key: 'days',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => {
                const map: { [key: number]: { text: string, color: string, icon: any } } = {
                    0: { text: 'Pending', color: 'orange', icon: <Clock size={14} /> },
                    1: { text: 'Approved', color: 'green', icon: <CheckCircle size={14} /> },
                    2: { text: 'Rejected', color: 'red', icon: <XCircle size={14} /> }
                };
                const s = map[status];
                return (
                    <Tag color={s.color} icon={s.icon} className="flex items-center gap-1 w-fit">
                        {s.text}
                    </Tag>
                );
            }
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Leave Management</h1>
                <Button type="primary" icon={<PlusCircle size={16} />} onClick={() => setIsModalOpen(true)}>
                    Apply Leave
                </Button>
            </div>

            <Row gutter={[16, 16]}>
                {balances.map((balance, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card bordered={false} className="shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                            <Statistic
                                title={balance.leaveType?.name || 'Leave'}
                                value={balance.availableBalance}
                                suffix={`/ ${balance.leaveType?.maxDaysPerYear}`}
                                valueStyle={{ color: '#3b82f6' }}
                            />
                            <div className="mt-2 text-xs text-gray-400">
                                Used: {balance.used} days
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card title="Leave History" className="shadow-sm border-gray-100 dark:border-gray-700">
                <Table
                    dataSource={leaveRequests}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title="Apply for Leave"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleApplyLeave}>
                    <Form.Item name="leaveTypeId" label="Leave Type" rules={[{ required: true }]}>
                        <Select placeholder="Select leave type">
                            {balances.map(b => (
                                <Option key={b.leaveTypeId} value={b.leaveTypeId}>
                                    {b.leaveType?.name} ({b.availableBalance} remaining)
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="dates" label="Date Range" rules={[{ required: true }]}>
                        <DatePicker.RangePicker className="w-full" />
                    </Form.Item>
                    <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading}>Submit Request</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default LeavePage;
