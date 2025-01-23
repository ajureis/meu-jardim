import { useState, useEffect } from "react";
import Link from "next/link";

import { RiMenuFill, RiCloseFill } from "react-icons/ri";

export default function Menu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [categories, setCategories] = useState([]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("http://localhost:3042/posts");
				const data = await response.json();

				// Criar uma lista única de categorias com slug e nome
				const uniqueCategories = Array.from(
					new Map(data.map((post) => [post.categorySlug, post])).values()
				).map((post) => ({
					slug: post.categorySlug,
					name: post.category,
				}));

				setCategories(uniqueCategories);
			} catch (error) {
				console.error("Erro ao buscar categorias:", error);
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
					{categories.length > 0 ? (
						categories.map((category, index) => (
							<li key={index}>
								<Link href={`/categoria/${category.slug}`} className="flex gap-2 items-center">
									{category.name}
								</Link>
							</li>
						))
					) : (
						<li>Carregando...</li>
					)}
				</ul>
			</nav>
		</div>
	);
}
