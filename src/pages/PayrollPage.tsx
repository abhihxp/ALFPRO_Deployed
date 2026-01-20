/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Card, Table, Tag, message, Button, Modal, Statistic, Row, Col } from 'antd';
import { Download, Eye, DollarSign } from 'lucide-react';
import { PayrollService } from '../services/apiService';
import type { Payroll } from '../types';
import dayjs from 'dayjs';

const PayrollPage = () => {
    const [loading, setLoading] = useState(false);
    const [payrolls, setPayrolls] = useState<Payroll[]>([]);
    const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const EMPLOYEE_ID = 'mock-employee-id';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await PayrollService.getPayrollByEmployee(EMPLOYEE_ID);
            // Mock data if empty
            const mockData = data && data.length > 0 ? data : [
                { id: '1', employeeId: EMPLOYEE_ID, month: 1, year: 2026, workingDays: 22, presentDays: 20, grossSalary: 73500, totalEarnings: 67722.73, totalDeductions: 9950, netSalary: 57772.73, status: 1 },
                { id: '2', employeeId: EMPLOYEE_ID, month: 12, year: 2025, workingDays: 21, presentDays: 21, grossSalary: 73500, totalEarnings: 73500, totalDeductions: 9950, netSalary: 63550, status: 1 },
            ];
            setPayrolls(mockData);
        } catch (error) {
            message.error('Failed to fetch payroll history');
        } finally {
            setLoading(false);
        }
    };

    const handleViewPayslip = (record: Payroll) => {
        const enrichedRecord = {
            ...record,
            components: record.components || [
                { componentName: 'Basic Salary', amount: 50000, type: 'EARNING' },
                { componentName: 'HRA', amount: 15000, type: 'EARNING' },
                { componentName: 'Special Allowance', amount: 2722.73, type: 'EARNING' },
                { componentName: 'PF', amount: 1800, type: 'DEDUCTION' },
                { componentName: 'Professional Tax', amount: 200, type: 'DEDUCTION' },
                { componentName: 'Income Tax', amount: 7950, type: 'DEDUCTION' },
            ]
        } as Payroll; // Enforcing type for mock data

        setSelectedPayroll(enrichedRecord);
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: 'Month/Year',
            key: 'period',
            render: (_: any, record: Payroll) => dayjs().month(record.month - 1).year(record.year).format('MMMM YYYY'),
        },
        {
            title: 'Working Days',
            dataIndex: 'workingDays',
            key: 'workingDays',
        },
        {
            title: 'Net Salary',
            dataIndex: 'netSalary',
            key: 'netSalary',
            render: (val: number) => `$${val.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => {
                return status === 1
                    ? <Tag color="green">Processed</Tag>
                    : <Tag color="orange">Pending</Tag>;
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Payroll) => (
                <div className="flex gap-2">
                    <Button icon={<Eye size={14} />} size="small" onClick={() => handleViewPayslip(record)}>View</Button>
                    <Button icon={<Download size={14} />} size="small">Download</Button>
                </div>
            )
        }
    ];

    const stats = payrolls.length > 0 ? payrolls[0] : null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Payroll</h1>
            </div>

            {stats && (
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Card bordered={false} className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-sm">
                            <Statistic
                                title="Last Month Net Pay"
                                value={stats.netSalary}
                                precision={2}
                                prefix={<DollarSign size={18} />}
                                valueStyle={{ color: '#059669' }}
                            />
                            <div className="mt-2 text-xs text-gray-500">
                                {dayjs().month(stats.month - 1).year(stats.year).format('MMMM YYYY')}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Card bordered={false} className="bg-white dark:bg-gray-800 shadow-sm">
                            <Statistic
                                title="YTD Earnings"
                                value={payrolls.reduce((acc, curr) => acc + curr.totalEarnings, 0)}
                                precision={2}
                                prefix={<DollarSign size={18} />}
                                valueStyle={{ color: '#3b82f6' }}
                            />
                            <div className="mt-2 text-xs text-gray-400">
                                Year to Date
                            </div>
                        </Card>
                    </Col>
                </Row>
            )}

            <Card title="Salary History" className="shadow-sm border-gray-100 dark:border-gray-700">
                <Table
                    dataSource={payrolls}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 12 }}
                />
            </Card>

            <Modal
                title={`Payslip: ${selectedPayroll ? dayjs().month(selectedPayroll.month - 1).year(selectedPayroll.year).format('MMMM YYYY') : ''}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalOpen(false)}>Close</Button>,
                    <Button key="download" type="primary" icon={<Download size={14} />}>Download PDF</Button>
                ]}
                width={700}
            >
                {selectedPayroll && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <div>
                                <span className="text-gray-500 text-sm">Gross Salary</span>
                                <div className="text-lg font-semibold">${selectedPayroll.grossSalary.toFixed(2)}</div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Net Payable</span>
                                <div className="text-lg font-semibold text-green-600">${selectedPayroll.netSalary.toFixed(2)}</div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Total Earnings</span>
                                <div className="text-base font-medium text-blue-600">${selectedPayroll.totalEarnings.toFixed(2)}</div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Total Deductions</span>
                                <div className="text-base font-medium text-red-600">${selectedPayroll.totalDeductions.toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold mb-3 text-green-600 border-b pb-1">Earnings</h4>
                                <div className="space-y-2">
                                    {selectedPayroll.components?.filter(c => c.type === 'EARNING').map((c, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span>{c.componentName}</span>
                                            <span className="font-medium">${c.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3 text-red-600 border-b pb-1">Deductions</h4>
                                <div className="space-y-2">
                                    {selectedPayroll.components?.filter(c => c.type === 'DEDUCTION').map((c, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span>{c.componentName}</span>
                                            <span className="font-medium">${c.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PayrollPage;
