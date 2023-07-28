import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceipeService } from '../recipes/receipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private receipeService: ReceipeService) { 

  }

  storeReceipes() {
    const receipe = this.receipeService.getReceipes();
    this.http.put('https://receipe-book-90ea3-default-rtdb.firebaseio.com/receipes.json', receipe).subscribe((res) => {
      console.log(res)
    })
  }

  fetchReceipe() {
    this.http.get<Recipe[]>('https://receipe-book-90ea3-default-rtdb.firebaseio.com/receipes.json')
    .pipe(map(receipes => {
      return receipes.map(receipe => { return {...receipe, ingredients: receipe.ingredient ? receipe.ingredient : []} })
    }))
    .subscribe((data) => {
      this.receipeService.setReceipe(data);
    })
  }
}
