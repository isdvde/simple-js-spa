import {$} from './uitls'
import {table, addRow, tableFooter} from './templates/table.template'

let $app = $('#app');
let page = 1
let baseUrl = 'http://ldap.dev.uneg.edu.ve';
let usersUrl = `${baseUrl}/api/v1/users/?page=${page}`;

const getData = async () => {
  try {
    let res = await (await fetch(usersUrl)).json()
    if(res.status != 'ok'){
      throw new Error("Error obtener data")
    }
    return res
  } catch (e) {
    console.log(e)
  }
}

const nextPage = () => {
  p;

}

const generateTable = async () => {
  let data = await getData()
  $app.innerHTML = table
  let $tableBody = $('#tableBody')
  let $tableFooter = $('#tableFooter')
  $tableFooter.innerHTML = tableFooter
  $app.setAttribute("aria-busy", "false")
  data.data.forEach(el => {
    $tableBody.innerHTML += addRow(el)
  });

  $('#nextPage').addEventListener('click', () => {
    page+=1;
  })

  $('#prevPage')
}



// $app.setAttribute("aria-busy", "true")
generateTable()

