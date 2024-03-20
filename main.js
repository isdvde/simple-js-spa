import {$, setLoading, clean} from './uitls'
import {table, addRow, tableFooter} from './templates/table.template'

let $app = $('#app');
let page = 1

const getUrl = (page) => {
  let baseUrl = 'http://10.25.100.150:9999';
  let usersUrl = `${baseUrl}/api/v1/users`;
  let url = `${usersUrl}/?page=${page}`;
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
  let data = await getData(getUrl(page));
	clean($tableBody)
  data.data.forEach(el => {
    $tableBody.innerHTML += addRow(el);
  });
}

const generateTable = async () => {
  clean($app);
  setLoading($app);
  $app.innerHTML = table;
	$('#card').style.display = 'none';
  await generateTableBody();
  setLoading($app, 'false');
  let $tableFooter = $('#tableFooter');
  $tableFooter.innerHTML = tableFooter;
	$('#card').style.display = ''

  $('#nextPage').addEventListener('click', async () => {
		let np = $('#nextPage')
    if(page >= 200){
      return
    }
    page+=1;
		np.innerHTML = ''
		setLoading(np);
    await generateTableBody();
		setLoading(np, 'false');
		np.innerHTML = '>'
  })

  $('#prevPage').addEventListener('click', async () => {
		let pp = $('#prevPage')
    if(page <= 1){
      return
    }
    page-=1;
		pp.innerHTML = ''
		setLoading(pp);
    await generateTableBody();
		setLoading(pp, 'false');
		pp.innerHTML = '<'
  })
}

window.onload = generateTable()
