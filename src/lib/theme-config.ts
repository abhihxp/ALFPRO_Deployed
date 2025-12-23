import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#4f46e5', // Indigo-600
        colorInfo: '#4f46e5',
        borderRadius: 6,
        fontFamily: 'var(--font-geist-sans)',
    },
    components: {
        Layout: {
            bodyBg: '#f3f4f6', // gray-100
            headerBg: '#ffffff',
            siderBg: '#ffffff',
        },
        Menu: {
            itemSelectedBg: '#e0e7ff', // indigo-100
            itemSelectedColor: '#4f46e5', // indigo-600
        },
    },
};
