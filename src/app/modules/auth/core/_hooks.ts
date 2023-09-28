import { useMutation } from '@tanstack/react-query'
import * as api from './_requests'
import { ILogin } from './_models'

const useLogin = () => {
    return useMutation((formData: ILogin) => {
        return api.login(formData)
    })
}

export {
    useLogin
}