const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('testing'))

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'produk',
});

// app.get('/', (req, res) => {
//  res.send('Hello I Am Kelompok 2')
//})

app.get('/show', (req, res) => {
  pool.query('SELECT ID,NamaProduk,Harga,Keterangan FROM makanan', function (error, results, fields) {

    // benar 
    try {
      if (error) throw error;
      res.send({ status: 'true', data: results })
    } catch (error) {
      console.log('false')
      res.send({ status: 'false', message: 'Terjadi Kesalahan !. Silahkan Coba lagi' });
    }
  });
})

app.post('/insert', (req, res) => {
  console.log('masuk insert')
  let namaProduct = req.body.namaProduct // ini salah besar kecilnya harus nya ini namaProduct, sesuikan sama htmlnya
  let harga = req.body.harga
  let keterangan = req.body.keterangan

  pool.query('INSERT INTO makanan (NamaProduk,Harga,Keterangan) VALUES ("' + namaProduct + '","' + harga + '","' + keterangan + '");',
    function (error, results, fields) {
      try {
        if (error) throw error;
        res.send({ status: 'true', message: 'Selamat data berhasil ditambahkan' })
      } catch (error) {
        console.log(error);
        res.send({ status: 'false', message: 'Terjadi kesalahan !. Silahkan coba lagi' })
      }
    });
})

app.post('/update', (req, res) => {
  let IDdata = req.body.IDdata
  let namaPoduct = req.body.namaProduct
  let harga = req.body.harga
  let keterangan = req.body.keterangan

  pool.query('UPDATE makanan SET NamaProduk="' + namaPoduct + '", Harga="' + harga + '", Keterangan="' + keterangan + '" WHERE ID="' + IDdata + '";',
    function (error, results, fields) {
      try {
        if (error) throw error;
        res.send({ status: 'true', message: 'Selamat data berhasil diubah' })
      } catch (error) {
        console.log(error);
        res.send({ status: 'false', message: 'Terjadi kesalahan !. Silahkan coba lagi' })
      }
    });
})

app.post('/delete', (req, res) => {
  let iddata = req.body.iddata
  pool.query('DELETE FROM makanan WHERE ID="' + iddata + '";', function (error, results, fields) {
    try {
      if (error) throw error;
      res.send({ status: 'true', message: 'Selamat data berhasil dihapus' })
    } catch (error) {
      console.log(error);
      res.send({ status: 'false', message: 'Terjadi kesalahan !. Silahkan coba lagi' })
    }
  });
})

app.listen(port, () => {
  console.log(`Selamat anda berhasil menjalankan port ${port}`)
})
