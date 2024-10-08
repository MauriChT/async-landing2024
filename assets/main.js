const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCBVjMGOIkavEAhyqpxJ73Dw&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content'); // referencia al contenedor que tendrá los videos en el html

// Parámetros proporcionados por la API
// La key nunca debería ser compartida por nadie, si es propia
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ff3ac8da19msh0c322d56ac04a87p180fd3jsn1f3de776e5ad',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

/*
código que nos arroja la API rapidapi
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
*/
// Lo convertimos a esto:
async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const data = await response.json();
	return data;
}

// funcion que se llama a sí misma
// NO vamos crear una funcion que despues la llamaremos, crearemos una que automáticamente llamarse 
(async () => {
	try {
		const videos = await fetchData(url);
		console.log(videos)
		let view = `	
		${videos.items.map(video => `
			<div class="group relative">
				<div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
					<a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
					<img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
				</div>

				<div class="mt-4 flex justify-between">
				<h2 class="text-sm text-gray-700">
					<span aria-hidden="true" class="absolute inset-0"></span>
					${video.snippet.title}
				</h2>
				
				</div>
			</div>		
		`).slice(0,8).join('')}
		`;
		content.innerHTML = view ;
	} catch (error) {
		console.log(error);
		// colocar advertencia de error para el user 		
	}
})(); // Cuando el archivo este cargando, se llamara con esto o se ejcutara cuando el código o llegue a esta parte.


