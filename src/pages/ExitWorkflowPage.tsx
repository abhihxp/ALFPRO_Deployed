import React, { useState } from 'react';
import {
    Descriptions,
    Tag,
    Card,
    Steps,
    Table,
    Button,
    Tabs,
    Timeline,
    Statistic,
    Row,
    Col,
    Badge,
    Space
} from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    UserOutlined,
    SolutionOutlined,
    BankOutlined,
    SafetyCertificateOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;
const { TabPane } = Tabs;

const ExitWorkflowPage = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(2); // 0-indexed, so 2 is Clearance Process

    // Mock Core Data
    const exitData = {
        exitWorkflowId: 'EX-2023-001',
        employeeId: 'EMP1001',
        employeeName: 'John Doe',
        department: 'Engineering',
        designation: 'Senior Software Engineer',
        manager: 'Jane Smith',
        hrBusinessPartner: 'Robert Johnson',
        exitType: 'Resignation',
        initiationDate: '2023-11-01',
        lastWorkingDay: '2023-11-30',
        status: 'In Progress',
    };

    // Mock Checklist Data
    const checklistData = [
        {
            key: '1',
            department: 'IT Assets',
            item: 'Return Laptop (MacBook Pro)',
            status: 'Cleared',
            approver: 'Mike IT',
            date: '2023-11-20',
            icon: <UserOutlined />,
        },
        {
            key: '2',
            department: 'IT Assets',
            item: 'Revoke VPN Access',
            status: 'Pending',
            approver: 'Mike IT',
            date: '-',
            icon: <SafetyCertificateOutlined />,
        },
        {
            key: '3',
            department: 'Administration',
            item: 'Return ID Card',
            status: 'Pending',
            approver: 'Sarah Admin',
            date: '-',
            icon: <SolutionOutlined />,
        },
        {
            key: '4',
            department: 'Finance',
            item: 'Settle Outstanding Dues',
            status: 'Wait',
            approver: 'Fin Team',
            date: '-',
            icon: <BankOutlined />,
        },
    ];

    const checklistColumns = [
        {
            title: t('Department'),
            dataIndex: 'department',
            key: 'department',
            render: (text: string) => <span className="font-medium">{text}</span>,
        },
        {
            title: t('Item'),
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'default';
                if (status === 'Cleared') color = 'success';
                if (status === 'Pending') color = 'warning';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            }
        },
        {
            title: t('Approver'),
            dataIndex: 'approver',
            key: 'approver',
        },
        {
            title: t('Action'),
            key: 'action',
            render: (_: any, record: any) => (
                record.status === 'Pending' ? (
                    <Button size="small" type="primary" ghost>{t('Mark Cleared')}</Button>
                ) : <span className="text-gray-400">-</span>
            ),
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'green';
            case 'In Progress': return 'blue';
            case 'On Hold': return 'orange';
            case 'Initiated': return 'default';
            default: return 'default';
        }
    };

    return (
        <div className="w-full mx-auto space-y-6">

            {/* Page Header & Actions */}
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {t('Exit Workflow')}: {exitData.employeeName}
                    </h2>
                    <Space className="text-gray-500">
                        <span>{exitData.exitWorkflowId}</span>
                        <span>•</span>
                        <Tag color={getStatusColor(exitData.status)}>{exitData.status}</Tag>
                    </Space>
                </div>
                <Space>
                    <Button icon={<FileTextOutlined />}>{t('View Resignation Letter')}</Button>
                    <Button type="primary" icon={<DownloadOutlined />}>{t('Download FnF Statement')}</Button>
                </Space>
            </div>

            {/* Workflow Progress Timeline */}
            {/* <Card className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <Steps current={currentStep} className="p-4" labelPlacement="vertical">
                    <Step title={t("Resignation")} description="Submitted Nov 1" />
                    <Step title={t("Manager Approval")} description="Approved Nov 3" />
                    <Step title={t("Asset Clearance")} description="In Progress" icon={<ClockCircleOutlined />} />
                    <Step title={t("Finance & FnF")} description="Pending" />
                    <Step title={t("Relieved")} description="Nov 30" />
                </Steps>
            </Card> */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Core Details & Checklist */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Core Details (Originally Header) */}
                    <Card title={t('Case Details')} className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <Descriptions
                            bordered
                            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                            size="small"
                        >
                            <Descriptions.Item label={t('Employee ID')}>{exitData.employeeId}</Descriptions.Item>
                            <Descriptions.Item label={t('Department')}>{exitData.department}</Descriptions.Item>
                            <Descriptions.Item label={t('Designation')}>{exitData.designation}</Descriptions.Item>
                            <Descriptions.Item label={t('Manager')}>{exitData.manager}</Descriptions.Item>
                            <Descriptions.Item label={t('HRBP')}>{exitData.hrBusinessPartner}</Descriptions.Item>
                            <Descriptions.Item label={t('Exit Type')}>{exitData.exitType}</Descriptions.Item>
                            <Descriptions.Item label={t('Initiation Date')}>{exitData.initiationDate}</Descriptions.Item>
                            <Descriptions.Item label={t('Last Working Day')}>{exitData.lastWorkingDay}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Clearance Checklist */}
                    <Card
                        title={
                            <div className="flex justify-between items-center">
                                <span>{t('Clearance Checklist')}</span>
                                <Tag color="warning">2 Pending</Tag>
                            </div>
                        }
                        className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Table
                            columns={checklistColumns}
                            dataSource={checklistData}
                            pagination={false}
                            size="middle"
                        />
                    </Card>

                    {/* Exit Interview Placeholder */}
                    <Card title={t('Exit Interview')} className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-center py-8 text-gray-500">
                            <SolutionOutlined className="text-4xl mb-3 text-gray-300" />
                            <p>{t('Exit interview pending schedule')}</p>
                            <Button type="link">{t('Schedule Interview')}</Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Status/Log */}
                <div className="space-y-6">
                    {/* At a Glance Stats */}
                    <Card className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title={t("Days to Exit")} value={12} prefix={<ClockCircleOutlined />} />
                            </Col>
                            <Col span={12}>
                                <Statistic title={t("Pending Approvals")} value={2} valueStyle={{ color: '#cf1322' }} />
                            </Col>
                        </Row>
                    </Card>

                    {/* Timeline Log */}
                    <Card title={t('Activity Log')} className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <Timeline>
                            <Timeline.Item color="green">
                                <p className="font-medium m-0">Resignation Approved</p>
                                <p className="text-xs text-gray-500">Jane Smith • Nov 3, 2023</p>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <p className="font-medium m-0">Resignation Initiated</p>
                                <p className="text-xs text-gray-500">John Doe • Nov 1, 2023</p>
                            </Timeline.Item>
                            <Timeline.Item color="blue">
                                <p className="font-medium m-0">Clearance Process Started</p>
                                <p className="text-xs text-gray-500">System • Nov 3, 2023</p>
                            </Timeline.Item>
                            <Timeline.Item color="gray">
                                <p className="font-medium m-0">Asset Return Pending</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ExitWorkflowPage;
