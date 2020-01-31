const mysql = require("mysql");
const inquirer = require("inquirer");

function postItem() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Item name:"
    },
    {
      type: "input",
      name: "category",
      message: "Category:"
    },
    {
      type: "input",
      name: "startBid",
      message: "Starting bid:"
    }
  ])
  .then( value => {
    let query = connection.query(
      "INSERT INTO auctions SET ?",
      {
        item_name: value.name,
        category: value.category,
        starting_bid: value.startBid,
        highest_bid: 0
      },
      function(err, res) {
        if (err) throw err;
        console.log("New item successfully added");
        start();
      }
    )
  });
}


const connection = mysql.createConnection( {
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "h#191712sPs)7",
  database: "greatbay_db"
});

connection.connect( err => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
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
      postItem();
    }
    else if(choice === "Bid on an Item") {
      start();
    }
    else {  //quit
      console.log("Goodbye!");
      connection.end();
    }

  })
}