import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { columns } from "../../generic/productPrices/_columns"
import { billlandingColumns } from "./_columns"

const ListOfBilllanding = () => {

    const renderAction = () => {}

  return (
    <>
        <ReusableCard>
            <MuiDataGrid
                columns={billlandingColumns(renderAction)} 
                rows={[{}]}
                data={[{}]}
            />
        </ReusableCard>
    </>
  )
}

export default ListOfBilllanding