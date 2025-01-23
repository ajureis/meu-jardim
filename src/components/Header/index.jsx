import Image from "next/image";
import Link from "next/link";

import React from "react";

import SearchBar from "@/components/SearchBar";
import Menu from "@/components/Menu";

export default function Header() {
	return (
		<header className={`fixed w-full p-2 md:p-5 shadow-md bg-white  z-10  `}>
			<div className="containerw-full  md:w-[100%]  mx-auto flex gap-4 items-center justify-between lg:justify-center">
				<div data-testid="logo">
					<Link href="/">
						<Image src="/logo.png" width={140} height={24} alt="Logo Meu Jardim" priority={true} />
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
}
