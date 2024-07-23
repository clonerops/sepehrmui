import SVG from "react-inlinesvg";
import { toAbsoulteUrl } from "./assetsHelper";
const CLSVG = ({ path = "", className = "" }) => {
    return (
        <main className={className}>
            <SVG src={toAbsoulteUrl(path)} />
        </main>
    );
};

export default CLSVG;
