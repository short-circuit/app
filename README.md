# Discord Bot A.S.A.I.

This bot was designed and is being developed for the **Enders Zone** Discord Server.

To use it, you will need to setup a settings.json file with the following structure:

```json
{
    "discord":{
        "token": "DISCORD_BOT_TOKEN"
    },
    "rcon":{
        "conan":{
            "host": "CONAN_SERVER_IP",
            "port": "CONAN_SERVER_PORT_RCON",
            "options": {
                "tcp": true,
                "challenge": false
            },
            "password": "CONAN_SERVER_PASSWORD_RCON"
        }
    },

    ...
    
}
```