export class AbstractView {
   constructor() {
      this.app = document.getElementById("root");
   }

   setTitle(title) {
      document.title = title;
   }

   render() {
      return;
   } // render view

   destroy() {
      return;
   } // вызывается при уничтожении view
}
