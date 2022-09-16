import sanityClient from '@sanity/client';

let userClient;

if(!userClient) {
    userClient = sanityClient({
        projectId: 'su4m5fxs',
        dataset: 'production',
        apiVersion: '2022-09-14',
        token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
        useCdn: false
    })
} 

export { userClient } 