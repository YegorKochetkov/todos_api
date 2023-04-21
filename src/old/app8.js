import http from "http";

const data = { x: 1, y: 2 };

const server = new http.Server();

server.on("request", async (req, res) => {
	// res.write("<h1>Hello!</h1>");
	// res.write("<p>Knock-knock...</p>");
	// res.write("<p>Yegor?</p>");
	res.write(JSON.stringify(data));
	res.end();

	const chunks = [];

	for await (const chunk of req) {
		chunks.push(chunk);
	}

	const bodyFromClient = Buffer.concat(chunks).toString();
	const dataFromClient = bodyFromClient && JSON.parse(bodyFromClient);

	if (dataFromClient) {
		console.log("bodyFromClient - ", bodyFromClient);
		console.log("dataFromClient - ", dataFromClient);
		console.log(dataFromClient.x + dataFromClient.y);
	}

	// req.on("data", (chunk) => {
	// 	chunks.push(chunk);
	// });

	// req.on("end", () => {
	// 	const bodyFromClient = Buffer.concat(chunks).toString();
	// 	const dataFromClient = JSON.parse(bodyFromClient);
	// 	console.log(bodyFromClient);
	// 	console.log(dataFromClient);
	// 	console.log(dataFromClient.x + dataFromClient.y);
	// });
});

server.on("error", (error) => {
	console.error(error);
});

server.listen(3000, () =>
	console.log("server is running on http://localhost:3000")
);