'use client';

import React, { useState } from 'react';
import { Steps, Button, message, Card } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import SDUIRenderer from './renderer';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Wizard({ steps, submitUrl, title }: any) {
    const [current, setCurrent] = useState(0);
    const methods = useForm();
    const router = useRouter();

    const next = async () => {
        const valid = await methods.trigger();
        // In a real generic wizard, we might validate only fields in the current step.
        // For simplicity, we trigger generic validation. 
        // A better approach is to separate schemas per step, but we are keeping it simple for the agent demo.
        if (valid) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch(submitUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                message.success('Processing complete!');
                router.push('/dashboard/employees');
            } else {
                message.error('Submission failed.');
                console.error(await response.text());
            }
        } catch (error) {
            message.error('Network error occurred.');
            console.error(error);
        }
    };

    const items = steps.map((item: any) => ({ key: item.title, title: item.title }));

    return (
        <div className="w-full">
            <Card title={title} className="shadow-md">
                <Steps current={current} items={items} className="mb-8" />

                <FormProvider {...methods}>
                    <form>
                        {/* Render Current Step Content */}
                        <div className="min-h-[300px]">
                            <SDUIRenderer schema={steps[current].content} />
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Previous
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={methods.handleSubmit(onSubmit)} className="bg-green-600 hover:bg-green-500">
                                    Done
                                </Button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    );
}
