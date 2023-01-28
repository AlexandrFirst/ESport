export class BaseModel{
    public copyData(from: any){
        if(from){
            for(var property in from){
                if(from.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>from)[property]
                }
            }
        }
    }
}