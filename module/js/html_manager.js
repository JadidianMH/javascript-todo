let root = document.querySelector('div#root');

export function getRoot() {
    return root;
}

export function updateHTML(innerHTML) {
    root.innerHTML = innerHTML;
}

export function showList(list, sortBy = 'id', sortOrder = 'asc', page=0) {
    if (!list || list.length === 0) return '<table>there is no list to show. click to add a todo</table><button class="add-btn fa fa-add">add</button>';
    let table = '<table>';

    if (sortBy) {
        list = [...list].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }

    const sizeToShow = 5;
    let firstIndex = page * sizeToShow;
    let lastIndex = (page + 1) * sizeToShow;

    list = [...list.slice(firstIndex, lastIndex)];

    console.log('sorted by', sortBy);

    const headers = Object.keys(list[0]);
    let row = '<tr>';
    for (let header of headers) {
        const icon = (sortBy === header)
            ? (sortOrder === "asc" ? "fa-angle-down" : "fa-angle-up")
            : "fa-angle-down";
        row += `<th>${header}<button data-sort="${header}" class="sort-btn fa ${icon}"></button></th>`;
    }
    row += '<th>actions</th></tr>';
    table += row;

    for (const item of list) {
        row = '<tr>';
        for (let prop in item) {
            if (prop !== 'done' && prop !== 'like')
                row += `<td>${item[prop]}</td>`;
            else if (prop === 'done')
                row += `<td><button class="fa ${(item[prop] === true) ? 'fa-check' : ''} done-checkbox" data-checked=${item[prop]}></button></td>`;
            else
                row += `<td>
                    <button class="fa like-btn ${item[prop] ? 'fa-solid' : 'fa-regular'} fa-heart" 
                        data-id="${item.id}" 
                        data-liked="${item[prop]}">
                    </button>
                </td>`;


        }
        row += `
            <td class="actions">
                <button class="edit-btn fa fa-pencil" data-id="${item.id}">edit</button>
                <button class="remove-btn fa fa-trash" data-id="${item.id}">remove</button>
            </td>
        </tr>`;
        table += row;
    }

    table += '</table><button class="add-btn fa fa-add">add</button>';
    return table;
}

export async function loadHTMl(filepath) {
    const res = await fetch(filepath + '?v=1.0');
    console.log(res);
    if (!res.ok) throw new Error('Failed to load HTML.');

    return await res.text();
}