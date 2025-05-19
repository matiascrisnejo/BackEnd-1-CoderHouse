import express from "express";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);

server.listen(port, ready);