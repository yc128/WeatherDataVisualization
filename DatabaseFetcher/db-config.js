const bdConfig = {
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