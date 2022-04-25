'use strict';

// Variables:::::
let idStart = 1000;
let employees_Arr = [];
let DepOptionsArr = ['Administration', 'Marketing', 'Development', 'Finance'];
let levelOptionsArr = ['Junior', 'Mid-Senior', 'Senior'];
let root = document.getElementById('rootDiv');
// let tableJS = document.createElement('table');
let cardsContainerDiv = document.createElement('div');
let formJS = document.createElement('form');

const saveData = data => {
    let stringObj = JSON.stringify(data);
    localStorage.setItem('employees', stringObj);
}

const getData = () => {
    let savedData = localStorage.getItem('employees');
    if (savedData) {
        employees_Arr = [];
        let tempArray = JSON.parse(savedData);
        for (let element of tempArray) {
            let tempObj = new Employee(element.FullName, element.Department, element.Level, element.Image_URL);
        }
    }
}

// Constructor:::::
function Employee(FullName, Department, Level, Image_URL) {
    // this.Employee_ID = Employee_ID;
    this.FullName = FullName;
    this.Department = Department;
    this.Level = Level;
    this.Image_URL = Image_URL;

    employees_Arr.push(this);
}


Employee.prototype.Employee_ID = function () {
    return idStart++;
}


// Salary Calculation:::::
Employee.prototype.Salary = function () {
    let taxPercent = 0.075;
    let grossSalary = 0;
    if (this.Level === 'Senior') {
        grossSalary = Math.random() * (2000 - 1500) + 1500;
        return Math.floor(grossSalary - (grossSalary * taxPercent));
    }
    if (this.Level === 'Mid-Senior') {
        grossSalary = Math.random() * (1500 - 1000) + 1000;
        return Math.floor(grossSalary - (grossSalary * taxPercent));
    }
    if (this.Level === 'Junior') {
        grossSalary = Math.random() * (1000 - 500) + 500;
        return Math.floor(grossSalary - (grossSalary * taxPercent));
    }
}


// Employee Rendering Method:::::
Employee.prototype.render = function () {
    let divEl = document.createElement('div');
    divEl.setAttribute('class', 'card');
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', this.Image_URL);
    let pEL1 = document.createElement('p');
    pEL1.textContent = `Name: ${this.FullName} - ID: ${this.Employee_ID()}`;
    let pEL2 = document.createElement('p');
    pEL2.textContent = `Department: ${this.Department} - Level: ${this.Level}`;
    let pEL3 = document.createElement('p');
    pEL3.textContent = `Salary: ${this.Salary()}$`;
    divEl.appendChild(imgEl);
    divEl.appendChild(pEL1);
    divEl.appendChild(pEL2);
    divEl.appendChild(pEL3);

    cardsContainerDiv.appendChild(divEl);
    cardsContainerDiv.setAttribute('class', 'cardsContainer');

    root.appendChild(cardsContainerDiv);
}


// Objects:::::

let emp1 = new Employee('Ghazi Samer', 'Administration', 'Senior', './assets/placeholder.jpg');
let emp2 = new Employee('Lana Ali', 'Finance', 'Senior', './assets/placeholder.jpg');
let emp3 = new Employee('Tamara Ayoub', 'Marketing', 'Senior', './assets/placeholder.jpg');
let emp4 = new Employee('Safi Walid', 'Administration', 'Mid-Senior', './assets/placeholder.jpg');
let emp5 = new Employee('Omar Zaid', 'Development', 'Senior', './assets/placeholder.jpg');
let emp6 = new Employee('Rana Saleh', 'Development', 'Junior', './assets/placeholder.jpg');
let emp7 = new Employee('Hadi Ahmad', 'Finance', 'Mid-Senior', './assets/placeholder.jpg');



const createForm = () => {
    //Full Name
    createElementWithAttribute_PLusID('label', 'fullName', null, 'Full Name', null);
    createElementWithAttribute_PLusID('input', 'text', 'fullName', 'name', null);
    //Department
    createElementWithAttribute_PLusID('label', 'department', null, 'Department', null);
    createElementWithAttribute_PLusID('select', null, 'departments', null, DepOptionsArr);
    //Level
    createElementWithAttribute_PLusID('label', 'level', null, 'Level', null);
    createElementWithAttribute_PLusID('select', null, 'levels', null, levelOptionsArr);
    //Image URL
    createElementWithAttribute_PLusID('label', 'imgURL', null, 'Image URL', null);
    createElementWithAttribute_PLusID('input', 'text', 'imgURL', 'URL', null);
    //Submit Button
    let btnJS = document.createElement('input');
    btnJS.setAttribute('type', 'submit');
    btnJS.setAttribute('value', 'Submit');
    // btnJS.addEventListener('click', addEmployee);

    formJS.appendChild(btnJS);
    formJS.addEventListener('submit', addEmployee);
    root.appendChild(formJS);
}

const createElementWithAttribute_PLusID = (elementName, typeValue, id, value, arrName) => {
    if (elementName === 'label') {
        let labelJS = document.createElement(elementName);
        labelJS.setAttribute('for', typeValue)
        labelJS.textContent = value;
        formJS.appendChild(labelJS);
    }
    if (elementName === 'input') {
        let inputJS = document.createElement(elementName);
        inputJS.setAttribute('type', typeValue);
        inputJS.setAttribute('id', id);
        inputJS.setAttribute('name', id);
        inputJS.setAttribute('placeHolder', value);
        formJS.appendChild(inputJS);
    }
    if (elementName === 'select') {
        let selectJS = document.createElement(elementName);
        selectJS.setAttribute('name', id);
        selectJS.setAttribute('id', id);
        createOptions(arrName, selectJS);
        formJS.appendChild(selectJS);
    }

}

const createOptions = (arr, parent) => {
    for (let element of arr) {
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', element);
        optionEl.textContent = element;
        parent.appendChild(optionEl);
    }
}

const addEmployee = (event) => {
    event.preventDefault();
    //FullName, Department, Level, Image_URL
    let fullNameE = event.target.fullName.value;
    let departmentE = event.target.departments.value;
    let levelsE = event.target.levels.value;
    let imgE = event.target.imgURL.value;
    // console.log(event.target.fullName.value);
    let newEmployee = new Employee(fullNameE, departmentE, levelsE, imgE);
    newEmployee.render();
    saveData(employees_Arr);
}

// The renderer of the page:::::
const pageRendering = arr => {
    for (let element of arr)
        element.render();
}


// Method calling:::::
// createCards();
// saveData(employees_Arr);
getData();
createForm();
pageRendering(employees_Arr);

