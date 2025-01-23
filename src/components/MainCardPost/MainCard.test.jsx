import { render, screen } from "@testing-library/react";
import MainCard from "./index";
import { useRouter } from "next/router";

// Mock do Next.js para evitar erro de rota
jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

// Dados mockados do post
const mockPost = {
	slug: "meu-primeiro-post",
	image: "/images/post.jpg",
	title: "Meu Primeiro Post",
	category: "Categoria",
	author: "Autor Teste",
};

describe("MainCard Component", () => {
	beforeEach(() => {
		useRouter.mockReturnValue({
			push: jest.fn(),
		});
	});

	test("deve renderizar o título do post corretamente", () => {
		render(<MainCard post={mockPost} />);
		const titleElement = screen.getByText("Meu Primeiro Post");
		expect(titleElement).toBeInTheDocument();
	});

	test("deve renderizar a categoria corretamente", () => {
		render(<MainCard post={mockPost} />);
		const categoryElement = screen.getByText("Categoria");
		expect(categoryElement).toBeInTheDocument();
	});

	test("deve renderizar o autor do post corretamente", () => {
		render(<MainCard post={mockPost} />);
		const authorElement = screen.getByText("Autor Teste");
		expect(authorElement).toBeInTheDocument();
	});

	test("deve renderizar a imagem corretamente", () => {
		render(<MainCard post={mockPost} />);
		const imageElement = screen.getByAltText("Meu Primeiro Post");
		expect(imageElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute(
			"src",
			expect.stringContaining(encodeURIComponent(mockPost.image))
		);
	});

	test("deve conter um link correto para a página do post", () => {
		render(<MainCard post={mockPost} />);
		const linkElement = screen.getByRole("link");
		expect(linkElement).toHaveAttribute("href", `/post/${mockPost.slug}`);
	});
});
