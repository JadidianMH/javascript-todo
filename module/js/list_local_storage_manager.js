// variables
let list = [];
const storedList = localStorage.getItem('list');

if (storedList) {
    list = JSON.parse(storedList);
} else {
    list = [];
}

export function getList() {
    list = JSON.parse(localStorage.getItem('list'));
    console.log(list);
    return list;
}

export function edit(id, object) {
    id = Number(id);
    const index = list.findIndex((item) => item.id === id);

    if (index !== -1) {
        list[index] = {
            ...list[index],
            ...object,
        };
        console.log("updated item:", list[index]);
        localStorage.setItem('list', JSON.stringify(list));
    } else {
        console.warn("edit: item not found with id", id);
    }
}

export function add(item) {
    if (!list) list = [];
    list.push(item);
    localStorage.setItem('list', JSON.stringify(list));
}

export function remove(id) {
    list = list.filter(item => item.id !== id);
    localStorage.setItem('list', JSON.stringify(list));
}

export function getNextId(list) {
    if (!list || list.length === 0) return 1;
    const ids = list.map(item => item.id);
    return Math.max(...ids) + 1;
}