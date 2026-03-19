const isProd = process.env.NODE_ENV === "production";
const conf = {
    isProd,
    loginEndpoint: "/auth/login",
    registerEndpoint: "/auth/register",
    jwtUserEndpoint: "/users/me",
    myCourseEndpoint: "",
    jwtSessionStorageKey: "auth.jwt",
    urlPrefix: isProd ? "https://production" : "http://localhost:3000",
};

export default conf;
