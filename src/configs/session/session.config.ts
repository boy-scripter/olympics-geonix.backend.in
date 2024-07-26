import * as session from "express-session";

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 12 * 60 * 60 * 1000,
    }
})