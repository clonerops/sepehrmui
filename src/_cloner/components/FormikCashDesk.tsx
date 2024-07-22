import FormikSelect from './FormikSelect'
import { useGetCashDesks } from '../../app/modules/cashDesk/_hooks';
import { ICashDesk } from '../../app/modules/cashDesk/_models';
import { dropdownCashDesk } from '../helpers/Dropdowns';

const FormikCashDesk = (props: any) => {
    const { data: CashDesk } = useGetCashDesks();

    return (
        <FormikSelect
            options={dropdownCashDesk(CashDesk?.data.filter((i: ICashDesk) => i.isActive))}
            {...props} />
    )
}

export default FormikCashDesk