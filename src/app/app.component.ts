import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  @Input() commentLength = 160;
  @Input() submitButtonText = 'Submit';
  @Output() formSubmit = new EventEmitter<{
    name: string;
    email: string;
    comments: string;
  }>();

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    comments: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.contactForm
      .get('comments')
      ?.addValidators([Validators.maxLength(this.commentLength)]);
  }

  submit() {
    if (this.contactForm.valid) {
      this.formSubmit.emit({
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        comments: this.contactForm.get('comments')?.value,
      });
    }
  }
}
