import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent implements OnInit {

  @Input() link!: string;
  @Input() title!: string;
  @Input() body!: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;
  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2){}

  ngOnInit(): void {

  }

  ngAfterViewInit(){
      let style = window.getComputedStyle(this.bodyText.nativeElement, null);
      let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

      if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
        //if there is a text overflow, show the fade out truncator
        this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
      } else {
        //else there is a overflow, hide tge fade out truncator
        this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
      }
  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }

}
