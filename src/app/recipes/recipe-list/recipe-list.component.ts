import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ReceipeService } from '../receipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  
  constructor( private receipeService: ReceipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.receipeService.receipeChanged.subscribe((data: Recipe[]) => {
      this.recipes = data;
    })
    this.recipes = this.receipeService.getReceipes();
  }

  navigate() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }


}
