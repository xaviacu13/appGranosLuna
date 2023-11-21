import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'insumoFilter'
})
export class InsumoFilterPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    if (arg == null ||arg.length<3) return value;
    const resultPosts=[];
    for(const insumo of value){
      
      if(((insumo.detalle.toLowerCase().indexOf(arg.toString().toLowerCase()))
       && (insumo.unidadMedida.toLowerCase().indexOf(arg.toString().toLowerCase()))
       ) > -1){
        
        resultPosts.push(insumo);   
        
      }
    }
    return resultPosts;

  }
}