const fs = require("fs");
const inquirer = require("inquirer");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

let html = "";
let manager;
let intern = [];
let engineer = [];

const questions = [
  {
    type: "input",
    name: "managername",
    message: "What is your managers name?"
  },
  {
    type: "input",
    name: "managerid",
    message: "What is your managers id?"
  },
  {
    type: "input",
    name: "manageremail",
    message: "What is your managers email?"
  },
  {
    type: "input",
    name: "manageroffice",
    message: "What is your managers office number?"
  }
];

const internQuest = [
  {
    type: "input",
    name: "internname",
    message: "What is your interns name?"
  },
  {
    type: "input",
    name: "internid",
    message: "What is your interns id?"
  },
  {
    type: "input",
    name: "internemail",
    message: "What is your interns email?"
  },
  {
    type: "input",
    name: "school",
    message: "Where did you go to school?"
  }
];

const engineerQuest = [
  {
    type: "input",
    name: "engineername",
    message: "What is your engineers name?"
  },
  {
    type: "input",
    name: "engineerid",
    message: "What is your engineers id?"
  },
  {
    type: "input",
    name: "engineeremail",
    message: "What is your engineers email?"
  },
  {
    type: "input",
    name: "github",
    message: "What is your github?"
  }
];

function managerQuestion() {
  inquirer.prompt(questions).then(answers => {
    // console.log(answers);
    const manager = new Manager(
      answers.managername,
      answers.managerid,
      answers.manageremail,
      answers.manageroffice
    );
    // console.log(manager);

    readMangFile(manager);
    employeeQuestion();
  });
}

function internQuestion() {
  inquirer.prompt(internQuest).then(answers => {
    // console.log(answers);
    intern = new Intern(
      answers.internname,
      answers.internid,
      answers.internemail,
      answers.school
    );
    console.log(intern);
    readInternFile(intern);
    employeeQuestion();
  });
  //   console.log("choose Intern");
}

function engineerQuestion() {
  inquirer.prompt(engineerQuest).then(answers => {
    // console.log(answers);
    engineer = new Engineer(
      answers.engineername,
      answers.engineerid,
      answers.engineeremail,
      answers.github
    );
    console.log(engineer);
    readEngFile(engineer);
    employeeQuestion();
  });
  //   console.log("choose engineer");
}
function buildTeam() {
  //   inquirer.prompt(questions).then(answers => {
  //     console.log(answers);
  //   });
  createHTML();
  console.log("building team");
}
function employeeQuestion() {
  inquirer
    .prompt({
      type: "list",
      name: "employeeChoice",
      message: "Would you like to add a team member?",
      choices: ["Intern", "Engineer", "I don't want another team member"]
    })
    .then(answers => {
      switch (answers.employeeChoice) {
        case "Intern":
          internQuestion();
          break;
        case "Engineer":
          engineerQuestion();
          break;
        default:
          buildTeam();
      }
    });
}

function readMangFile(htmlMana) {
  console.log(htmlMana);
  fs.readFile("./templates/manager.html", "utf8", function(error, data) {
    const newData = data
      .replace("ManagerName", htmlMana.name)
      .replace("MId", htmlMana.id)
      .replace("MEmail", htmlMana.email)
      .replace("MOfficeNumber", htmlMana.officeNumber);
    html += newData;
    console.log(newData);
  });
}

function readInternFile(htmlInt) {
  console.log(htmlInt);
  fs.readFile("./templates/intern.html", "utf8", function(error, data) {
    const newData = data
      .replace("InternName", htmlInt.name)
      .replace("IId", htmlInt.id)
      .replace("IEmail", htmlInt.email)
      .replace("ISchool", htmlInt.school);
    html += newData;
    console.log(newData);
  });
}

function readEngFile(htmlEng) {
  console.log(htmlEng);
  fs.readFile("./templates/engineer.html", "utf8", function(error, data) {
    const newData = data
      .replace("EngineerName", htmlEng.name)
      .replace("EId", htmlEng.id)
      .replace("EEmail", htmlEng.email)
      .replace("Github", htmlEng.github);
    html += newData;
    console.log(newData);
  });
}

function createHTML() {
  fs.readFile("./templates/main.html", "utf8", function(error, data) {
    const newData = data.replace("TEST", html);

    fs.writeFile("./output/index.html", newData, "utf8", function(error) {
      if (error) return console.log(error);
    });
    console.log("test");
  });
}

function init() {
  managerQuestion();
}

init();
