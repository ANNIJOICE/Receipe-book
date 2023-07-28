import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceipeService } from '../receipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit {
  id: number;
  isEditMode: boolean;
  receipeForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute, 
    private receipeService: ReceipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params.id;
      this.isEditMode = params.id != null;
      this.initForm();
      console.log(this.isEditMode)
    })
  }

  private initForm() {
    let receipeName = '';
    let receipeImagePath = '';
    let receipeDescription = '';
    let receipeIngredients = new FormArray([]);
    if(this.isEditMode) {
      const receipe = this.receipeService.getReceipeByIndex(this.id);
      receipeName = receipe.name;
      receipeImagePath = receipe.imagePath;
      receipeDescription = receipe.description;
      if(receipe['ingredient']) {
        for(let ingredient of receipe.ingredient) {
          receipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount':  new FormControl(ingredient.amount, Validators.required)
            })
          )
        }
      }
    }
    this.receipeForm = new FormGroup({
      'name': new FormControl(receipeName, Validators.required),
      'imagePath': new FormControl(receipeImagePath, Validators.required),
      'description': new FormControl(receipeDescription, Validators.required),
      'ingredient': receipeIngredients
    });


  }

  addIngredients() {
    (<FormArray>this.receipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      })
    )
  }

  onSubmit() {
    if(this.isEditMode) {
      this.receipeService.updateReceipe(this.id, this.receipeForm.value)
    } else {
      this.receipeService.addReceipe(this.receipeForm.value)
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activateRoute})
  }

  deleteReceipe(index: number) {
    (<FormArray>this.receipeForm.get('ingredient')).removeAt(index);
  }

}
