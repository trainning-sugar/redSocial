//var rootRef = firebase.database().ref();

// Dom Elements
const buttonSend = document.getElementById('btnSend');

const rootRef = firebase.database().ref();

rootRef.once("value")
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
})