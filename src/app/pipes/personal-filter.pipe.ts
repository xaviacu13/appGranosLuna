import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalFilter'
})
export class PersonalFilterPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    if (arg == null || arg.length < 3) return value;
    const resultPosts = [];
    for (const personal of value) {

      if (((personal.nombre.toLowerCase().indexOf(arg)) &&
        (personal.ci.toLowerCase().indexOf(arg)) &&
        (personal.sexo.toLowerCase().indexOf(arg))) > -1) {

        resultPosts.push(personal);

      }
    }
    return resultPosts;
  }

}
