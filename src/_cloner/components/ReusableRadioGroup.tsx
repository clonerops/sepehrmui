// RadioGroup.tsx

import React, { ChangeEvent, ReactNode } from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';

interface RadioOption {
  label: string;
  value: any;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: any;
  onChange: (value: string) => void;
  className?: string
}

const ReusableRadioGroup: React.FC<RadioGroupProps> = ({ label, options, value, onChange, className }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={label}
        value={value}
        onChange={handleChange}
        row
        >
        {options.map((option) => (
            <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ReusableRadioGroup;
