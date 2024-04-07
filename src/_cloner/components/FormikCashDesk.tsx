import FormikSelect from './FormikSelect'
import { useGetCashDesks } from '../../app/modules/generic/cashDesk/_hooks';
import { dropdownCashDesk } from '../../app/modules/generic/cashDesk/convertDropdown';
import { ICashDesk } from '../../app/modules/generic/cashDesk/_models';

const FormikCashDesk = (props: any) => {
    const { data: CashDesk } = useGetCashDesks();

    return (
        <FormikSelect
            options={dropdownCashDesk(CashDesk?.data.filter((i: ICashDesk) => i.isActive))}
            {...props} />
    )
}

export default FormikCashDesk