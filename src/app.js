"use strict";

/*	
	👉 state - это некоторый объект который находится на определённом уровне нашей иерархии
	👉 App (Application) - распологается routes (роутинг)
	👉 main  - это и есть view

	👉 on-change - библиотека, следит за изменениями объекта. Работает рекурсивно
	и может внутри объекта может найти любое изменение
	Принцип работы: когда видем обновление объекта, будем тригерить необходимые функции
	будем использовать в main, чтобы следить за глобальным состоянием
*/

import { MainView } from "./views/main/main.js";

class App {
   routes = [
      {
         path: "",
         view: MainView,
      },
   ];

   appState = {
      favorites: [],
   };

   constructor() {
      window.addEventListener("hashchange", this.route.bind(this));
      this.route();
   }
   route() {
      if (this.currentView) {
         this.currentView.destroy();
      }
      const view = this.routes.find((r) => r.path == location.hash).view;
      this.currentView = new view(this.appState);
      this.currentView.render();
   }
}

new App();
