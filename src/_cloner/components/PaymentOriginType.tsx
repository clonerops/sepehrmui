import { FC } from "react";
import { useGetReceivePaymentSources } from "../../app/modules/generic/_hooks";
import { dropdownReceivePaymentResource } from "../helpers/dropdowns";
import FormikCashDesk from "./FormikCashDesk";
import FormikCost from "./FormikCost";
import FormikIncome from "./FormikIncome";
import FormikInput from "./FormikInput";
import FormikOrganzationBank from "./FormikOrganzationBank";
import FormikPettyCash from "./FormikPettyCash";
import FormikShareholders from "./FormikShareholders";
import FormikSelect from "./FormikSelect";
import FormikSearchableCustomer from "./FormikSearchableCustomer";

interface IProps {
    typeName: string
    officialName: string
    typeId: any
    label: string
    officialLabel: string
    className?: string
}

const PaymentOriginType: FC<IProps> = ({ typeName, typeId, officialName, label, officialLabel, className }) => {
    const recievePayTools = useGetReceivePaymentSources()

    const renderFields = (customerIdFieldName: string, label: string, receivePaymentSourceId: number) => {
        switch (receivePaymentSourceId) {
            case 1:
                return <FormikSearchableCustomer name={customerIdFieldName} label={label} />;
            case 2:
                return <FormikOrganzationBank name={customerIdFieldName} label={label} />;
            case 3:
                return <FormikCashDesk name={customerIdFieldName} label={label} />;
            case 4:
                return <FormikIncome name={customerIdFieldName} label={label} />;
            case 5:
                return <FormikPettyCash name={customerIdFieldName} label={label} />;
            case 6:
                return <FormikCost name={customerIdFieldName} label={label} />;
            case 7:
                return <FormikShareholders name={customerIdFieldName} label={label} />;
            case 8:
                return <FormikShareholders name={customerIdFieldName} label={label} />;
            default:
                return <FormikInput name={customerIdFieldName} label={label} disabled={true} />;
        }
    };

    return (
        <>
            {className ? (
                <div className={className}>
                    <FormikSelect name={typeName} label={label} options={dropdownReceivePaymentResource(recievePayTools?.data)} />
                    {renderFields(officialName, officialLabel, typeId)}

                </div>
            ) : (
                <>
                    <FormikSelect name={typeName} label={label} options={dropdownReceivePaymentResource(recievePayTools?.data)} />
                    {renderFields(officialName, officialLabel, typeId)}

                </>
            )}
        </>
    )
}

export default PaymentOriginType