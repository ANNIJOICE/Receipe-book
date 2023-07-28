import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') slForm:NgForm;

  subscription = Subscription;
  isEditMode = false;
  editIndex: number;
  ingredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe((data) => {
      this.editIndex = data;
      this.isEditMode = true;
      this.ingredient = this.shoppingListService.getIngredientByindex(this.editIndex);
      this.slForm.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if(this.isEditMode) {
      this.shoppingListService.updateIngredient(ingredient, this.editIndex)
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.isEditMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.isEditMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.onClear();
  }
}
