import React from 'react';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { useFormikContext } from 'formik';

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
            <div className={`${boxClassName}`} >
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
            </div>
        </FormControl>
    );
};

export default CheckboxGroup;
