let root = document.querySelector('div#root');

export function getRoot() {
    return root;
}

export function updateHTML(innerHTML) {
    root.innerHTML = innerHTML;
}

export function showList(list) {
    if (!list || list.length === 0) return '<table>there is no list to show. click to add a todo</table><button class="add-btn fa fa-add"></button>';
    let table = '<table>';

    const headers = Object.keys(list[0]);
    let row = '<tr>';
    for (let header of headers) row += `<th>${header}</th>`;
    row += '<th>actions</th></tr>';
    table += row;

    for (const item of list) {
        row = '<tr>';
        for (let prop in item) {
            if (prop !== 'done')
                row += `<td>${item[prop]}</td>`;
            else
                row += `<td><button class="fa ${(item[prop] === true) ? 'fa-check' : ''} done-checkbox" data-checked=${item[prop]}></button></td>`;
        }
        row += `
            <td class="actions">
                <button class="edit-btn fa fa-pencil" data-id="${item.id}"></button>
                <button class="remove-btn fa fa-trash" data-id="${item.id}"></button>
            </td>
        </tr>`;
        table += row;
    }

    table += '</table><button class="add-btn fa fa-add"></button>';
    return table;
}

export async function loadHTMl(filepath) {
    const res = await fetch(filepath + '?v=1.0');
    console.log(res);
    if (!res.ok) throw new Error('Failed to load HTML.');

    return await res.text();
}