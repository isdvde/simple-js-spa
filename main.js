import {$, setLoading, clean} from './uitls'
import {table, addRow, tableFooter} from './templates/table.template'

let $app = $('#app');
let page = 1

const getUrl = (page) => {
  let baseUrl = 'http://ldap.dev.uneg.edu.ve';
  let usersUrl = `${baseUrl}/api/v1/users`;
  let url = `${usersUrl}/?page=${page}`;
  console.log(url);
  return url;
}

const getData = async (url) => {
  try {
    let res = await (await fetch(url)).json();
    if(res.status != 'ok'){
      throw new Error("Error obtener data");
    }
    return res;
  } catch (e) {
    console.log(e);
  }
}

const generateTableBody = async () => {
  let $tableBody = $('#tableBody');
  setLoading($tableBody);
  let data = await getData(getUrl(page));
  setLoading($tableBody, 'false');
  data.data.forEach(el => {
    $tableBody.innerHTML += addRow(el);
  });

}

// const generateTable = async () => {
const generateTable = () => {
  clean($app);
  // setLoading($app);
  // let data = await getData(getUrl(page));
  $app.innerHTML = table;
  generateTableBody();
  // let $tableBody = $('#tableBody');
  let $tableFooter = $('#tableFooter');
  $tableFooter.innerHTML = tableFooter;
  // setLoading($app, 'false');
  // data.data.forEach(el => {
  //   $tableBody.innerHTML += addRow(el);
  // });

  $('#nextPage').addEventListener('click', () => {
    if(page >= 200){
      return
    }
    page+=1;
    generateTable()
  })

  $('#prevPage').addEventListener('click', () => {
    if(page <= 0){
      return
    }
    page-=1;
    generateTable()
  })
  console.log(page)
}

window.onload = generateTable()

// $app.setAttribute("aria-busy", "true")
// generateTable()

