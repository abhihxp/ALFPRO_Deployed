import Wizard from '../components/wizard/Wizard';
import { onboardingSchema } from '../data/onboardingSchema';

const AddEmployeePage = () => {
    return (
        <div className="w-full mx-auto">
            <Wizard schema={onboardingSchema} />
        </div>
    );
};

export default AddEmployeePage;
