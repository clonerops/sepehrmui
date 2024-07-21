import FormikSelect from './FormikSelect'
import { useGetCashDesks } from '../../app/modules/cashDesk/_hooks';
import { dropdownCashDesk } from '../../app/modules/cashDesk/convertDropdown';
import { ICashDesk } from '../../app/modules/cashDesk/_models';

const FormikCashDesk = (props: any) => {
    const { data: CashDesk } = useGetCashDesks();

    return (
        <FormikSelect
            options={dropdownCashDesk(CashDesk?.data.filter((i: ICashDesk) => i.isActive))}
            {...props} />
    )
}

export default FormikCashDesk