const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const data = button.getAttribute('data-bs-data')
    const id = button.getAttribute('data-bs-id')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.
    // Update the modal's content.
    const insertData = document.getElementById('edit-data')
    insertData.value = data
    insertData.textContent = `${data}`
    const idInput = document.getElementById('edit-id')
    idInput.value = id
    idInput.textContent = `${id}`

  })
}

const editModal = document.getElementById('editModal')
if (editModal) {
  editModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const color = button.getAttribute('data-bs-color');
    const type = button.getAttribute('data-bs-type');
    const stock = button.getAttribute('data-bs-stock');
    const id = button.getAttribute('data-bs-id')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.
    // Update the modal's content.
    const insertColor = document.getElementById('edit-color')
    insertColor.value = color
    insertColor.textContent = `${color}`
    const insertType = document.getElementById('edit-type')
    insertType.value = type
    const insertStock = document.getElementById('edit-stock')
    insertStock.value = stock
    insertStock.textContent = `${stock}`
    const idInput = document.getElementById('edit-id')
    idInput.value = id
    idInput.textContent = `${id}`
  })
}