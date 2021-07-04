import Discord from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`Ready as ${bot.user.tag}`);
});

bot.on('message', (message) => {
    if (message.author === bot.user) {
        return;
    }

    if (message.author.id === process.env.COOKIE.toString()) {
        message.react('🗿');
    }

    if (message.content === "cookie pray") {
        message.channel.send('🗿');
    }

    if (message.content === "cookie song") {
        const songs = JSON.parse(fs.readFileSync('./data/songs.json'));

        message.channel.send(songs[Math.floor(Math.random() * songs.length)].link);
    }

    if (message.content.includes("cookie add-song")) { 
        if (message.author.id === process.env.COOKIE.toString()) {
            const song = message.content.split('').splice(16).join('');
            const songs = JSON.parse(fs.readFileSync('./data/songs.json'));
    
            songs.push({
                link: song
            });
    
            try {
                fs.writeFileSync('./data/songs.json', JSON.stringify(songs));
            } catch(err) {
                message.channel.send("Failed to add song."); 
            }

            message.channel.send("Song added."); 
        } else {
            message.channel.send("Only cookie can add songs <:tea:856945220804804611>")
        }
    }

    if (message.content === "cookie facts") {
        const facts = JSON.parse(fs.readFileSync('./data/stuff.json'));

        message.channel.send(facts[Math.floor(Math.random() * facts.length)].content);
    }

    if (message.content.includes("cookie add-fact")) {
        if (message.author.id === process.env.COOKIE.toString()) {
            const fact = message.content.split('').splice(16).join('');
            const facts = JSON.parse(fs.readFileSync('./data/stuff.json'));
    
            facts.push({
                index: facts[facts.length - 1].index + 1,
                content: fact
            });
    
            try {
                fs.writeFileSync('./data/stuff.json', JSON.stringify(facts));
            } catch(err) {
                message.channel.send(`Failed to add "${fact}".`); 
            }

            message.channel.send(`Fact "${fact}" added.`);   
        } else {
            message.channel.send("Only cookie can add facts <:tea:856945220804804611>");
        }
    }
});

bot.login(process.env.TOKEN);