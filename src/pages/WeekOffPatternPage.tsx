/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DynamicForm from '../components/wizard/DynamicForm';
import weekOffSchema from '../data/weekOffSchema.json';

const WeekOffPatternPage = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleFinish = (values: any) => {
        console.log('Submitted Week-Off Pattern:', values);
        // Here you would typically make an API call
    };

    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Week-Off Pattern</h2>
                    <Button onClick={() => navigate(-1)}>{t('Back')}</Button>
                </div>

                <Form
                    form={form}
                    component={false}
                    onFinish={handleFinish}
                    layout="vertical"
                    initialValues={{ isActive: true, isRotational: false, weekOffsPerMonth: 4 }}
                >
                    <DynamicForm schema={weekOffSchema} form={form} />

                    <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 pt-6">
                        <Button className="h-10 px-6" onClick={() => navigate(-1)}>
                            {t('Cancel')}
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-primary hover:bg-purple-700 border-none h-10 px-8"
                        >
                            {t('Create Week-Off Pattern')}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default WeekOffPatternPage;
