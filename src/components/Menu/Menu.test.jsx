import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Menu from "@/components/Menu";

// Mock da API de sucesso
const mockFetchSuccess = () =>
	jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve([
					{ categorySlug: "tecnologia", category: "Tecnologia" },
					{ categorySlug: "natureza", category: "Natureza" },
				]),
		})
	);

describe("Componente Menu", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		global.fetch = jest.fn().mockImplementation(mockFetchSuccess());
	});

	test("Deve renderizar corretamente o botão do menu", async () => {
		render(<Menu />);

		const botaoMenu = screen.getByRole("button", { name: /abrir menu/i });
		expect(botaoMenu).toBeInTheDocument();
	});

	test("Deve abrir e fechar o menu ao clicar no botão", async () => {
		render(<Menu />);

		const botaoMenu = screen.getByRole("button", { name: /abrir menu/i });

		// Verifica se o menu está fechado inicialmente
		expect(screen.getByTestId("menu")).toHaveClass("translate-x-full");

		fireEvent.click(botaoMenu);

		// Aguarda e verifica se o menu está aberto após o clique
		await waitFor(() => {
			expect(screen.getByTestId("menu")).toHaveClass("translate-x-0");
		});

		fireEvent.click(botaoMenu);

		// Verifica se o menu está fechado novamente
		await waitFor(() => {
			expect(screen.getByTestId("menu")).toHaveClass("translate-x-full");
		});
	});

	test("Deve exibir links de categoria corretamente", async () => {
		render(<Menu />);

		// Aguarda os dados serem carregados
		await waitFor(() => {
			expect(screen.getByText("Tecnologia")).toBeInTheDocument();
			expect(screen.getByText("Natureza")).toBeInTheDocument();
		});

		// Verifica se os links das categorias foram renderizados corretamente
		const linkTecnologia = screen.getByRole("link", { name: "Tecnologia" });
		expect(linkTecnologia).toHaveAttribute("href", "/categoria/tecnologia");

		const linkNatureza = screen.getByRole("link", { name: "Natureza" });
		expect(linkNatureza).toHaveAttribute("href", "/categoria/natureza");
	});
});
