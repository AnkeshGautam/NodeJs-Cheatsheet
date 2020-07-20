const express = require('express');
const app = express();
const { google } = require('googleapis');

app.use('/home', (req, res) => {
    res.send(
        `<a href=${url}><h1>Consent for Google drive<h1></a>`
    );
});

app.use('/authRedirect', async (req, res) => {
    code = req.query.code;
    res.redirect('/home');
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log(tokens);
        oauth2Client.setCredentials(tokens);

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        });

        // const params = { pageSize: 3 };
        const resonse = await drive.files.list();
        console.log(resonse.data);
    }
    catch (err) {
        console.log(err);
    }

});
let code = 'Ankesh';
const oauth2Client = new google.auth.OAuth2(
    '902351452420-7soek8c9ibfhfhsp09nagqv71dcou3tg.apps.googleusercontent.com',
    '7m1GlUWFXXIYKhU2358f_XXv',
    'http://localhost:3030/authRedirect'
);

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
});

console.log(url);
app.listen(3030, () => { console.log("server started at 3030") });


// async function getTokens(code) {
//     const { tokens } = await oauth2Client.getToken(code);
//     console.log(tokens);
//     oauth2Client.setCredentials(tokens);
// }