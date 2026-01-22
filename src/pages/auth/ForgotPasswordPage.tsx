import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success('Password reset link sent to your email.');
        // Navigate or show success state
    };

    return (
        <AuthLayout title="Forgot Password" subtitle="Enter your email to reset your password">
            <Form
                name="forgot_password"
                className="forgot-password-form"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                >
                    <Input
                        prefix={<Mail className="site-form-item-icon text-gray-400" size={18} />}
                        placeholder="Registered Email ID"
                        className="h-11 rounded-md"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full h-11 bg-primary hover:bg-purple-700 border-none rounded-md text-base font-medium">
                        Send Reset Link
                    </Button>
                </Form.Item>

                <div className="text-center mt-4">
                    <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2">
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
