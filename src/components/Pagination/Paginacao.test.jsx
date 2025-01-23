import { render, screen } from "@testing-library/react";
import Pagination from "./index";
import userEvent from "@testing-library/user-event";

jest.mock("next/link", () => {
	return ({ children, href }) => {
		return <a href={href}>{children}</a>;
	};
});

describe("Pagination Component", () => {
	test("renders previous and next page links when both are provided", () => {
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

	test("renders only next page link when previous page is not provided", () => {
		render(<Pagination next={2} baseUrl="/categoria/teste" />);
		expect(screen.queryByText("Página anterior")).not.toBeInTheDocument();
		expect(screen.getByText("Próxima página")).toBeInTheDocument();
	});

	test("does not render any links when prev and next are not provided", () => {
		render(<Pagination baseUrl="/categoria/teste" />);
		expect(screen.queryByText("Página anterior")).not.toBeInTheDocument();
		expect(screen.queryByText("Próxima página")).not.toBeInTheDocument();
	});

	test("navigates to correct page on click", async () => {
		render(<Pagination prev={1} next={3} baseUrl="/categoria/teste" />);
		const nextPageLink = screen.getByText("Próxima página");
		await userEvent.click(nextPageLink);
		expect(nextPageLink.closest("a")).toHaveAttribute("href", "/categoria/teste?page=3");
	});
});
