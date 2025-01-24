export default function Loading() {
	return (
		<section className="container w-full md:w-[80%] mx-auto gap-5 mb-14 mt-10 animate-pulse">
			<article className="flex flex-col gap-5">
				<div className="flex items-center justify-center gap-4">
					<div className="w-24 h-8 bg-gray-300 rounded-3xl"></div>
					<div className="w-36 h-6 bg-gray-300 rounded-md"></div>
				</div>

				<div className="h-12 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
				<div className="h-8 bg-gray-300 rounded-md w-1/2 mx-auto"></div>

				<div className="image mb-1 relative w-full min-h-[450px] max-h-[450px] bg-gray-300 rounded-lg"></div>

				<div className="flex items-center justify-between mt-5">
					<div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
					<div className="w-24 h-10 bg-gray-300 rounded-md"></div>
				</div>

				<div className="mt-10 space-y-4">
					<div className="w-full h-4 bg-gray-300 rounded-md"></div>
					<div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
					<div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
				</div>
			</article>
		</section>
	);
}
