+++
author = "clerick_x"
title = "Setting up a hugo site"
date = "2023-04-12T02:30:00+05:30"
tags = [
    "linux",
    "hugo",
]
+++
This is the first blog of this page. So i've decided to make the first one about setting up hugo
to be honest it required me tinkering a little but but it should be easy for the most of us, This 
was made as an experiment to see if the blogging would be a good lifestyle

### Installing hugo
```
pacman -S hugo
```

### Themes
So here when it comes to themes just go to the hugo's theme page and pick a theme after that execute this command
```
git submodule add {theme.git} themes/{theme_name}
```

### Config
Edit the config.toml and add these lines
```
theme = "{theme_name}"
```

You are all set!, Now all you have to do is create a post
```
hugo new post/{post_name}.md
```

### Creating the static site to be uploaded on github/gitlab
```
hugo
```
The site will be generated at /public at the project root