const table_body = document.getElementById("tbody");
const input = document.getElementById("search");

const students = [{ ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
{ ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
{ ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' },
{ ID: 4, name: 'Yusuf', age: 21, grade: 'A', degree: 'BSc', email: 'yusuf@example.com' },
{ ID: 5, name: 'Saim', age: 21, grade: 'Z', degree: 'MCA', email: 'saim@example.com' },
{ ID: 6, name: 'Suboor', age: 21, grade: 'A', degree: 'BA', email: 'suboor@example.com' }];
// const students = [];

// adding student in array
function addStudentData() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let grade = document.getElementById("gpa").value;
    let age = document.getElementById("age").value;
    let degree = document.getElementById("degree").value;
    // modify the array
    var currentInd = (students.length == 0) ? 0 : students[students.length - 1].ID;
    students.push({ "ID": ++currentInd, "name": name, "age": age, "grade": grade, "degree": degree, "email": email });

    console.log("add student called");
    renderData(students);
}

// editing student
async function editStudent(studentId) {
    var addStudent = document.getElementById("submit");
    addStudent.onclick = "";
    console.log("edit student called");
    let studentObject = "";
    let idInd = 0;
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (student.ID === studentId) {
            studentObject = student;
            idInd = i;
        }
    }

    // set all values in UI
    document.getElementById("name").value = studentObject.name;
    document.getElementById("email").value = studentObject.email;
    document.getElementById("gpa").value = studentObject.grade;
    document.getElementById("age").value = studentObject.age;
    document.getElementById("degree").value = studentObject.degree;

    // change Add student -> Edit Stduent 
    const editButton = document.querySelector(".submit p");
    const divEdit = document.getElementById("submit");
    divEdit.classList.add("changeBackgroundColor");
    editButton.innerHTML = "Edit Student";

    editButton.addEventListener("click", () => {
        // update students array
        studentObject.name = document.getElementById("name").value;
        studentObject.email = document.getElementById("email").value;
        studentObject.grade = document.getElementById("gpa").value;
        studentObject.age = document.getElementById("age").value;
        studentObject.degree = document.getElementById("degree").value;

        students[idInd] = studentObject;
        console.log(students);
        renderData(students);
    });
    editButton.removeEventListener("click", () => {});
}

// delete a student
function deleteStudent(studentId) {
    console.log("delete student called");
    for (var i = students.length - 1; i >= 0; i--) {
        if (students[i].ID === studentId) {
            students.splice(i, 1);
        }
    }
    renderData(students);
}

// search students based on email, name or degree
// input.addEventListener("keydown", searchData(event));
function searchData() {
    console.log("search func called");
        var inputValue = input.value.toLowerCase();
        // filter data based on need
        let matchedstudents = [];
        for (let i = 0; i < students.length; i++) {
            if (students[i].name.toLowerCase().includes(inputValue) || students[i].email.toLowerCase().includes(inputValue) || students[i].degree.toLowerCase().includes(inputValue)) {
                matchedstudents.push(students[i]);
            }
        }
        renderData(matchedstudents);
    
}


// showing asked students on the table
function renderData(students) {
    console.log(students);
    table_body.innerHTML = "";
    students.forEach((student) => {
        const table_row = document.createElement("tr");
        table_row.innerHTML = `
            <td>${student.ID}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td id="action_col">
                <div class="degree">${student.degree}</div>
                <div class="actions">
                    <img src="/images/edit 1.png" alt="" onclick='editStudent(${student.ID})'>
                    <img src="/images/trash-2 1.png" alt="" onclick='deleteStudent(${student.ID})'>
                </div>
            </td>
        `;
        table_body.appendChild(table_row);
    });
}

// calling functions
// renderData(students);