import { useState } from "react";
import { Box } from "@mui/material";
import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import { Languages } from "../helpers/Languages";
import i18next from "i18next";
import Cookies from "js-cookie";
import cx from "classnames";

const MultiLanguages = () => {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguageCode, setCurrentLanguageCode] = useState(
    Cookies.get("i18next") || "en",
  );

  // const openLanguages = Boolean(anchorEl);

  const handleChangeLanguage = (code: string) => {
    i18next.changeLanguage(code);
    // setAnchorEl(null);
    setCurrentLanguageCode(code);
  };

  return (
    <>
      <Box component="div" className="flex p-0 m-0">
        {Languages.map(({ code, name, country_code }) => {
          return (
            <Box
              component="div"
              className={`px-2 cursor-pointer`}
              key={country_code}
              onClick={() => handleChangeLanguage(code)}
            >
              <Box
                component="img"
                className={cx(
                  code === currentLanguageCode ? null : "opacity-[30%]",
                )}
                src={toAbsoulteUrl(
                  code === "es"
                    ? "/media/flag/spain.png"
                    : "/media/flag/united-kingdom.png",
                )}
                width={20}
                height={20}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default MultiLanguages;
