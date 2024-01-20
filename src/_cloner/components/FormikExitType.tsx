import FormikSelect from './FormikSelect'

import { dropdownExitType } from '../../app/modules/managment-order/helpers/dropdowns';

import { exit } from '../../app/modules/managment-order/helpers/fakeData';

const FormikExitType = (props: any) => {
    return (
        <FormikSelect
            options={dropdownExitType(exit)}
            {...props} />
    )
}

export default FormikExitType