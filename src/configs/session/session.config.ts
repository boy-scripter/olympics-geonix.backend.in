import session from "express-session";

export const sessionConfig = session({
    secret: process.env.SESSION_SECRET || 'my-secret',
    resave: false,
    saveUninitialized: false,
})