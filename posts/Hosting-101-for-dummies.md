---
author: "clerick_x"
title: "Hosting 101 for Dummies"
date: "2023-04-16T03:18:30+05:30"
description: "A complete guide on hosting for newbies"
layout: post.njk
tags: [
    "post",
    "hosting",
]
---
This is hosting 101 for dummies who haven't hosted anything before, By the end of this guide you will know how to properly
setup a server for games. I will not be covering any hosting services here and this is a guide about hosting it locally

<!--more-->

## Basic networking
Starting off with the most basic part of networking IP addresses

### What is IP?
It's a address given to a device connected to the internet sort of like a house address

### Public and Private IP
So a private IP is something that's handed out by your router and as the name suggests it's private meaning only the people connected
in the particular wifi network will be able to access that ip. In public ip whatever website you visit has the public ip, The private
Ip will be able to connect with the public ip but not the other way, Your router has something called NAT (Network address translation)
What this does is instead of all the devices in the network having a different IP this rotuer is the only one with the public IP and 
the rest of the info is communicated via ports and private IPs, So in an ideal environment devices inside a wifi network will be able
to connect with each other but devices outside the network will not be able to connect, But we need to make this happen in-order to 
host a website Right?? Here are several ways to host a website

## Hosting
How to host a simple game server or a http server

### Method 1: Ngrok tunnel (Recommended)
This is the easiest method in this guide, Download and setup [ngrok](https://ngrok.com/) the website had instructions, Now after the
ngrok config is done simply open the game you want to host, Let's say minecraft, Since you are gonna be simply playing with friends
startup minecraft and load a world, In there click on open to lan and continue, The port will be visible in minecraft
Now in cmd type `ngrok tcp 127.0.0.1:{minecraftport}` this will now give a link, Sometimes the link wouldn't work simply use the
numerical ip instead of the domain also make sure to enter the proper port, The port will change in ngrok.

If you are trying to host a website instead, I wouldn't use ngrok as i find it as a non-viable solution, Sure it's good for hosting on the
go, Moving on

### Method 2: Local webhost
This here is a nightmare to deal with first you gotta choose a hosting service, I simply recommend nginx from my experience but there is
also apache, I won't explain how to configure it just the basics because if i did this would take me a long time to write

Starting with the domain, You can ignore this if you don't need one and you are going with numbers for some reason, I honestly have no
clue, Using namecheap is recommended but you do you.

To get an ssl certificate follow [this guide](https://certbot.eff.org/instructions)

Nginx's [guide](https://nginx.org/en/docs/beginners_guide.html)
Apache's [guide](https://httpd.apache.org/docs/2.4/getting-started.html)

and to get it public follow method 2 or 3

### Method 3: SSH reverse tunnel
Now this is a really interesting method, This can be used in the case you have a vps server which is really has really low specs
open the game and get the port now simply connect to your vps using this command
```
ssh -R {vpsport}:localhost:{localport} {vpsusername}@{vpshostname}
```
To connect to this server grab the VPS ip and use the VPS port

### Method 4: Port Forwarding
This is a really easy thing to do i will walk you thru the steps, First open the router page usually it's 192.168.1.1, Just know
the router settings might be completely different for you depending on the router but here is how it should be mostly, In there
just tap on firewall and head to portforwarding, Now comes the tricky part if you are in windows type `ipconfig` in the terminal it
will show the private ip copy that and then paste the ip in the ip section of the port forwarding, Once you've started the server in
your pc, copy the port and add the port to the port forwarding section, After that set it the type to tcp, In most cases it should
be tcp if it didn't work try changing it to udp, Now after you've done that, go to your prefered search engine and type "What's my ip"
This should give you the ip, Now you can give the IP to the players who wanna join