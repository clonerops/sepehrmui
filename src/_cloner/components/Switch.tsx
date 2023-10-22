import { Switch } from '@mui/material'

type IProps = {
    checked?: boolean | undefined
    onChange?: (rowData: any) => void
}

const SwitchComponent = (props: IProps) => {
    return (
        <Switch
            checked={props.checked}
            onChange={props.onChange}
            color={"success"}
        />

    )
}

export default SwitchComponent