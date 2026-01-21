//                             1
// function add(a: number, b: number): number {
//     return a + b;
//   }

  
//   function add(a: number, b: number) {
//     return a + b;
//   }
  

// function Message(message: string): void {
//     console.log(message);
//   }
  
// //                         2
// function greet(name: string, age?: number): void {
//     if (age !== undefined) {
//       console.log(`Hello ${name}. You are ${age} years old`);
//     } else {
//       console.log(`Hello ${name}`);
//     }
//   }
  
//   greet("Alice", 25);  
//   greet("Bob");        

//   function greet(name: string, age: number = 18): void {
//     console.log(`Hello ${name} You are ${age} years old`);
  //}
  



//function operation(x:number[], oper:(...a:number[])=>number){
//       return oper(...x);
//     }
//     function add(...nums:number[]):number{
//           return nums.reduce((acc,curr)=>acc+curr);
//     }
    
//     console.log(operation([5,4],add));
    
//     function operation(x:number,y:number,cb:(a:number,b:number)=>number){
//       return cb(x,y);
//     }
    
//     function add(a:number,b:number){
//       return a+b;
//     }
//     console.log(operation(3,4,add));
    
    
    // function toArray(x:string):string[];

// function toArray(x:number):number[];

// function toArray(x:boolean):boolean[]; 
// function toArray(x:string | number | boolean){
//     return [x];
// }

// console.log(toArray('hello'));
// console.log(toArray(23));
// console.log(toArray(true));


// function format(input : string | number| boolean){
//     if(typeof input == 'string'){
//         return input.toUpperCase();
//     }
//     else if(typeof input =='number') {
//         return input.toFixed(2);
//     }
//     else
//         return input;
// }
// console.log(format(true));

// function isEven(n:number):boolean{
//     return n%2==0
// }

// console.log(isEven(34));


// function applyTwice (fn:(x:number)=> number,val:number){
//     return fn(fn(val));
// }

// console.log(applyTwice((n)=>n*2,5)
// )

// applyTwice((n:string)=>n.length,9)


// const sqaure : (n:number)=>number =(n)=>(n*n);


// type Calculator = (a: number, b: number) => number;
// type Validator = (input: string) => boolean;
// const add: Calculator = (a, b) => {
//     return a + b;
//   };
  
//   const subtract: Calculator = (a, b) => {
//     return a - b;
//   };
//   function performCalculation(calculator: Calculator, a: number, b: number): number {
//     return calculator(a, b);
//   }

//   console.log(performCalculation(add,34,32))


    
//     function num(a:number[]):number[]{
//        return a.map((x)=>x*2)
//     }
    


//     function str(a:string[]):string[]{
//       return a.map(x=> x.toUpperCase());
//     }
//     function operation(arr:number[] | string[], cb:(arr:number[] | string[])=> number[]| string[]): number[] | string[]{
//       return cb(arr);
//     }
    
//     console.log(operation(["hello"], str));
    
    
function processData(data: unknown): string {
    if (typeof data === "string") {
      return `String data: ${data}`;
    } else if (typeof data === "number") {
      return `Number data: ${data}`;
    } else {
      return "Unknown data type";
    }
  }
  
  console.log(processData("hello"));

  function logMessage(message: string): void {
    console.log(message);
  }
  
  function throwError(message: string): never {
    throw new Error(message);
  }
  
    
    console.log(throwError("error"))



type Operation = (a: number, b: number) => number;

function processNumbers(a: number, b: number, callback: Operation): number {
  return callback(a, b);
}

const add: Operation = (a, b) => a + b;

const subtract:Operation = (a, b) => a - b;

console.log(processNumbers(5, 3, add));       
console.log(processNumbers(5, 3, subtract));  

    
                                   
    
    