+++
author = "clerick_x"
title = 'I "Hacked" My Router'
date = "2023-04-14T23:49:06+05:30"
tags = [
    "markdown",
    "text",
]
+++
I have a old and crappy router which doesn't even support 5 Ghz, Which wouldn't be a problem but a few months back i had to change
the dhcp pool and lan ip to the 10 ranges, Meaning it went from 192.168.1.1 to 10.0.0.1, Which worked but the VoIP went down after
a month

<!--more-->

## Summary
Pretty much what happened was i managed to change the DHCP pool but the repair man who came to repair tech was mad at me for changing it
he was a bit rude about it and revoked my access, Before this it wasn't the default router password he changed it to something custom 
and i had to beg for the router password, That's how i changed it in the first place, But the VoIP only went down several months after
i've changed the default pool, Now my access was revoked, How did i get it back?

## Routersploit
```
git clone https://github.com/threat9/routersploit.git
cd routersploit
python3 -m pip install -r requirements.txt
python3 rsf.py
```

That's all routersploit is installed, Now to get the actual router password what i did was simply use
```
use scanners/autopwn
set target "gateway"
run
```

This gave me a list of vulnerabilities that my router has, And then i hit the jackpot, It found the vulnerability with the default creds
and gave me the list of passwords that worked, I finally found out that the password was simply `admin` and `system`. I changed it. After
seeing the list of vulnerabilities i decided to dig in more

## Connecting via telnet and ftp
The routersploit tool found out that telnet and ftp existed, After a bit of tinkering i ended up finding the router's web page files
```
ftp> ls /home/httpd
200 pcmd command successful.
150 Opening ASCII mode data connection for '/bin/ls'.
-rwxr-xr-x    1 0             6214 Feb 19  2020 boa.conf
drwxr-xr-x    6 0             4718 Feb 19  2020 web
226 Transfer complete.
```
"boa.conf" found it really suspecious so i downloaded it, I found out that it was some kind of a runner that ran the router pages
because it had configs about the default page, If i were to post it the page would be really long.

## Further inspection
Now i was just tempted to find more stuff so i cd'd into `/etc` directory
```
ftp> ls
200 pcmd command successful.
150 Opening ASCII mode data connection for '/bin/ls'.
lrwxrwxrwx    1 0                7 Feb 19  2020 TZ -> /var/TZ
-rwxr-xr-x    1 0              890 Feb 19  2020 app.gwdt
lrwxrwxrwx    1 0               11 Feb 19  2020 config -> /var/config
-rwxr-xr-x    1 0              130 Feb 19  2020 config.csv
-rwxr-xr-x    1 0              197 Feb 19  2020 config_default.xml
-rwxr-xr-x    1 0              103 Feb 19  2020 config_default_hs.xml
drwxr-xr-x    3 0               27 Feb 18  2020 cups
-rwxr-xr-x    1 0             4392 Feb 19  2020 dhclient-script
-rwxr-xr-x    1 0            18508 Feb 19  2020 dnsmasq.conf
-rwxr-xr-x    1 0             1146 Feb 19  2020 ethertypes
-rw-r--r--    1 0              144 Feb 19  2020 inetd.conf
drwxr-xr-x    2 0              168 Feb 19  2020 init.d
-rwxr-xr-x    1 0             1112 Feb 19  2020 inittab
-rwxrwxr-x    1 0             1136 Mar 20  2018 insdrv.sh
-rwxr-xr-x    1 0              112 Feb 19  2020 irf
-rwxr-xr-x    1 0              108 Feb 19  2020 mdev.conf
-rwxrwxr-x    1 0              430 Mar 29  2019 omci_custom_opt.conf
-rwxrwxr-x    1 0             7920 Mar 29  2019 omci_mib.cfg
-rwxr-xr-x    1 0              123 Feb 19  2020 orf
lrwxrwxrwx    1 0               11 Feb 19  2020 passwd -> /var/passwd
lrwxrwxrwx    1 0                8 Feb 19  2020 ppp -> /var/ppp
-rwxr-xr-x    1 0              190 Feb 19  2020 profile
-rw-r--r--    1 0             2932 Feb 19  2020 protocols
-rw-r--r--    1 0             3383 Feb 19  2020 radvd.conf
-rwxr-xr-x    1 0              454 Feb 19  2020 rc_voip
lrwxrwxrwx    1 0               16 Feb 19  2020 resolv.conf -> /var/resolv.conf
-rwxrwxr-x    1 0              183 Mar 20  2018 rtk_tr142.sh
-rwxrwxr-x    1 0                0 Mar 20  2018 run_customized_sdk.sh
-rwxrwxr-x    1 0             1271 Mar 20  2018 runoam.sh
-rwxrwxr-x    1 0             5387 Mar 29  2019 runomci.sh
-rwxrwxr-x    1 0              908 Mar 20  2018 runsdk.sh
drwxr-xr-x    2 0              621 Feb 19  2020 scripts
-rwxr-xr-x    1 0             8205 Feb 19  2020 services
-rw-r--r--    1 0              474 Feb 19  2020 setprmt_reject
-rwxr-xr-x    1 0               17 Feb 19  2020 shells
-rwxr-xr-x    1 0             6199 Feb 19  2020 simplecfgservice.xml
lrwxrwxrwx    1 0               15 Feb 19  2020 solar.conf -> /var/solar.conf
-rwxr-xr-x    1 0              419 Feb 19  2020 solar.conf.in
-rw-r--r--    1 0               48 Feb 19  2020 version
-rwxr-xr-x    1 0             1706 Feb 19  2020 wscd.conf
226 Transfer complete.
```

As you can see i found a lot of stuff so i got curious and downloaded the "version" file which just had the router firmware version, I then went inside
the ppp directory which had `resolv.conf.ppp0` dowloaded it, it was my dns config which i wanted to change for a long time, I will just keep that aside
and not try funny buisness because i'm definitely not gonna get a refund if i break my router by this, Most of the files were just like i'd imagine

Then i found out `dnsmasq.conf` if you didn't know what dnsmasq is it's an open source dns server, and also found that the router ran on busy box
Instead of it being independent it was reaching out to an another ISP server, I'm not sure if this is supposed to happen. When i checked my router
was using a relay dns server which is scary, I don't want some rando server to control my dns, I just decided to use the cloudflare dns and added it in the
lan page of the router, Everything looked ok except for the dns relay stuff, I decided not to dig in any further than i have done so i just closed the ftp
connection, Now time to get a new router because simply this router is not something that i'm gonna be feeling safe to use around, Like i've said the dns
is always fetched from a remote server and nomatter what i try to change dns it won't work, See ya in an another blog