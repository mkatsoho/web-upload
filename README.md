# What is this

upload files to the server via a web page. By default files are saved in /tmp.


## How to install

```bash
yarn global install pm2

git clone git@gitlab.com:michel-yg-chen/web-upload.git && cd web-upload && yarn
```

## How to run 

```bash
cd web-upload; ./pm2-restart.sh 8081 /tmp 
```

## reference

- serve a folder using a web page [web](https://github.com/mkatsoho/web)
- learn from the similar project [multiparty](https://yarnpkg.com/en/package/multiparty)

