import React from "react";
import { Card, Typography, Container, Box, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";

export type FieldType = {
    title: string;
    value: any;
};

type Props = {
  contentRef?: any
}

const CargoPaper = (props: Props) => {
    const fields: FieldType[][] = [
        [
            { title: "شماره حواله", value: "25268" },
            { title: "شماره سفارش", value: "65484" },
        ],
        [
              { title: "باربری", value: "حامدبار" },
            { title: "نام و نام خانوادگی راننده", value: "ابوالفضل معصومی" },
        ],
        [
            { title: "شماره همراه راننده", value: "09217767345" },
              { title: "شماره پلاک", value: "28ج997ایران21" },

          ],
          [
            { title: "تاریخ تحویل", value: "1402/09/18" },
            { title: "مبلغ کرایه", value: "25,000,000" },
        ],
        [
            { title: "نوع خودرو", value: "تریلی" },
            {
                title: "آدرس محل تخیله بار: ",
                value: "تهران نسیم شهر خیابان سوم کوچه صدوقی پلاک 13",
            },
        ],
    ];

    return (
        <>
            <Card ref={props.contentRef} className="p-4" id="print-content">
                <Container>
                    <header className="flex justify-between items-center">
                        <Box component="div">
                            <img
                                src={toAbsoulteUrl("/media/logos/follad.png")}
                                width={60}
                                height={60}
                            />
                        </Box>
                        <Box component="div">
                            <Typography variant="h2">
                                بازرگانی سپهر ایرانیان
                            </Typography>
                        </Box>
                        <Box component="div" className="flex flex-col gap-y-4">
                            <Box component="div" className="flex flex-row gap-x-4">
                                <Typography variant="h4" className="text-gray-500">شماره مجوز:</Typography>
                                <Typography variant="h3">245874</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row gap-x-4">
                                <Typography variant="h4" className="text-gray-500">تاریخ مجوز:</Typography>
                                <Typography variant="h3">1402/09/02</Typography>
                            </Box>
                        </Box>
                    </header>
                    <main className="border-2 border-dashed mt-4 px-4">
                        {fields.map((rowFields) => (
                            <Box
                                component="div"
                                className="md:flex md:justify-between md:items-start !p-0 !m-0"
                            >
                                {rowFields.map((field) => (
                                    <Box component="div" className="flex flex-row gap-x-2 py-3">
                                        <Typography variant="h4" className="text-gray-500">{field.title}:</Typography>
                                        <Typography variant="h3">{field.value}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </main>
                </Container>
            </Card>
        </>
    );
};

export default CargoPaper;
