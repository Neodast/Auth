export default () => ({
  jwt: {
    access: {
      expires: process.env.JWT_ACCESS_EXPIRES,
      secret: process.env.JWT_ACCESS_SECRET,
    },
    refresh: {
      expires: process.env.JWT_REFRESH_EXPIRES,
      secret: process.env.JWT_REFRESH_SECRET,
    },
  },
});
