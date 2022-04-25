'use strict';

let rootAccounting = document.getElementById('rootDivAccounting');
let tableJS = document.createElement('table');

let departmentsObjs_Arr = [
    {
        department: 'Administration',
        numOfEmp: 0,
        totalSalary: 0,
        avg: 0,
    },
    {
        department: 'Marketing',
        numOfEmp: 0,
        totalSalary: 0,
        avg: 0,
    },
    {
        department: 'Development',
        numOfEmp: 0,
        totalSalary: 0,
        avg: 0,
    },
    {
        department: 'Finance',
        numOfEmp: 0,
        totalSalary: 0,
        avg: 0,
    }
];

let footerObj = {
    totalNumOfEmps: 0,
    totalSalaries: 0,
    totalAvgs: 0,
};


const createTable = () => {
    let titles = ['Department Name', '# of employees', 'Total Salary', 'Average'];
    tableJS.className = 'table_js';
    let title_tr = document.createElement('tr');
    for (let i = 0; i < titles.length; i++) {
        let temp_th = document.createElement('th');
        temp_th.textContent = titles[i];
        title_tr.appendChild(temp_th);
    }
    tableJS.appendChild(title_tr);
    rootAccounting.appendChild(tableJS);
}

const renderTableData = arr => {
    for (let element of arr) {
        let trEl = document.createElement('tr');

        trEl.innerHTML = `
        <td>${element.department}</td>
        <td>${element.numOfEmp}</td>
        <td>${element.totalSalary}</td>
        <td>${element.avg}</td>
        `;

        tableJS.appendChild(trEl);
    }

    let trEl = document.createElement('tr');

    trEl.innerHTML = `
    <td>Totals</td>
    <td>${footerObj.totalNumOfEmps}</td>
    <td>${footerObj.totalSalaries}</td>
    <td>${footerObj.totalAvgs}</td>
    `;

    tableJS.appendChild(trEl);
}

const addDataToTable = arr => {
    // FullName, Department, Level, Image_URL
    for(let tableElement of departmentsObjs_Arr){
        for(let cardElement of arr){
            if (tableElement.department === cardElement.Department) {
                tableElement.numOfEmp++;
                tableElement.totalSalary += cardElement.Salary();
                console.log(tableElement.numOfEmp);
            }
        }
        tableElement.avg = Math.floor(tableElement.totalSalary / tableElement.numOfEmp)
        footerObj.totalNumOfEmps += tableElement.numOfEmp;
        footerObj.totalSalaries += tableElement.totalSalary;
        footerObj.totalAvgs = Math.floor(footerObj.totalSalaries / footerObj.totalNumOfEmps);
    }
}

addDataToTable(employees_Arr);
createTable();
renderTableData(departmentsObjs_Arr);
