import { render, screen, waitFor } from "@testing-library/react";
import Pagination from "./index";
import userEvent from "@testing-library/user-event";

// Mock de window.location para evitar erros de navegação no Jest
delete window.location;
window.location = { assign: jest.fn(), replace: jest.fn() };

// Mock de next/link para simular o comportamento correto nos testes
jest.mock("next/link", () => {
	return ({ children, href }) => {
		return <a href={href}>{children}</a>;
	};
});

describe("Pagination", () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Garante que os mocks são resetados antes de cada teste
		jest.spyOn(console, "error").mockImplementation(() => {}); // Silencia logs de erro
	});

	afterEach(() => {
		jest.restoreAllMocks(); // Restaura o comportamento normal dos mocks
	});

	test("renderiza os links de página anterior e próxima quando ambos são fornecidos", () => {
		render(<Pagination prev={1} next={3} baseUrl="/categoria/teste" />);

		expect(screen.getByText("Página anterior")).toBeInTheDocument();
		expect(screen.getByText("Próxima página")).toBeInTheDocument();
		expect(screen.getByText("Página anterior").closest("a")).toHaveAttribute(
			"href",
			"/categoria/teste?page=1"
		);
		expect(screen.getByText("Próxima página").closest("a")).toHaveAttribute(
			"href",
			"/categoria/teste?page=3"
		);
	});

	test("renderiza apenas o link da próxima página quando a anterior não é fornecida", () => {
		render(<Pagination next={2} baseUrl="/categoria/teste" />);

		expect(screen.queryByText("Página anterior")).not.toBeInTheDocument();
		expect(screen.getByText("Próxima página")).toBeInTheDocument();
	});

	test("não renderiza nenhum link quando as páginas anterior e próxima não são fornecidas", () => {
		render(<Pagination baseUrl="/categoria/teste" />);

		expect(screen.queryByText("Página anterior")).not.toBeInTheDocument();
		expect(screen.queryByText("Próxima página")).not.toBeInTheDocument();
	});

	test("navega para a página correta ao clicar no link da próxima página", async () => {
		render(<Pagination prev={1} next={3} baseUrl="/categoria/teste" />);
		const nextPageLink = screen.getByText("Próxima página");

		await userEvent.click(nextPageLink);

		await waitFor(() => {
			expect(nextPageLink.closest("a")).toHaveAttribute("href", "/categoria/teste?page=3");
		});

		expect(window.location.assign).not.toHaveBeenCalled();
	});
});
