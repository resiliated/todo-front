import { Component, Inject, OnInit } from '@angular/core';
import { Todo, State, Type } from '../models';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  todo:Todo;
  types: Type[];
  edition: boolean;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.todo = data.todo;
    this.types = data.types;
    this.edition = !(Object.keys(this.todo).length === 0);

    this.form = fb.group({
      title: [this.todo.title, Validators.required],
      //type: [this.todo.type , Validators.required],
      content: [this.todo.content, Validators.required]
    });
    console.log(this.todo);
  }

  ngOnInit(): void {

  }
  save(){
   this.dialogRef.close(this.form.value);
  }

}
