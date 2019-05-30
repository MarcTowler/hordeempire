const input = require("readline-sync");
const Enmap = require("enmap");
const fs = require("fs");

let baseConfig = fs.readFileSync("./util/setup_base.txt", "utf8");

const defaultSettings = {
  "prefix": "!",
  "modLogChannel": "mod-log",
  "modRole": "Moderator",
  "adminRole": "Administrator",
  "systemNotice": "true"
};

const settings = new Enmap({name: "settings", cloneLevel: "deep"});

(async function() {
  console.log("Setting Up ClipBot Configuration... CTRL+C if you want to manually edit config.js.example into config.js!");
  await settings.defer;
  if (settings.has("default")) {
    if (input.keyInYN("Default settings already present. Reset to default? ")) {
      settings.set("default", defaultSettings);
    }
  } else {
    console.log("First Start! Inserting default guild settings in the database...");
    settings.set("default", defaultSettings);
  }

  const token = input.question("Enter the bot token from the application page: ");

  baseConfig = baseConfig
    .replace("{{defaultSettings}}", JSON.stringify(defaultSettings, null, 2))
    .replace("{{token}}", `"${token}"`)
  
  fs.writeFileSync("./config.js", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
  await settings.close();
}());
