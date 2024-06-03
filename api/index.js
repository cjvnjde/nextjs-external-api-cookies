import http from "http";

function parseCookies(request) {
  const list = {};
  const cookieHeader = request.headers.cookie;

  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      let parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });
  }

  return list;
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url.startsWith("/api")) {
    const cookies = parseCookies(req);

    res.setHeader(
      "Set-Cookie",
      `pong=${req.url}+${new Date().getTime()}; HttpOnly`,
    );

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(cookies));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3069, () => {
  console.log("Server is running on http://localhost:3069");
});
