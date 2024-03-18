export let table = `
<article id="card" class="container">
  <table id="table">
      <thead>
        <th scope="col">Ficha</th>
        <th scope="col">Usuario</th>
        <th scope="col">Nombre</th>
        <th scope="col">Cedula</th>
        <th scope="col">Tipo</th>
        <th scope="col">Estado</th>
      </thead>
    <tbody id="tableBody">
    </tbody>
<tfoot id="tableFooter" class="grid">
</tfoot>
  </table>
</article>
`
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

export let tableFooter = `
<button id="nextPage" ><</button>
<button id="prevPage" >></button>
`
