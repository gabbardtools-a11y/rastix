module.exports = {
  apps: [{
    name: "rastix",
    script: "server.js",
    cwd: "/var/www/rastix",
    env: { NODE_ENV: "production", PORT: "3007", HOSTNAME: "0.0.0.0" },
    instances: 1,
    autorestart: true,
    max_memory_restart: "500M",
  }]
};