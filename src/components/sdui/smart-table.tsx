'use client';

import React from 'react';
import { Table, Avatar, Tag, Dropdown, Button, Spin, Alert } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import useSWR from 'swr';

// Fetcher function for SWR
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SmartTable({ columns, data: initialData, apiUrl }: any) {
    // Use SWR if apiUrl is provided
    // If apiURL is NOT provided, SWR is skipped (conditional fetching)
    const { data: fetchedData, error, isLoading } = useSWR(apiUrl, fetcher, {
        fallbackData: initialData, // Use initialData while loading or if api fails/not present (optional behavior, here used as hydration)
        // If no initialData is provided, fetchedData will be undefined initially
        revalidateOnFocus: false,
    });

    // Decide what data to show: fetched data > initial data > empty array
    const dataSource = fetchedData || initialData || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processedColumns = columns.map((col: any) => {
        if (col.renderType === 'user-avatar') {
            return {
                ...col,
                render: (text: string) => (
                    <div className="flex items-center gap-3">
                        <Avatar icon={<UserOutlined />} className="bg-indigo-50 text-indigo-500" />
                        <span className="font-medium text-gray-900">{text}</span>
                    </div>
                ),
            };
        }
        if (col.renderType === 'status-badge') {
            return {
                ...col,
                render: (status: string) => {
                    const color = status === 'Active' ? 'success' : status === 'Inactive' ? 'error' : 'warning';
                    return <Tag color={color} className="rounded-full px-2">{status}</Tag>;
                },
            };
        }
        if (col.renderType === 'action-menu') {
            return {
                ...col,
                render: () => (
                    <Dropdown
                        menu={{
                            items: [
                                { key: 'edit', label: 'Edit', icon: <EditOutlined /> },
                                { key: 'delete', label: 'Delete', icon: <DeleteOutlined />, danger: true },
                            ]
                        }}
                    >
                        <Button type="text" icon={<MoreOutlined />} className="text-gray-400 hover:text-gray-900" />
                    </Dropdown>
                ),
            };
        }
        return col;
    });

    if (error) {
        console.log(error, '9090');
        return <Alert message="Error loading data" type="error" showIcon />;
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
            <Table
                columns={processedColumns}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                size="middle"
                loading={isLoading && !fetchedData && !!apiUrl} // Show loading only if we are waiting for API
                rowKey={(record) => record.id || record.key} // Ensure we have a unique key, prefer ID from API
            />
        </div>
    );
}
