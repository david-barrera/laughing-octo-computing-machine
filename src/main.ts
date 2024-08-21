import express from "express";
import { App } from "./app";

async function main() {
  const app = new App(express());

  await app.bootstrap();

  app.listen(3000, () => console.log("Server started at port 3000"));
}

main().catch(console.error);
