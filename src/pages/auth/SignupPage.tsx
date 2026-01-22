/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import DynamicForm from '../../components/wizard/DynamicForm';
import signupSchema from '../../data/auth/signupSchema.json';
import AuthLayout from '../../components/AuthLayout';

const SignupPage = () => {
    const [form] = Form.useForm();
    useTranslation();
    const navigate = useNavigate();

    const handleFinish = (values: any) => {
        console.log('Signup Values:', values);
        if (values.password !== values.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }
        message.success('Registration request submitted successfully!');
        // API call to register tenant
        setTimeout(() => navigate('/login'), 1500);
    };

    return (
        <AuthLayout title="Tenant Self Registration" subtitle="Create your organization account" maxWidth="sm:max-w-4xl">
            <Form form={form} component={false} onFinish={handleFinish} layout="vertical">
                <DynamicForm schema={signupSchema} form={form} />

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 z-10 -mx-4 sm:-mx-10 -mb-8 px-4 sm:px-10 py-4 mt-6">
                    <div className="text-sm">
                        <Link to="/login" className="font-medium text-primary hover:text-purple-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="flex justify-center py-2 px-6 shadow-sm text-sm font-medium text-white bg-primary hover:bg-purple-700 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-10"
                    >
                        Register Organization
                    </Button>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default SignupPage;
