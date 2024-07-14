//Import Section
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

//Config Section
const { token, prefix, weatherApiKey } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('Ready!');
});

//Main Function Section
client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "sasugay") {
        message.channel.send('Sasugay is Here!');
    } else if (command === "cal") {
        if (!args.length) {
            return message.channel.send(`Format for Calculate is "!cal <operation num num>", ${message.author}!`);
        }

        let operation = args[0];
        let num1 = parseFloat(args[1]);
        let num2 = parseFloat(args[2]);

        if (operation === "add") {
            message.channel.send(`Result is: ${num1 + num2}`);
        } else if (operation === "sub") {
            message.channel.send(`Result is: ${num1 - num2}`);
        } else if (operation === "mul") {
            message.channel.send(`Result is: ${num1 * num2}`);
        } else if (operation === "div") {
            message.channel.send(`Result is: ${num1 / num2}`);
        } else {
            message.channel.send(`Invalid operation, ${message.author}!`);
        }
    } else if (command === "weather") {
        if (args.length === 0) {
            return message.channel.send('Format for Weather Report is !weather <city>');
        }

        const city = args.join(' ');
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`);
            const weather = response.data;
            const weatherInfo = `Weather in ${weather.name}, ${weather.sys.country}:
            - Temperature: ${weather.main.temp}°C
            - Description: ${weather.weather[0].description}
            - Humidity: ${weather.main.humidity}%
            - Wind Speed: ${weather.wind.speed} m/s`;
      
            message.channel.send(weatherInfo);
          } catch (error) {
            console.error(error);
            message.channel.send('Could not retrieve weather data. Please ensure the city name is correct');
          }
    } else if (command === "weird") {
        let placeholder;
        try {
            placeholder = await message.channel.send('weirdo weirdo weirdo weirdo weirdo weirdo');

            const iteration = 30;
            let current_text = "WEIRDO WEIRDO WEIRDO WEIRDO WEIRDO WEIRDO";

            for (let i = 0; i < iteration; i++) {
                current_text = current_text === "WEIRDO WEIRDO WEIRDO WEIRDO WEIRDO WEIRDO" ? "weirdo weirdo weirdo weirdo weirdo weirdo" : "WEIRDO WEIRDO WEIRDO WEIRDO WEIRDO WEIRDO";
                await new Promise(resolve => setTimeout(resolve, 400));
                await placeholder.edit(current_text);
            }
        }
        catch (error) {
            console.error(error);
            message.channel.send('Error in sending message');
        }
    } else if (command === "poke") {
        if (args.length === 0) {
            return message.channel.send('Format for Poke is !poke <user>');
        }

        const userToPoke = message.mentions.users.first();
        if (!userToPoke) {
            return message.channel.send('Please mention a valid user to poke.');
          }
        try {
            const iterationPoke = 10;
            const delayBetweenTags = 500;
            const messageLifetime = 60000;
            for (let i = 0; i < iterationPoke; i++) {
                await message.channel.send(`สะกิดสะกิดสะกิดสะกิดสะกิด${userToPoke}สะกิดสะกิดสะกิดสะกิดสะกิด`);
                await new Promise(resolve => setTimeout(resolve, delayBetweenTags));
              }

            const messagesToDelete = await message.channel.messages.fetch({
                limit: iterationPoke,
            });

            const messagesToDeleteFiltered = messagesToDelete.filter(msg => msg.author.id === client.user.id);
            setTimeout(() => {
                messagesToDeleteFiltered.forEach(msg => {
                  msg.delete().catch(err => console.error(`Failed to delete message: ${err}`));
                });
              }, messageLifetime);

        } catch (error) {
            console.error(error);
            message.channel.send('Error in sending message');
        }

    } else if (command === "เล่นเกม") {
        if (args.length === 0) {
            return message.channel.send('Format for เล่นเกม is !เล่นเกม <user>');
        }

        const userToGame = message.mentions.users.first();
        if (!userToGame) {
            return message.channel.send('Please mention a valid user to เล่นเกม.');
          }
        try {
            const iterationGame = 10;
            const delayBetweenTagsGame = 500;
            const messageLifetimeGame = 60000;
            for (let i = 0; i < iterationGame; i++) {
                await message.channel.send(`มาเล่นเกมมาเล่นเกมมาเล่นเกมมาเล่นเกม${userToGame}มาเล่นเกมมาเล่นเกมมาเล่นเกมมาเล่นเกม`);
                await new Promise(resolve => setTimeout(resolve, delayBetweenTagsGame));
            }

            const messagesToDeleteGame = await message.channel.messages.fetch({
                limit: iterationGame,
            });

            const messagesToDeleteFilteredGame = messagesToDeleteGame.filter(msg => msg.author.id === client.user.id);
            setTimeout(() => {
                messagesToDeleteFilteredGame.forEach(msg => {
                  msg.delete().catch(err => console.error(`Failed to delete message: ${err}`));
                });
              }, messageLifetimeGame);

        } catch (error) {
            console.error(error);
            message.channel.send('Error in sending message');
        }
    } else if (command === "help") {
        message.channel.send(`Available Commands:
        !sasugay To know if Sasugay is Here!
        !cal <operation> <num> <num>: To calculate the result of the operation
        !weather <city>: To get the weather report of the city
        !weird To send a weird message
        !poke <user>: To poke the user
        !เล่นเกม <user>: To play a game with the user
        !help To see the available commands`);


    }
}
);

client.login(token);