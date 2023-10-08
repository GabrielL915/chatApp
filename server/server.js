import { createServer } from "http";
import staticHandler from "serve-handler";
import ws, { WebSocketServer } from "ws";

function handleStaticRequest(req, res) {
  return staticHandler(req, res, {
    directoryListing: false,
    public: "../app",
  });
}

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
}

const server = createServer(handleStaticRequest);

const wss = new WebSocketServer({ server });

wss.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("message", (msg) => {
    broadcast(msg);
  });

  client.on("close", () => {
    console.log("Cliente desconectado");
  });

  client.on("error", (err) => {
    console.log("WebScokets error: ", err);
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
