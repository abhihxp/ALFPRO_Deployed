'use client';

import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
    DashboardOutlined,
    UsergroupAddOutlined,
    DollarCircleOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

export default function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = React.useState(false);

    const items = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/dashboard/employees',
            icon: <UsergroupAddOutlined />,
            label: 'Employees',
        },
        {
            key: '/dashboard/payroll',
            icon: <DollarCircleOutlined />,
            label: 'Payroll',
        },
        {
            key: '/dashboard/settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
    ];

    const handleMenuClick = (e: { key: string }) => {
        router.push(e.key);
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="border-r border-gray-200 h-screen sticky top-0 left-0 overflow-y-auto"
            theme="light"
            width={240}
            style={{ position: 'fixed', height: '100vh', left: 0, top: 0 }}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 h-16">
                {!collapsed && (
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Alftek HR
                    </span>
                )}
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-500 hover:text-indigo-600"
                />
            </div>

            <Menu
                mode="inline"
                selectedKeys={[pathname]}
                items={items}
                onClick={handleMenuClick}
                className="border-none mt-2"
            />
        </Sider>
    );
}
