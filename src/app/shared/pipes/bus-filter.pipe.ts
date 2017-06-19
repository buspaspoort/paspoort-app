import { Pipe, PipeTransform } from '@angular/core';
import {Bus} from "../models/bus";

@Pipe({
  name: 'busFilter'
})
export class BusFilterPipe implements PipeTransform {

    transform(tasks:Array<Bus>, filter:string):Array<Bus> {
        return tasks.filter((task) => {
            return task.busNr.toString().toLowerCase().includes(filter.toLowerCase());
        });
    }

}
