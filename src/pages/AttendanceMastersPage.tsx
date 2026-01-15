import React, { useState } from 'react';
import { Form, Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../components/wizard/DynamicForm';
import shiftSchema from '../data/shiftSchema.json';
import weekOffSchema from '../data/weekOffSchema.json';

const AttendanceMastersPage = () => {
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

                <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 pt-6">
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
            label: t('Shift'),
            children: <MasterForm schema={shiftSchema} type="Shift" initialValues={{ isActive: true, shiftType: 'fixed' }} />,
        },
        {
            key: '2',
            label: t('Week-Off'),
            children: <MasterForm schema={weekOffSchema} type="Week-Off" initialValues={{ isActive: true, isRotational: false, weekOffsPerMonth: 4 }} />,
        },
    ];

    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('Attendance Masters')}</h2>

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

export default AttendanceMastersPage;
