import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Menu from "./index";
import { getCategories } from "@/services/categories";

// Mock da função getCategories
jest.mock("@/services/categories", () => ({
	getCategories: jest.fn().mockResolvedValue([]),
}));

// Mock de window.location para evitar erros de navegação no Jest
delete window.location;
window.location = { assign: jest.fn() };

// Mock de categorias para os testes
const mockCategories = [
	{ id: "1", slug: "category-1", name: "Category 1" },
	{ id: "2", slug: "category-2", name: "Category 2" },
];

describe("Menu", () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Limpa todos os mocks entre os testes
		jest.useFakeTimers("modern"); // Simula timers sem interferir em async/await

		// Mocka a API com um retorno padrão
		getCategories.mockResolvedValue(mockCategories);
	});

	afterEach(() => {
		jest.runOnlyPendingTimers(); // Garante que todos os timers sejam executados
		jest.useRealTimers(); // Restaura timers reais após cada teste
	});

	test("deve renderizar botão menu", () => {
		render(<Menu />);
		const menuButton = screen.getByRole("button", { name: /abrir menu/i });
		expect(menuButton).toBeInTheDocument();
	});

	test("toggles menu ao clique do botão", () => {
		render(<Menu />);
		const menuButton = screen.getByRole("button", { name: /abrir menu/i });

		fireEvent.click(menuButton);
		expect(screen.getByRole("button", { name: /fechar menu/i })).toBeInTheDocument();
	});

	test("buscar e mostrar em tela categorias", async () => {
		getCategories.mockResolvedValueOnce([
			{ id: 1, name: "Category 1" },
			{ id: 2, name: "Category 2" },
		]);

		await act(async () => {
			render(<Menu />);
		});

		await waitFor(() => expect(getCategories).toHaveBeenCalledTimes(1));

		expect(await screen.findByText("Category 1")).toBeInTheDocument();
		expect(await screen.findByText("Category 2")).toBeInTheDocument();
	});

	test("loading placeholders enquanto busca categoria", async () => {
		getCategories.mockImplementationOnce(() => new Promise(() => {})); // API nunca resolve (mantém `loading` ativo)

		render(<Menu />);

		await waitFor(() => {
			const placeholders = screen.getAllByRole("listitem");
			expect(placeholders).toHaveLength(5);
		});
	});
});
