const useUserInformation = () => {
    const getUserInfo: any = localStorage.getItem("auth")
    const parseInfo = JSON.parse(getUserInfo)

    return parseInfo
}

export default useUserInformation