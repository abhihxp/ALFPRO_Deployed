import { useState } from 'react';
import { Form, Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../components/wizard/DynamicForm';
import passportSchema from '../data/statutory/passportSchema.json';
import visaSchema from '../data/statutory/visaSchema.json';
import educationSchema from '../data/statutory/educationSchema.json';
import certificationSchema from '../data/statutory/certificationSchema.json';
import workExperienceSchema from '../data/statutory/workExperienceSchema.json';
import idProofSchema from '../data/statutory/idProofSchema.json';
import nomineeSchema from '../data/statutory/nomineeSchema.json';
import bankDetailSchema from '../data/statutory/bankDetailSchema.json';

const StatutoryDataPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('1');

    // Create a generic Form component to be used inside tabs
    const StatutoryForm = ({ schema, type }: { schema: any, type: string }) => {
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
            >
                <div className="max-w-4xl">
                    <DynamicForm schema={schema} form={form} />
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 pt-6">
                    <Button className="h-10 px-6" onClick={() => form.resetFields()}>
                        {t('Clear')}
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-primary hover:bg-purple-700 border-none h-10 px-8"
                    >
                        {t('Save Details')}
                    </Button>
                </div>
            </Form>
        );
    };

    const items = [
        {
            key: '1',
            label: t('Passport'),
            children: <StatutoryForm schema={passportSchema} type="Passport" />,
        },
        {
            key: '2',
            label: t('Visa'),
            children: <StatutoryForm schema={visaSchema} type="Visa" />,
        },
        {
            key: '3',
            label: t('Education'),
            children: <StatutoryForm schema={educationSchema} type="Education" />,
        },
        {
            key: '4',
            label: t('Certification'),
            children: <StatutoryForm schema={certificationSchema} type="Certification" />,
        },
        {
            key: '5',
            label: t('Work Experience'),
            children: <StatutoryForm schema={workExperienceSchema} type="Work Experience" />,
        },
        {
            key: '6',
            label: t('ID Proof'),
            children: <StatutoryForm schema={idProofSchema} type="ID Proof" />,
        },
        {
            key: '7',
            label: t('Nominee'),
            children: <StatutoryForm schema={nomineeSchema} type="Nominee" />,
        },
        {
            key: '8',
            label: t('Bank Detail'),
            children: <StatutoryForm schema={bankDetailSchema} type="Bank Detail" />,
        },
    ];

    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('Statutory Data')}</h2>

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

export default StatutoryDataPage;
