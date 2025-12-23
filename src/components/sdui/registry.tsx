'use client';

import React from 'react';
import {
    SDUIContainer,
    SDUIRow,
    SDUICol,
    SDUICard,
    SDUIText,
    SDUIButton,
} from './wrappers/layout-wrappers';
import SmartTable from './smart-table';
import PageHeader from './page-header';
import FilterBar from './filter-bar';
import Wizard from './wizard';
import { SDUIInput, SDUISelect, SDUIDatePicker } from './form/inputs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
    container: SDUIContainer,
    row: SDUIRow,
    col: SDUICol,
    card: SDUICard,
    text: SDUIText,
    button: SDUIButton,
    // Complex components (Phase 5)
    'smart-table': SmartTable,
    'page-header': PageHeader,
    'filter-bar': FilterBar,
    // Phase 7
    'wizard': Wizard,
    'input': SDUIInput,
    'select': SDUISelect,
    'date-picker': SDUIDatePicker,
};

export function getComponent(type: string) {
    return COMPONENT_MAP[type] || (() => <div>Unknown Component: {type}</div>);
}
