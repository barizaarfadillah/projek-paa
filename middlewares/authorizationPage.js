import cookies from "next-cookies";

export function unauthPage(ctx) {
    return new Promise(resolve => {
        const allcookies = cookies(ctx);

        if (!allcookies.token)
            return ctx.res.writeHead(30, 2, {
                Location: '/stok'
            }).end();

        return resolve('unauthorized')
    })
}

export function authPage(ctx) {
    return new Promise(resolve => {
        const allcookies = cookies(ctx);

        if (!allcookies.token)
            return ctx.res.writeHead(30, 2, {
                Location: '/auth/login'
            }).end();

        return resolve({
            token: allcookies.token
        });
    });
}