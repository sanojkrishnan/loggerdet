const fs = require("fs");

function requestLogger(options = {}) {   //to print logger details in the console
    const {
        enabled = true,
        format = '[:timestamp] :method :url from :ip'
    } =options;

    return function (req, res, next){
        if(!enabled) return next();

        const log = format
        .replace(':method', req.method)
        .replace(':url', req.originalUrl)
        .replace(':ip', req.ip)
        .replace(':timestamp', new Date().toISOString());  //added method, url, ip address and timestamp

        console.log(log);    //consoles the logger details
        next();    // continue after writing to file
    };
    }


    function logLogger (options = {}) {  //to embed logger details in a text file in current directory

        const {
        enabled = true,
        format = '[:timestamp] :method :url from :ip'
    } =options;

    return function (req, res, next){
        if(!enabled) return next();

        const log = format
        .replace(':method', req.method)
        .replace(':url', req.originalUrl)
        .replace(':ip', req.ip)
        .replace(':timestamp', new Date().toISOString());

        fs.appendFile(
    "./log.txt", log + "\n",           //log.txt created and appends the logger details in log.txt
    (err, data) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      } else {
        console.log("Log file updated");
      }
      next(); 
    });
};
    }


    function listener (app,port){          // listener function will do the port calling 
    const PORT = port;
     app.listen(PORT, () => {
  console.log(`Server is running`);
});}



    const loggerdet ={ requestLogger,  
                      logLogger, 
                      listener}   //all function alligned to one object

  module.exports = loggerdet;    //object exporting