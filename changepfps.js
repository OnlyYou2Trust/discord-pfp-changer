const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');


const tokens = fs.readFileSync('tokens.txt', 'utf8').split('\n').map(token => token.trim()).filter(Boolean);


async function changeAvatar(client, token) {
    try {

        const imageFiles = fs.readdirSync('images').filter(file => file.endsWith('.jpg'));


        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        const randomImage = imageFiles[randomIndex];


        const imagePath = path.join(__dirname, 'images', randomImage);


        await client.user.setAvatar(imagePath);
        console.log(`Changed avatar for token: ${token}`);
    } catch (error) {
        console.error(`Could not change avatar for token: ${token}`, error);
    }
}


async function main() {

    for (const token of tokens) {
        console.log(`Logging into token...: ${token}`);

        const client = new Client();

        client.once('ready', () => {
            console.log(`Logged into token: ${token}`);
            
            changeAvatar(client, token);
        });

        await client.login(token).catch(err => {
            console.error(`Could not login to token: ${token}`, err);
        });
    }
}

main().catch(console.error);
