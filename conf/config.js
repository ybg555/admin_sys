var nconf = require('nconf').argv().env();
var node_env = nconf.get('NODE_ENV') || 'dev';

var config = {
    prd: {
    },
    uat: {
    },
    sit: {
    },
    dev: {
        mongo: {
        },
        aliyun: {
        },
        cookieDomain: "127.0.0.1",
        bindIp: "0.0.0.0",
        httpPort: 8088,
        email: {
        },
        weixin: {
        },
        rongcloud: {
        },
        pingxx: {
        },
        geetest: {
        },
        logStdout: true
    }
}

console.log("server environment: %s", node_env);
config = config[node_env];
config.ENV = node_env;
module.exports = config