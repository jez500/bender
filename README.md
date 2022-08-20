# Bender dashboard

A link dashboard that can be managed without any code. Ideal for service listings on your server. **Heavily**
inspired by [Homer dashboard](https://github.com/bastienwirtz/homer) and aims to provide the same functionality
with one major change, **No yaml required**! 

All links can be managed via the UI including dragging and dropping your links to re-order or change groups. 
New pages and links can be added via the UI, as can global settings such as the app title, icon and theme.

## Under the hood

* Built using NuxtJS & Vue2
* Requires no database, all config is stored in a single config file `static/config.json`
* FontAwesome solid and brand icons available with inbuilt search
* Image lookup supported via anything in `static/images`
* Light & Dark mode

## Running without docker

* Requires NodeJS 14+ 
* Run `npm run start`
* Visit http://localhost:8080

## Running with docker

You should volume mount the `/app/static` directory as it contains the `config.json` (the file containing all 
links and settings which you will want to persist). It also contains an `images` directory which is used with 
the image lookup.

```sh
docker run -d \
  --name bender \
  -p 8080:8080 \
  -v </your/local/assets/>:/app/static \
  --restart=always \
  jez500/bender:latest
```

#### With docker-compose

A [`docker-compose.yml`](docker-compose.yml) file is available as an example. It must be edited to match 
your needs. You probably want to adjust the port mapping and volume binding (equivalent to `-p` and `-v` arguments).

Then launch the container:

```sh
cd /path/to/docker-compose.yml/
docker-compose up -d
```

## Developing

To develop locally, you can just run `npm run dev` and it will serve the app on `http://localhost:8080` 
with live reloading of edits.

All PRs are welcome!

## Author
[Jeremy Graham](https://jez.me)

## Attribution
Amazing contributors to [Homer](https://github.com/bastienwirtz/homer/graphs/contributors)
