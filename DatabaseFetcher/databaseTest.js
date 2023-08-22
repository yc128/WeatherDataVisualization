const config = {
    server: 'localhost',
    port: 1433,
    authentication:{
      options: {
          userName: 'nodejsapp',
          password: '114514',
      }
    },
    options: {
        encrypt: false,
        database: 'fsxy001',
        trustServerCertificate: true, // This trusts the self-signed certificate
    },

};
console.log("login with: " + config.authentication.options.userName);
const sql = require('mssql');
sql.connect(config, (err) => {
    if (err) console.log(err);
    // ... do something with the connection
});

sql.connect(config, (err) => {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database
    request.query('SELECT * FROM fsxy0001', (err, recordset) => {
        if (err) console.log(err)
        // send records as a response
        console.log(recordset);
    });
});