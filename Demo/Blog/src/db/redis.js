const redis = require("redis");
const { REDIS_CONF } = require("../config/db");

const clientRedis = redis.createClient(REDIS_CONF);

clientRedis.on("error", function (error) {
  console.log("REDIS ERROR: ", error);
});

function get(key) {
  return new Promise((resolve, reject) => {
    clientRedis.get(key, (err, val) => {
      if (err) return reject(err);

      if (val === null) return resolve(null);

      try {
        resolve(JSON.parse(val));
      } catch (err) {
        resolve(val);
      }
    });
  });
}

function set(key, val) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }

  clientRedis.set(key, val, redis.print);
}

module.exports = {
  set,
  get,
};
