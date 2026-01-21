//type Person= {
    //     name:string,
    //     age:number,
    //     email:string
    // }
    
    // // type par = Partial<Person>;
    // type par = Omit<Person,"email"|"age">;
    // const user :par ={
    //     name:"san",
    
    // }
    
    // console.log(user.name);
    
    // interface Car{
    // make:string,
    // model:string
    // }
    // type Bike ={
    //     make:string,
    //     gears:string
    // }
    // type SuperBike = Bike & {
    //     name: string;
    // }
    // interface ElectricCar extends Car{
    // name: string;
    // }
    
    // const user:ElectricCar ={
    //     make:"bently",
    //     model:"c",
    //     name:"sanchit"
    // }
    // console.log(user);
    
    // const user1:SuperBike ={
    //     make :"royal",
    //     gears:"five",
    //     name :"classic"
    // }
    
    // console.log(user1);
    
    // interface Dictionary {
    //     [key :string]:string | number;
    // }
    // const usr :Dictionary={
    //     en :"hello",
    //     fr :"bounjour",
    //     df: 45
    // }
    
    // interface User {
    //     name : string,
    //     age : number,
    //     email: string
    // }
    
    // type u = Omit<User,"name" | "email">;
    //   const i :u ={
       
    // age:34
      //}
    // interface Person {
    //     name: string;
    //     age:number
    // }
    //   interface Employee extends Person{
    //     role: string;
    //     department ?:string
    //   }
    
    //   const user :Employee ={
    //     name:"sancit",
    //     age:76,
    //     role:"engineer"
    //   }
    
    //   function acceptPerson(per:Person){
    
    //   }
    
    // type Productprices = Record<string,number>
    
    // const usr : Productprices={
    //     apple:10,
    //     banana:20
    // }
    
    // type Person ={
    //     name:string,
    //     age:number
    // }   
    
    // const people = new Map<string,Person>();
    
    // people.set("emp1", {name:"sanchit",age:23});
    // people.set("emp2", {name:"sa",age:3});
    
    // // let pu = people.get("emp1");
    // // console.log(pu?.name);
    
    
    // let pu = people.get("emp1")!;
    // console.log(pu.name);
    
    
    // type rec = Record<string,number>;
    // const price:rec ={
    //     mango: 34,
    //     apple:78
    // }
    // console.log(price.mango)
    
    // type Person ={
    //     name:string,
    //     id:number
    // }
    
    // const p = new Map<string,Person>();
    // p.set("emp1",{name:"sanchit",id :45})
    
    
    // console.log(p.get("emp1")?.name)
    
    // type Dictionary ={
    //     [key:string]:string,
    // }
    
    // const user ={
    //     en:"hello",
    //     fr :'bonjourr'
    // }
    
    // console.log(user.en)
    
    
    console.log(10);