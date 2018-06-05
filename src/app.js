const input = document.querySelector('#input');
const articles = document.querySelector('#articles');

function getArticles(inputValue) {
	const req = new XMLHttpRequest();

	req.open(
		'GET',
		`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${inputValue}&&origin=*`,
		true
	);
	req.onload = () => {
		req.status >= 200 && req.status < 400
			? createArticles(JSON.parse(req.response))
			: console.log('Request error');
	};
	req.send();
}

function createArticles(data) {
	const headlines = data[1];
	const descriptions = data[2];
	const anchors = data[3];
	const fragment = document.createDocumentFragment();
	for (let i = 0; data[1].length > i; i++) {
		fragment.append(
			constructArticle(headlines[i], descriptions[i], anchors[i])
		);
	}
	articles.appendChild(fragment);
}

function constructArticle(title, description, link) {
	const article = document.createElement('article');
	const heading = document.createElement('h1');
	const paragraph = document.createElement('p');
	const url = document.createElement('a');

	heading.appendChild(document.createTextNode(title));
	paragraph.appendChild(document.createTextNode(description));
	url.href = link;
	url.target = 'blank';
	url.text = 'Click here to read more';

	[heading].forEach(arg => {
		article.appendChild(arg);
	});
	[paragraph].forEach(arg => {
		article.appendChild(arg);
	});
	[url].forEach(arg => {
		article.append(arg);
	});
	article.className = 'article';
	return article;
}

function errorMsg(message) {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(message));
	div.className = 'error-msg';
	const container = document.querySelector('.row');
	const form = document.querySelector('#input-form');
	container.insertBefore(div, form);
	setTimeout(() => {
		document.querySelector('.error-msg').remove();
	}, 2000);
}

document.getElementById('input-form').addEventListener('submit', e => {
	if (input.value === '') {
		errorMsg('Please fill the input');
	} else {
		getArticles(input.value);
		articles.innerHTML = '';
		input.value = '';
	}

	e.preventDefault();
});
