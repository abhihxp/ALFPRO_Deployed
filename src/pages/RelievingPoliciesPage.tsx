import { Card, Descriptions, Tag, Badge } from 'antd';
import { FileTextOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const RelievingPoliciesPage = () => {
    const { t } = useTranslation();

    // Mock Policy Data
    const policyData = {
        id: 'POL-EXIT-001',
        name: 'Standard Resignation Policy',
        description: 'Standard operating procedure for voluntary resignation of permanent employees.',
        type: 'Resignation',

        // Applicability
        entity: 'ProWork Global Ltd.',
        location: 'All Locations',
        department: 'All Departments',
        category: 'Permanent',
        grade: 'Band B1 - B5',
        employmentType: 'Full-time'
    };

    return (
        <div className="w-full mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {t('Relieving Policies')}
                    </h2>
                    <p className="text-gray-500">{t('Manage exit and relieving policy configurations')}</p>
                </div>
                <Tag color="processing" className="text-sm px-3 py-1">ACTIVE</Tag>
            </div>

            <div className="grid grid-cols-1 gap-6">

                {/* Policy Master Details */}
                <Card
                    title={<span><FileTextOutlined className="mr-2" /> {t('Policy Master Details')}</span>}
                    className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800 transition-shadow hover:shadow-md"
                >
                    <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
                        <Descriptions.Item label={t('Relieving Policy ID')}>{policyData.id}</Descriptions.Item>
                        <Descriptions.Item label={t('Policy Name')} span={2}>{policyData.name}</Descriptions.Item>
                        <Descriptions.Item label={t('Policy Type')}>
                            <Badge status="processing" text={policyData.type} />
                        </Descriptions.Item>
                        <Descriptions.Item label={t('Policy Description')} span={4}>
                            {policyData.description}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                {/* Applicability Rules */}
                <Card
                    title={<span><GlobalOutlined className="mr-2" /> {t('Applicability Rules')}</span>}
                    className="shadow-sm border-gray-100 dark:border-gray-700 dark:bg-gray-800 transition-shadow hover:shadow-md"
                >
                    <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} layout="vertical">
                        <Descriptions.Item label={t('Applicable Entity / Company')}>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{policyData.entity}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t('Applicable Location')}>{policyData.location}</Descriptions.Item>
                        <Descriptions.Item label={t('Applicable Department')}>
                            <Tag>{policyData.department}</Tag>
                        </Descriptions.Item>

                        <Descriptions.Item label={t('Employee Category')}>{policyData.category}</Descriptions.Item>
                        <Descriptions.Item label={t('Grade / Band')}>{policyData.grade}</Descriptions.Item>
                        <Descriptions.Item label={t('Employment Type')}>{policyData.employmentType}</Descriptions.Item>
                    </Descriptions>
                </Card>

            </div>
        </div>
    );
};

export default RelievingPoliciesPage;
