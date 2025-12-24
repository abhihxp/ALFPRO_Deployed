'use client';

import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import AppSidebar from '@/components/ui/app-sidebar';
import AppHeader from '@/components/ui/app-header';
import { themeConfig } from '@/lib/theme-config';

const { Content } = Layout;

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ConfigProvider theme={themeConfig}>
            <Layout className="min-h-screen">
                <AppSidebar />
                <Layout style={{ marginLeft: '240px' }}>
                    <AppHeader />
                    <Content className="m-6 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[280px]">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
