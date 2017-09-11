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
          var headline = article[1][i];
          var description = article[2][i];
          var link = article[3][i];


        }
      }else{
        console.warn("error");
      }
    };
    articles.send();
  };

  click.addEventListener("click", getArticle);
};
