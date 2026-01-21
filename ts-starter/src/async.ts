// //                                      1      

// const promise= new Promise<number>((resolve,reject)=>{
// const success= true;
// if(success){
//     resolve(21);
// }else {
//     reject("Something went wrong");
// }
// })

// async function add(a:number,b:number):Promise<number>{
//      const rsult =a+b;
//      return rsult ;
// }

// add(4,3).then((rsult)=>console.log(rsult))


// function add1(a: number, b: number): Promise<number> {
//     return new Promise((resolve) => {
//       resolve(a + b); 
//     });
//   }
  
// console.log(add1(4,6));


// function mul(a:number,b:number): Promise<number> {
//     return new Promise((resolve,reject)=>{
//         if(typeof a!=="number" || typeof b!=="number"){
//             reject("assign number to the value ");
//         }else {
//             const result = a*b;
//             resolve(result);
//         }
//     })
// }

// const r= mul(6,5).then((result)=> console.log(result)).catch((error)=>console.log(error));
// console.log(r);


// Define the User type
interface User {
    id: string;
    name: string;
    email: string;
  }
  
 
  async function fetchUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
     
      setTimeout(() => {
      
        const user: User = {
          id: id,
          name: "WOrld",
          email: "helloWorld.com",
        };
  
       
        resolve(user);
      }, 2000);  
    });
  }
  
  
//   async function main() {
//     try {
//       const user = await fetchUser("1234");
//       console.log( user);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   main();

  

//   //seq fetch
// async function seqFetch(){
//     console.time("fetchUserTime")

//     try{
//       const user1= await fetchUser("11")
//       console.log(user1);
//       const user2 = await fetchUser("12")
//       console.log(user2);
//     }catch(error){
//       console.error(error);
//     }
//       console.timeEnd("fetchUserTime")
  
//   }
  
//   seqFetch();



  // parallel fetch

  async function parallelFetch(){
    console.time("parallelFetchTime");

    try{
      const [user1,user2] = await Promise.all([fetchUser("id1"),fetchUser("id2")])

      console.log(user1);
      console.log(user2)

    }catch(error){console.error(error)}
  
  console.timeEnd("parallelFetchTime")
  }
  parallelFetch();

