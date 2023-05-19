mongo << EOF

db = db.getSiblingDB('${MONGODB_DATABASE}')

db.createUser({
  user: '${MONGODB_USERNAME}',
  pwd: '${MONGODB_PASSWORD}',
  roles: [
    {
      role: 'readWrite',
      db: '${MONGODB_DATABASE}',
    },
  ],
});

EOF

mongoimport --db restful-api --collection todos --jsonArray --file /data/data.json -u root -p root123 --authenticationDatabase=admin
