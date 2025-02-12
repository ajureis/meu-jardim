const Loading = () => {
	return (
		<section className="container w-full md:w-[80%] mx-auto flex-col gap-5 mb-14">
			<h1 className="text-3xl font-bold mb-8 capitalize bg-gray-300 rounded-md animate-pulse h-8 w-1/3"></h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="rounded-lg border border-gray-200 p-4 bg-gray-50 animate-pulse">
						<div
							className="mb-2 relative bg-gray-300 rounded-lg"
							style={{ width: "100%", height: "240px" }}></div>

						<section className="space-y-2">
							<div className="bg-gray-300 rounded-md h-6 w-3/4"></div>
							<div className="bg-gray-300 rounded-md h-4 w-1/2"></div>
						</section>
					</div>
				))}
			</div>
		</section>
	);
};

export default Loading;
