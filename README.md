# what is this

upload a file to the server via a web page. The file is saved in /tmp.


## how to install

```bash
# clone from git
git clone git@gitlab.com:michel-yg-chen/web-upload.git
yarn install 
```

## how to run 

```bash
yarn start		# http://ip:2222	# default using port 2222
```


## where to get the uploaded file

```bash
ls -ltr /tmp/			# default in /tmp folder
```


## reference

- learn from the similar project [multiparty](https://yarnpkg.com/en/package/multiparty)
- how to get a file from the server via a web page [serve](https://yarnpkg.com/en/package/serve)

