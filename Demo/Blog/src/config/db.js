const dev = process.env.NODE_ENV;

let MYSQL_CONF;

if (dev === "development") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "511871",
    port: 3306,
    database: "myblog",
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
}

module.exports = {
  MYSQL_CONF,
};
