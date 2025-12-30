
export interface BilingualString {
    en: string;
    ar: string;
}

export interface WizardField {
    name: string;
    type: 'text' | 'number' | 'date' | 'select' | 'radio' | 'file';
    label: BilingualString;
    placeholder?: BilingualString;
    required?: boolean;
    colSpan?: number;
    options?: { value: string; label: BilingualString }[];
    validation?: any; // Placeholder for Yup/Zod schema if used
    tooltip?: BilingualString;
    min?: number;
    defaultValue?: any;
    accept?: string;
    dependsOn?: {
        field: string;
        value: any;
        condition: 'equals' | 'notEquals';
    };
}

export interface WizardStep {
    id: string;
    title: BilingualString;
    description: BilingualString;
    fields: WizardField[];
}

export interface OnboardingSchema {
    id: string;
    title: BilingualString;
    description: BilingualString;
    steps: WizardStep[];
    submitUrl: string;
    successMessage: BilingualString;
}

// Temporary placeholder schemas to allow the file to compile
const emiratesIdSchema = {};
const uaeIbanSchema = {};

export const onboardingSchema: OnboardingSchema = {
    id: 'employee-onboarding',
    title: {
        en: 'Employee Onboarding',
        ar: 'إضافة موظف',
    },
    description: {
        en: 'Complete employee registration with all required details',
        ar: 'أكمل تسجيل الموظف مع جميع التفاصيل المطلوبة',
    },
    steps: [
        {
            id: 'personal-information',
            title: {
                en: 'Personal Information',
                ar: 'المعلومات الشخصية',
            },
            description: {
                en: 'Basic personal details',
                ar: 'التفاصيل الشخصية الأساسية',
            },
            fields: [
                {
                    name: 'fullNameEn',
                    type: 'text',
                    label: {
                        en: 'Full Name (English)',
                        ar: 'الاسم الكامل (إنجليزي)',
                    },
                    placeholder: {
                        en: 'Enter full name in English',
                        ar: 'أدخل الاسم الكامل بالإنجليزية',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'fullNameAr',
                    type: 'text',
                    label: {
                        en: 'Full Name (Arabic)',
                        ar: 'الاسم الكامل (عربي)',
                    },
                    placeholder: {
                        en: 'Enter full name in Arabic',
                        ar: 'أدخل الاسم الكامل بالعربية',
                    },
                    required: true,
                    colSpan: 6,
                    tooltip: {
                        en: 'Required for government forms',
                        ar: 'مطلوب للنماذج الحكومية',
                    },
                },
                {
                    name: 'nationality',
                    type: 'select',
                    label: {
                        en: 'Nationality',
                        ar: 'الجنسية',
                    },
                    required: true,
                    colSpan: 6,
                    options: [
                        { value: 'AE', label: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' } },
                        { value: 'SA', label: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' } },
                        { value: 'IN', label: { en: 'India', ar: 'الهند' } },
                        { value: 'PK', label: { en: 'Pakistan', ar: 'باكستان' } },
                        { value: 'PH', label: { en: 'Philippines', ar: 'الفلبين' } },
                        { value: 'BD', label: { en: 'Bangladesh', ar: 'بنغلاديش' } },
                        { value: 'EG', label: { en: 'Egypt', ar: 'مصر' } },
                        { value: 'JO', label: { en: 'Jordan', ar: 'الأردن' } },
                        { value: 'GB', label: { en: 'United Kingdom', ar: 'المملكة المتحدة' } },
                        { value: 'US', label: { en: 'United States', ar: 'الولايات المتحدة' } },
                        { value: 'OTHER', label: { en: 'Other', ar: 'أخرى' } },
                    ],
                },
                {
                    name: 'dateOfBirth',
                    type: 'date',
                    label: {
                        en: 'Date of Birth',
                        ar: 'تاريخ الميلاد',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'maritalStatus',
                    type: 'select',
                    label: {
                        en: 'Marital Status',
                        ar: 'الحالة الاجتماعية',
                    },
                    required: true,
                    colSpan: 6,
                    options: [
                        { value: 'single', label: { en: 'Single', ar: 'أعزب' } },
                        { value: 'married', label: { en: 'Married', ar: 'متزوج' } },
                        { value: 'divorced', label: { en: 'Divorced', ar: 'مطلق' } },
                        { value: 'widowed', label: { en: 'Widowed', ar: 'أرمل' } },
                    ],
                },
                {
                    name: 'gender',
                    type: 'radio',
                    label: {
                        en: 'Gender',
                        ar: 'الجنس',
                    },
                    required: true,
                    colSpan: 6,
                    options: [
                        { value: 'male', label: { en: 'Male', ar: 'ذكر' } },
                        { value: 'female', label: { en: 'Female', ar: 'أنثى' } },
                    ],
                },
            ],
        },
        {
            id: 'immigration-identity',
            title: {
                en: 'Immigration & Identity',
                ar: 'الهجرة والهوية',
            },
            description: {
                en: 'UAE legal documents and visa information',
                ar: 'المستندات القانونية ومعلومات التأشيرة في الإمارات',
            },
            fields: [
                {
                    name: 'emiratesId',
                    type: 'text',
                    label: {
                        en: 'Emirates ID Number',
                        ar: 'رقم الهوية الإماراتية',
                    },
                    placeholder: {
                        en: '784-XXXX-XXXXXXX-X',
                        ar: '784-XXXX-XXXXXXX-X',
                    },
                    required: true,
                    colSpan: 6,
                    validation: emiratesIdSchema,
                },
                {
                    name: 'emiratesIdExpiry',
                    type: 'date',
                    label: {
                        en: 'Emirates ID Expiry Date',
                        ar: 'تاريخ انتهاء الهوية الإماراتية',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'passportNumber',
                    type: 'text',
                    label: {
                        en: 'Passport Number',
                        ar: 'رقم جواز السفر',
                    },
                    placeholder: {
                        en: 'Enter passport number',
                        ar: 'أدخل رقم جواز السفر',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'passportExpiry',
                    type: 'date',
                    label: {
                        en: 'Passport Expiry Date',
                        ar: 'تاريخ انتهاء جواز السفر',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'visaFileNumber',
                    type: 'text',
                    label: {
                        en: 'Visa/Residency File Number',
                        ar: 'رقم ملف التأشيرة/الإقامة',
                    },
                    placeholder: {
                        en: 'Enter visa file number',
                        ar: 'أدخل رقم ملف التأشيرة',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'visaExpiry',
                    type: 'date',
                    label: {
                        en: 'Visa Expiry Date',
                        ar: 'تاريخ انتهاء التأشيرة',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'visaType',
                    type: 'select',
                    label: {
                        en: 'Visa Type',
                        ar: 'نوع التأشيرة',
                    },
                    required: true,
                    colSpan: 12,
                    options: [
                        { value: 'employment', label: { en: 'Employment Visa', ar: 'تأشيرة عمل' } },
                        { value: 'visit', label: { en: 'Visit Visa', ar: 'تأشيرة زيارة' } },
                        { value: 'golden', label: { en: 'Golden Visa', ar: 'التأشيرة الذهبية' } },
                        { value: 'investor', label: { en: 'Investor Visa', ar: 'تأشيرة مستثمر' } },
                        { value: 'mission', label: { en: 'Mission Visa', ar: 'تأشيرة مهمة' } },
                    ],
                },
            ],
        },
        {
            id: 'employment-compensation',
            title: {
                en: 'Employment & Compensation',
                ar: 'التوظيف والرواتب',
            },
            description: {
                en: 'Job details and WPS-compliant salary breakdown',
                ar: 'تفاصيل الوظيفة وتفصيل الراتب المتوافق مع نظام حماية الأجور',
            },
            fields: [
                {
                    name: 'joiningDate',
                    type: 'date',
                    label: {
                        en: 'Joining Date',
                        ar: 'تاريخ الالتحاق',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'employeeCode',
                    type: 'text',
                    label: {
                        en: 'Employee Code',
                        ar: 'رمز الموظف',
                    },
                    placeholder: {
                        en: 'EMP-XXXX',
                        ar: 'EMP-XXXX',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'department',
                    type: 'select',
                    label: {
                        en: 'Department',
                        ar: 'القسم',
                    },
                    required: true,
                    colSpan: 6,
                    options: [
                        { value: 'it', label: { en: 'IT', ar: 'تقنية المعلومات' } },
                        { value: 'hr', label: { en: 'HR', ar: 'الموارد البشرية' } },
                        { value: 'finance', label: { en: 'Finance', ar: 'المالية' } },
                        { value: 'operations', label: { en: 'Operations', ar: 'العمليات' } },
                        { value: 'sales', label: { en: 'Sales', ar: 'المبيعات' } },
                        { value: 'marketing', label: { en: 'Marketing', ar: 'التسويق' } },
                    ],
                },
                {
                    name: 'designation',
                    type: 'text',
                    label: {
                        en: 'Designation',
                        ar: 'المسمى الوظيفي',
                    },
                    placeholder: {
                        en: 'e.g., Senior Software Engineer',
                        ar: 'مثال: مهندس برمجيات أول',
                    },
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'basicSalary',
                    type: 'number',
                    label: {
                        en: 'Basic Salary (AED)',
                        ar: 'الراتب الأساسي (درهم)',
                    },
                    placeholder: {
                        en: 'Enter basic salary',
                        ar: 'أدخل الراتب الأساسي',
                    },
                    required: true,
                    colSpan: 6,
                    min: 0,
                    tooltip: {
                        en: 'Used for gratuity calculation',
                        ar: 'يستخدم لحساب مكافأة نهاية الخدمة',
                    },
                },
                {
                    name: 'housingAllowance',
                    type: 'number',
                    label: {
                        en: 'Housing Allowance (AED)',
                        ar: 'بدل السكن (درهم)',
                    },
                    required: false,
                    colSpan: 6,
                    min: 0,
                    defaultValue: 0,
                },
                {
                    name: 'transportAllowance',
                    type: 'number',
                    label: {
                        en: 'Transport Allowance (AED)',
                        ar: 'بدل النقل (درهم)',
                    },
                    required: false,
                    colSpan: 6,
                    min: 0,
                    defaultValue: 0,
                },
                {
                    name: 'otherAllowances',
                    type: 'number',
                    label: {
                        en: 'Other Allowances (AED)',
                        ar: 'بدلات أخرى (درهم)',
                    },
                    required: false,
                    colSpan: 6,
                    min: 0,
                    defaultValue: 0,
                },
                {
                    name: 'bankName',
                    type: 'select',
                    label: {
                        en: 'Bank Name',
                        ar: 'اسم البنك',
                    },
                    required: true,
                    colSpan: 6,
                    options: [
                        { value: 'adcb', label: { en: 'ADCB', ar: 'بنك أبوظبي التجاري' } },
                        { value: 'emirates_nbd', label: { en: 'Emirates NBD', ar: 'بنك الإمارات دبي الوطني' } },
                        { value: 'fgb', label: { en: 'First Gulf Bank', ar: 'بنك الخليج الأول' } },
                        { value: 'mashreq', label: { en: 'Mashreq Bank', ar: 'بنك المشرق' } },
                        { value: 'cbd', label: { en: 'CBD', ar: 'بنك دبي التجاري' } },
                        { value: 'rakbank', label: { en: 'RAKBANK', ar: 'بنك رأس الخيمة الوطني' } },
                        { value: 'other', label: { en: 'Other', ar: 'أخرى' } },
                    ],
                },
                {
                    name: 'iban',
                    type: 'text',
                    label: {
                        en: 'IBAN',
                        ar: 'رقم الآيبان',
                    },
                    placeholder: {
                        en: 'AE070331234567890123456',
                        ar: 'AE070331234567890123456',
                    },
                    required: true,
                    colSpan: 6,
                    validation: uaeIbanSchema,
                    tooltip: {
                        en: 'UAE IBAN must be 23 characters',
                        ar: 'رقم الآيبان الإماراتي يجب أن يكون 23 حرفاً',
                    },
                },
                {
                    name: 'wpsAgentId',
                    type: 'text',
                    label: {
                        en: 'WPS Agent ID',
                        ar: 'معرف وكيل حماية الأجور',
                    },
                    placeholder: {
                        en: 'Enter WPS agent ID',
                        ar: 'أدخل معرف وكيل حماية الأجور',
                    },
                    required: false,
                    colSpan: 6,
                    tooltip: {
                        en: 'Required for Wage Protection System',
                        ar: 'مطلوب لنظام حماية الأجور',
                    },
                },
            ],
        },
        {
            id: 'documents',
            title: {
                en: 'Documents',
                ar: 'المستندات',
            },
            description: {
                en: 'Upload required documents',
                ar: 'تحميل المستندات المطلوبة',
            },
            fields: [
                {
                    name: 'passportCopy',
                    type: 'file',
                    label: {
                        en: 'Passport Copy',
                        ar: 'نسخة من جواز السفر',
                    },
                    accept: 'image/*,application/pdf',
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'emiratesIdCopy',
                    type: 'file',
                    label: {
                        en: 'Emirates ID Copy',
                        ar: 'نسخة من الهوية الإماراتية',
                    },
                    accept: 'image/*,application/pdf',
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'visaCopy',
                    type: 'file',
                    label: {
                        en: 'Visa Copy',
                        ar: 'نسخة من التأشيرة',
                    },
                    accept: 'image/*,application/pdf',
                    required: true,
                    colSpan: 6,
                },
                {
                    name: 'labourContract',
                    type: 'file',
                    label: {
                        en: 'Labour Contract',
                        ar: 'عقد العمل',
                    },
                    accept: 'application/pdf',
                    required: true,
                    colSpan: 6,
                    dependsOn: {
                        field: 'visaType',
                        value: 'employment',
                        condition: 'equals',
                    },
                    tooltip: {
                        en: 'Required for employment visa holders',
                        ar: 'مطلوب لحاملي تأشيرة العمل',
                    },
                },
                {
                    name: 'educationCertificates',
                    type: 'file',
                    label: {
                        en: 'Education Certificates',
                        ar: 'الشهادات التعليمية',
                    },
                    accept: 'image/*,application/pdf',
                    required: false,
                    colSpan: 6,
                },
                {
                    name: 'previousEmploymentDocs',
                    type: 'file',
                    label: {
                        en: 'Previous Employment Documents',
                        ar: 'مستندات التوظيف السابقة',
                    },
                    accept: 'image/*,application/pdf',
                    required: false,
                    colSpan: 6,
                },
            ],
        },
    ],
    submitUrl: '/api/employees',
    successMessage: {
        en: 'Employee onboarding completed successfully!',
        ar: 'تم إضافة الموظف بنجاح!',
    },
};
