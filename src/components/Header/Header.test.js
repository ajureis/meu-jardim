import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";

describe("Header", () => {
	test("deve renderizar o logo", () => {
		render(<Header toggleMenu={() => {}} />);
		const logo = screen.getByAltText("Logo Meu Jardim");
		expect(logo).toBeInTheDocument();
	});
});

test("deve renderizar a barra de pesquisa em telas maiores", () => {
	render(<Header toggleMenu={() => {}} />);
	const searchBar = screen.getByTestId("searchbar-icon");
	expect(searchBar).toBeInTheDocument();
});
