const output = document.querySelector(".output");
const url = 'list.json';
let myList = [];
let localData = localStorage.getItem('myList');
console.log(localData);
window.addEventListener('DOMContentLoaded', () => {
    output.textContent = 'Loading......';
    if (localData) {
        myList = JSON.parse(localStorage.getItem('myList'));
        console.log(myList);
        maker();
    } else {
        reloader();
    }
});
 
function addToList() {
    console.log(input1.value);
    console.log(input2.value);
    if (input1.value.length > 3) {
        const myObj = {
            "name": input1.value,
            "guests": input2.value,
            "status": false
        }
        const val = myList.length;
        myList.push(myObj);
        savetoStorage();
        makeList(myObj, val);
    }
    input1.value = '';
}
 
 
function reloader() {
    fetch(url).then(rep => rep.json())
        .then((data) => {
            myList = data;
            maker();
            savetoStorage();
        })
}
 
 
function maker() {
    output.innerHTML = '';
    myList.forEach((el, index) => {
        makeList(el, index);
    });
}
 
function makeList(item, index) {
    const div = document.createElement('div');
    div.classList.add('box');
    div.innerHTML = `${item.name} #(${item.guests})`;
    output.append(div);
    if (item.status) {
        div.classList.add('confirmed');
    } else {
        div.classList.add('notConfirmed')
    }
    div.addEventListener('click', (e) => {
        div.classList.toggle('confirmed');
        div.classList.toggle('notConfirmed');
        console.log(div.classList.contains('confirmed'));
        if (div.classList.contains('confirmed')) {
            myList[index].status = true;
        } else {
            myList[index].status = false;
        }
        savetoStorage();
    })
    const span = document.createElement('span');
    span.textContent = 'X';
    div.append(span);
    span.addEventListener('click', (e) => {
        console.log(index);
        e.stopPropagation();
        div.remove();
        myList.splice(index, 1);
        savetoStorage();
    })
 
}
 
function savetoStorage() {
    console.log(myList);
    localStorage.setItem('myList', JSON.stringify(myList));
}