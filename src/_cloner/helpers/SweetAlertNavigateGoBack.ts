import Swal from "sweetalert2"

export const renderAlertGoBack = (title: string) => {

    Swal.fire({
        title: title,
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
    .then(() => {
        window.history.back()
    })

}