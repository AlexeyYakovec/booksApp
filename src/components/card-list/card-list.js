import { DivComponents } from "../../common/div-component";

export class CardList extends DivComponents {
   constructor(appState, parentState) {
      super();
      this.appState = appState;
      this.parentState = parentState;
   }

   render() {
      if (this.parentState.loading) {
         this.el.innerHTML = `<div class="card_list__loader">Загрузка...</div>`;
         return this.el;
      }
      this.el.classList.add("card_list");
      this.el.innerHTML = `<h1>Найдено книг - ${this.parentState.list.length}</h1>`;
      return this.el;
   }
}
