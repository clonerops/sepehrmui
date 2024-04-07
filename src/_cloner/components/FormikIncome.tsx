import FormikSelect from './FormikSelect'
import { useGetIncomes } from '../../app/modules/generic/inCome/_hooks';
import { dropdownIncome } from '../../app/modules/generic/inCome/convertDropdown';
import { IIncome } from '../../app/modules/generic/inCome/_models';

const FormikIncome = (props: any) => {
    const { data: Income } = useGetIncomes();
    console.log(Income)
    return (
        <FormikSelect
            options={dropdownIncome(Income?.data.filter((i: IIncome) => i.isActive))}
            {...props} />
    )
}

export default FormikIncome