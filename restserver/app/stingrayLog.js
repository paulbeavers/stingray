

var fs = require('fs')
var pg = require('pg')

/*-------------------------------------------------------------*/
/* Set up logging                                              */
/*-------------------------------------------------------------*/
const { format, createLogger, transports } = require('winston');
const winston = require('winston');

const env = process.env.NODE_ENV || 'development';
const logDir = process.env.LOG_DIR; 
const logLevel = process.env.LOG_LEVEL;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
	format:  format.combine(
	    format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
	    format.json()),
  	transports: [
    		new (winston.transports.Console)({
			level: logLevel
		}),
    		new (winston.transports.File)({
      			filename: `${logDir}/stingray.log`,
			level: logLevel
    		})
  	]
});

module.exports=logger;

