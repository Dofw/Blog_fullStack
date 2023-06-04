// nested configuration objects
export function commonConfig() {
  return {
    // http
    port: parseInt(process.env.ADMIN_PORT),
    jwt: {
      secret: process.env.SECRET,
    },
  };
}
