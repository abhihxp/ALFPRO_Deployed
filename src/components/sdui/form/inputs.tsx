'use client';

import React from 'react';
import { Input, Select, DatePicker, Form } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

// Generic Input Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SDUIInput = ({ name, label, type = 'text', placeholder, rules }: any) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    type === 'password' ? (
                        <Input.Password {...field} placeholder={placeholder} size="large" status={errors[name] ? 'error' : ''} />
                    ) : (
                        <Input {...field} type={type} placeholder={placeholder} size="large" status={errors[name] ? 'error' : ''} />
                    )
                )}
            />
            {errors[name] && <span className="text-red-500 text-xs mt-1">{(errors[name] as any)?.message || 'Field is required'}</span>}
        </div>
    );
};

// Generic Select Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SDUISelect = ({ name, label, options, placeholder, rules }: any) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select {...field} placeholder={placeholder} size="large" status={errors[name] ? 'error' : ''} className="w-full">
                        {options?.map((opt: string) => (
                            <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                        ))}
                    </Select>
                )}
            />
            {errors[name] && <span className="text-red-500 text-xs mt-1">{(errors[name] as any)?.message || 'Field is required'}</span>}
        </div>
    );
};

// Generic DatePicker Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SDUIDatePicker = ({ name, label, placeholder, rules }: any) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <DatePicker {...field} placeholder={placeholder} size="large" status={errors[name] ? 'error' : ''} className="w-full" />
                )}
            />
            {errors[name] && <span className="text-red-500 text-xs mt-1">{(errors[name] as any)?.message || 'Field is required'}</span>}
        </div>
    );
};
