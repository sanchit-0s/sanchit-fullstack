import { Storage } from "./storage";
import { TaskCollection } from "./collection";
  


export class TaskSyncManager {
    constructor(
      private storage: Storage<TaskCollection>,
      private remote?: RemoteSync
    ){};
  
    async save(data:TaskCollection): Promise<void>{
        await this.storage.save("tasks",data);
    };
    async load(): Promise<TaskCollection>{
        const data = await this.storage.load("tasks");
        if(!data){
            return {
                tasks:[],
                metadata:{
                    total:0,
                    completed:0,
                    lastModified: new Date()
                },
            };
        }
        return data;
    };
    async sync(data : TaskCollection): Promise<SyncResult>{
        let localSaved = false;
        let remoteSynced= false;

        await this.save(data);
        localSaved= true;

        if(this.remote){
            await this.remote.push(data);
            remoteSynced = true;
        }
  
        return {
            localSaved,
            remoteSynced,
        };
    };
  }
  
  export interface RemoteSync {
    push(data: TaskCollection): Promise<void>;
    pull(): Promise<TaskCollection>;
  }


  export interface SyncResult{
    localSaved:boolean,
    remoteSynced:boolean
  }
  