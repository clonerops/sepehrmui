import FormikSelect from './FormikSelect'

import { exit } from '../../app/modules/managment-order/helpers/fakeData';
import { dropdownExitType } from '../helpers/dropdowns';

const FormikExitType = (props: any) => {
    return (
        <FormikSelect
            options={dropdownExitType(exit)}
            {...props} />
    )
}

export default FormikExitType