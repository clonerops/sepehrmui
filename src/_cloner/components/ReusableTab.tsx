import React, { ReactNode, useState } from "react";
import {
    Tabs,
    Tab,
    Box,
    Typography,
    TabsPropsIndicatorColorOverrides,
} from "@mui/material";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

interface ReusableTabProps {
    tabs: { label: string; content: ReactNode }[];
    indicatorColor?: "primary" | "secondary";
}

const ReusableTab: React.FC<ReusableTabProps> = ({
    tabs,
    indicatorColor = "secondary",
}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: "" }}>
            <Tabs
                className="rounded-2xl"
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#D97D54"
                  }
                }}
                indicatorColor={indicatorColor}
                value={value}
                onChange={handleChange}
                centered
            >
                {tabs?.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                    />
                ))}
            </Tabs>
            {tabs?.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default ReusableTab;
