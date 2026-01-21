//let a: number = 10;
// console.log(a);
// let b: string;
// b = "hello";
// console.log(b);
// let c: boolean = true;
// console.log(c);

// let s: any;
// s= "hello";
// s= s.toUpperCase();
// console.log(s);
// s=10;
// console.log(s);

// let x:unknown;
// x="sanchit";
// if(typeof x=="string"){
// x= x.toUpperCase()}
// console.log(x);

// let name: string 
// name = null;
// console.log(name);

// const x = 10;
// let x= 42;

// let y="hello";
// y=23;

// let x: number= 42;

// let value: unknown= "hello";

// let len = (value as string).length;

// console.log(len)

// let a:  unknown;
// a= "hello";
// let len = (a as string).length;
// console.log(len);

// function greet(a:string, b="smith"): string{
//     return (a + "" + b);
// }

// console.log(greet("bob"));

// type Person ={
//     middlename ?: string,
//     readonly id : string,
//     name : string,
//     age : number,
// }

// const user : Person= {
//     id:"abc",
//     name:"sanchit",
//     age:18
// }
// console.log(user.middlename?.toUpperCase())

// console.log(user.name)
// console.log(user.age)
// console.log(user.id)
// user.name= "sassd";
// console.log(user)

// interface car {
//     make:string,
//     model:string
// }

// type Bike = {
//     make : string,
//     gears: string,
// }

// interface ElectricCar extends car {
//     battery : number;
// }

// const user :ElectricCar ={
// make:'ds',
// model : "dsf",
// battery : 23,
// }
// console.log(user.make)

// type more = Bike &{
//     origin : string;
// }

// const mo:more ={
//     make:"dsf",
//     gears : "sd",
//     origin:"india"
// }
// console.log(mo);

// interface Dictionary{
//  readonly[key:string]:string | number
// }

// const user :Dictionary ={
//     en:"hello",
//     fr :"Bounjour",
//     ds: 34
// }






// let counter=5;
// while(counter>0){
//     console.log(counter);
//     counter--;
// }

// type motion =
//     "start" | "stop"

//     function res(mo:motion){
//         switch(mo){
//             case "start":
//                 return "started";
//                 break;
//                 case "stop":
//                     return "stopping";
//                     break;

//                     default :
//                     const exhau :never = mo;
//                     return exhau
//         }
       
//     }

//    console.log (res("start"));

// type User = {
//     name:string,
//     age:number
// }
// function info(user:User){
//     console.log(user.name);
// }
// info({name:"sanchit",age:23});



// 
