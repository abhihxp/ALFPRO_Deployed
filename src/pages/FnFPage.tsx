import { Card, Descriptions, Tag, Row, Col, Statistic, Button } from 'antd';
import { FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const FnFPage = () => {
    const { t } = useTranslation();

    // Mock Data
    const fnfData = {
        settlementId: 'FNF-2024-001',
        employeeId: 'EMP1001',
        employeeName: 'John Doe',
        department: 'Engineering',
        designation: 'Senior Software Engineer',
        exitType: 'Resignation',
        joiningDate: '2021-01-15',
        lastWorkingDay: '2023-11-30',
        location: 'Dubai HQ',
        panTaxId: 'AE-123456789',
    };

    const leaveData = {
        openingBalance: 24,
        earnedTillLWD: 5,
        availed: 10,
        eligible: 19,
        rate: 500, // Currency amount
        encashmentAmount: 9500 // 19 * 500
    };

    return (
        <div className="w-full mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {t('Full & Final Settlement')}
                    </h2>
                    <p className="text-gray-500">{fnfData.settlementId} • {fnfData.employeeName}</p>
                </div>
                <div className="flex gap-2">
                    <Button icon={<FilePdfOutlined />}>{t('Export PDF')}</Button>
                    <Button icon={<PrinterOutlined />}>{t('Print')}</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Section 1: Employee & Exit Reference */}
                <Card title={t('Employee & Exit Reference')} className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800 h-full">
                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label={t('F&F Settlement ID')}>{fnfData.settlementId}</Descriptions.Item>
                        <Descriptions.Item label={t('Employee ID')}>{fnfData.employeeId}</Descriptions.Item>
                        <Descriptions.Item label={t('Employee Name')}>{fnfData.employeeName}</Descriptions.Item>
                        <Descriptions.Item label={t('Department')}>{fnfData.department}</Descriptions.Item>
                        <Descriptions.Item label={t('Designation')}>{fnfData.designation}</Descriptions.Item>
                        <Descriptions.Item label={t('Exit Type')}>
                            <Tag color="orange">{fnfData.exitType}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label={t('Date of Joining')}>{fnfData.joiningDate}</Descriptions.Item>
                        <Descriptions.Item label={t('Last Working Day')}>{fnfData.lastWorkingDay}</Descriptions.Item>
                        <Descriptions.Item label={t('Payroll Location / Entity')}>{fnfData.location}</Descriptions.Item>
                        <Descriptions.Item label={t('PAN / Tax ID')}>{fnfData.panTaxId}</Descriptions.Item>
                    </Descriptions>
                </Card>

                {/* Section 2: Leave Details */}
                <Card title={t('Leave Details')} className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800 h-full">
                    <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title={t("Total Payable Leave Encashment")}
                                    value={leaveData.encashmentAmount}
                                    precision={2}
                                    prefix={<span className="text-lg">AED</span>} // Assuming currency
                                    valueStyle={{ color: '#7b5eea', fontWeight: 'bold' }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title={t("Total Eligible Days")}
                                    value={leaveData.eligible}
                                    suffix={t("Days")}
                                    valueStyle={{ fontWeight: 'bold' }}
                                />
                            </Col>
                        </Row>
                    </div>

                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label={t('Opening Leave Balance')}>{leaveData.openingBalance}</Descriptions.Item>
                        <Descriptions.Item label={t('Leave Earned Till LWD')}>{leaveData.earnedTillLWD}</Descriptions.Item>
                        <Descriptions.Item label={t('Leave Availed')}>{leaveData.availed}</Descriptions.Item>
                        <Descriptions.Item label={t('Eligible Leave for Encashment')}>
                            <span className="font-semibold">{leaveData.eligible}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t('Leave Encashment Rate')}>
                            {leaveData.rate} / day
                        </Descriptions.Item>
                        <Descriptions.Item label={t('Leave Encashment Days')}>
                            <span className="font-semibold text-primary">{leaveData.eligible}</span>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>

            {/* Optional: Summary Footer */}
            <Card className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800 bg-gray-50">
                <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{t('Net Payable Amount')}</span>
                    <span className="font-bold text-2xl text-green-600">AED {leaveData.encashmentAmount.toLocaleString()}</span>
                </div>
            </Card>
        </div>
    );
};

export default FnFPage;
