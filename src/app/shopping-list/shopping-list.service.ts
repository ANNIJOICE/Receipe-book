import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService { 
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredient: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
    
    getIngredient() {
        return this.ingredient.slice();
    }

    getIngredientByindex(index: number) {
        return this.ingredient[index];
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredient.push(newIngredient);
        this.ingredientChanged.next(this.ingredient.slice());
    }

    updateIngredient(newIngredient: Ingredient, index: number) {
        this.ingredient[index] = newIngredient;
        this.ingredientChanged.next(this.ingredient.slice());
    }

    deleteIngredient(index: number) {
        this.ingredient.splice(index, 1);
        this.ingredientChanged.next(this.ingredient.slice());
    }

    addMultipleIngredient(ingredients: Ingredient[]) {
        this.ingredient.push(...ingredients);
        this.ingredientChanged.next(this.ingredient.slice());
    }
}