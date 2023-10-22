import React, { useState } from 'react';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    Card,
    CardContent,
    Typography,
    Box,
} from '@mui/material';

interface Option {
    value: string;
    label: string;
    content: string;
}

interface RadioCardGroupProps {
    options: Option[];
}

const RadioCardGroup: React.FC<RadioCardGroupProps> = ({ options }) => {
    const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <RadioGroup
                aria-label="radio-options"
                name="radio-options"
                value={selectedValue}
                onChange={handleRadioChange}
            >
                <Box component="div" className='md:flex w-full'>
                    {options.map((option) => (
                        <Card key={option.value} className='w-full'>
                            <FormControlLabel
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        </Card>
                    ))}
                </Box>
            </RadioGroup>
            {/* <CardContent>
        <Typography variant="body1">
          {options.find((option) => option.value === selectedValue)?.content}
        </Typography>
      </CardContent> */}
        </div>
    );
};

export default RadioCardGroup;
