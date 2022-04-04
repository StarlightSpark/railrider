# RailRider

Application to assist in [train hopping](https://en.wikipedia.org/wiki/Freighthopping).

## Features
* detect nearby trains
* find fastest route by freight train
* warn rider of upcoming crossings
* warn rider of upcoming trains on parallel tracks
* warn rider if train is stopping or about to move
* radio scanner for voice communication
* transcribe and log radio voice communication
* show current speed (and whether it is safe to jump off)

## Components
* Routing Service (GraphHopper with custom routing rules)
* POI Database
* Device (Raspberry Pi with an RTL-SDR and internet connection)

## POI Database
Database of crowdsourced points of interest for train hopping:
* catch out spots
* hop off spots

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
