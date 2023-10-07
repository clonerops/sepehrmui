// import React from 'react';
// import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material';
// import { Field, FieldProps } from 'formik';

// interface Option {
//     value: string;
//     label: string;
// }

// interface CheckboxGroupProps {
//     name: string;
//     label: string;
//     boxClassName?: string;
//     options: Option[];
// }

// const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, label, boxClassName, options }) => {
//     return (
//         <FormControl>
//             <Box component="div" className={`${boxClassName}`} >
//                 {options?.map((option) => (
//                     <Field key={option.value} name={`${name}.${option.value}`} type="checkbox">
//                         {({ field }: FieldProps) => (
//                             <FormControlLabel

//                                 control={<Checkbox {...field} />}
//                                 label={option.label}
//                             />
//                         )}
//                     </Field>
//                 ))}
//             </Box>
//         </FormControl>
//     );
// };

// export default CheckboxGroup;
import React from 'react';
import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { Field, FieldProps, useFormikContext } from 'formik';

interface Option {
    value: string;
    label: string;
}

interface CheckboxGroupProps {
    name: string;
    label: string;
    boxClassName?: string;
    options: Option[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, label, boxClassName, options }) => {
    const { setFieldValue, values }: any = useFormikContext();

    const handleCheckboxChange = (optionValue: string) => {
        const currentValues = values[name] || [];

        if (currentValues.includes(optionValue)) {
            const updatedValues = currentValues.filter((value: any) => value !== optionValue);
            setFieldValue(name, updatedValues);
        } else {
            const updatedValues = [...currentValues, optionValue];
            setFieldValue(name, updatedValues);
        }
    };

    return (
        <FormControl>
            <Box component="div" className={`${boxClassName}`} >
                {options?.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        control={
                            <Checkbox
                                checked={(values[name] || []).includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </Box>
        </FormControl>
    );
};

export default CheckboxGroup;
