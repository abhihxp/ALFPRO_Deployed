import { useState } from 'react';
import { Form, Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../components/wizard/DynamicForm';
import companySchema from '../data/companySchema.json';
import divisionSchema from '../data/divisionSchema.json';
import locationSchema from '../data/locationSchema.json';
import departmentSchema from '../data/departmentSchema.json';
import designationSchema from '../data/designationSchema.json';

const MasterDataPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('1');

    // Create a generic Form component to be used inside tabs
    const MasterForm = ({ schema, type, initialValues = { isActive: true } }: { schema: any, type: string, initialValues?: any }) => {
        const [form] = Form.useForm();

        const handleFinish = (values: any) => {
            console.log(`Submitted ${type}:`, values);
            // API call would go here
        };

        return (
            <Form
                form={form}
                component={false}
                onFinish={handleFinish}
                layout="vertical"
                initialValues={initialValues}
            >
                <DynamicForm schema={schema} form={form} />

                <div className="flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 items-center sticky bottom-0 bg-white dark:bg-gray-800 z-10 -mx-8 -mb-8 px-8 py-4 mt-4">
                    <Button className="h-10 px-6" onClick={() => form.resetFields()}>
                        {t('Clear')}
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-primary hover:bg-purple-700 border-none h-10 px-8"
                    >
                        {t(`Create ${type}`)}
                    </Button>
                </div>
            </Form>
        );
    };

    const items = [
        {
            key: '1',
            label: t('Company'),
            children: <MasterForm schema={companySchema} type="Company" />,
        },
        {
            key: '2',
            label: t('Division'),
            children: <MasterForm schema={divisionSchema} type="Division" />,
        },
        {
            key: '3',
            label: t('Location'),
            children: <MasterForm schema={locationSchema} type="Location" />,
        },
        {
            key: '4',
            label: t('Department'),
            children: <MasterForm schema={departmentSchema} type="Department" />,
        },
        {
            key: '5',
            label: t('Designation'),
            children: <MasterForm schema={designationSchema} type="Designation" />,
        },
    ];

    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('Master Data')}</h2>

                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={items}
                    type="card"
                    className="custom-tabs"
                />
            </div>
        </div>
    );
};

export default MasterDataPage;
