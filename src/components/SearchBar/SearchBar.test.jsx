import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./index";

describe("SearchBar Component", () => {
	test("deve renderizar corretamente o campo de pesquisa", () => {
		render(<SearchBar />);
		const inputElement = screen.getByPlaceholderText("Pesquisar");
		expect(inputElement).toBeInTheDocument();
	});

	test("deve permitir a digitação no campo de pesquisa", () => {
		render(<SearchBar />);
		const inputElement = screen.getByPlaceholderText("Pesquisar");
		fireEvent.change(inputElement, { target: { value: "Plantas" } });
		expect(inputElement.value).toBe("Plantas");
	});

	test("deve ter uma label associada ao campo de pesquisa", () => {
		render(<SearchBar />);
		const inputElement = screen.getByLabelText("Pesquisar");
		expect(inputElement).toBeInTheDocument();
	});
});
