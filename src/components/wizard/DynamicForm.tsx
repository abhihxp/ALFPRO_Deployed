import React from 'react';
import { Form, Input, Select, DatePicker, Radio, Upload, Button, InputNumber } from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { WizardField } from '../../data/onboardingSchema';

interface DynamicFormProps {
    fields: WizardField[];
    form: any; // Antd Form Instance
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, form }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language as 'en' | 'ar';

    // Watch for dependency changes
    const values = Form.useWatch([], form);

    return (
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
            {fields.map((field) => {
                // Dependency Logic
                if (field.dependsOn) {
                    const dependentValue = values?.[field.dependsOn.field as keyof typeof values];
                    const conditionMet = field.dependsOn.condition === 'equals'
                        ? dependentValue === field.dependsOn.value
                        : dependentValue !== field.dependsOn.value;

                    if (!conditionMet) return null;
                }

                // Generic Rule for required fields
                const rules = field.required ? [{ required: true, message: `${field.label[currentLang]} is required` }] : [];

                return (
                    <div key={field.name} className={`col-span-12 md:col-span-${field.colSpan || 12}`}>
                        <Form.Item
                            name={field.name}
                            label={field.label[currentLang]}
                            rules={rules}
                            tooltip={field.tooltip ? {
                                title: field.tooltip[currentLang],
                                icon: <InfoCircleOutlined className="text-gray-400" />
                            } : undefined}
                            className="mb-0"
                            layout="vertical"
                        >
                            {renderFieldInput(field, currentLang)}
                        </Form.Item>
                    </div>
                );
            })}
        </div>
    );
};

const renderFieldInput = (field: WizardField, lang: 'en' | 'ar') => {
    const placeholder = field.placeholder?.[lang];

    switch (field.type) {
        case 'text':
            return <Input placeholder={placeholder} className="h-10 rounded-lg" />;

        case 'number':
            return <InputNumber
                placeholder={placeholder}
                className="w-full h-10 rounded-lg py-1"
                min={field.min}
            />;

        case 'select':
            return (
                <Select placeholder={placeholder} className="h-10 rounded-lg">
                    {field.options?.map(opt => (
                        <Select.Option key={opt.value} value={opt.value}>
                            {opt.label[lang]}
                        </Select.Option>
                    ))}
                </Select>
            );

        case 'date':
            return <DatePicker className="w-full h-10 rounded-lg" placeholder={placeholder} />;

        case 'radio':
            return (
                <Radio.Group>
                    {field.options?.map(opt => (
                        <Radio key={opt.value} value={opt.value}>
                            {opt.label[lang]}
                        </Radio>
                    ))}
                </Radio.Group>
            );

        case 'file':
            return (
                <Upload maxCount={1} action="/api/upload" className="w-full">
                    <Button icon={<UploadOutlined />} className="w-full h-10 rounded-lg text-left flex items-center">
                        {placeholder || (lang === 'ar' ? 'رفع ملف' : 'Click to Upload')}
                    </Button>
                </Upload>
            );

        default:
            return <Input />;
    }
};

export default DynamicForm;
