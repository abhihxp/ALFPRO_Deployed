/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { User, Lock, ArrowLeft } from 'lucide-react';

const ResetPasswordPage = () => {
    useTranslation();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        if (values.newPassword !== values.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }
        message.success('Password reset successfully. Please login with new password.');
        navigate('/login');
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Create a new password for your account">
            <Form
                name="reset_password"
                className="reset-password-form"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        prefix={<User className="site-form-item-icon text-gray-400" size={18} />}
                        placeholder="Username"
                        className="h-11 rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new Password!' }]}
                >
                    <Input.Password
                        prefix={<Lock className="site-form-item-icon text-gray-400" size={18} />}
                        placeholder="New Password"
                        className="h-11 rounded-md"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm your new Password!' }]}
                >
                    <Input.Password
                        prefix={<Lock className="site-form-item-icon text-gray-400" size={18} />}
                        placeholder="Confirm Password"
                        className="h-11 rounded-md"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full h-11 bg-primary hover:bg-purple-700 border-none rounded-md text-base font-medium">
                        Reset Password
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

export default ResetPasswordPage;
