import "reflect-metadata"
import * as express from "express"
import { routes } from "./routes";


const express = require("express");
const app = express()

app.use(express.json())
app.use(routes)

app.listen(3000, () => console.log("server is running"))