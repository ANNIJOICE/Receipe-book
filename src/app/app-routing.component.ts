import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ReceipeStartComponent } from "./recipes/receipe-start/receipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ReceipeEditComponent } from "./recipes/receipe-edit/receipe-edit.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/receipes', pathMatch: "full"},
    {path: 'receipes', component: RecipesComponent, children: [
        {
            path: '',
            component: ReceipeStartComponent
        },
        {
            path: 'new',
            component: ReceipeEditComponent
        },
        {
            path: ':id',
            component: RecipeDetailComponent
        },
        {
            path: ':id/edit',
            component: ReceipeEditComponent
        }
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}