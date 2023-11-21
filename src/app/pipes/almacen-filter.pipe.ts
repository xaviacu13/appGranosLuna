import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'almacenFilter'
})
export class AlmacenFilterPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    if (arg == null ||arg.length<3) return value;
    const resultPosts=[];
    for(const almacen of value){
     // if(( insumo.unidadMedida.toLowerCase().indexOf(arg.toString().toLowerCase())) && ((insumo.detalle.indexOf(arg))) > -1)
      if((((almacen.descripcion.toLowerCase().indexOf(arg.toLocaleString().toLowerCase())  > -1)))){
        //if(((proveedor.nombre.indexOf(arg)&&(proveedor.nit.indexOf(arg))&&(proveedor.ciudad.indexOf(arg)))  > -1)){
        
        resultPosts.push(almacen);

      }
    }
    return resultPosts;
  }
}
