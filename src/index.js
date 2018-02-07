import "./stylesheets/base_theme.css";

import { version } from "../package.json";

import startGame from "./scripts/init.js";

// eslint-disable-next-line no-console
console.log(`Ville Games version ${version} started`);

startGame();
