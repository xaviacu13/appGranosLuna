import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proveedorFilter'
})
export class ProveedorFilterPipe implements PipeTransform {
  transform(value: any, arg: any[]): any {
    if (arg == null ||arg.length<3) return value;
    const resultPosts=[];
    for(const proveedor of value){
      
      if((((proveedor.nombre.toLowerCase().indexOf(arg)&&
      (proveedor.nit.toLowerCase().indexOf(arg)))  > -1))){
       // if(((proveedor.nombre.indexOf(arg)&&(proveedor.nit.indexOf(arg))&&(proveedor.ciudad.indexOf(arg)))  > -1)){
        
        resultPosts.push(proveedor);

      }
    }
    return resultPosts;
  }
}
