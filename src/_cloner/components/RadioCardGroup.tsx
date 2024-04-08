import React, { useState } from "react";
import {
    CardContent,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
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
        <div className={cx("w-full", boxClassName)}>
            <ReusableCard>
                <Typography variant="h4" className="px-4 py-1">تسویه حساب</Typography>
                <CardContent>
                    <FormikInput label="تعداد روز" name="settlementDaysExit" />
                    <RadioGroup
                        aria-label="options"
                        name="options"
                        value={selectedOption}
                        onChange={handleRadioChange}
                    >
                        <div>
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </div>
                    </RadioGroup>
                </CardContent>
            </ReusableCard>
        </div>
    );
};

export default RadioCard;
