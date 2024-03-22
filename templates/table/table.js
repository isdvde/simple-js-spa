import {$, setLoading, clean} from '../../uitls'
// import {table} from './table.template'

let page = 1

export const addRow = obj => {
	return `
<tr>
<th scope="col">${obj.initials}</th>
<td>${obj.uid}</td>
<td>${obj.displayName}</td>
<td>${obj.employeeNumber}</td>
<td>${obj.employeeType}</td>
<td>${obj.businessCategory}</td>
</tr>
`
}

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

const generateTableFooter = () => {
	let $tableFooter = $('#tableFooter');
	let prevButton = document.createElement('button');
	prevButton.setAttribute('id', 'prevPage');
	prevButton.innerHTML = '<'
	let nextButton = document.createElement('button');
	nextButton.setAttribute('id', 'nextPage');
	nextButton.innerHTML = '>'

	$tableFooter.append(prevButton)
	$tableFooter.append(nextButton)

  nextButton.addEventListener('click', async () => {
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
  
  prevButton.addEventListener('click', async () => {
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

const generateTable = async ($app) => {
  clean($app);
  setLoading($app);

	let table = $('#table-template').content.querySelector('article')

  $app.innerHTML = table.outerHTML;
	$('#card').style.display = 'none';

  await generateTableBody();
  setLoading($app, 'false');
	$('#card').style.display = '';

	generateTableFooter()
}

export const main = async ($app) => {
	await generateTable($app)

}
