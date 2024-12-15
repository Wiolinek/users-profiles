export default async function NotFound() {

	return (
		<main className="container mx-auto my-20 flex flex-col gap-5">
			<h1 className="text-primary text-2xl font-bold">Not Found!</h1>
			<p className="flex grow">The requested resource could not be found!</p>
		</main>
	);
};
