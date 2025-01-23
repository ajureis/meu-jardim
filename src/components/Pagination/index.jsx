import Link from "next/link";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({ prev, next, baseUrl }) {
	return (
		<div className="flex justify-end gap-6 text-base underline text-center mt-5">
			{prev && (
				<Link href={`${baseUrl}?page=${prev}`} className="flex items-center gap-2">
					<MdKeyboardDoubleArrowLeft /> Página anterior
				</Link>
			)}
			{next && (
				<Link href={`${baseUrl}?page=${next}`} className="flex items-center gap-2">
					Próxima página <MdKeyboardDoubleArrowRight />
				</Link>
			)}
		</div>
	);
}
