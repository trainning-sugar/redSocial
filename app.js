const buttonSend = document.getElementById('btnSend');
const rootRef = firebase.database().ref();

const render = obj => {
  const tbody = document.getElementById('tbody-data');
  tbody.innerHTML = '';
  for (let property in obj) {
    tbody.innerHTML += `
            <tr>
            <th scope="row">${property}</th>
            <td>${obj[property].mail}</td>
            <td>${obj[property].number}</td>
            <td>${obj[property].post}</td>
            </tr>
          `
  }
};


window.getUsers = (rootRef) => {
  rootRef.once('value')
    .then(snapshot => {
      const data = snapshot.val();
      render(data);
    })
    .catch(error => {
      console.log('error' + error);
    });
}


window.createUser = (rootRef, name, dataUser) => {
  rootRef.once('value')
    .then(snapshot => {
      if (snapshot.hasChild(name)) {
        alert('El dato ya existe en la base de datos');
        document.getElementById('inputName').value = '';
        document.getElementById('inputEmail').value = '';
        document.getElementById('inputAge').value = '';
        document.getElementById('inputComment').value = '';
      } else {
        alert('se grabaron los datos')
        rootRef.child(name).set(dataUser);
        document.getElementById('inputName').value = '';
        document.getElementById('inputEmail').value = '';
        document.getElementById('inputAge').value = '';
        document.getElementById('inputComment').value = '';
      }
    })
    .catch(error => {
      console.log('error' + error);
    })
}

const addUsers = e => {
  e.preventDefault();
  const name = document.getElementById('inputName').value;
  const dataUser = {
    name,
    mail: document.getElementById('inputEmail').value,
    number: document.getElementById('inputAge').value,
    post: document.getElementById('inputComment').value
  };
  createUser(name, dataUser);
};


document.addEventListener('DOMContentLoaded', getUsers);
buttonSend.addEventListener('click', addUsers);