import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  listOfSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService ) { }


  ngOnInit() {
    console.log("Ngoninit")
    this.ingredients = this.shoppingListService.getIngredient();
     this.listOfSubscription = this.shoppingListService.ingredientChanged.subscribe((data) => {
      this.ingredients = data;
    });

  }

  ngOnDestroy(): void {
    this.listOfSubscription.unsubscribe();
      console.log("Destroy")
  }

  onEditIngredient(index) {
    this.shoppingListService.startedEditing.next(index);
  }


}
