import * as session from "express-session";

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: (String(process.env.SESSION_SECURE).toLowerCase() === 'true'),
        httpOnly: true,
        sameSite: 'none',
        maxAge: 5 * 60 * 1000,
    }
})
