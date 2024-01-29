import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { INote } from '../../shared/models/note.model';
import { NotesService } from '../../shared/services/notes.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent  implements OnInit{

  noteId!: number;
  note: INote = {
    title:'',
    desc: ''
  } ;
  new: boolean = true;

  constructor(private noteService: NotesService,
    private router: Router,
    private route: ActivatedRoute){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params)=>{
          if(params['id']){
            this.note = this.noteService.get(params['id']);
            this.noteId = params['id'];
            if(params['id'] !== 'new'){
              this.new = false;
            }
          }
        })
    }

  onSubmit(form: NgForm){
    if(this.new){
    this.noteService.add(form.value);
    this.router.navigateByUrl('/');
    } else {
      this.noteService.update(this.noteId, form.value.title, form.value.desc);
       this.router.navigateByUrl('/');
    }
  }

  cancel(){
    this.router.navigateByUrl('/');
  }
}
