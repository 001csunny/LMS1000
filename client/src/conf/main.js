const isProd = process.env.NODE_ENV === "production";
const conf = {
    isProd,
    loginEndpoint: "/api/auth/local",
    registerEndpoint: "/auth/local/register",
    jwtUserEndpoint: "/api/users/me?populate=*",
    myCourseEndpoint: "",
    jwtSessionStorageKey: "auth.jwt",
    urlPrefix: isProd ? "https://production" : "http://localhost:1337",
};

export default conf;
