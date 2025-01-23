import "./globals.css";

import ClientLayout from "./ClientLayout";

import { Nunito, Libre_Baskerville } from "next/font/google";

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
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
