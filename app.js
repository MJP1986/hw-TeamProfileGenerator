const fs = require("fs");
const inquirer = require("inquirer");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

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
    console.log(answers);
    employeeQuestion();
  });
}

function internQuestion() {
  inquirer.prompt(internQuest).then(answers => {
    console.log(answers);
    employeeQuestion();
  });
  //   console.log("choose Intern");
}

function engineerQuestion() {
  inquirer.prompt(engineerQuest).then(answers => {
    console.log(answers);
    employeeQuestion();
  });
  //   console.log("choose engineer");
}
function buildTeam() {
  //   inquirer.prompt(questions).then(answers => {
  //     console.log(answers);
  //   });
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

function init() {
  managerQuestion();
}

init();
