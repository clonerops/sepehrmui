import { dropdownPhoneBookType } from '../helpers/dropdowns';
import { useGetPhoneBookTypes } from '../../app/modules/generic/_hooks';
import FormikComboBox from './FormikComboBox';

const FormikPhoneBookType = (props: any) => {
    const { data: phoneBookType } = useGetPhoneBookTypes();

    return (
        <FormikComboBox
            options={dropdownPhoneBookType(phoneBookType)}
            {...props} />
    )
}

export default FormikPhoneBookType