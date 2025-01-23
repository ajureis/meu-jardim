import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonLink from "./index";

test("renderiza o botão corretamente", () => {
	render(<ButtonLink href="/test">Clique aqui</ButtonLink>);

	const buttonElement = screen.getByText(/clique aqui/i);
	expect(buttonElement).toBeInTheDocument();
	expect(buttonElement).toHaveAttribute("href", "/test");
});
