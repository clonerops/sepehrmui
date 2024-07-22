import FormikSelect from './FormikSelect'
import { useGetIncomes } from '../../app/modules/inCome/_hooks';
import { IIncome } from '../../app/modules/inCome/_models';
import { dropdownIncome } from '../helpers/Dropdowns';

const FormikIncome = (props: any) => {
    const { data: Income } = useGetIncomes();
    return (
        <FormikSelect
            options={dropdownIncome(Income?.data.filter((i: IIncome) => i.isActive))}
            {...props} />
    )
}

export default FormikIncome