'use client';

import React from 'react';
import { SDUISchema } from '@/types/sdui';
import { getComponent } from './registry';
import { checkVisibility } from './visibility';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface SDUIRendererProps {
    schema: SDUISchema;
}

export default function SDUIRenderer({ schema }: SDUIRendererProps) {
    // Get user permissions from Redux (mocked for now in authSlice as string[])
    const user = useSelector((state: RootState) => state.auth.user);

    // 1. Visibility Check
    const isVisible = checkVisibility(schema, user?.permissions);
    if (!isVisible) {
        return null;
    }

    // 2. Resolve Component
    const Component = getComponent(schema.type);

    // 3. Recursive Render Logic
    return (
        <Component {...schema.props} key={schema.id}>
            {schema.children?.map((child) => (
                <SDUIRenderer key={child.id} schema={child} />
            ))}
        </Component>
    );
}
