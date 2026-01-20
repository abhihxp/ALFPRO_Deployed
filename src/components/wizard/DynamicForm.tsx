 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Input, Select, DatePicker, Radio, Upload, Button, InputNumber, Switch, Checkbox, TimePicker } from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface DynamicFormProps {
    schema: any;
    form: any; // Antd Form Instance
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema, form }) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language as 'en' | 'ar';

    // Normalize schema to handle both array (legacy) and object (new) formats
    const sections = Array.isArray(schema) ? schema : (schema.sections || []);

    // Watch for dependency changes
    const values = Form.useWatch([], form) as any;

    const getLocalizedText = (text: any) => {
        if (!text) return '';
        if (typeof text === 'string') {
            if (text.startsWith('form.')) {
                return t(text);
            }
            return text;
        }
        return text[currentLang] || text.en || '';
    };

    return (
        <div className="flex flex-col gap-16">
            {sections.map((section: any, sectionIdx: number) => (
                <div key={sectionIdx}>
                    {section.title && (
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400 pb-2">
                                {section.title.startsWith('form.') ? t(section.title) : section.title}
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
                            const label = field.label.startsWith('form.') ? t(field.label) : field.label;
                            const rules = field.required ? [{ required: true, message: `${label} is required` }] : [];
                            const colSpan = field.colSpan || "12 md:col-span-6 lg:col-span-6";

                            return (
                                <div
                                    key={field.name}
                                    className={`col-span-${colSpan}`}
                                    style={{ gridColumn: `span ${colSpan}` }}
                                >
                                    <Form.Item
                                        label={label}
                                        name={field.name}
                                        rules={rules}
                                        valuePropName={field.type === 'switch' ? 'checked' : 'value'}
                                        tooltip={
                                            field.tooltip
                                                ? {
                                                    title: field.tooltip.startsWith('form.') ? t(field.tooltip) : field.tooltip,
                                                    icon: (
                                                        <InfoCircleOutlined className="text-gray-400" />
                                                    ),
                                                }
                                                : undefined
                                        }
                                        className="mb-0 dynamic-form-item"
                                        layout="vertical"
                                    >
                                        {renderFieldInput(field, currentLang, values?.[field.name], getLocalizedText, t)}
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

const renderFieldInput = (field: any, lang: 'en' | 'ar', value: any, getLocalizedText: (t: any) => string, t: any) => {
    const originalPlaceholder = getLocalizedText(field.placeholder);

    // Check if field has value to toggle custom placeholder visibility
    const hasValue = value !== undefined && value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
    // Ensure custom placeholder shows if required and no value
    const showCustomPlaceholder = field.required && !hasValue;

    // If showing custom overlay, hide native placeholder. If not required, show native placeholder.
    const inputPlaceholder = showCustomPlaceholder ? undefined : originalPlaceholder;

    const commonClasses = "rounded-lg placeholder:!text-gray-500 dark:placeholder:!text-gray-400 w-full"; // Forced color
    const selectPlaceholderClass = "[&_.ant-select-selection-placeholder]:!text-gray-500 dark:[&_.ant-select-selection-placeholder]:!text-gray-400";
    
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
                            {opt.label.startsWith('form.') ? t(opt.label) : opt.label}
                        </Select.Option>
                    ))}
                </Select>
            );
            break;

        case 'date':
            inputElement = <DatePicker className={`w-full h-10 ${commonClasses}`} placeholder={inputPlaceholder} />;
            break;

        case 'time':
            inputElement = <TimePicker className={`w-full h-10 ${commonClasses}`} placeholder={inputPlaceholder} format={field.format || "HH:mm"} />;
            break;

        case 'radio':
            return (
                <Radio.Group>
                    {field.options?.map((opt: any) => (
                        <Radio key={opt.value} value={opt.value}>
                            {opt.label.startsWith('form.') ? t(opt.label) : opt.label}
                        </Radio>
                    ))}
                </Radio.Group>
            );

        case 'switch':
            return (
                <div className="flex items-center gap-2">
                    <Switch />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{field.label.startsWith('form.') ? t(field.label) : field.label}</span>
                </div>
            );

        case 'checkbox-group':
            return (
                <Checkbox.Group className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {field.options?.map((opt: any) => (
                            <Checkbox key={opt.value} value={opt.value}>
                                {opt.label.startsWith('form.') ? t(opt.label) : opt.label}
                            </Checkbox>
                        ))}
                    </div>
                </Checkbox.Group>
            );

        case 'textarea': {
            const rows = field.name === 'presentAddress' || field.name === 'permanentAddress' ? 8 : 6;
            inputElement = <Input.TextArea rows={rows} placeholder={inputPlaceholder} className={`${commonClasses}`} />;
            break;
        }

        case 'file':
            return (
                <Upload maxCount={1} action="/api/upload" className="w-full">
                    <Button icon={<UploadOutlined />} className={`w-full h-10 text-left flex items-center ${commonClasses} text-gray-500`}>
                        {inputPlaceholder || (lang === 'ar' ? 'رفع ملف' : 'Click to Upload')}
                    </Button>
                </Upload>
            );

        default:
            inputElement = <Input className={commonClasses} />;
    }

    return inputElement;
};

export default DynamicForm;
