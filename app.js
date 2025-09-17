import {add, edit, getList, getNextId, remove} from "./module/js/list_local_storage_manager.js";
import { getRoot, showList, updateHTML , loadHTMl } from "./module/js/html_manager.js";

let list = getList();
const root = getRoot();



async function renderTable() {
    document.body.classList = localStorage.getItem('current_theme') + '-theme';
    const html = showList(list);
    const bar = await loadHTMl('./module/html/bar.html');
    updateHTML(bar + html);
    console.log('renderTable');
}

async function renderForm(mode ,id = null) {
    const bar = await loadHTMl('./module/html/bar.html?v=1.0');
    const html = await loadHTMl('./module/html/form.html?v=1.0');

    updateHTML(bar + html);

    const submitBtn = document.querySelector('#submit-btn');
    const hiddenInput = document.querySelector('#hidden');
    if (submitBtn && mode === 'add') {
        submitBtn.id = 'add-todo';
    } else if (submitBtn && mode === 'edit') {
        id = Number(id);
        list = getList();
        const nameField = await document.querySelector('#name');
        const descriptionField = await document.querySelector('#description');

        let index = list.findIndex(item => item.id === id);
        let object = list[index];

        console.log(object, nameField, descriptionField);

        nameField.value = object.name;
        descriptionField.value = object.description;

        submitBtn.id = 'edit-todo';
        hiddenInput.id = 'id';
        hiddenInput.value = id;
    }
}


renderTable();

// event delegation
document.body.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('remove-btn')) {
        const id = Number(target.dataset.id);
        const parentTr = target.closest('tr');
        parentTr.classList.add('going-to-die');
        parentTr.addEventListener('animationend', function() {
            remove(id);
            list = getList();
            renderTable();
        });
    }

    if (target.classList.contains('edit-btn')) {
        const id = target.dataset.id;
        renderForm('edit', id);
        console.log('edit form');
    }

    if (target.classList.contains('add-btn')) {
        renderForm('add');
        console.log('add form');
    }

    if (target.classList.contains('done-checkbox')) {

        const tr = target.closest('tr');
        const editBtn = tr.querySelector('.actions .edit-btn');
        const id = Number(editBtn.dataset.id);

        let object = {
            done: target.dataset.checked === 'false',
        }

        console.log('im here', id, object.done, target);

        edit(id, object);
        renderTable();
    }

    if (target.id === 'add-todo') {
        const id = Number(getNextId(list));
        const name = document.querySelector('#name').value;
        const description = document.querySelector('#description').value;

        const object = {
            id: id,
            done: false,
            name: name,
            description: description,
        }

        add(object);
        renderTable()
    }
    if (target.id === 'edit-todo') {
        const name = document.querySelector('#name').value;
        const description = document.querySelector('#description').value;
        const id = document.querySelector('#id').value;

        console.log('submitting edit form');

        let object = {
            name: name,
            description: description,
        }
        edit(id, object);
        renderTable();

    }

    if (target.id === 'theme-switcher') {
        themeSwitch();
    }

    if (target.id === 'home') {
        renderTable();
    }

});

function themeSwitch() {
    let current_theme = localStorage.getItem('current_theme');

    if (current_theme === 'light') {
        current_theme = 'dark';
    } else {
        current_theme = 'light';
    }

    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(current_theme + '-theme');

    localStorage.setItem('current_theme', current_theme);
}
