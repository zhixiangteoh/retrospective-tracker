<h1 align="center">Retrospective-Tracker</h1>

> Browser extension designed to conveniently create and track weekly retrospectives for the MLH Fellowship.

## Features
TBC

## Description

Weekly retrospectives are some of the most important reflective activities in the MLH Fellowship. However, the current process of only thinking up retrospective green, yellow, red notes during Friday's standup meetings, in the short time frame of 5-7 minutes is limiting in terms of the deep reflection and retrospection that one is supposed to undergo. Retrospective-Tracker aims to partially solve this issue by incorporating a convenient manner to jot down retrospective one-liners throughout the week, so that fellows can use the time on Fridays to reflect more deeply about these one-liners, to achieve a deeper level of retrospection.

## Install

Clone repository.
```sh
git clone git@github.com:zhixiangteoh/retrospective-tracker.git
cd retrospective-tracker
```

Install dependencies.
```sh
yarn install
```

Build extension locally
```sh
yarn build
```
## Usage

Enable extension within browser:
1. For Firefox, follow [this](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
1. For Chrome, navigate to `chrome://extensions`
2. Enable Developer mode (top right)
3. Click `Load unpacked` (top left) and select the `retrospective-tracker/build` folder you just built
4. Have fun!

## Made possible with

![React Web Extension Boilerplate](logo.png)
