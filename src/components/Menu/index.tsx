"use client";
import useSWR from "swr";
import { useState } from "react";
import { getCategories } from "@/services/categories";
import Link from "next/link";

import { RiMenuFill, RiCloseFill } from "react-icons/ri";

import { ICategoryProps } from "@/types/types";

const fetcher = async (): Promise<ICategoryProps[]> => {
	return getCategories();
};

const Menu = () => {
	const { data: categories = [], error, isValidating } = useSWR("categories", fetcher);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	if (error) {
		return <p className="text-red-500">Erro ao carregar categorias.</p>;
	}

	return (
		<div className="relative">
			<button
				onClick={toggleMenu}
				className="lg:hidden text-main-green focus:outline-none"
				aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}>
				{isMenuOpen ? <RiCloseFill size={28} /> : <RiMenuFill size={28} />}
			</button>
			<nav
				data-testid="menu"
				aria-labelledby="menu"
				className={`fixed top-14 right-0 h-full w-[90%] bg-white transition-transform duration-300 ease-in-out transform ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				} lg:translate-x-0 lg:static lg:h-auto lg:w-auto lg:flex lg:space-y-0`}>
				<ul className="flex flex-col lg:flex-row gap-10 p-4 lg:p-0">
					{isValidating
						? [...Array(5)].map((_, index) => (
								<li key={index} className="h-6 w-32 bg-gray-300 animate-pulse rounded-md"></li>
						  ))
						: categories.map((category) => (
								<li key={category.slug}>
									<Link href={`/categoria/${category.slug}`} className="flex gap-2 items-center">
										{category.name}
									</Link>
								</li>
						  ))}
				</ul>
			</nav>
		</div>
	);
};

export default Menu;
