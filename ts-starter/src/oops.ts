
                            //OOPS


                            

// class Counter {
//     private count:number;
//     constructor(count:number){
//             this.count= count;
//     }
//     inc(){
//     return this.count+=1;
   
//     }
//     dec(){
//         return this.count-=1;
//     }
//     value(){
//         return this.count;
//     }
// }

// const i = new Counter(5);
// console.log(i.inc());
// console.log(i.value());
// console.log(i.dec());

// class counter {
//     private count:number;
//     constructor(count :number){
//         this.count = count;
//     }

//     inc(): this {
//         this.count+= 1;
//         return this;
//     }
//     dec():this{
//         this.count -=1;
//         return this;
//     }
//     value(){
//             return this.count;
//     }
//     }

//     const c = new counter(8);
//     console.log(c.inc().dec().inc())

// class employee{
//     public name:string;
//     #password: string;
//     protected id : number;
//     constructor(name:string, password:string, id:number){
//         this.name= name;
//         this.#password=password;
//         this.id= id;
//     }
//    get passw(){
//     return this.#password;
//    }
// }  
// class lead extends employee{
//     public address : string;
//     constructor(password:string ,name:string,id:number,address:string){
//         super(name,password,id);

//         this.address= address;

//     }

// }


// class counter{
//   private counter : number ;
//   private set:number=1;
//   constructor(counter:number){
//     this.counter = counter;
    
//   }
// inc():this{
//   this.counter = this.counter+this.set;
//   return this
// }
// get isZero():boolean{
//   return this.counter ===0;
// }
// set setup(n:number){
//  if(n<0){throw new Error("no way")}
//  this.set =n; 
// }
  
// }



// const c = new counter(4);
// console.log(c.isZero);
// console.log(c.inc())
// c.setup = 6
// console.log(c.inc());

// class Counter{
//   constructor(public counter:number){
//     this.counter = counter;
//   }

// inc(){
//   this.counter+=1;
// }
// dec(){
//    this.counter-=1;
// }
// value(){
//   return this.counter
// }
// } 

// class BoundaryCounter extends Counter{
//   public max:number;
//   constructor(counter:number,max:number){
//     super(counter);
//     this.max= max;
//   }
//   incr() {
//     if (this.value() < this.max) {
//       super.inc(); 
//     }
//   }

// decr(){
//   super.dec();
//   if(this.value()< 0){
//     while(this.value()<0){
//       super.inc();
//     }
//   }
// }

// }

// const a = new BoundaryCounter(5,10)

// for(let i=0;i<10;i++){
//     a.incr();
// }

// console.log(a.value())

abstract class store<T>{
    protected data : Map<string,T> = new Map();

    abstract set(key :string,value:T):void;
    abstract get(key:string): T|undefined;

    has(key:string): boolean{
        return this.data.has(key);
    }
}

class SessionStore extends store<string>{
    set(key:string,value:string):void{
        console.log(value);
        this.data.set(key,value);
    }
get(key:string):string|undefined{
    return this.data.get(key);
}
}

const mystore = new SessionStore();
mystore.set("theme","dark");
console.log(mystore.has("theme"));