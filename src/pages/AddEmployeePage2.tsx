import Wizard from '../components/wizard/Wizard';
import { addEmployeeFormSchema } from '../data/addEmployeeFormSchema';

const AddEmployeePage2 = () => {
    return (
        <div className="w-full mx-auto">
            <Wizard schema={addEmployeeFormSchema} />
        </div>
    );
};

export default AddEmployeePage2;
