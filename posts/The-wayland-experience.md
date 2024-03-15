---
author: "clerick_x"
title: "The wayland experience"
date: "2023-04-12T03:50:36+05:30"
layout: post.njk
tags: [
    "post",
    "wayland",
    "desktop",
]
---
This is my first time trying out wayland, I've heard that it's fast and lightweight but never really got to try it myself
everytime i tried the x11 side of things such as awesomewm it all seemed way too complex for me so i simply decided to use
wayland after some research, Let's see how it goes

<!--more-->

## The Choice
I had a hard time between choosing what wm i wanted, The whole reason i switched to wayland was to simply try out all the options
then i stumbled upon the hyprland, It was amazing, First looks were impressive. So i installed hyprland

## End Result
<img src="/images/wayland-experience/screenshot1.png" alt="Screenshot1" width="100%" height="100%" />

## Let's get started
### Requirements:
* waybar
* hyprland
* hyprpaper
* brightnessctl

```sh
yay -Sy waybar hyprland hyprpaper brightnessctl
```
After that is installed you can start editing or simply use my stupid [config](https://gitlab.com/clerick_x/dotfiles "Clerick's dotfiles")