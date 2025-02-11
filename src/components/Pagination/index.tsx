import Link from "next/link";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface PaginationProps {
	prev?: number | null;
	next?: number | null;
	baseUrl: string;
}

const Pagination = ({ prev, next, baseUrl }: PaginationProps) => {
	return (
		<div className="flex justify-end gap-6 text-base underline text-center mt-5">
			{prev && (
				<Link
					href={`${baseUrl}?page=${prev}`}
					aria-label="Ir para a página anterior"
					className="flex items-center gap-2">
					<MdKeyboardDoubleArrowLeft /> Página anterior
				</Link>
			)}
			{next && (
				<Link
					href={`${baseUrl}?page=${next}`}
					aria-label="Ir para a próxima página"
					className="flex items-center gap-2">
					Próxima página <MdKeyboardDoubleArrowRight />
				</Link>
			)}
		</div>
	);
};

export default Pagination;
