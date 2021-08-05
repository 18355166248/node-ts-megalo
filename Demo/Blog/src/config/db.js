const dev = process.env.NODE_ENV;

let MYSQL_CONF, REDIS_CONF;

if (dev === "development") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "511871",
    port: 3306,
    database: "myblog",
  };

  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

if (dev === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "511871",
    port: 3306,
    database: "myblog",
  };

  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
