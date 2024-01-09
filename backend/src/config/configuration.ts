export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || '12345',
    name: process.env.DATABASE_NAME || 'fsgw-web',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT, 10) || 465,
    ignoreTLS: process.env.MAIL_IGNORE_TLS == 'true' || true,
    secure: process.env.MAIL_SECURE == 'true' || true,
    user: process.env.MAIL_USER || 'fsg.winterthur@gmail.com',
    password: process.env.MAIL_PASSWORD || '',
    from: process.env.MAIL_FROM || '"Feldschützengesellschaft Winterthur" <fsg.winterthur@gmail.com>',
  },
});
