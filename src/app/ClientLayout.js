"use client";
import Header from "@/components/Header";

export default function ClientLayout({ children }) {
	return (
		<>
			<Header />
			<main className="container mx-auto flex md:gap-4 gap-0 pt-16 md:pt-24 p-2">{children}</main>
		</>
	);
}
