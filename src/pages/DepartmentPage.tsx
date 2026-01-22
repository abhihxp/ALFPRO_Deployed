/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DynamicForm from '../components/wizard/DynamicForm';
import departmentSchema from '../data/departmentSchema.json';

const DepartmentPage = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleFinish = (values: any) => {
        console.log('Submitted Department:', values);
    };

    return (
      <div className="w-full mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("form.department.title")}
            </h2>
            <Button onClick={() => navigate(-1)}>
              {t("form.buttons.back")}
            </Button>
          </div>

          <Form
            form={form}
            component={false}
            onFinish={handleFinish}
            layout="vertical"
            initialValues={{ isActive: true }}
          >
            <DynamicForm schema={departmentSchema} form={form} />

            <div className="flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 items-center sticky bottom-0 bg-white dark:bg-gray-800 z-10 -mx-8 -mb-8 px-8 py-4 mt-4">
              <Button className="h-10 px-6" onClick={() => navigate(-1)}>
                {t("form.buttons.cancel")}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary hover:bg-purple-700 border-none h-10 px-8"
              >
                {t("form.buttons.submit")}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
};

export default DepartmentPage;
