import Discord from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

import fetch from 'node-fetch';

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

    if (message.content.includes("cookie search")) {
        const query = message.content.split('').splice(13).join('');
        async function googleSearch() {
            const data = await fetch("https://google-search3.p.rapidapi.com/api/v1/search/q=" + query, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "857626ae3emsh3d0a744b1797271p1fbd39jsn0c6ab4e4751d",
                    "x-rapidapi-host": "google-search3.p.rapidapi.com"
                }
            });
        
            const response = await data.json();
        
            let result = ``;
        
            const results = response.results.splice(0, 3);

            results.forEach(res => {
                result += res.title + "\n" + res.description + "\n" + "<" + res.link + ">" + "\n\n";
            });
        
            message.channel.send(result);
        }

        googleSearch()
    }

    if (message.content.includes("cookie img")) {
        const query = message.content.split('').splice(10).join('');
        async function imageSearch() {
            const data = await fetch("https://bing-image-search1.p.rapidapi.com/images/search?q=" + query, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "857626ae3emsh3d0a744b1797271p1fbd39jsn0c6ab4e4751d",
                    "x-rapidapi-host": "bing-image-search1.p.rapidapi.com"
                }
            })

            const response = await data.json();

            const results =  [];

            response.value.forEach(img => {
                results.push(img.contentUrl);
            });

            message.channel.send(results[Math.floor(Math.random() * results.length)]);
        }
        imageSearch();
    }
});

bot.login(process.env.TOKEN);