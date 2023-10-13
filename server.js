// const express = require('express');


// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({extended:false}));
// app.use(express.json());

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'employees_db'
//     },
//     console.log('Connected to the database')
// );

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });

//   module.exports = db;