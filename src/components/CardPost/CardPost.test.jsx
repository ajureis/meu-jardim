import { render, screen } from "@testing-library/react";
import CardPost from "./index";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock do next/router para evitar erro de rota
jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

const mockPost = {
	slug: "post-teste",
	image: "/images/test.jpg",
	title: "Post de Teste",
	category: "Categoria",
	date: "2024-07-01",
};

describe("CardPost Component", () => {
	beforeEach(() => {
		useRouter.mockReturnValue({
			push: jest.fn(),
		});
	});

	test("deve renderizar o título do post corretamente", () => {
		render(<CardPost post={mockPost} />);
		const titleElement = screen.getByText(mockPost.title);
		expect(titleElement).toBeInTheDocument();
	});

	test("deve renderizar a categoria corretamente", () => {
		render(<CardPost post={mockPost} />);
		const categoryElement = screen.getByText(mockPost.category);
		expect(categoryElement).toBeInTheDocument();
	});

	test("deve conter um link para a página do post", () => {
		render(<CardPost post={mockPost} />);
		const linkElement = screen.getByRole("link", { name: /post de teste/i });
		expect(linkElement).toHaveAttribute("href", `/post/${mockPost.slug}`);
	});

	test("deve renderizar a imagem do post corretamente", () => {
		render(<CardPost post={mockPost} />);
		const imageElement = screen.getByAltText(mockPost.title);
		expect(imageElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute(
			"src",
			expect.stringContaining(encodeURIComponent(mockPost.image))
		);
	});

	test("deve renderizar a data formatada corretamente", () => {
		render(<CardPost post={mockPost} />);
		const formattedDate = format(new Date(mockPost.date), "dd 'de' MMMM 'de' yyyy", {
			locale: ptBR,
		});
		const dateElement = screen.getByText(formattedDate);
		expect(dateElement).toBeInTheDocument();
	});
});
