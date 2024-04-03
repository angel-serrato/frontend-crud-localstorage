const form = document.getElementById('form__register');
const nameInput = document.getElementById('name__input');
const emailInput = document.getElementById('email__input');
const tableBody = document.getElementById('table__body');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    if (name && email) {
        const newData = {
            name,
            email
        };
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else {
        alert('Por favor, complete los campos');
    }
});

function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';
    data.forEach(function (item, index) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';
        editButton.classList.add('button', 'button__secondary');
        deleteButton.classList.add('button', 'button__tertiary');
        editButton.addEventListener('click', function () {
            editData(index);
        });
        deleteButton.addEventListener('click', function () {
            deleteData(index);
        });
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    emailInput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();