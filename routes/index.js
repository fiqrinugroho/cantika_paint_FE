const router = require("express").Router();
const axios = require("axios");
const auth = require("../middlewares/authViews");
const host = "http://localhost:3002";

// dashboard admin
router.get('/', auth, (req, res) => {
  const token = req.cookies.token;
  const branchId = req.cookies.branchId;
  const branch = req.cookies.branch;
  const role = req.cookies.role;
  const username = req.cookies.username;
  // Array untuk menyimpan hasil permintaan GET
  const requests = [];

  // Permintaan GET pertama
  const request1 = axios.get(`${host}/api/item/branch/${branchId}`);
  requests.push(request1);
  const request2 = axios.get(`${host}/api/transaction/get`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  requests.push(request2);
  // Menjalankan kedua permintaan GET secara bersamaan
  Promise.all(requests)
    .then(([response1, response2]) => {
      // Menangani respons
      const items = response1.data.data;
      const transaction = response2.data.data
      const data = {
        items,
        transaction,
        username,
        branchId,
      };
      res.render('index', data);
    })
    .catch(error => {
      // Menangani kesalahan
      console.error(error);
    });
});

router.get('/login', (req, res) => {
  res.render('login', { error: "" });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Mengambil respons dari API menggunakan Axios
    const response = await axios.post(`${host}/api/auth/login`, { username, password });
    // Menyimpan data respons ke cookie
    res.cookie('token', response.data.data.accessToken);
    res.cookie('branchId', response.data.data.branchId);
    res.cookie('branch', response.data.data.location);
    res.cookie('role', response.data.data.roleId);
    res.cookie('username', username);
    // Menampilkan halaman utama 
    res.redirect('/');
  } catch (error) {
    const errorMessage = error.response.data.message; // Mengambil pesan kesalahan dari respons API
    res.render('login', { error: errorMessage }); // Mengirimkan pesan kesalahan ke halaman login
  }
});
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('username');
  res.clearCookie('branchId');
  res.clearCookie('branch');
  res.clearCookie('role');
  res.redirect('/login');
});

// halaman penjualan

const todayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return date = `${year}-${month}-${day}`;
};

router.get('/penjualan', auth, async (req, res) => {
  const username = req.cookies.username;
  const token = req.cookies.token;
  let date = req.query.tanggal
  let branchId = req.cookies.branchId
  let branch = req.cookies.branch
  if (!date) {
    date = todayDate();
  }
  if (branchId == 0) {
    let id = req.query.branchId
    await axios.get(`${host}/api/transaction/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        date,
        branchId: id,
      }
    }).then(response => {
      // Menangani respons
      res.render('transaction', { transaction: response.data.data, tgl: date, branch, branchId, username });

    })
      .catch(error => {
        // Menangani kesalahan
        res.render('transaction', { transaction: "", tgl: date, branch, branchId, username });
      });
  } else {
    await axios.get(`${host}/api/transaction/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        date,
        branchId
      }
    }).then(response => {
      // Menangani respons
      res.render('transaction', { transaction: response.data.data, tgl: date, branch, branchId, username });

    })
      .catch(error => {
        // Menangani kesalahan
        res.render('transaction', { transaction: "", tgl: date, branch, branchId, username });
      });
  }
});

router.post('/penjualan/add', auth, (req, res) => {
  const token = req.cookies.token;
  const branchId = req.body.branchId2;
  const branch = req.body.branch2;
  const username = req.cookies.username;

  let date = req.body.tanggal2
  if (!date) {
    date = todayDate();
  }
  // Array untuk menyimpan hasil permintaan GET
  const requests = [];

  // Permintaan GET pertama
  const request1 = axios.get(`${host}/api/transaction/search`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      date,
      branchId
    }
  });
  requests.push(request1);

  // Permintaan GET kedua
  const request2 = axios.get(`${host}/api/item/auto?branchId=${branchId}&type=pro`);
  requests.push(request2);

  // Menjalankan kedua permintaan GET secara bersamaan
  Promise.all(requests)
    .then(([response1, response2]) => {
      // Menangani respons
      const transactionData = response1.data.data;
      const itemsData = response2.data.data
      // console.log(itemsData)
      res.render('addTransaction', { transaction: transactionData, colors: itemsData, tgl: date, branch, branchId, token, username });

    })
    .catch(error => {
      // Menangani kesalahan
      console.error(error);
    });
});

router.get('/pengiriman', auth, async (req, res) => {
  const token = req.cookies.token;
  const username = req.cookies.username;
  let date = req.query.tanggal
  let branchId = req.cookies.branchId
  let branch = req.cookies.branch
  if (!date) {
    date = todayDate();
  }
  if (branchId == 0) {
    let id = req.query.branchId
    await axios.get(`${host}/api/shipment/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        date,
        branchId: id,
      }
    }).then(response => {
      // Menangani respons
      res.render('shipment', { shipment: response.data.data, tgl: date, branch, branchId, username });

    })
      .catch(error => {
        // Menangani kesalahan
        res.render('shipment', { shipment: "", tgl: date, branch, branchId, username });
      });
  } else {
    await axios.get(`${host}/api/shipment/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        date,
        branchId
      }
    }).then(response => {
      // Menangani respons
      res.render('shipment', { shipment: response.data.data, tgl: date, branch, branchId, username });

    })
      .catch(error => {
        // Menangani kesalahan
        res.render('shipment', { shipment: "", tgl: date, branch, branchId, username });
      });
  }
});
router.post('/pengiriman/add', auth, (req, res) => {
  const token = req.cookies.token;
  const branchId = req.body.branchId2;
  const branch = req.body.branch2;
  const username = req.cookies.username;

  let date = req.body.tanggal2
  if (!date) {
    date = todayDate();
  }
  // Array untuk menyimpan hasil permintaan GET
  const requests = [];

  // Permintaan GET pertama
  const request1 = axios.get(`${host}/api/shipment/search`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      date,
      branchId
    }
  });
  requests.push(request1);

  // Permintaan GET kedua
  const request2 = axios.get(`${host}/api/item/auto?branchId=${branchId}&type=pro`);
  requests.push(request2);

  // Menjalankan kedua permintaan GET secara bersamaan
  Promise.all(requests)
    .then(([response1, response2]) => {
      // Menangani respons
      const shipmentData = response1.data.data;
      const itemsData = response2.data.data
      // console.log(itemsData)
      res.render('addShipment', { shipment: shipmentData, colors: itemsData, tgl: date, branch, branchId, token, username });

    })
    .catch(error => {
      // Menangani kesalahan
      console.error(error);
    });
});

router.get('/dataBarang', async (req, res) => {
  const token = req.cookies.token;
  const branchId = req.cookies.branchId;
  const branch = req.cookies.branch;
  const username = req.cookies.username;
    // Mengambil respons dari API menggunakan Axios
    await axios.get(`${host}/api/item/branch/${branchId}`)
    .then(response => {
      // Menangani respons
      res.render('dataBarang', { items: response.data.data, branch, branchId, username, token});
    })
    .catch(error => {
        // Menangani kesalahan
        res.render('dataBarang', { items: "", branch, branchId, username, token});
      });
});

router.get('/dataUser', async (req, res) => {
  const token = req.cookies.token;
  const branchId = req.cookies.branchId;
  const branch = req.cookies.branch;
  const username = req.cookies.username;
    // Mengambil respons dari API menggunakan Axios
    await axios.get(`${host}/api/auth/user`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // Menangani respons
      res.render('dataUser', { users: response.data.data, branch, branchId, username, token});
    })
    .catch(error => {
        // Menangani kesalahan
        res.render('dataUser', { users: "", branch, branchId, username, token});
      });
});

router.use('/', (req, res) => {
  res.render("404")
})
module.exports = router;