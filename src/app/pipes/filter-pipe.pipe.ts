import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    let filterCars:any[] = value.filter(
      car=>car.brandName.toLocaleLowerCase().indexOf(filterText)!==-1);
    return filterCars;
  }

}
