import React, { useState } from 'react';
import { Steps, Form, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import type { OnboardingSchema } from '../../data/onboardingSchema';
import DynamicForm from './DynamicForm';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WizardProps {
    schema: OnboardingSchema;
}

const Wizard: React.FC<WizardProps> = ({ schema }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isRtl = i18n.language === 'ar';

    const currentLang = i18n.language as 'en' | 'ar';

    const next = async () => {
        try {
            await form.validateFields();
            // Store current step data if needed (Antd Form keeps state in this simple case)
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleFinish = (values: any) => {
        console.log('Form Values:', values);
        message.success(schema.successMessage[currentLang]);
        navigate('/employees');
    };

    const items = schema.steps.map((item) => ({
        key: item.id,
        title: item.title[currentLang],
        description: item.description[currentLang] // Optional: hide description on mobile
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{schema.title[currentLang]}</h2>
                <p className="text-gray-500 dark:text-gray-400">{schema.description[currentLang]}</p>
            </div>

            <Steps
                current={currentStep}
                items={items}
                className="mb-10 px-4"
                responsive={true}
            />

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{}}
                className="min-h-[400px]"
            >
                {/* Render only current step fields, but keep form instance alive */}
                <div className="mb-8">
                    <DynamicForm
                        fields={schema.steps[currentStep].fields}
                        form={form}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                    {currentStep > 0 ? (
                        <Button
                            onClick={prev}
                            className="h-10 px-6 flex items-center gap-2 rounded-lg"
                        >
                            {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                            {t('Previous', 'Previous')}
                        </Button>
                    ) : (
                        <div></div> // Spacer
                    )}

                    {currentStep < schema.steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={next}
                            className="h-10 px-6 flex items-center gap-2 rounded-lg bg-primary hover:bg-purple-700 border-none"
                        >
                            {t('Next', 'Next')}
                            {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                        </Button>
                    )}

                    {currentStep === schema.steps.length - 1 && (
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="h-10 px-6 flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 border-none"
                        >
                            {t('Submit', 'Submit')}
                            <Check size={16} />
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default Wizard;
