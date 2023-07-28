import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isOpen: boolean = false;
  constructor(private dataStorage: DataStorageService){}

  saveReceipeInFireBase() {
    this.dataStorage.storeReceipes();
  }

  fetchReceipe() {
    this.dataStorage.fetchReceipe();
  }


}
