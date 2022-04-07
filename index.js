const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '123456',
    port: 5432,
});

client.connect();
console.log("connected to the DB on the 5432 port");


// TO CREATE A TABLE

// const query = `
// CREATE TABLE users (
//     email varchar,
//     firstName varchar,
//     lastName varchar,
//     age int
// );
// `;


// client.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Table is successfully created');
//     client.end();
// });

// END OF CREATE TABELE







// TO INSERT DATA INTO A TABLE:

// const query = `
// INSERT INTO users (email, firstName, lastName, age)
// VALUES ('EMNA@gmail.com', 'anna', 'dias', 35)
// `;



// client.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Data insert successful');
//     client.end();
// });






// SELECT ALL ROWS ANS ALL COLUMNS FROM THE USERS DATABASE

const query = `
SELECT *
FROM users
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
});







// TO RETURN ALL USERS YOUNGER THAN 30

// const query = `
// SELECT *
// FROM users
// WHERE age<30
// `;



// client.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     for (let row of res.rows) {
//         console.log(row);
//     }
//     client.end();
// });











// TO UPDATE DATA THAT ALREADY EXISTS

// const query = `
// UPDATE users
// SET age = 22
// WHERE email = 'johndoe@gmail.com'
// `;

// client.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Data update successful');
//     client.end();
// });









// TO DELETE DATA
// const query = `
// DELETE FROM users
// WHERE email = 'johndoe@gmail.com'
// `;


// client.query(query, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Data delete successful');
//     client.end();
// });








// CREATING A POOL

// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'testdb',
//     password: '123456',
//     port: 5432,
// });


// pool.on('error', (err, client) => {
//     console.error('Error:', err);
// });






// TO EXECUTE A QUEARY IN THAT POOL

// const query = `
// SELECT *
// FROM users
// `;

pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(query, (err, res) => {
        done();
        if (err) {
            console.log(err.stack);
        } else {
            for (let row of res.rows) {
                console.log(row);
            }
        }
    });
});



//  USE PROMISE IN THIS CASE

// pool.connect()
//     .then((client) => {
//         client.query(query)
//             .then(res => {
//                 for (let row of res.rows) {
//                     console.log(row);
//                 }
                
//             })
//             .catch(err => {
//                 console.error(err);
//             });
//     })
//     .catch(err => {
//         console.error(err);
//     });



// OR EVEN THE ASYNC/AWAIT SYNTAX

// (async () => {
//     try {
//         const client = await pool.connect();
//         const res = await client.query(query);

//         for (let row of res.rows) {
//             console.log(row);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// })();









// USING THE CURSOR TO READ LARGE QUEARIES  after ==> npm install --save pg pg-cursor

// const { Pool } = require('pg');
// const Cursor = require('pg-cursor');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'testdb',
//     password: '123456',
//     port: 5432,
// });

// (async () => {
//     const client = await pool.connect();
//     const query = 'SELECT * FROM users';

//     const cursor = await client.query(new Cursor(query));

//     cursor.read(1, (err, rows) => {
//         console.log('We got the first row set');
//         console.log(rows);

//         cursor.read(1, (err, rows) => {
//             console.log('This is the next row set');
//             console.log(rows);
//         });
//     });
// })();