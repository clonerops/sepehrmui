import Swal from "sweetalert2"

export const renderSwal = (message: string) => {
    return Swal.fire({
        title: message,
        confirmButtonColor: "#fcc615",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonText: "بستن",
        icon: "success",
        customClass: {
            title: "text-lg"
        }
    })

}