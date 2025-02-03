import "./globals.css";
import { Nunito, Libre_Baskerville } from "next/font/google";

import Header from "@/components/Header";

const nunito = Nunito({
	weight: ["300", "400"],
	subsets: ["latin"],
	variable: "--font-nunito",
	display: "swap",
});

const libre_baskerville = Libre_Baskerville({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-libre_baskerville",
	display: "swap",
});

export const metadata = {
	title: "Meu Jardim",
	description: "Uma rede social para amantes de plantas",
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-br">
			<body className={`${nunito.variable} ${libre_baskerville.variable}`}>
				<Header />
				<main className="container mx-auto flex md:gap-4 gap-0 pt-16 md:pt-24 p-2">{children}</main>
			</body>
		</html>
	);
}
