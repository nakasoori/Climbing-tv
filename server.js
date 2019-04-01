const express = require('express') //Express server
const app = express(); //Instantiate server
const path = require('path');

const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('bolt://hobby-chennogldadkgbkejfiahacl.dbs.graphenedb.com:24787', neo4j.auth.basic("v303", "GtGq5rldxu"));
const graphenedbURL = process.env.GRAPHENEDB_BOLT_URL
const graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
const graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;



var session = driver.session();
session
    .run("CREATE (n:Person {name:'Bob'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
/*
const driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));


var session = driver.session();
session
    .run("CREATE (n {hello: 'World'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
 */

app.set('port', (process.env.PORT || 3001));

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'assets')));


//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}



 //build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//tell express to listen for requests(start server)
//this sets up the server on localhost 3001
app.listen(process.env.PORT || 3001, function(){
    console.log(`server has started on port ${process.env.PORT || 3001 + '(localhost)'}` );
});