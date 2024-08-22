import express from "express";
import { App } from "./app";

(async () => {
  const app = new App(express());

  await app.bootstrap();

  app.listen()
})();
