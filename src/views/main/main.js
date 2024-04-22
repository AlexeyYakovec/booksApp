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
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

import onChange from "on-change";

export class MainView extends AbstractView {
   state = {
      list: [],
      numFound: 0,
      loading: false,
      searchQuery: undefined,
      offset: 0,
   };

   constructor(appState) {
      super();
      this.appState = appState;
      this.appState = onChange(this.appState, this.appStateHook.bind(this));
      this.state = onChange(this.state, this.stateHook.bind(this));
      this.setTitle("Search books");
   }

   appStateHook(path) {
      if (path == "favorites") {
         this.render();
      }
   }

   destroy() {
      onChange.unsubscribe(this.appState);
      onChange.unsubscribe(this.state);
   }

   async stateHook(path) {
      if (path == "searchQuery") {
         this.state.loading = true;
         const data = await this.loadList(
            this.state.searchQuery,
            this.state.offset
         );
         this.state.loading = false;
         //    console.log(data);
         this.state.numFound = data.numFound;
         this.state.list = data.docs;
      }
      if (path === "list" || path === "loading") {
         this.render();
      }
   }

   async loadList(q, offset) {
      const res = await fetch(
         `https://openlibrary.org/search.json?q=${q}&offset=${offset}`
      );
      return res.json();
   }

   render() {
      const main = document.createElement("div");
      main.innerHTML = `<h1>Найдено книг - ${this.state.numFound}</h1>`;
      main.append(new Search(this.state).render());
      main.append(new CardList(this.appState, this.state).render());
      this.app.innerHTML = "";
      this.app.append(main);
      this.renderHeader();
   }

   renderHeader() {
      const header = new Header(this.appState).render();
      this.app.prepend(header);
   }
}
