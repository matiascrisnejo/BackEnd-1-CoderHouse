import {createLogger, format, transports, addColors} from 'winston';

const {colorize, simple} = format;

const levels = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    HTTP: 3,
}

const colors = {
    ERROR: 'red',
    WARN: 'yellow',
    INFO: 'green',
    HTTP: 'blue',
}

addColors(colors);

const logger = createLogger({
    levels, formats: colorize(), transports:[
        new transports.Console({
            level: 'HTTP',
            format: simple()            
        }),
        new transports.File({
            filename: './errors/errors.log',
            level: 'WARN',
            format: simple()
        })
    ]
})

export default logger;