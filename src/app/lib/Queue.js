import Queue from "bull";
import redisConfig from '../../config/redis';
//jobs
//{ Registration: { key: '', handle: () => {} } }
import * as jobs from "../jobs";

//tranformar objeto jobs em array
const queues = Object.values(jobs).map(job=>({
   //para cada uma das filas criar uma propriedade
   bull: new Queue(job.key,redisConfig),
   name: job.key,
   handle:job.handle
}));
export default {
    queues,
    //funcao add recebe nome da fila para o qual os dados(data) serao enviados
    add(name,data){
        //encontrando a fila que bate com o parametro 'name'
        const queue = this.queues.find(queue=> queue.name == name);
        return queue.bull.add(data);
    },
    process(){
        //para cada item da fila faça
        return this.queues.forEach(queue=>{
            queue.bull.process(queue.handle);
            queue.bull.on('failed',(job,err)=>{
                console.log(queue.key,job.data);
                console.log(err);
            })
        })
    }
}