module.exports = {
  apps: [
    {
      name: "vite-app",
      script: "server.js", // or your entry file
      instances: "max", // cluster mode, uses all CPU cores
      exec_mode: "cluster",
      watch: false, // disable in production
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000, // default port
      },
      error_file: "./logs/vite-app-error.log",
      out_file: "./logs/vite-app-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      combine_logs: true,
      autorestart: true,
    },
  ],
};
