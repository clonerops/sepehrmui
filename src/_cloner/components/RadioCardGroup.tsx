import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
} from "@mui/material";
import cx from "classnames";
import FormikInput from "./FormikInput";
import ReusableCard from "./ReusableCard";

interface RadioCardProps {
    title: string;
    options: string[];
    boxClassName?: string
}

const RadioCard: React.FC<RadioCardProps> = ({ title, options, boxClassName }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box component={"div"} className={cx("w-full", boxClassName)}>
            <ReusableCard>
                <Typography variant="h4" className="px-4 py-1">تسویه حساب</Typography>
                <CardContent>
                    {/* <TextField
                        label="تسویه حساب"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    /> */}
                    <FormikInput label="تعداد روز" name="settlementDaysExit" />
                    <RadioGroup
                        aria-label="options"
                        name="options"
                        value={selectedOption}
                        onChange={handleRadioChange}
                    >
                        <Box component="div">
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </Box>
                    </RadioGroup>
                </CardContent>
            </ReusableCard>
        </Box>
    );
};

export default RadioCard;
