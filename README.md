# gladys-google-home

A module to use Google Home as speaker for Gladys.

## Installation

Use the module store to install the module or manually using :

```
Name : Google Home
Version : 1.0.0
URL : https://github.com/atrovato/gladys-google-home.git
Slug: google-home
```

Add a new Gladys parameter __GOOGLE_HOME_IP__ with your Google Home IP (example: 192.168.1.25).

## Information

It also can read Gladys notification with your Google Home, according to configure Gladys notification in parameters menu.

## Script

Add a new script, and let's talk :
```
gladys.modules['google-home'].say({
  text: "Nice to see you at home",
  language: "en"
});
```