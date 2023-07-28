import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ReceipeService } from '../receipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  receipe: Recipe;
  isOpen: boolean = false;
  id: number;

  constructor(
    private receipeService: ReceipeService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params.id;
      this.receipe = this.receipeService.getReceipeByIndex(this.id);
      console.log(this.receipe)
    })
  }

  addIngredient() {
    this.receipeService.addIngredient(this.receipe.ingredient);
  }

  addNavigation() {
    this.router.navigate(['edit'], {relativeTo: this.activateRoute})
  }

  deleteReceipe() {
    this.receipeService.deleteReceipe(this.id);
    this.router.navigate(['/receipes'])
  }
}
