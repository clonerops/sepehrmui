import { FC, memo, useEffect, useState } from "react";

interface IProps {
    captcha: string;
}

const Captcha: FC<IProps> = ({ captcha }) => {

    const [captchaValue, setCaptchaValue] = useState<string>("");
    
    const getCaptchaIsOnMount = async () => {
        setCaptchaValue("data:image/jpeg;base64," + captcha);
    };
    
    useEffect(() => {
        if(captcha) getCaptchaIsOnMount();
        // eslint-disable-next-line
    }, [captcha]);

    return (
        <>
            <div className="recaptcha">
                <div className="recaptcha__content">
                    <img
                        id="imgCaptcha"
                        className=""
                        alt="captcha"
                        src={captchaValue}
                        style={{ height: 46, width: 150 }}
                    />
                </div>
            </div>
        </>
    );
};

export default memo(Captcha, (prev: any, next: any) => {
    return prev.captcha === next.captcha
});
