import express from "express";
import nunjucks from "nunjucks";
import events from "./data/events.json";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  res.render("index.njk", { title: "Event Hub" });
});

app.get("/events", (req, res) => {
  res.render("events.njk", {
    title: "List of Events",
    events,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
