import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchProperty?: string, ignoreNull = true): any[] {

    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter( item => {
      if (searchProperty) {
        return item.hasOwnProperty(searchProperty) ? String(item[searchProperty]).toLowerCase().includes(searchText) : ignoreNull;
      }

      return item.toLowerCase().includes(searchText);
    });
  }
}
