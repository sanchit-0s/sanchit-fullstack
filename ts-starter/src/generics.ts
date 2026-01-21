//   // generics 

// function identity<T>(args: T):T{
//   return args;
// }

// console.log(identity("hello"))
// console.log(identity(67))
// console.log(identity({name:"pablo",age:56}))

// console.log(identity<string>('escobar'));


// function first<T>(arr: T[]):T| undefined{
//  return arr[2]
// }

// console.log(first([1,2,3,56,7]));

// console.log(first(["1","2a","3a",56,7]));


// function lengthOf<T extends {length : number}>(x:T){
//   return x.length;

// }

// console.log(lengthOf([1,2,4,5]));

// console.log(lengthOf({length:45}));

// type HasName={name:string}
// type HasId= {id:number}
// function Has<T extends HasName & HasId>(user : T):void{

//   console.log(user.name,user.id);
// }
// Has({name:"sanjay dutt",id:4})

// type ApiResponse<T=unknown>={
//   status: number,
//   data: T
// }

// const us1:ApiResponse<string>={
// status :1,
// data :"dutt"
// }
// const us2:ApiResponse={
//   status :2,
//   data :{name:"dutt",age:23}
//   }
  
// console.log(us1.status)  
// console.log(us2.data)

// type Keys<T>= keyof T;

// interface User {
//   id:string,
//   age:number
// }

// function getProp<T, K extends keyof T>(obj:T, key:K): T[K]{
//   return obj[key]
// }

// const user:User={
//   id:"abcdef",
//   age:21
// }
// console.log(getProp(user,"id"));

// type ReadOnly<T>= {
//   readonly [K in keyof T]:T[K]
// }

// interface U{
//   name:string,
//   id:number
// }

// type read = ReadOnly<U>
// const user_1 : read ={
//   name:"moosa",
//   id:76
// }
// console.log(user_1.id);


// type isString<T> = T extends string ?true:false;

// type st = isString<string>
// type nm = isString<number>

// type dict ={
//   name:string,
//   id:number,
  
// }

// const dictionary:Record<string,dict>={
//  u1: {name:"sanchit",id:56},
//  u2: {name:"sid",id:66}
// }
// console.log(dictionary["u1"]?.id)

interface user {
    name: string,
    id:number,
}

function type1<T extends user>(obj:T):T{
return {...obj,name:` ${obj.name} ${obj.id}`};
}
