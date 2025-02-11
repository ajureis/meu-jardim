import React, { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
	className?: string;
	href: string;
	children: ReactNode;
};

const ButtonLink = ({ children, href, className = "", ...props }: ButtonLinkProps) => {
	return (
		<a
			{...props}
			href={href}
			className="flex gap-1 border border-main-green text-main-green bg-white px-2 md:px-4 py-1 md:py-2 rounded-md text-sm hover:bg-main-green hover:text-white transition duration-300 ease-in-out">
			{children}
		</a>
	);
};

export default ButtonLink;
