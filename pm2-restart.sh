NAME=web-upload

echo "Example: $0                   # http://yourIp:2222 and save files to /tmp"
echo "Example: $0 8081 ./upload     # http://yourIp:8081 and save files to ./upload"

pm2 del $NAME &> /dev/null
pm2 del $NAME &> /dev/null
pm2 start yarn  --name $NAME -- start $*