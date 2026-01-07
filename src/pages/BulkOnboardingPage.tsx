/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Form, Button, message, Upload, Select } from 'antd'; // Added imports
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'; // Added imports
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

// Remove usage of DynamicForm for this page as requested
// Remove schema import

const BulkOnboardingPage = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const [previewData, setPreviewData] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);

    // Watch for file upload changes
    const uploadFileValue = Form.useWatch('uploadFile', form);

    useEffect(() => {
        if (uploadFileValue && uploadFileValue.fileList && uploadFileValue.fileList.length > 0) {
            const file = uploadFileValue.fileList[0].originFileObj;
            if (file) {
                parseFile(file);
            }
        } else {
            setPreviewData([]);
            setHeaders([]);
        }
    }, [uploadFileValue]);


    const parseFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            if (!data) return;

            try {
                // Use readAsArrayBuffer for better compatibility with XLSX
                // But here we used readAsBinaryString below.
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                if (parsedData && parsedData.length > 0) {
                    const extractedHeaders = parsedData[0] as string[];
                    setHeaders(extractedHeaders);

                    const rows = parsedData.slice(1).map((row: any) => {
                        const rowData: any = {};
                        extractedHeaders.forEach((header, index) => {
                            rowData[header] = row[index];
                        });
                        return rowData;
                    });

                    // Preview first 5 rows
                    setPreviewData(rows.slice(0, 5));
                }
            } catch (error) {
                console.error("Error parsing file:", error);
                message.error(t("Failed to parse file. Please upload a valid CSV or Excel file."));
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleFinish = (values: any) => {
        console.log('Form Values:', values);
        message.success("Bulk onboarding submitted successfully!");
    };

    const downloadTemplate = () => {
        const link = document.createElement('a'); // Create a virtual link
        link.href = '/employee_bulk_upload_sample.csv';
        link.download = 'employee_bulk_upload_sample.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClearAll = () => {
        form.resetFields();
        setPreviewData([]);
        setHeaders([]);
    };

    // Custom Placeholder for Select
    const processingModeValue = Form.useWatch('processingMode', form);
    const showSelectPlaceholder = !processingModeValue;


    return (
        <div className="w-full mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('Bulk Onboarding')}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {t('Upload employee data in bulk using CSV or Excel file')}
                    </p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    className="min-h-[200px]"
                >
                    <div className="grid grid-cols-12 gap-x-6 gap-y-6">
                        {/* Download Template Link */}
                        <div className="col-span-12">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Need a template?</span>
                                <Button
                                    type="link"
                                    icon={<DownloadOutlined />}
                                    onClick={downloadTemplate}
                                    className="p-0 h-auto font-medium text-primary hover:text-purple-700"
                                >
                                    Download Sample CSV
                                </Button>
                            </div>
                        </div>

                        {/* Processing Mode - Custom Handled */}
                        <div className="col-span-12 md:col-span-6 lg:col-span-6">
                            <Form.Item name="processingMode" rules={[{ required: true, message: 'Processing Mode is required' }]} className="mb-0">
                                <div className="relative">
                                    <Select
                                        className="w-full h-10 rounded-lg [&_.ant-select-selection-placeholder]:!text-gray-500 dark:[&_.ant-select-selection-placeholder]:!text-gray-400"
                                        placeholder={!showSelectPlaceholder ? undefined : undefined} // We rely on custom overlay
                                        allowClear
                                    >
                                        <Select.Option value="validate_only">Validate Only</Select.Option>
                                        <Select.Option value="process_valid">Process Valid Records</Select.Option>
                                        <Select.Option value="stop_on_error">Stop on First Error</Select.Option>
                                    </Select>
                                    {showSelectPlaceholder && (
                                        <span className="absolute left-3 top-0 bottom-0 flex items-center text-gray-400 pointer-events-none z-10 select-none">
                                            <span className="text-red-500 font-normal mr-1">*</span>
                                            <span className="text-gray-500 dark:text-gray-400">Processing Mode</span>
                                        </span>
                                    )}
                                </div>
                            </Form.Item>
                        </div>


                        {/* File Upload Field - Custom Handled */}
                        <div className="col-span-12 md:col-span-6 lg:col-span-6">
                            <Form.Item
                                name="uploadFile"
                                rules={[{ required: true, message: 'File is required' }]}
                                className="mb-0"
                            >
                                <Upload maxCount={1} beforeUpload={() => false} className="w-full">
                                    <Button icon={<UploadOutlined />} className="w-full h-10 text-left flex items-center rounded-lg text-gray-500 border-gray-300 dark:border-gray-600 dark:bg-transparent dark:text-gray-300">
                                        {!uploadFileValue?.fileList?.length ? (
                                            <>
                                                <span className="text-red-500 mr-1">*</span>
                                                Create or Upload File
                                            </>
                                        ) : 'File Selected'}
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>


                    {/* Preview Table */}
                    {previewData.length > 0 && (
                        <div className="mt-8 overflow-x-auto">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                {t('Preview (First 5 Rows)')}
                            </h3>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        {headers.map((header, index) => (
                                            <th
                                                key={`head-${index}`}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {previewData.map((row, rowIndex) => (
                                        <tr key={`row-${rowIndex}`}>
                                            {headers.map((header, colIndex) => (
                                                <td
                                                    key={`${rowIndex}-${colIndex}`}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                                >
                                                    {row[header]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end gap-3">
                        <Button
                            onClick={() => form.resetFields()} // Or handleCancel navigation
                            className="h-10 px-6"
                        >
                            {t('Cancel')}
                        </Button>
                        <Button
                            onClick={handleClearAll}
                            className="h-10 px-6"
                        >
                            {t('Clear All')}
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-primary hover:bg-purple-700 border-none h-10 px-8"
                        >
                            {t('Submit')}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default BulkOnboardingPage;
