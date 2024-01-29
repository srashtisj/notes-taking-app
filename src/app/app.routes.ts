import { Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

export const routes: Routes = [
  {path: '', component: MainLayoutComponent, children:[

    {path:'', component: NotesComponent},
    {path:':id', component: NoteDetailsComponent},
    {path:'new', component: NoteDetailsComponent}
  ]
}
];
