import React from 'react';
import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { Field, FieldProps } from 'formik';

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
    return (
        <FormControl>
            <label>{label}</label>
            <Box component="div" className={`${boxClassName}`} >
                {options?.map((option) => (
                    <Field key={option.value} name={`${name}.${option.value}`} type="checkbox">
                        {({ field }: FieldProps) => (
                            <FormControlLabel

                                control={<Checkbox {...field} />}
                                label={option.label}
                            />
                        )}
                    </Field>
                ))}
            </Box>
        </FormControl>
    );
};

export default CheckboxGroup;
