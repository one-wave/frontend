module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',       // SPA fallback 활성화 (핵심!)
        PM2_SERVE_HOMEPAGE: '/index.html'
      }
    }
  ]
}
