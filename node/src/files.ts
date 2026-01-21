import fs, { read } from 'fs';
import {Transform} from 'stream'

import EventEmitter from 'events';
// const path = "hello";

// fs.writeFile(path," hello Node js",(err)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//         console.log("File created")

//         fs.appendFile(path,"\n Node js is a runtime for js",(err)=>{
//             if(err){
//                 console.log("error while appending", err)
//                 return;
//             }
        
//             console.log("line is appended");


//             fs.readFile(path,'utf8', (err,data)=>{
//                 if(err){
//                     console.error(err);
//                     return;
//                 }
//                 console.log(data);


// fs.unlink(path,(err)=>{
//     if(err){
//         console.error("error while deleting the file",err);
//         return;
//     }
//     console.log("file deleted")


//     fs.access(path, fs.constants.F_OK, (err) => {
//         if (err) {
//             console.log('File does not exist.');
//         } else {
//             console.log('File exists.');
//         }
//     });

// })
            
//             })
//         })
        
// })






//    2

const objFile = 'JsonFile'
const obj= {
    name: "sanchit",
    id:"ab32",
    work:"student"
};

const objStr = JSON.stringify(obj);

fs.writeFileSync(objFile, objStr,'utf8');
console.log("file created")

// fs.writeFile(objFile,objStr,(err)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log("file created")
// })

// const stringData = fs.readFile(objFile,'utf8',(err,data)=>{
//     if(err){ 
//         console.error(err); 
//         return ;}
//     console.log(data);
// });



// const parsedData = fs.readFileSync(objFile,'utf8');
// console.log(parsedData);

// const stringData = JSON.parse(parsedData);
// console.log(stringData);



// try {
//   const jsonStr = fs.readFileSync(objFile, 'utf8');
//   const parData = JSON.parse(jsonStr);
//   console.log(parData);
// } catch (error) {
//   console.error('Failed to parse JSON:', error);
// }



// function loadJson(filePath: string, value:object):object{
//     try{
//         const data = fs.readFileSync(filePath,'utf8');
//         const objData = JSON.parse(data);
//         return objData;

//     }catch(err){
//         console.error(err);
//         return value;
//     }
// }
// const File = 'file.json'

// const newData = loadJson(File,{employe_name:"abc", employee_id:"sdd", employee_age:45});
// console.log(newData);

// const jsonData = { name: 'G', age: 25, email: "fdbkdb" };

// const prettyJsonString = JSON.stringify(jsonData,null,2);
// console.log(prettyJsonString);




// //     3

// const buffer = Buffer.from('hello Node js','ascii');
// console.log(buffer)



// console.log(buffer.toString());

// console.log(buffer.toString('base64'));

// console.log(buffer.toString('utf-8',0,5));

// const newBuffer = Buffer.alloc(10);
// newBuffer.fill(0xFF)
// console.log(newBuffer);


// const buffer01 = Buffer.from("hello world");
// console.log(buffer.length)

// const str= "hello world";
// console.log(str.length);


// //4


// const streamFile = 'stream.txt';

// const readStream = fs.createReadStream(streamFile,'utf-8');
// console.log('file created')
// let chunkCount = 0;

// readStream.on('data', (chunk) => {
//     chunkCount++;  
//     console.log(chunkCount,chunk.length)
// });

// readStream.on('end', () => {
//     console.log('Done reading');
//     console.log(`Total chunks: ${chunkCount}`);

// });

// readStream.on('error', (err) => {
//     console.error('Error while reading the file:', err.message);
// });


//   //                drill 5

//   const writeFile = "write.txt"
//   const writeStream = fs.createWriteStream(writeFile,{flags: 'a'});

//   for(let i =0;i<5;i++){
//     const line = `log ${i}\n`;
//     const write = writeStream.write(line);

//     if(!write){
//         console.log("cant accept more data");
//         writeStream.on('drain',()=>{
//             console.log("resume after drain");
            
//         });
//         break;
//     }
//   }

 

// const buffer02 = Buffer.from("hello world",'utf-8');

// writeStream.write(buffer02,()=>{
//     console.log("written");
// })

// writeStream.on('finish', () => {
//     console.log('All data has been written to the log file.');
// });


//            6

// const readpipe = 'source.txt'
// const writepepe = 'desitnation.txt'


// const startTime = Date.now();
// const readStream= fs.createReadStream(readpipe,'utf-8');
// const writeStream= fs.createWriteStream(writepepe,'utf-8');





// const uppercaseTransform = new Transform({
//   transform(chunk, encoding, callback) {
//     this.push(chunk.toString().toUpperCase());
//     callback();
//   }
// });

// readStream.pipe(uppercaseTransform).pipe(writeStream);
// writeStream.on('finish', () => {
//     const endTime = Date.now();   
//   const timeTaken = endTime - startTime
//     console.log('File written in uppercase text!',timeTaken);
//   });


//drill    7

const eventEmitter = new EventEmitter();

const listener1 = (message:string)=>{
console.log(`Listener 1 msg: ${message}`)
}

eventEmitter.on('customEvent', listener1);
 
  eventEmitter.on('customEvent', (message) => {
    console.log(`Listener 2  msg: ${message}`);
  });

  
  eventEmitter.emit('customEvent', 'Hello world!');



  eventEmitter.removeListener('customEvent',listener1 );
  
 
  eventEmitter.emit('customEvent', 'hello world');
  