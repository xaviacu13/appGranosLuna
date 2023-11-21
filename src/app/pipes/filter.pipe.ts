import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../models/cliente';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    // if (arg == null ||arg.length<3) return value;
    if (value != undefined) {

      const resultPosts = [];
      for (const cliente of value) {

        if ((cliente.nombre.toLowerCase().indexOf(arg)
          && cliente.ci.toLowerCase().indexOf(arg)
          && cliente.sexo.toLowerCase().indexOf(arg)) > -1) {
          resultPosts.push(cliente);
        }
      }
      return resultPosts;
    }
  }
}
