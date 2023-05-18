+++
author = "clerick_x"
title = "Discord Token Logging"
date = "2023-05-02T19:33:52+05:30"
tags = [
    "discord",
    "chating",
]
+++

This blog explains how discord's token system works and discord's systems in general

<!--more-->

### Discord's basic systems
First we have the gateway, A websocket which is used for recieving events. The Rest API which is used to send requests to discord. So now that we have a
basic understanding of what this is let's start with the actual topic about discord's token logging issue

### What's tokken logging?
If you are a discord bot developer there is a chance that you might know about "tokens" the magic code that's like a password for accessing the discord
bot, And ofcourse like passwords they should be kept safe, Discord's users have the same tokens it's just not used directly to login discord first checks
your password, gmail then finally sends the token back which can be used to communicate with discord servers this system bypasses 2FA, The only way to change
the token is to simply change the password

### How it works
**DISCLAIMER: I haven't really reverse engineered any discord token loggers this is simply based on what i understand. I am not responsible if you get caught up in anything**

So discord's app is just a window to the `https://discord.com/app` url made with electron, what i found while simply browsing around the files was a file
named `core.asar` located in `~/.config/discord/0.0.27/modules/discord_desktop_core/`, This is different for windows. What i found was you can inject code
into the discord window which can then fetch you the token, using `npx asar extract core.asar core/` i managed to find the file which is used to access the
page, `mainScreen.js` where i can simply inject the code below and run any javascript i want
```js
mainScreen.webContents.on('dom-ready', () => {
    electron.webContents.executeJavaScript('insert javascript here');
});
```
After which the file can be packed using `npx asar pack core/ core.asar` now we can simply create a application which will replace the file and the javascript
will send the token directly to any place you would want, Or you can do harmless pranks on friends by making it go to a rickroll video instead, Just make sure
to inform then that they would have to delete the asar file and relaunch discord to fix it

### What can you do to be safe?
Don't be an idiot and download suspecious things off internet, Antivirus wouldn't help when you are being an idiot.