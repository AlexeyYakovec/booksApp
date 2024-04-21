import { DivComponents } from "../../common/div-component";

export class Search extends DivComponents {
   constructor(state) {
      super();
      this.state = state;
   }

   render() {
      this.el.classList.add("search");
      this.el.innerHTML = `
		<div class="search__wrapper">
			<input
				class="search__input"
				type="text"
				placeholder="Найти книгу или автора..."
				value="${this.state.searchQuery ? this.state.searchQuery : ""}"
			/>
				<img src="/static/search.svg" alt="icon search"/>

		</div>
		<button class="button button__search" aria-label="search">
			<img src="/static/search-white.svg" alt="icon search" />
		</button>
	   `;
      return this.el;
   }
}
