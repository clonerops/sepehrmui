import FormikSelect from './FormikSelect'
import { useGetIncomes } from '../../app/modules/inCome/_hooks';
import { dropdownIncome } from '../../app/modules/inCome/convertDropdown';
import { IIncome } from '../../app/modules/inCome/_models';

const FormikIncome = (props: any) => {
    const { data: Income } = useGetIncomes();
    return (
        <FormikSelect
            options={dropdownIncome(Income?.data.filter((i: IIncome) => i.isActive))}
            {...props} />
    )
}

export default FormikIncome