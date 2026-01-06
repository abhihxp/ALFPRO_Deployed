/* eslint-disable @typescript-eslint/no-explicit-any */
import addEmployeeFormSchemaJson from './addEmployeeFormSchema.json';
import type { OnboardingSchema, WizardField } from './onboardingSchema';

// Convert JSON fields to WizardField format
const fields: WizardField[] = addEmployeeFormSchemaJson.map((field: any) => {
    let colSpan = 6; // Default
    if (['firstName', 'middleName', 'lastName', 'employeeId', 'dob', 'gender', 'emergencyContactName', 'relation', 'emergencyContactNo'].includes(field.name)) {
        colSpan = 4;
    } else if (['contactNo', 'alternateContactNo'].includes(field.name)) {
        colSpan = 6;
    } else if (['personalEmailId', 'officialEmailId'].includes(field.name)) {
        colSpan = 6;
    } else if (['presentAddress', 'permanentAddress'].includes(field.name)) {
        colSpan = 6;
    } else if (['city', 'state', 'country', 'postalCode'].includes(field.name)) {
        colSpan = 3;
    }

    return {
        name: field.name,
        type: field.type as WizardField['type'],
        label: {
            en: field.label,
            ar: field.label,
        },
        placeholder: field.placeholder ? {
            en: field.placeholder,
            ar: field.placeholder,
        } : undefined,
        required: field.required,
        colSpan: colSpan,
        options: field.options ? field.options.map((opt: any) => ({
            value: opt.value,
            label: {
                en: opt.label,
                ar: opt.label,
            },
        })) : undefined,
        validation: field.validation,
        min: field.validation?.min,
        defaultValue: field.defaultValue,
    };
});

// Insert headings
const addressHeadingIndex = fields.findIndex(field => field.name === 'city');
fields.splice(addressHeadingIndex, 0, {
    name: 'addressHeading',
    type: 'heading',
    label: {
        en: 'Address Details',
        ar: 'تفاصيل العنوان',
    },
    colSpan: 12,
});

const emergencyHeadingIndex = fields.findIndex(field => field.name === 'emergencyContactName');
fields.splice(emergencyHeadingIndex, 0, {
    name: 'emergencyHeading',
    type: 'heading',
    label: {
        en: 'Emergency Details',
        ar: 'طوارئ',
    },
    colSpan: 12,
});

export const addEmployeeFormSchema: OnboardingSchema = {
    id: 'add-employee-form',
    title: {
        en: 'Onboarding Form',
        ar: 'إضافة نموذج موظف',
    },
    description: {
        en: 'Complete onboarding form with required details',
        ar: 'أكمل نموذج الموظف مع التفاصيل المطلوبة',
    },
    steps: [
        {
            id: 'employee-details',
            title: {
                en: 'Employee Details',
                ar: 'تفاصيل الموظف',
            },
            description: {
                en: 'Enter all employee information',
                ar: 'أدخل جميع معلومات الموظف',
            },
            fields: fields,
        },
    ],
    submitUrl: '/api/employees',
    successMessage: {
        en: 'Employee added successfully!',
        ar: 'تم إضافة الموظف بنجاح!',
    },
};
