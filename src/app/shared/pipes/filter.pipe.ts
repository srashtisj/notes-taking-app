import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../models/note.model';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: INote[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.title.toLocaleLowerCase().includes(searchText) || it.desc.toLocaleLowerCase().includes(searchText);
    });
  }

}
