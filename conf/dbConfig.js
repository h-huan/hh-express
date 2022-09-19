const config = {
    port: 3000,
    database: {
        DATABASE: 'hh-blogs',
        // DATABASE: 'blogs-develop',
        USERNAME: 'root',
        PASSWORD: 'xxxx',
        HOST: 'xx.xx.xx.xx',
        PORT: '3306',
        insecureAuth: true,
        useConnectionPooling: true,
        multipleStatements: true    //多条sql
    }
}

module.exports = config
