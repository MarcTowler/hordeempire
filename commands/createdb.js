const Command = require("../base/Command.js");

class createdb extends Command {
    constructor(client) {
        super(client, {
            name: "createdb",
            description: "creates the db",
            category: "System",
            usage: "",
            guildOnly: true,
            aliases: [],
            permLevel: "Moderator"
        });
    }

    async run(message, args, level) {
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database('./data/streamers');

        db.serialize(function() {
        db.run("CREATE TABLE streamers (name TEXT)");
        });

        db.close();
    }
}

module.exports = createdb;