import { useState } from 'react';
import { Form, Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../components/wizard/DynamicForm';
import addEmployeeFormSchemaJson from '../data/addEmployeeFormSchema.json';
import linkOrgChartSchema from '../data/linkOrgChartSchema.json';
import { Link as LinkIcon } from 'lucide-react';

const AddEmployeePage2 = () => {
    const [form] = Form.useForm();
    const [modalForm] = Form.useForm();
    const [showOrgChartModal, setShowOrgChartModal] = useState(false);
    const { t } = useTranslation();

    const handleFinish = (values: any) => {
        console.log('Submitted:', values);
        message.success('Employee Added Successfully');
    };

    const handleOrgChartFinish = (values: any) => {
        console.log('Org Chart Linked:', values);
        // Map values back to main form if necessary
        setShowOrgChartModal(false);
        message.success('Organisation Chart Linked');
    };

    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('Add New Employee')}</h2>
                <Form form={form} component={false} onFinish={handleFinish} layout="vertical">
                    <DynamicForm schema={addEmployeeFormSchemaJson} form={form} />

                    <div className="mt-8 flex justify-between border-t border-gray-100 dark:border-gray-700 pt-6 items-center">
                        <div>
                            <Button
                                type="link"
                                icon={<LinkIcon size={16} />}
                                onClick={() => setShowOrgChartModal(true)}
                                className="text-primary pl-0"
                            >
                                Link Organisational Chart
                            </Button>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                className="h-10 px-6"
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                onClick={() => form.resetFields()}
                                className="h-10 px-6"
                            >
                                {t('Clear All')}
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-primary hover:bg-purple-700 border-none h-10 px-8"
                            >
                                {t('Submit')}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>

            <Modal
                title="Link Organisational Chart"
                open={showOrgChartModal}
                onCancel={() => setShowOrgChartModal(false)}
                footer={null}
                width={800}
            >
                <Form form={modalForm} onFinish={handleOrgChartFinish} layout="vertical">
                    <DynamicForm schema={linkOrgChartSchema} form={modalForm} />
                    <div className="flex justify-end gap-3 mt-6">
                        <Button onClick={() => setShowOrgChartModal(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Link & Save</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AddEmployeePage2;
