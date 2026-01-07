/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Input, Select, DatePicker, Radio, Upload, Button, InputNumber } from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface DynamicFormProps {
    schema: any[];
    form: any; // Antd Form Instance
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, form }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language as 'en' | 'ar';

    // Watch for dependency changes
    const values = Form.useWatch([], form) as any;

    const getLocalizedText = (text: any) => {
        if (!text) return '';
        if (typeof text === 'string') return text;
        return text[currentLang] || text.en || '';
    };

    return (
        <div className="flex flex-col gap-16">
            {schema.map((section: any, sectionIdx: number) => (
                <div key={sectionIdx}>
                    {section.title && (
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 pb-2">
                                {getLocalizedText(section.title)}
                            </h3>
                        </div>
                    )}

                    <div className="grid grid-cols-12 gap-x-6 gap-y-6">
                        {section.fields?.map((field: any) => {
                            // Dependency Logic
                            if (field.dependsOn) {
                                const dependentValue = values?.[field.dependsOn.field];
                                const conditionMet = field.dependsOn.condition === 'equals'
                                    ? dependentValue === field.dependsOn.value
                                    : dependentValue !== field.dependsOn.value;

                                if (!conditionMet) return null;
                            }

                            // Generic Rule for required fields
                            const label = getLocalizedText(field.label);
                            const rules = field.required ? [{ required: true, message: `${label} is required` }] : [];
                            const fieldValue = values?.[field.name];
                            const colSpan = field.colSpan || "12 md:col-span-6 lg:col-span-6";

                            return (
                                <div
                                    key={field.name}
                                    className={`col-span-${colSpan}`}
                                    style={{ gridColumn: `span ${colSpan}` }}
                                >
                                    <Form.Item
                                        name={field.name}
                                        rules={rules}
                                        tooltip={
                                            field.tooltip
                                                ? {
                                                    title: getLocalizedText(field.tooltip),
                                                    icon: (
                                                        <InfoCircleOutlined className="text-gray-400" />
                                                    ),
                                                }
                                                : undefined
                                        }
                                        className="mb-0 dynamic-form-item"
                                        layout="vertical"
                                    >
                                        <div className="relative">
                                            {renderFieldInput(field, currentLang, fieldValue, getLocalizedText)}
                                        </div>
                                    </Form.Item>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const renderFieldInput = (field: any, lang: 'en' | 'ar', value: any, getLocalizedText: (t: any) => string) => {
    const originalPlaceholder = getLocalizedText(field.placeholder);

    // Check if field has value to toggle custom placeholder visibility
    const hasValue = value !== undefined && value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
    // Ensure custom placeholder shows if required and no value
    const showCustomPlaceholder = field.required && !hasValue;

    // If showing custom overlay, hide native placeholder. If not required, show native placeholder.
    const inputPlaceholder = showCustomPlaceholder ? undefined : originalPlaceholder;

    const commonClasses = "rounded-lg placeholder:!text-gray-500 dark:placeholder:!text-gray-400 w-full"; // Forced color
    const selectPlaceholderClass = "[&_.ant-select-selection-placeholder]:!text-gray-500 dark:[&_.ant-select-selection-placeholder]:!text-gray-400";

    const CustomPlaceholder = () => (
        <span className={`absolute left-3 text-gray-500 pointer-events-none z-10 select-none ${field.type === 'textarea' ? 'top-3' : 'top-0 bottom-0 flex items-center'}`}>
            <span className="text-red-500 font-normal mr-1">*</span>
            <span className="text-gray-500 dark:text-gray-400">{originalPlaceholder}</span>
        </span>
    );

    let inputElement = <Input className={commonClasses} />;

    switch (field.type) {
        case 'text':
            inputElement = <Input placeholder={inputPlaceholder} className={`h-10 ${commonClasses}`} />;
            break;

        case 'number':
            inputElement = <InputNumber
                placeholder={inputPlaceholder}
                className={`w-full h-10 py-1 ${commonClasses}`}
                min={field.min}
            />;
            break;

        case 'select':
            inputElement = (
                <Select placeholder={inputPlaceholder} className={`h-10 ${commonClasses} ${selectPlaceholderClass}`} allowClear>
                    {field.options?.map((opt: any) => (
                        <Select.Option key={opt.value} value={opt.value}>
                            {getLocalizedText(opt.label)}
                        </Select.Option>
                    ))}
                </Select>
            );
            break;

        case 'date':
            inputElement = <DatePicker className={`w-full h-10 ${commonClasses}`} placeholder={inputPlaceholder} />;
            break;

        case 'radio':
            // Radio doesn't generally have a placeholder in the same way, but preventing error
            return (
                <Radio.Group>
                    {field.options?.map((opt: any) => (
                        <Radio key={opt.value} value={opt.value}>
                            {getLocalizedText(opt.label)}
                        </Radio>
                    ))}
                </Radio.Group>
            );

        case 'textarea': {
            const rows = field.name === 'presentAddress' || field.name === 'permanentAddress' ? 8 : 6;
            inputElement = <Input.TextArea rows={rows} placeholder={inputPlaceholder} className={`${commonClasses}`} />;
            break;
        }

        case 'file':
            // Custom simplified placeholder for file input (button) to include red star inside text
            return (
                <Upload maxCount={1} action="/api/upload" className="w-full">
                    <Button icon={<UploadOutlined />} className={`w-full h-10 text-left flex items-center ${commonClasses} text-gray-500`}>
                        {field.required ? <span className="text-red-500 mr-1">*</span> : null}
                        {originalPlaceholder || (lang === 'ar' ? 'رفع ملف' : 'Click to Upload')}
                    </Button>
                </Upload>
            );

        default:
            inputElement = <Input className={commonClasses} />;
    }

    return (
        <>
            {inputElement}
            {showCustomPlaceholder && field.type !== 'file' && <CustomPlaceholder />}
        </>
    );
};

export default DynamicForm;
