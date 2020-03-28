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

function bidItem() {

  let query = connection.query(
    "SELECT * FROM auctions", function(err, res) {
      if(err) throw err;
      console.log(res);
      inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "Item id:"
        },
        {
          type: "input",
          name: "bid",
          message: "Your bid:"
        }
      ])
      .then( value => {
        let index = 0;
        for(let i = 0; i < res.length; i++) {
          if(parseInt(res[i].id) === parseInt(value.id)) {
            index = i;
          }
        }
        if(value.bid > res[index].highest_bid && value.bid >= res[index].starting_bid){
          console.log("You are the new highest bidder!");
          let query = connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                highest_bid: value.bid
              },
              {
                id: value.id
              }
            ],
            function(err, res) {
              if(err) throw err;
              console.log("High bid updated successfully");
              start();
            }
          );
        }
        else {
          console.log("Your bid was not high enough");
          start();
        }
      });
  });

}


const connection = mysql.createConnection( {
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
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
      bidItem();
    }
    else {  //quit
      console.log("Goodbye!");
      connection.end();
    }

  })
}