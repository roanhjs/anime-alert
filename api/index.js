import e from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import cron from "node-cron";
import { loadData, saveData } from "./utils/storage.js";
import { getAnime } from "./utils/anime.js";
import { weekday, time } from "./utils/date.js";

const app = e();
app.use(cors());
app.use(e.json());
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send(JSON.stringify({ m: "Hello from server!" }));

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send({ timestamp: Date.now().toString() });
});

cron.schedule(
  "* * * * *",
  async () => {
    console.log("Running scheduled task");
    const db = await loadData();
    const day = weekday();
    for (const anime of db[day]) {
      const hora = time();
      console.log(`${anime.broadcast.time}-${hora}`);
      if (anime.broadcast.time === hora) {
        console.log(`Anime ${anime.title} is airing now`);
        for (const client of wss.clients) {
          client.send(
            JSON.stringify({ m: `Anime ${anime.title} is airing now` }),
          );
        }
      }
    }
  },
  { timezone: "America/Santo_Domingo" },
);

cron.schedule(
  "0 7 * * *",
  async () => {
    const day = weekday();
    const data = await getAnime({ weekday: day });
    await saveData({ data, weekday: day });
  },
  { timezone: "America/Santo_Domingo" },
);

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
