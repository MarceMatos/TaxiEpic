var mysql = require('mysql');
const database = {
    host: 'findersdb.celkuy6g2tgu.us-east-1.rds.amazonaws.com', 
    user: 'admin', 
    database: 'taxi', 
    password: 'admin1234' 
};
const connection = mysql.createConnection(database)

connection.connect((err) => {
    if (err) {
        console.error('error conecting: ' + err.stack);
        return;
    }
    else{
        console.log("Connected to DB")
    }
});

module.exports = connection;
