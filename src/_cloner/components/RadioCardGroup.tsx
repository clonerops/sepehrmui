import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';

interface RadioCardProps {
    title: string;
    options: string[];
}

const RadioCard: React.FC<RadioCardProps> = ({ title, options }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Card variant="outlined" className='w-full'>
            <CardContent>
                <TextField
                    label="تسویه حساب"
                    variant="outlined"
                    fullWidth
                    size='small'
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                />
                <RadioGroup aria-label="options" name="options" value={selectedOption} onChange={handleRadioChange}>
                    <Box component="div" className='flex'>
                        {options.map((option) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                        ))}
                    </Box>
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default RadioCard;
