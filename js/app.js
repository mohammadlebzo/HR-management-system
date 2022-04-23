'use strict';

// Variables:::::
let employees_Arr = [];
let root = document.getElementById('rootDiv');
let tableJS = document.createElement('table');


// Constructor:::::
function Employee(Employee_ID, FullName, Department, Level){
    this.Employee_ID = Employee_ID;
    this.FullName = FullName;
    this.Department = Department;
    this.Level = Level;
    // this.Image_URL = Image_URL;

    employees_Arr.push(this);
}


// Salary Calculation:::::
Employee.prototype.Salary = function() {
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
Employee.prototype.render = function() {
    let trEl = document.createElement('tr');
    trEl.innerHTML = `
    <td>${this.Employee_ID}</td>
    <td>${this.FullName}</td>
    <td>${this.Department}</td>
    <td>${this.Level}</td>
    <td>${this.Salary()}</td>
    `;
    tableJS.appendChild(trEl);
}


// Objects:::::
let emp1 = new Employee(1000, 'Ghazi Samer', 'Administration', 'Senior');
let emp2 = new Employee(1001, 'Lana Ali', 'Finance', 'Senior');
let emp3 = new Employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior');
let emp4 = new Employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior');
let emp5 = new Employee(1004, 'Omar Zaid', 'Development', 'Senior');
let emp6 = new Employee(1005, 'Rana Saleh', 'Development', 'Junior');
let emp7 = new Employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior');


// Creating the titles for each column:::::
const createTable = () => {
    let titles = ['Employee ID', 'Full Name', 'Department', 'Level', 'Salary'];
    tableJS.className = 'table_js';
    let title_tr = document.createElement('tr');
    for (let i = 0; i < titles.length; i++) {
        let temp_th = document.createElement('th');
        temp_th.textContent = titles[i];
        title_tr.appendChild(temp_th);
    }
    tableJS.appendChild(title_tr);
    root.appendChild(tableJS);
}


// The renderer of the page:::::
const pageRendering = arr => {
    for (let i = 0; i < arr.length; i++) 
        arr[i].render();
}


// Method calling:::::
createTable();
pageRendering(employees_Arr);



