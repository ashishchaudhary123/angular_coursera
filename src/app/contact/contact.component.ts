import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {

    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''

  };

  validationMessages = {

    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters'
    },

    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters'
    },

    'telnum': {

      'required': 'Tel num should be required',
      'pattern': 'Tel num should contain only numbers'

    },

    'email': {

      'required': 'Email is required',
      'email': 'Email not in valid format'

    }

  };

  constructor(private fb: FormBuilder) {

    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({

      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });


    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages)
  }

  onValueChanged(data?: any) {

    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {

      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error messages

        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }

      }

    }

  }
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({

      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''

    });
    this.feedbackFormDirective.resetForm();
  }
}
