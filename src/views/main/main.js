/*	
	Запрос, результат поиска (число книг), в поиске хранение offset, находимся ли мы в состоянии загрузки
	👉 list - список книг
	👉 loading - загрузка
	👉 searchQuery - запрос, по умолчанию undefied
	👉 offset - 

	👉 Состояние должно передаваться сверху-вниз (то есть у наших favorites должны знать соотв. страницы, кому это важно) например для main это важно, 
	потому что он должен уметь этот favorites обновлять
*/

import { AbstractView } from "../../common/view.js";
import onChange from "on-change";

export class MainView extends AbstractView {
   state = {
      list: [],
      loading: false,
      searchQuery: undefined,
      offset: 0,
   };

   constructor(appState) {
      super();
      this.appState = appState;
      this.appState = onChange(this.appState, this.appStateHook(this));
      this.setTitle("Search books");
   }

   appStateHook(path) {
      console.log(path);
   }

   render() {
      const main = document.createElement("div");
      main.innerHTML = `Число книг: ${this.appState.favorites.length}`;
      this.app.innerHTML = "";
      this.app.append(main);
      this.appState.favorites.push("favorites");
   }
}
