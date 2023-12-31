import { toAbsoulteUrl } from "../../_cloner/helpers/AssetsHelper";

const ErrorsPage = () => {
  return (
    <div className="mx-auto !w-fit">
      <img
        src={toAbsoulteUrl("/media/images/404.jpg")}
        alt={"access-denied-img"}
        className={"w-[400px]"}
      />
    </div>
  );
};

export default ErrorsPage;
