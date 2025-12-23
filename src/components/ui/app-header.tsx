'use client';

import React from 'react';
import { Layout, Avatar, Dropdown, Space, theme } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

const { Header } = Layout;

export default function AppHeader() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { tenantId } = useSelector((state: RootState) => state.auth);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = () => {
        // Clear cookies
        document.cookie = 'tenant_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch(logout());
        router.push('/login');
    };

    const userMenu: MenuProps['items'] = [
        {
            key: 'profile',
            label: 'Profile',
            icon: <UserOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <Header
            style={{ background: colorBgContainer }}
            className="flex items-center justify-between px-6 border-b border-gray-200 sticky top-0 z-10"
        >
            <div className="flex items-center">
                {/* Placeholder for Breadcrumbs or Search */}
                <span className="text-gray-500 text-sm">
                    Tenant: <span className="font-semibold text-gray-700">{tenantId || 'Checking...'}</span>
                </span>
            </div>

            <div className="flex items-center gap-4">
                <BellOutlined className="text-xl text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors" />

                <Dropdown menu={{ items: userMenu }} trigger={['click']}>
                    <Space className="cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                        <Avatar icon={<UserOutlined />} className="bg-indigo-100 text-indigo-600" />
                        <div className="hidden md:block leading-tight">
                            <div className="font-medium text-sm text-gray-900">Admin User</div>
                            <div className="text-xs text-gray-500">HR Manager</div>
                        </div>
                    </Space>
                </Dropdown>
            </div>
        </Header>
    );
}
