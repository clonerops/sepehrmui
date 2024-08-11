import FormikSelect from './FormikSelect'

import { temporary } from '../../app/modules/managment-order/helpers/fakeData';
import { dropdownTemporaryType } from '../helpers/dropdowns';

const FormikTemporary = (props: any) => {

    return (
        <FormikSelect
            options={dropdownTemporaryType(temporary)}
            {...props} />
    )
}

export default FormikTemporary