import express, { response } from "express";
const app = express();

app.get("/", (request, response) => {
  response.send("Hello, Express!");
});
app.post("/movies", (req, res) => {
  res.send("Post Movies:)");
});
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
