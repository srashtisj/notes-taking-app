import { Injectable, Signal, computed, signal } from '@angular/core';
import { INote } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Signal<INote[]>
  //= [];

  = signal([
    { title: 'title 1' , desc: 'This is description 1'},
    { title: 'title 2' , desc: 'This is description 2'},
    { title: 'title 3' , desc: 'This is description 3'}
  ])

  constructor() { }

  getAll(){
    return this.notes();
  }

  get(id: number){
    return this.notes()[id];
  }

  getId(note: INote){
    this.notes().indexOf(note);
  }

  add(note: INote){
    let newLength = this.notes().push(note)
    let id = newLength - 1;
    return id;
  }

  update(id: number, title: string, desc: string){
    let note = this.notes()[id];
    note.title = title;
    note.desc = desc;
  }

  delete(id: number){
    this.notes().splice(id,1);
  }
}
