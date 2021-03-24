//Get console log timestamps
require('log-timestamp');

//Get settings token
const settings = require("./settings.json");
//Get Discord.JS object
const Discord = require("discord.js");
const rcon = require("./rcon/node-rcon");
const discordClient = new Discord.Client();

//Allowed channels to monitor
const allowedChannels = settings.whitelist.channels;

//Allowed user role for administration commands
const allowedAdminRoles = settings.whitelist.roles.admin;

//Allowed user roles for information commands
const allowedUserRoles = settings.whitelist.roles.user;

//Init Rcon
const conanRcon = new rcon(
    settings.rcon.conan.host,
    settings.rcon.conan.port,
    settings.rcon.conan.password,
    settings.rcon.conan.options
);

//#region Discord
//Bot ready
discordClient.on("ready", () => {
    //Print BOT name
    console.log(`Logged in as ${discordClient.user.tag}!`);
});

// Create an event listener for messages
discordClient.on("message", (message) => {
    // If the message is "ping"
    if (message.content.includes("ping")) {
        // Log "ping", name and channel
        console.log(
            `Ping received from ${message.author.username} in channel #${message.channel.name}!`
        );
    }

    //Check wether channel and sending user have access rights to bot functions
    if (allowedChannels.includes(message.channel.name) && message.member.roles.cache.some(role=>allowedAdminRoles.includes(role.name))) {
        
        if(message.content.includes("!rcon")) {
            if(!conanRcon.hasAuthed){
                conanRcon.connect();
            }
            conanRcon.send("");
        }

        //Print bot information
        if (message.content === "!botinfo") {
            message.channel.send(
                `:robot: Hi! I am A.S.A.I., an **A**dvanced **S**ystem **A**rtificial **I**ntelligence. Nice to meet you!`
            );
        }

        //Delete all in TEST channel
        if (message.content === "!flushchannel" && message.channel.name === 'test') {
            console.log('Starting flush...');
            message.channel.bulkDelete(100).then(console.log(`Deleted`));
        }


        if (message.content === "!playerlist" && message.channel.name === 'test') {//conanserver
            conanRcon.send("");
            conanRcon.send("listplayers");
            console.log('request sent to rcon');
        }

        if (message.content === "!rcon_help" && message.channel.name === 'test') {//conanserver
            conanRcon.send("help");
            console.log('request sent to rcon');
        }

        if (message.content === "!rcon_connect" && message.channel.name === 'test') {//conanserver
            conanRcon.connect();
            console.log('request sent to rcon');
        }

        if (message.content === "!rcon_disconnect" && message.channel.name === 'test') {//conanserver
            conanRcon.disconnect();
            console.log('request sent to rcon');
        }

        if (message.content.includes("!broadcast ") && message.channel.name === 'test') {//conanserver
            conanRcon.send(message.content.substr(1));
            console.log('request sent to rcon');
        }

        if (message.content.includes("!server ") && message.channel.name === 'test') {//conanserver
            conanRcon.send(message.content.substr(1));
            console.log('request sent to rcon');
        }
    }
});

discordClient.login(settings.discord.token);
//#endregion

//#region RCON Conan Exiles

//Connected
conanRcon.on("auth", () => {
    console.log("Logged into RCON");
    console.log(`Is authed: ${conanRcon.hasAuthed}`);
});

//Connection was closed
conanRcon.on("end", () => {
    console.log("Connection closed to RCON");
});

//Server sent a response to a command
conanRcon.on('response', function(str) {
    console.log("Got response: " + str);

    if(message.content === "!rcon_help") {
        const arr=str.split('/(?:\r\n|\r|\n)/g');
        arr.forEach(element => {
            console.log(element);
        });
    }
});

//Server sent a message regardless of command
conanRcon.on('server', function(str) {
    console.log(str);
});

//Server sent an error message
conanRcon.on("error", function(str) {
    console.log(str);
});

// conanRcon.connect();
//#endregion
