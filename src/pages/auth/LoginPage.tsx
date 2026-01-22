/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { User, Lock } from 'lucide-react';

const LoginPage = () => {
    useTranslation();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success('Logged in successfully');
        navigate('/dashboard');
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to your account">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
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
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<Lock className="site-form-item-icon text-gray-400" size={18} />}
                        type="password"
                        placeholder="Password"
                        className="h-11 rounded-md"
                    />
                </Form.Item>
                <Form.Item>
                    <div className="flex items-center justify-between">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <div className="flex flex-col items-end text-sm">
                            <Link className="font-medium text-primary hover:text-purple-500" to="/forgot-password">
                                Forgot password?
                            </Link>
                            <Link className="font-medium text-gray-500 hover:text-gray-900 mt-1" to="/forgot-username">
                                Forgot username?
                            </Link>
                        </div>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full h-11 bg-primary hover:bg-purple-700 border-none rounded-md text-base font-medium">
                        Log in
                    </Button>
                </Form.Item>

                <div className="text-center mt-4">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link to="/signup" className="font-medium text-primary hover:text-purple-500">
                        Register now
                    </Link>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default LoginPage;
