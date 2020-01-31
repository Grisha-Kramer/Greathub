const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection( {
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "h#191712sPs)7",
  database: "ice_creamDB"
});

connection.connect( err => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function start() {
  inquirer
  .prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "Post an Item",
        "Bid on an Item",
        "Quit"
      ]
    }
  ])
  .then( ({ choice }) => {
    if(choice === "Post an Item") {

    }
    else if(choice === "Bid on an Item") {

    }
    else {  //quit
      console.log("Goodbye!");
      connection.end();
    }

  })
}