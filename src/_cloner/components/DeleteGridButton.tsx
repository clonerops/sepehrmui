import DeleteIcon from '@mui/icons-material/Delete'

const DeleteGridButton = (props: {onClick: any}) => {
    return (
        <div onClick={props.onClick} className="cursor-pointer">
            <DeleteIcon className="text-red-500" />
        </div>

    )
}

export default DeleteGridButton