let btn = document.querySelector('#searchButton');
let input = document.querySelector('#input');
let articles = document.querySelector('#articles');

function getArticles(inputValue){
	let req = new XMLHttpRequest();

	req.open('GET', `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${inputValue}&&origin=*`, true);
	req.onload = () => {
		req.status >= 200 && req.status < 400 ? createArticles(JSON.parse(req.response)) : console.error('Request error');
	}
	req.send();
}

function createArticles(data){
	let headlines = data[1];
	let descriptions = data[2];
	let anchors = data[3];
	let fragment = document.createDocumentFragment();
	for(let i = 0; data[1].length > i; i++){
		fragment.append(constructArticle(headlines[i], descriptions[i], anchors[i]));
	}
	articles.appendChild(fragment);
}


function constructArticle(title, description, link) {
	let article = document.createElement('article');
	let heading = document.createElement('h1');
	let paragraph = document.createElement('p');
	let url = document.createElement('a');

	heading.appendChild(document.createTextNode(title));
	paragraph.appendChild(document.createTextNode(description));
	url.href = link;
	url.target = 'blank';
	url.text = 'Click here to read more';

	[heading].forEach(arg =>{
		article.appendChild(arg);
	});
	[paragraph].forEach(arg =>{
		article.appendChild(arg);
	});
	[url].forEach(arg =>{
		article.append(arg);
	});
	article.className = 'article';
	return article;
}

document.getElementById('input-form').addEventListener('submit', (e) =>{
	getArticles(input.value);
	articles.innerHTML = '';
	input.innerHTML = '';
	e.preventDefault();
})