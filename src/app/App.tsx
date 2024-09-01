import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LazyLoad from "../_cloner/components/LazyLoad";

const App = () => {
    return (
        <Suspense fallback={<LazyLoad loading={true} />}>
            <Outlet />
        </Suspense>
    );
};

export default App;
