import React from "react";
import { Card, Typography, Container, Box, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import MuiTable from "../../../../_cloner/components/MuiTable";

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
            { title: "شماره اعلام بار", value: "25268" },
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

    const ladingProducts = [
        { id: 1, header: "کد کالا", accessor: "productCode", },
        { id: 2, header: "شرح کالا", accessor: "productName", },
        { id: 3, header: "برند", accessor: "productBrandName", },
        { id: 4, header: "مقدار قابل بارگیری", accessor: "mainAmount", },
        { id: 5, header: "واحد اصلی", accessor: "mainUnit", },
        { id: 6, header: "مقدار قابل بارگیری واحد فرعی", accessor: "subAmount", },
        { id: 7, header: "واحد فرعی", accessor: "subUnit", },
    ]

    const fakeData = [
        {id: 1, productCode: "124545", productName: "میلگرد 8", productBrandName: "ذوب آهن", mainAmount: "20,000", mainUnit: "کیلو", subAmount: "24", subUnit: "بسته"},
        {id: 1, productCode: "124545", productName: "نبشی 4", productBrandName: "ذوب آهن", mainAmount: "20,000", mainUnit: "کیلو", subAmount: "24", subUnit: "بسته"},
    ]

    return (
        <>
            <Card ref={props.contentRef} className="p-4" id="print-content">
                <Container>
                    <header className="flex justify-between items-center">
                        <Box component="div">
                            <img
                                src={toAbsoulteUrl("/media/logos/follad.png")}
                                className="w-[60px] h-[60px] print:w-[30px] print:h-[30px]"
                            />
                        </Box>
                        <Box component="div">
                            <Typography variant="h2" className="print:!text-sm">
                                بازرگانی سپهر ایرانیان
                            </Typography>
                        </Box>
                        <Box component="div" className="flex flex-col gap-y-4">
                            <Box component="div" className="flex flex-row gap-x-4">
                                <Typography variant="h4" className="text-gray-500 print:!text-sm">شماره مجوز:</Typography>
                                <Typography variant="h3" className="print:!text-sm">245874</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row gap-x-4">
                                <Typography variant="h4" className="text-gray-500 print:!text-sm">تاریخ مجوز:</Typography>
                                <Typography variant="h3" className="print:!text-sm">1402/09/02</Typography>
                            </Box>
                        </Box>
                    </header>
                    <Box component="div" className="border-2 border-dashed mt-4 px-4">
                        {fields.map((rowFields) => (
                            <Box
                                component="div"
                                className="md:flex md:justify-between md:items-start print:flex print:justify-between print:flex-nowrap !p-0 !m-0"
                            >
                                {rowFields.map((field) => (
                                    <Box component="div" className="flex flex-row gap-x-2 py-3">
                                        <Typography variant="h4" className="text-gray-500 print:!text-sm" >{field.title}:</Typography>
                                        <Typography variant="h3" className="print:!text-sm">{field.value}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>

                    <Box component="div" className="border-2 border-dashed mt-4 p-4">
                        <MuiTable data={fakeData} columns={ladingProducts} onDoubleClick={() => { }} />
                    </Box>
                </Container>
            </Card>
        </>
    );
};

export default CargoPaper;
