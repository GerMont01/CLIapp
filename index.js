const os = require('os');
const checkDiskSpace = require('check-disk-space').default;

const host = os.hostname();
const cpu = os.cpus();
const totalmem = os.totalmem();
const freemem = os.freemem();
const network = os.networkInterfaces();

let diskspace = [];


const args= [{
        name:'arch',
        description:'Display the processor architecture'
    },
    {
        name:'arvg0',
        description:'displays the excecution path of Node js'
    },
    {
        name:'platform',
        description:'displays the platform where the application is executed'
    },
    {
        name:'cwd',
        description:'displays the current working directory'
    },
    {
        name:'rp',
        description:'displays a random prime number between the range defined by the next two arguments \n         where the first is the minimum and the second is the maximum value \n         For example: rp 1 100'
    },
    {
        name:'host',
        description:'displays the host name'
    },
    {
        name:'cpu',
        description:'displays the cpu model and speed'
    },
    {
        name:'mem',
        description:'displays the total and free memory'
    },
    {
        name:'ip',
        description:'displays the ip adress of the host'
    },
    {
        name:'disk',
        description:'displays the total and free disk space'
    }]
class Application {
	constructor(ExecutablePath = undefined, CommandLineArguments = undefined)
	{
		for (let i=0; i<CommandLineArguments.length; i++) {
			switch (CommandLineArguments[i]) {
				case 'arch':
					console.log(`This processor architecture is ${process.arch}`)
					break;
				case 'argv0':
					console.log(`Argv0: ${process.argv0}`)
					break;
				case 'platform':
					console.log(`The platform is ${process.platform}`)
					break;
                case 'cwd':
                    console.log(`The current working directory is: ${process.cwd()}`)
                    break;
                case 'host':
                    console.log(`The host name is: ${host}`)
                    break;
                case 'cpu':
                    console.log(`Cpu Model: ${cpu[0].model} \nCpu Speed: ${cpu[0].speed/1000}GHz`)
                    break;
                case 'mem':
                    console.log(`The total memory is: ${totalmem/1073741824}GB \nThe free memory is: ${freemem/1073741824}GB`)
                    break;
                case 'ip':
                    console.log(`IP adress: ${network['Wi-Fi'][1].address}`)
                    break;        
                case 'disk':
                    checkDiskSpace('C:/').then((diskSpace) => {
                        diskspace = diskSpace
                        console.log(`Total Diskspace: ${diskspace.size/1073741824}GB \nFree Diskspace: ${diskspace.free/1073741824}GB`)
                    })
                    
                    break;         
                case `rp`:
                    const range = [parseInt(CommandLineArguments[i+1]), parseInt(CommandLineArguments[i+2])];
                    const getPrimes = (min, max) => {
                    const result = Array(max + 1)
                    .fill(0)
                    .map((_, i) => i);
                    for (let i = 2; i <= Math.sqrt(max + 1); i++) {
                        for (let j = i ** 2; j < max + 1; j += i) delete result[j];
                    }
                    return Object.values(result.slice(min));
                    };
                    const getRandomNum = (min, max) => {
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    };
                    const getRandomPrime = ([min, max]) => {
                        const primes = getPrimes(min, max);
                        return primes[getRandomNum(0, primes.length - 1)];
                    };
                    console.log(getRandomPrime(range));
                    i = i+2
                    break;
                case '-h':
                console.log('\nBelow is a list of valid arguments for this application:\n')
                for (let a of args){
                    console.log(`    ${a.name} : ${a.description}`);
                }
                console.log('\n')
                break;
				default:
					process.emitWarning('Invalid Argument', {
                        code: 'MY_WARNING',
                        detail: `${CommandLineArguments[i]} is not valid. Enter -h for help`
                      });
					break;
			}
		}
	}
}


let listOfArguments = [];

for (let i = 2; i< process.argv.length; i++){
	listOfArguments.push(process.argv[i]);
}

let ourApplication = new Application(process.argv[0], listOfArguments)

process.on('warning', (warning) => {
    console.warn(warning.name); 
    console.warn(warning.message);
    console.warn(warning.code); 
    console.warn(warning.stack);
    console.warn(warning.detail); 
    });