import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { PlusOutlined, DownloadOutlined, HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PageHeader({ title, breadcrumbs, primaryAction, secondaryAction }: any) {
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const breadcrumbItems = breadcrumbs?.map((b: any, index: number) => ({
        title: index === 0 ? <><HomeOutlined /> {b.title}</> : b.title
    }));

    const getIcon = (iconName: string) => {
        if (iconName === 'plus') return <PlusOutlined />;
        if (iconName === 'download') return <DownloadOutlined />;
        return null;
    };

    const handlePrimaryAction = () => {
        if (primaryAction?.label === 'Add Employee') {
            router.push('/dashboard/employees/new');
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 border-b border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>

            <div className="flex gap-3">
                {secondaryAction && (
                    <Button icon={getIcon(secondaryAction.icon)} size="large">
                        {secondaryAction.label}
                    </Button>
                )}
                {primaryAction && (
                    <Button
                        type="primary"
                        icon={getIcon(primaryAction.icon)}
                        size="large"
                        className="bg-indigo-600 hover:bg-indigo-500"
                        onClick={handlePrimaryAction}
                    >
                        {primaryAction.label}
                    </Button>
                )}
            </div>
        </div>
    );
}
