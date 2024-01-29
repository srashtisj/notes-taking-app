import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from '../../components/note-card/note-card.component';
import { NgFor } from '@angular/common';
import { INote } from '../../shared/models/note.model';
import { NotesService } from '../../shared/services/notes.service';
import { RouterLink } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NoteCardComponent, NgFor, RouterLink, FormsModule, FilterPipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  animations:[
    trigger('itemAnim', [
      transition('void=>*',[
        style({
          height : 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-botton': 0,
          padding: 0
        }),
        animate('50ms', style({
          height: '*',
          'margin-botton': '*',
          padding: '*'
        })),
        animate(68)
      ]),
      transition('* => void',[

        animate(50, style({
          transform: 'scale(1.05)'
        })),

        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),

        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),

        animate('150ms ease-out', style({
          opacity: 0,
          height: 0,
          padding: 0,
          'margin-bottom': '0'
        }))
      ])
    ]),
    trigger('listAnim',[
      transition('* => *', [
        query(':enter',[
          style({
            opacity: 0,
            height: 0
          }),

          stagger(100, [
            animate('0.2s ease')
          ])
        ],{ optional: true})
      ])
    ])
  ]
})
export class NotesComponent implements OnInit {

  notes!: INote[]
  searchString: string = '';

  constructor(private notesService: NotesService){}

  ngOnInit(): void {
      this.notes = this.notesService.getAll();
  }

  deleteNode(id: number){
    this.notesService.delete(id);
  }
}
