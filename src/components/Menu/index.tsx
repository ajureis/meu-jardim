"use client";
import React, { JSX } from "react";
import { useState, useEffect } from "react";
import { getCategories } from "@/services/categories";
import Link from "next/link";

import { RiMenuFill, RiCloseFill } from "react-icons/ri";

import { CategoryProps } from "@/types/types";

const Menu = (): JSX.Element => {
	const [categories, setCategories] = useState<CategoryProps[]>([]);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData: CategoryProps[] = await getCategories();
				setCategories(categoriesData);
			} catch (error) {
				console.error("Erro ao buscar categorias:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

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
					{loading
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
