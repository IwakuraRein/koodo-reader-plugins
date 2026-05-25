const cors_proxy = require("cors-anywhere");

const host = "127.0.0.1";
const port = 18080;

const server = cors_proxy.createServer({
  originWhitelist: ["http://localhost:3000"],
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"]
});

server.on("request", (req) => {
  const time = new Date().toISOString();
  const origin = req.headers.origin || "-";
  const location = req.corsAnywhereRequestState?.location;
  const target = location?.href || decodeURIComponent((req.url || "").replace(/^\/+/, ""));
  console.log(`[${time}] ${req.method} origin=${origin} target=${target}`);
});

server.listen(port, host, () => {
  console.log(`CORS proxy listening at http://${host}:${port}/`);
});
