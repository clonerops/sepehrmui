import { Link } from "react-router-dom";
import { toAbsoulteUrl } from "../../_cloner/helpers/AssetsHelper";

const AccessDenied = () => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <img
        src={toAbsoulteUrl("/media/images/access-denied.jpg")}
        alt={"access-denied-img"}
        className={"w-[400px]"}
      />

      <h3>You Don't Have Access To This Page</h3>
      <Link to={"/dashboard"}>
        <button
          type={"button"}
          className={
            "rounded-[12px] bg-purple-900 !text-white leading-9 !px-5 !py-1 mt-5"
          }
        >
          Go To Home Page
        </button>
      </Link>
    </div>
  );
};

export default AccessDenied;
