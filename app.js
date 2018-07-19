//var rootRef = firebase.database().ref();

// Dom Elements
const buttonSend = document.getElementById('btnSend');

document.addEventListener('DOMContentLoaded', () => {
  const rootRef = firebase.database().ref();

  rootRef.once('value')
    .then(snapshot => {
      const data = snapshot.val();
      const tbody = document.getElementById('tbody-data');
      tbody.innerHTML = '';

      for (let property in data) {
        tbody.innerHTML += `
      <tr>
      <th scope="row">${property}</th>
      <td>${data[property].mail}</td>
      <td>${data[property].number}</td>
      <td>${data[property].post}</td>
    </tr>
      `
      }
    })
    .catch(error => {
      console.log('error' + error);
    });


  buttonSend.addEventListener('click', e => {
    e.preventDefault();
    const name = document.getElementById('inputName').value;
    const dataUser = {
      name,
      mail: document.getElementById('inputEmail').value,
      number: document.getElementById('inputAge').value,
      post: document.getElementById('inputComment').value
    }

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
        console.log('error' +  error);
      })

    /*   rootRef.once('value', snapshot => {
        if (snapshot.hasChild(name)) {
          document.getElementById('inputName').value = '';
          document.getElementById('inputEmail').value = '';
          document.getElementById('inputAge').value = '';
          document.getElementById('inputComment').value = '';

          alert('El dato ya existe en la base de datos');
        } else {
          rootRef.child(name).set(dataUser);

        }
      }); */


  })
})