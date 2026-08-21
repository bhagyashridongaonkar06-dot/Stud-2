const cl= console.log;

const stdForm = document.getElementById('stdForm')
const stdList = document.getElementById('stdList')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')
const contact = document.getElementById('contact')
const addStd =document.getElementById('addStd')
const updateStd =document.getElementById('updateStd')


let stdArr = [
    {
        fname: "John",
        lname: "Doe",
        email: "john@gmail.com",
        contact: "9876543210",
        stdId: "std101"
    },
    {
        fname: "Rahul",
        lname: "Sharma",
        email: "rahul@gmail.com",
        contact: "9876543211",
        stdId: "std102"
    },
    {
        fname: "Priya",
        lname: "Patil",
        email: "priya@gmail.com",
        contact: "9876543212",
        stdId: "std103"
    },
    {
        fname: "Sneha",
        lname: "Deshmukh",
        email: "sneha@gmail.com",
        contact: "9876543213",
        stdId: "std104"
    },
    {
        fname: "Amit",
        lname: "Joshi",
        email: "amit@gmail.com",
        contact: "9876543214",
        stdId: "std105"
    },
    {
        fname: "Pooja",
        lname: "Kulkarni",
        email: "pooja@gmail.com",
        contact: "9876543215",
        stdId: "std106"
    },
    {
        fname: "Akash",
        lname: "Pawar",
        email: "akash@gmail.com",
        contact: "9876543216",
        stdId: "std107"
    }
];


function onCreateStdList(arr){
    let res = '';

    arr.forEach((ele, i )=> {
        res += `<tr id="${ele.stdId}">
                                <td>${i + 1}</td>
                                <td>${ele.fname}</td>
                                <td>${ele.lname}</td>
                                <td>${ele.email}</td>
                                <td>${ele.contact}</td>
                                <td><i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i></td>
                                <td><i onclick="onDelete(this)" class="fa-solid fa-trash fa-2x text-danger" role="button"></i></td>
                            </tr>`
    });

    stdList.innerHTML = res;
}

onCreateStdList(stdArr)

function onEdit(ele){
    let editId = ele.closest('tr').id;
    // cl(editId)
    updateStd.setAttribute('editId', editId)

    let editObj = stdArr.find(e => e.stdId === editId)
    // cl(editObj)

    fname.value = editObj.fname
    lname.value = editObj.lname
    email.value = editObj.email
    contact.value = editObj.contact

    addStd.classList.add('d-none')
    updateStd.classList.remove('d-none')

}

function onUpdate(){
    let updateId = this.getAttribute('editId')
    cl(updateId)

    let updateObj = {
        fname : fname.value,
        lname : lname.value,
        email : email.value,
        contact : contact.value,
        stdId : updateId
    }

    let getIndex = stdArr.findIndex(e => e.stdId === updateId)
    stdArr[getIndex] = updateObj

    let tr = document.getElementById(updateId).children;
    tr[1].innerText = updateObj.fname
    tr[2].innerText = updateObj.lname
    tr[3].innerText = updateObj.email
    tr[4].innerText = updateObj.contact

    stdForm.reset();
    addStd.classList.remove('d-none')
    updateStd.classList.add('d-none')

}

function onDelete(ele){
    let deleteId = ele.closest('tr').id;

    let getConfirmation = confirm(`Are you sure you want to delete student with id ${deleteId}`)

    if(getConfirmation){
        let getIndex = stdArr.findIndex(e => e.stdId === deleteId)
        stdArr.splice(getIndex, 1)

        document.getElementById(deleteId).remove()

        let tds = document.querySelectorAll('#stdList tr td:first-child')
        tds.forEach((e, i) => e.innerText = i +  1)
    }
}



function onSubmit(eve){
    eve.preventDefault();

    let newObj = {
        fname : fname.value,
        lname : lname.value,
        email : email.value,
        contact : contact.value,
        stdId : Date.now().toString()
    }

    stdArr.push(newObj)
    stdForm.reset();

    let tr = document.createElement('tr')
    tr.setAttribute('id', newObj.stdId)
    tr.innerHTML = `
                                <td>${stdArr.length}</td>
                                <td>${newObj.fname}</td>
                                <td>${newObj.lname}</td>
                                <td>${newObj.email}</td>
                                <td>${newObj.contact}</td>
                                <td><i onclick="onEdit(this)"  class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i></td>
                                <td><i onclick="onDelete(this)" class="fa-solid fa-trash fa-2x text-danger" role="button"></i></td>`
    stdList.prepend(tr)
}













stdForm.addEventListener('submit', onSubmit)
updateStd.addEventListener('click', onUpdate)