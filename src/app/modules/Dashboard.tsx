import ReusableCard from "../../_cloner/components/ReusableCard";
import CardInformation from "../../_cloner/components/CardInformation";
import SaleReportByProductType from "./report/SaleReportByProductType";
import SaleStatusDiagram from "./report/SaleStatusDiagram";
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
import { useEffect } from "react";
import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css';


const Dashboard = () => {

    const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
    const report = new Stimulsoft.Report.StiReport();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/reports/Report.mdc');
            const data = await response.json();
            report.loadDocument(data);
            viewer.report = report;
            viewer.renderHtml('viewer');
        }
        fetchData();

    }, []);


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 space-y-4 md:space-y-0 my-4">
                <CardInformation cardClassName="!bg-[#3322D8]" title="تعداد سفارشات" value={25878} />
                <CardInformation cardClassName="!bg-[#369BFD]" title="فروش امروز" value={43242} />
                <CardInformation cardClassName="!bg-[#F8B30E]" title="میانگین قیمت" value={77754} />
                <CardInformation cardClassName="!bg-[#EB5553]" title="درآمد" value={77754} />
            </div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 space-y-4 lg:space-y-0">
                    <ReusableCard cardClassName="col-span-3 w-full">
                        <SaleReportByProductType />
                    </ReusableCard>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 space-y-4 lg:space-y-0">
                    <ReusableCard cardClassName="col-span-3 w-full">
                        <SaleStatusDiagram />
                    </ReusableCard>
                </div>
            </div>

        </>
    );
};

export default Dashboard;
