import { JSX } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = (): JSX.Element => {
	return (
		<div className="w-64 md:w-48 flex items-center justify-between bg-main-light-grey rounded-md border">
			<label htmlFor="search" className="sr-only">
				Pesquisar
			</label>
			<input
				id="search"
				type="text"
				placeholder="Pesquisar"
				className="w-40	 border p-2 rounded-md text-sm bg-transparent border-none"
			/>
			<button className="px-2">
				<FiSearch />
			</button>
		</div>
	);
};

export default SearchBar;
