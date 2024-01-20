import FormikSelect from './FormikSelect'

import { dropdownTemporaryType } from '../../app/modules/managment-order/helpers/dropdowns';

import { temporary } from '../../app/modules/managment-order/helpers/fakeData';

const FormikTemporary = (props: any) => {

    return (
        <FormikSelect
            options={dropdownTemporaryType(temporary)}
            {...props} />
    )
}

export default FormikTemporary