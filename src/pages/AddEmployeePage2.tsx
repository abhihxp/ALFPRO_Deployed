/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../components/wizard/DynamicForm';
import addEmployeeFormSchemaJson from '../data/addEmployeeFormSchema.json';

const AddEmployeePage2 = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const handleFinish = (values: any) => {
        console.log('Submitted:', values);
    };

    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('form.employee.title')}</h2>
                <Form form={form} component={false} onFinish={handleFinish} layout="vertical">
                    <DynamicForm schema={addEmployeeFormSchemaJson} form={form} />

                    <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 pt-6">
                        <Button
                            className="h-10 px-6"
                        >
                            {t("form.buttons.cancel")}
                        </Button>
                        <Button
                            onClick={() => form.resetFields()}
                            className="h-10 px-6"
                        >
                            {t('form.buttons.clear')}
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-primary hover:bg-purple-700 border-none h-10 px-8"
                        >
                            {t('form.buttons.submit')}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddEmployeePage2;
