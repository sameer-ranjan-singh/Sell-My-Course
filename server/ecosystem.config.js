// require('dotenv').config();

module.exports = {
  apps : [{
    name   : "node-pm2",
    script : "./index.js",
    port : 3000,
    // env:{
    //   PORT: process.env.PM2_SERVE_PORT
    // },
    env_production: {
      NODE_ENV: "production",
    },
    env_development: {
      NODE_ENV: "development"
    }
    
  }]
}
