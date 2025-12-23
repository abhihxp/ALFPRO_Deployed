'use client';

import React from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FilterBar({ searchPlaceholder, filters }: any) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <div className="w-full sm:w-1/3">
                <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder={searchPlaceholder}
                    size="large"
                    className="rounded-md"
                />
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
                {filters?.map((filter: { key: string; label: string; options: string[] }) => (
                    <Select
                        key={filter.key}
                        placeholder={filter.label}
                        style={{ width: 140 }}
                        size="large"
                        allowClear
                    >
                        {filter.options.map((opt) => (
                            <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                        ))}
                    </Select>
                ))}
                <Button icon={<FilterOutlined />} size="large">More</Button>
            </div>
        </div>
    );
}
