// DynamicBreadcrumbs.js

import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Outlet, Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { translationMapping } from '../helpers/translationMapping';

function DynamicBreadcrumbs(props: any) {
    const { customTypography } = props;
    const location = useLocation();
    const param = useParams();

    const pathnames = location.pathname.split("/").filter((x) => x);
    let path = Object.entries(param)[0][1];
    Object.entries(param).forEach(([key, value]) => {
      if (value === path) return;
      path = path?.replace(`/${value}`, "");
    });
    if (param.id) {
      path = ``;
    }  

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                {path?.split("/")?.map((pathname, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // Translate the pathname using the mapping
                    const translatedPathname = translationMapping[pathname] || pathname;

                    return isLast ? (
                        <Typography key={index} color="primary" variant='h3' className='!no-underline' component={customTypography}>
                            {translatedPathname}
                        </Typography>
                    ) : (
                        <Link key={index} component={RouterLink} to={routeTo} className='!no-underline'>
                            {translatedPathname}
                        </Link>
                    );
                })}
            </Breadcrumbs>
            <div className='my-4'>
                <Outlet />
            </div>
        </>
    );
}

export default DynamicBreadcrumbs;
