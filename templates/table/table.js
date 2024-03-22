import {$, setLoading, clean} from '../../uitls'
// import {table} from './table.template'

let page = 1

const getTemplate = async (selector) => {
  let text = await fetch('/templates/table/table.html')
    .then(res => res.text())
    .then(text => text)

  let template = new DOMParser().parseFromString(text, 'text/html')
  let item = template.querySelector(selector).innerHTML
  return item
}

export const addRow = async obj => {
  let template = await getTemplate('#table-template__body');
  for(let [key, val] of Object.entries(obj)){
    template = template.replace('{'+key+'}', val)
  }
  return template;
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
  let $tableBody = $('#table__body');
  let data = await getData(getUrl(page));
  var bodyContent = ""

  for(let el of data.data){
    bodyContent += await addRow(el);
  }
  $tableBody.innerHTML = bodyContent;
}

const generateTableFooter = () => {
  let $tableFooter = $('#table__footer');
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

  let table = await getTemplate('#table-template')

  $app.innerHTML = table;
  $('#card').style.display = 'none';

  await generateTableBody();
  setLoading($app, 'false');
  $('#card').style.display = '';

  generateTableFooter()
}

export const main = async ($app) => {
  await generateTable($app)
}
