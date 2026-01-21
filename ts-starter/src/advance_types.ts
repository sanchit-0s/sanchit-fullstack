//Advace types
type Status = "loading"| "success" |"error"

function handle(status:Status){
  switch(status){
    case("loading"):
      return "its loading";
      
    case("success"):
    return "Data is loaded successfully";
    
    case("error"):
    return "Something went wrong"

      default:
        const exhaustiveCheck :never = status;
        return exhaustiveCheck
  }
}
console.log(handle("loading"));
       

                     //2
type HasId={id:string}
type HasTimeStamps = {createdAt: Date; updatedAt:Date};
type Entity= HasId & HasTimeStamps;

const order : Entity={
  id:"1s23",
  createdAt: new Date(),
  updatedAt:new Date(),

}
       

console.log(order.createdAt);


type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    default:
      
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

