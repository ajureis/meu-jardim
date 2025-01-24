import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Menu from "@/components/Menu";

// Mock da API
global.fetch = jest.fn(() =>
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
		fetch.mockClear();
	});

	test("Deve renderizar corretamente o botão do menu", async () => {
		await act(async () => {
			render(<Menu />);
		});

		const botaoMenu = screen.getByRole("button", { name: /abrir menu/i });
		expect(botaoMenu).toBeInTheDocument();
	});

	test("Deve abrir e fechar o menu ao clicar no botão", async () => {
		await act(async () => {
			render(<Menu />);
		});

		const botaoMenu = screen.getByRole("button", { name: /abrir menu/i });

		// Verifica se o menu está fechado inicialmente
		expect(screen.getByTestId("menu")).toHaveClass("translate-x-full");

		fireEvent.click(botaoMenu);

		// Verifica se o menu está aberto após o clique
		expect(screen.getByTestId("menu")).toHaveClass("translate-x-0");

		fireEvent.click(botaoMenu);

		// Verifica se o menu está fechado novamente
		expect(screen.getByTestId("menu")).toHaveClass("translate-x-full");
	});

	test("Deve lidar com erro ao buscar categorias", async () => {
		fetch.mockImplementationOnce(() => Promise.reject("Erro de API"));

		await act(async () => {
			render(<Menu />);
		});

		// Verifica se o texto de carregamento persiste após erro
		expect(screen.getByText("Carregando...")).toBeInTheDocument();
	});

	test("Deve exibir links de categoria corretamente", async () => {
		await act(async () => {
			render(<Menu />);
		});

		await waitFor(() => expect(screen.getByText("Tecnologia")).toBeInTheDocument());
		await waitFor(() => expect(screen.getByText("Natureza")).toBeInTheDocument());

		// Verifica se os links das categorias foram renderizados corretamente
		const linkTecnologia = screen.getByRole("link", { name: "Tecnologia" });
		expect(linkTecnologia).toHaveAttribute("href", "/categoria/tecnologia");

		const linkNatureza = screen.getByRole("link", { name: "Natureza" });
		expect(linkNatureza).toHaveAttribute("href", "/categoria/natureza");
	});
});
