import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import SearchBar from "@/components/SearchBar";
import Menu from "@/components/Menu";

const Header = (): JSX.Element => {
	return (
		<header className={`fixed w-full p-2 md:p-5 shadow-md bg-white  z-10  `}>
			<div className="container w-full   mx-auto flex gap-4 items-center justify-between lg:justify-center">
				<div data-testid="logo">
					<Link href="/" aria-label="Página Inicial">
						<Image src="/logo.png" width={140} height={24} alt="Logo Meu Jardim" priority />
					</Link>
				</div>
				<div data-testid="searchbar-icon" className="hidden md:block">
					<SearchBar />
				</div>
				<div data-testid="main-menu">
					<Menu />
				</div>
			</div>
		</header>
	);
};

export default Header;
