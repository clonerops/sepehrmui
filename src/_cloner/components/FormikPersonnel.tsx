import { Typography } from '@mui/material';

import FormikComboBox from './FormikComboBox';
import { useGetPersonnels } from '../../app/modules/personnel/core/_hooks';
import { dropdownPersonnel } from '../helpers/dropdowns';

const FormikPersonnel = (props: any) => {
    const { data: personnels, isLoading } = useGetPersonnels();
    if(isLoading) {
        return <Typography>درحال بارگزاری لیست پرسنل</Typography>
    }
    return (
        <FormikComboBox
            options={dropdownPersonnel(personnels?.data)}
            isLabelSetValue={props.isLabelSetValue}
            {...props} />
    )
}

export default FormikPersonnel