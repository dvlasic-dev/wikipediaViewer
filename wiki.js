window.onload = function(){

  var click = document.getElementById("searchButton");
  var input = document.getElementById("input");
  var inputValue = "";
  var createArticle = document.getElementById("addArticles");


  document.addEventListener("keydown", function (event){
    var keyName = event.key;
    if (keyName === "Enter") {
      inputValue = input.value;
      getArticle();
    }
  }, false);

  //get article from wikipedia
  var getArticle = function (event){
    var articles = new XMLHttpRequest();

    articles.open("GET", "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+ encodeURI(inputValue) +"&&origin=*", true);
    articles.onload = function (){
      if(articles.status >= 200 && articles.status < 400){
        var article = JSON.parse(articles.response);
        for(var i = 0; article[1].length > i; i++){

          var newH1 = document.createElement("h1");
          var newContent = document.createTextNode(article[1][i]);
          newH1.appendChild(newContent); //add the text node to the newly created div.
          // add the newly created element and its content into the DOM
          var currentDiv = document.getElementById("addArticles");
          document.body.insertBefore(newH1, currentDiv);
          var description = document.createElement("p");
          var newDesc = document.createTextNode(article[2][i]);
          description.appendChild(newDesc); //add the text node to the newly created div.
          // add the newly created element and its content into the DOM
          document.body.insertBefore(newDesc, currentDiv);
          var link = document.createElement("a");
          var newLink = document.createTextNode(article[3][i]);
          newH1.appendChild(newContent); //add the text node to the newly created div.
          // add the newly created element and its content into the DOM
          document.body.insertBefore(newLink, currentDiv);

        }
      }else{
        console.warn("error");
      }
    };
    articles.send();
  };

  click.addEventListener("click", getArticle);
};
