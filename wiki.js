window.onload = function(){

  var click = document.getElementById("searchButton");
  var input = document.getElementById("input");
  var inputValue = "";
  var createArticle = document.getElementById("addArticles");
  var currentArticle = document.getElementById("article");

  document.addEventListener("keydown", function (event){
    var keyName = event.key;
    if (keyName === "Enter") {
      inputValue = input.value;
      if(inputValue != 0){
        getArticle();
      }
      createArticle.innerHTML = "";
    }


  }, false);


  //get article from wikipedia
  var getArticle = function (event){
    var articles = new XMLHttpRequest();

    articles.open("GET", "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+ encodeURI(inputValue) +"&&origin=*", true);
    articles.onload = function (){
      if(articles.status >= 200 && articles.status < 400){
        var article = JSON.parse(articles.response);
        var headline = article[1];
        var desc = article[2];
        var anchor = article[3];
        var fragment = document.createDocumentFragment();
        for(var i = 0; article[1].length > i; i++){
          fragment.append(makeArticle(headline[i], desc[i], anchor[i]));
        }
        createArticle.appendChild(fragment);

      }else{
        console.warn("error");
      }
    };
    articles.send();
  };

  var makeArticle = function (title, description, link){

    var article = document.createElement("article"),
      heading = document.createElement("h1"),
      paragraph = document.createElement("p"),
      url = document.createElement("a");

    heading.appendChild(document.createTextNode(title));
    paragraph.appendChild(document.createTextNode(description));
    url.href = link;
    url.target = "blank";
    url.text = "Click here to read more";
    [heading].forEach(function (arg) {
      article.appendChild(arg);
    });
    [paragraph].forEach(function (arg) {
      article.appendChild(arg);
    });
    [url].forEach(function (arg) {
      article.appendChild(arg);
    });
    article.className = "article";
    return article;
  };
  click.addEventListener("click", getArticle);
};
