
export interface ILoginUser {
    userName: string;
    password: string;
}

export interface ILoginCommand {
    userName: string;
    password: string;
    captchaKey: string;
    captchaCode: string
}
