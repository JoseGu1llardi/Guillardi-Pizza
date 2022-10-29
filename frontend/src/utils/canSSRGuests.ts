import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { parseCookies } from 'nookies';

// Function for pages that can only be accessed by visitors
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context)

        // If you try to access the page, however already having a login saved we redirect
        if(cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return await fn(context);
    }
} 

