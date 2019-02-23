## How to

* Clone the project
* In the root directory, run **npm install**
* Go to the **linkedin-api** and run again **npm install**
* Then go back to the root directory and run **docker-compose up**
* Now
    * Your **elastic search instance** will be available ont port **9200**
    * Insert your data to elasticsearch engine using `curl -XPOST 'localhost:9200/<INDEX>/_bulk' -H 'Content-type: application/json' --data-binary <INDEX_FILE>`
    * Both index files are avalaible in the **data** directory
    * Finally, open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Screenshots some screenshots of the app are avalaible in the screenshots directory

The server in which the project was hosted online has been stopped, so the online preview is no longer available