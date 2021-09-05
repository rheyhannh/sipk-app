const express = require('express');
const mysql = require('mysql');

const app = express();

const port = process.env.PORT || 5000;

var connection;

const db_config = {
  host: '',
  user: '',
  password: '',
  database: ''
};

function handleDisconnect() {
  connection = mysql.createConnection(db_config); 

  connection.connect(function(err) {              
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                    
  });                                     

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                 
    }
  });
}

handleDisconnect();

app.use(express.static('public')); // Untuk Bikin Dir Public

app.use(express.urlencoded({extended: false})); // Untuk Akses ID Objek

app.get('/', (req, res) =>{
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM matkul',
    (error, results) => {
      res.render('index.ejs', {matkul: results});
    }
  )
});

app.get('/new', (req, res) =>{
  res.render('new.ejs');
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM matkul WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/create', (req, res) =>{
  connection.query(
    'INSERT INTO `matkul` (`nama`, `sks`, `indeks`, `nilai`, `total`) VALUES (?, ?, ?, ?, ?);', 
    [req.body.namaMatkul, req.body.sksMatkul, req.body.nilaiIndeks, req.body.nilaiBobot, req.body.totalNilai],
    (error, results) =>{
      connection.query(
        'SET @count = 0',
        (error, results) =>{
          connection.query(
            'UPDATE matkul SET matkul.id = @count:= @count + 1;',
            (error, results) =>{
              connection.query(
                'ALTER TABLE matkul AUTO_INCREMENT = 1;',
                (error, results) =>{
                  res.redirect('/index');
                }
              )
            }
          )
        }
      )
    }
  )
});

app.post('/delete/:id', (req, res) =>{
  connection.query(
    'DELETE FROM matkul WHERE ID =?', // Menghapus Baris tertentu dengan nomor ID
    [req.params.id],
    (error, results) =>{
      connection.query(
        'SET @count = 0', // Set Nilai Count untuk Reset ID
        (error, results) =>{
          connection.query(
            'UPDATE matkul SET matkul.id = @count:= @count + 1;', // Reset Masing-masing nomor ID pada semua Baris
            (error, results) =>{
              connection.query(
                'ALTER TABLE matkul AUTO_INCREMENT = 1;', // Reset AUTO INCREMENT
                (error, results) =>{
                  res.redirect('/index');
                }
              )
            }
          )
        }
      )
    }
  )
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE matkul SET nama  = ?, sks = ?, indeks = ?, nilai = ?, total = ? WHERE id = ?',
    [req.body.namaMatkul, req.body.sksMatkul, req.body.nilaiIndeks, req.body.nilaiBobot, req.body.totalNilai, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  )
});

app.listen(port, function(){
  console.log("Listening on " + port);
});

