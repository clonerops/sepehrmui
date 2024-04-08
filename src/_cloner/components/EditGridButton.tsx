import EditIcon from '@mui/icons-material/Edit'

const EditGridButton = (props: { onClick: any }) => {
    return (
        <div onClick={props.onClick} className="cursor-pointer">
            <EditIcon className="text-yellow-500" />
        </div>

    )
}

export default EditGridButton