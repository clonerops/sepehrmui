// DynamicBreadcrumbs.js

import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { translationMapping } from '../helpers/translationMapping';

function DynamicBreadcrumbs(props: any) {
    const { customTypography } = props;
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                {pathnames.map((pathname, index) => {
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
            <Box component="div" className='my-4'>
                <Outlet />
            </Box>
        </>
    );
}

export default DynamicBreadcrumbs;
