const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
   hosts: [ 'http://elasticsearch:9200']
});
const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser')

client.ping({
    requestTimeout: 30000,
}, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.set( 'port', 3001 );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/search', function (req, res) {
    client.search({index:req.query['index'],  body:req.body, type:'_doc'})
    .then(results => {
        res.send(results);
    })
    .catch(err=>{
        console.log(err)
        res.send([]);
    });
})

app.listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );