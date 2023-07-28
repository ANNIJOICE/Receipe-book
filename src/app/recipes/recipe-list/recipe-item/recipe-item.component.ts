import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ReceipeService } from '../../receipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() receipe: Recipe;
  @Input() index: number;

  constructor(private receipeService: ReceipeService) { }

  ngOnInit() {
  }

  selectedReceipe(receipe: Recipe) {
    this.receipeService.receipeSelected.next(receipe);
  }

}
