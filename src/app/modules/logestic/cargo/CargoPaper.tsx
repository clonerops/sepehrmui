import React from "react";
import {
    Card,
    Typography,
    Container,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@mui/material";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import MuiTable from "../../../../_cloner/components/MuiTable";

export type FieldType = {
    title: string;
    value: any;
};

type Props = {
    contentRef?: any;
};

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
        { id: 1, header: "کد کالا", accessor: "productCode" },
        { id: 2, header: "شرح کالا", accessor: "productName" },
        { id: 3, header: "برند", accessor: "productBrandName" },
        { id: 4, header: "مقدار قابل بارگیری", accessor: "mainAmount" },
        { id: 5, header: "واحد اصلی", accessor: "mainUnit" },
        {
            id: 6,
            header: "مقدار قابل بارگیری واحد فرعی",
            accessor: "subAmount",
        },
        { id: 7, header: "واحد فرعی", accessor: "subUnit" },
    ];

    const fakeData = [
        {
            id: 1,
            productCode: "124545",
            productName: "میلگرد 8",
            productBrandName: "ذوب آهن",
            mainAmount: "20,000",
            mainUnit: "کیلو",
            subAmount: "24",
            subUnit: "بسته",
        },
        {
            id: 1,
            productCode: "124545",
            productName: "نبشی 4",
            productBrandName: "ذوب آهن",
            mainAmount: "20,000",
            mainUnit: "کیلو",
            subAmount: "24",
            subUnit: "بسته",
        },
    ];

    return (
        <>
            <Card
                ref={props.contentRef}
                className="p-4 "
                sx={{ direction: "ltr" }}
                id="print-content"
            >
                <Container className="">
                    <div className="grid grid-cols-12">
                        <div className="col-span-3 text-center" />
                        <div className="col-span-6 text-center">
                            <div className="font-bold text-lg">بارنامه حمل محصول</div>
                        </div>
                        <div className="col-span-3 text-right gap-2">
                            <div className="flex items-center my-1 mx-auto">
                                <p className="font-bold w-[100px]">شماره بارنامه: </p> 
                                <span className="px-2 py-1">4645646</span>
                            </div>
                            <div className="flex items-center my-1 mx-auto">
                                <p className="font-bold w-[100px]">تاریخ: </p> 
                                <span className="px-2 py-1">1402/02/25</span>
                            </div>
                        </div>
                    </div>

                </Container>
            </Card>
        </>
    );
};

export default CargoPaper;
