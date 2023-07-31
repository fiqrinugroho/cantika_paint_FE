const host = "http://localhost:3002";

// fungsi tambah transaksi
async function addTransaction() {
  const token = document.getElementById("token").value

  const data = {
    date: document.getElementById("trDate").value,
    itemId: document.getElementById("combobox").value,
    type: document.getElementById("type").value,
    out: document.getElementById("out").value,
    branchId: document.getElementById("branchId").value,
  };

  if (data.itemId == "" || data.out == "") {
    appendAlert('Data Tidak Boleh Kosong', 'danger')
  } else {
    await axios.post(`${host}/api/transaction/add`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      appendAlert('Berhasil Input Penjualan', 'success')
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch(error => {
      // console.error('Error:', error);
      appendAlert(error.response.data.message, 'danger')
    });
  }
}

async function updateTransaction() {
  const token = document.getElementById("token").value
  const id = document.getElementById("edit-id").value;
  const out = document.getElementById("edit-data").value;
  const data = {
    out
  }
  await axios.put(`${host}/api/transaction/update/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    appendAlert2("Berhasil Update Data", 'success')
    window.history.back(); // Navigasi ke halaman sebelumnya
    location.reload();
  })
  .catch(error => {
    // console.error('Error:', error);
    appendAlert2(error.response.data.message, 'danger')
  });
}

// fungsi tambah shipment
async function addShipment() {
  const token = document.getElementById("token").value

  const data = {
    date: document.getElementById("trDate").value,
    itemId: document.getElementById("combobox").value,
    type: document.getElementById("type").value,
    add: document.getElementById("add").value,
    branchId: document.getElementById("branchId").value,
  };

  if (data.itemId == "" || data.out == "") {
    appendAlert('Data Tidak Boleh Kosong', 'danger')
  } else {
    await axios.post(`${host}/api/shipment/add`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      appendAlert('Berhasil Input Pengiriman', 'success')
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch(error => {
      // console.error('Error:', error);
      appendAlert(error.response.data.message, 'danger')
    });
  }
}

async function updateShipment() {
  const token = document.getElementById("token").value
  const id = document.getElementById("edit-id").value;
  const add = document.getElementById("edit-data").value;
  const data = {
    add
  }
  const update = await axios.put(`${host}/api/shipment/update/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    appendAlert2('Berhasil Update Data', 'success')
    setTimeout(() => {
      window.history.back(); // Navigasi ke halaman sebelumnya
      location.reload();
    }, 500);
  })
  .catch(error => {
    // console.error('Error:', error);
    appendAlert2(error.response.data.message, 'danger')
  });
}

async function deleteData(id, endPoint) {
  const token = document.getElementById("token").value
  const restAPI = await axios.delete(`${host}${endPoint}${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }
  );
  if (restAPI.data.status) {
    appendAlert('Berhasil Hapus Data', 'success')
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    alert("500 Server Error [Tidak Dapat Menghapus data]");
  }
}

// Fungsi untuk mendapatkan data warna dari server berdasarkan jenis yang dipilih
async function getSelectedTypeData() {
  const branchId = document.getElementById("branchId").value
  const typeSelect = document.getElementById('type');
  let selectedType = typeSelect.value;

  // Jika jenis dipilih, ambil data dari server dengan Axios
  if (selectedType) {
    await axios.get(`${host}/api/item/auto?branchId=${branchId}&type=${selectedType}`)
      .then(response => {
        const comboSelect = document.getElementById("combobox");
        comboSelect.innerHTML = '';
        const data = response.data.data;
        data.forEach(item => {
          const option2 = document.createElement('option');
          option2.value = item.id;
          option2.textContent = item.color;
          comboSelect.appendChild(option2);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

async function changePassword() {
  const cookiesString = document.cookie;
  const cookiesArray = cookiesString.split(';');

  let tokenValue = null;
  cookiesArray.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name === "token") {
      tokenValue = value;
    }
  });
  const password = document.getElementById("password").value;
  const newPassword = document.getElementById("newPassword").value;
  const data = {
    password,
    newPassword
  }
  await axios.put(`${host}/api/auth/changePassword`, data, {
    headers: {
      'Authorization': `Bearer ${tokenValue}`
    },
  }).then(response => {
    alert("Password berhasil diganti, silahkan logout untuk melihat perubahan")
    window.location.href = "/logout"
  })
  .catch(error => {
    // console.error('Error:', error);
    appendAlert3(error.response.data.message, 'danger')
  });
}

// fungsi untuk membuat alert
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertPlaceholder2 = document.getElementById('liveAlertPlaceholder2')
const appendAlert2 = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('')

  alertPlaceholder2.append(wrapper)
}

const alertPlaceholder3 = document.getElementById('liveAlertPlaceholder3')
const appendAlert3 = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('')

  alertPlaceholder3.append(wrapper)
}

function formatDate(date) {
  const format = date.split('T');
  const parts = format[0].split('-')
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return formattedDate;
}

