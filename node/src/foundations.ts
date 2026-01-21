import dotenv from 'dotenv'

dotenv.config();



// 1
console.log(process.pid);
console.log(process.version);

console.log(process.argv);

console.log("exit with code 0")
console.log("exit with code 1")
// process.exit(1)
console.log(process.cwd());
console.log("hello");

// console.log("env ", process.env);



//     2

// console.log("api key", process.env.API_KEY)

// const api = process.env.API_KEY || 3000;

// console.log(api);

// function requireEnv(name:string){
//     const val= process.env[name];
//     if(!val){
//         throw new Error("no api found")
//     }
//     return val;

// }

// console.log(requireEnv('API_KEY'))


//       4

//     drill 4

function greet(name:string):string{
    return ("hello" + " "+ name);
}

console.log(greet("noname"));


//       drill5

function add(){
    const a=5;
    const b=6;

    debugger;
    console.log(a+b)
}

add()


                // 6
// try{
//    throw new Error("throw sync error")
// }catch(error){
//     console.error(error)
// }

const pro = new Promise((resolve,reject)=>{
    reject(new Error("handle by catch"))
});

// pro.catch((error)=> console.log(error));

process.on('uncaughtException', (error) => {
    console.error('Unexpected Error Occurred:', error.message);

    console.error('Stack Trace:', error.stack);

    process.exit(1);  
});

// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise);
//     console.error('Reason:', reason);
    
//     process.exit(1);
// });

