import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "./index";
import useSWR from "swr";

// Mock useSWR
jest.mock("swr");
const mockUseSWR = useSWR;

describe("Menu Component", () => {
	it("renders loading state correctly", () => {
		mockUseSWR.mockReturnValue({
			data: undefined,
			error: undefined,
			isValidating: true,
		});

		render(<Menu />);

		const loadingItems = screen.getAllByRole("listitem");
		expect(loadingItems).toHaveLength(5);
	});

	it("renders categories correctly", () => {
		const categories = [
			{ slug: "category-1", name: "Category 1" },
			{ slug: "category-2", name: "Category 2" },
		];

		mockUseSWR.mockReturnValue({
			data: categories,
			error: undefined,
			isValidating: false,
		});

		render(<Menu />);

		categories.forEach((category) => {
			expect(screen.getByText(category.name)).toBeInTheDocument();
		});
	});

	it("renders error message when there is an error", () => {
		mockUseSWR.mockReturnValue({
			data: undefined,
			error: true,
			isValidating: false,
		});

		render(<Menu />);

		expect(screen.getByText("Erro ao carregar categorias.")).toBeInTheDocument();
	});

	it("toggles menu visibility on button click", () => {
		mockUseSWR.mockReturnValue({
			data: [],
			error: undefined,
			isValidating: false,
		});

		render(<Menu />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		const menu = screen.getByTestId("menu");
		expect(menu).toHaveClass("translate-x-0");

		fireEvent.click(button);
		expect(menu).toHaveClass("translate-x-full");
	});
});
