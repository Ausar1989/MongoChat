$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.scrollspy').scrollSpy();
    $('.fixed-action-btn').floatingActionButton();
    $("#scrapeResults").empty();
    initArticles();
});

var API = {
    getScrape: function () {
        return $.ajax({
            url: "api/scrape",
            type: "GET"
        });
    },
    init: function () {
        return $.ajax({
            url: "api/articles",
            type: "GET"
        });
    },
    getArticle: function (id) {
        return $.ajax({
            url: "api/articles/" + id,
            type: "GET"
        });
    },
    save: function (article) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/saved",
            data: JSON.stringify(article)
        });
    },
    deleteArticle: function (id) {
        return $.ajax({
            url: "api/articles/" + id,
            type: "DELETE"
        });
    },
    deleteAllScrapedArt: function () {
        return $.ajax({
            url: "api/articles/",
            type: "DELETE"
        });
    }
};

var initArticles = function () {
    $("#scrapeResults").empty();
    API.init().then(function (data) {
        if (data.length > 0) {
            var retrieval = data.map(function (artic) {
                var $li = $("<li>");

                var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                var title = $("<div>").text(artic.title).addClass("section scrollspy");
            
                var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                var body = $("<div>").attr("data-id", artic._id).addClass("section scrollspy").append(span).append(saveButton);

                $li.append(title).append(body);

                return $li;
            });
            $("#scrapeResults").append(retrieval);
        }
        else {
            var $li = $("<li>");

            var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");

            $li.append(title);
            $("#scrapeResults").append($li);
        }
    });

};

var newScrape = function () {
    $("#scrapeResults").empty();
    API.getScrape().then(function (data) {
      

        API.init().then(function (data) {
            if (data.length > 0) {
                var retrieval = data.map(function (artic) {
                    var $li = $("<li>");
    
                    var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                    var title = $("<div>").text(artic.title).addClass("section scrollspy");
    
                    var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                    var body = $("<div>").attr("data-id", artic._id).addClass("section scrollspy").append(span).append(saveButton);
    
                    $li.append(title).append(body);
    
                    return $li;
                });
                $("#scrapeResults").append(retrieval);
            }
            else {
                var $li = $("<li>");
    
                var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");
    
                $li.append(title);
                $("#scrapeResults").append($li);
            }
        });
    });
};

var deleteAllScraped = function () {
    API.deleteAllScrapedArt().then(function () {
        $("#scrapeResults").empty();
        API.init().then(function (data) {
            if (data.length > 0) {
                var retrieval = data.map(function (artic) {
                    var $li = $("<li>");
    
                    var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                    var title = $("<div>").text(artic.title).addClass("section scrollspy");
    
                    var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                    var body = $("<div>").attr("data-id", artic._id).addClass("section scrollspy").append(span).append(saveButton);
    
                    $li.append(title).append(body);
    
                    return $li;
                });
                $("#scrapeResults").append(retrieval);
            }
            else {
                var $li = $("<li>");
    
                var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");
    
                $li.append(title);
                $("#scrapeResults").append($li);
            }
        });
    })
};

var saveArticle = function () {
    var id = $(this).parent().attr("data-id");

    API.getArticle(id).then(function (data) {
        console.log(data);
        API.save(data).then(function (dataTwo) {
        });
        API.deleteArticle(id).then(function (dataThree) {
            $("#scrapeResults").empty();
            API.init().then(function (data) {
                if (data.length > 0) {
                    var retrieval = data.map(function (artic) {
                        var $li = $("<li>");
        
                        var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                        var title = $("<div>").text(artic.title).addClass("section scrollspy");
        
                        var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                        var body = $("<div>").attr("data-id", artic._id).addClass("section scrollspy").append(span).append(saveButton);
        
                        $li.append(title).append(body);
        
                        return $li;
                    });
                    $("#scrapeResults").append(retrieval);
                }
                else {
                    var $li = $("<li>");
        
                    var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");
        
                    $li.append(title);
                    $("#scrapeResults").append($li);
                }
            });
        });
    });

   
};




$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});






$(document).on("click", "p", function () {
    $("#comment").empty();
    var thisId = $(this).attr("data-id");

    
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        
        .then(function (data) {
            console.log(data);
        
            $("#comment").append("<h2>" + data.title + "</h2>");
            $("#comment").append("<input id='titleinput' name='title' >");
            $("#comment").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#comment").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});


$(document).on("click", "#saveComment", function () {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
            $("#comment").empty();
        });

    
    $("#titleinput").val("");
    $("#bodyinput").val("");
});




$("#newScrape").on("click", newScrape);
$("#scrapeResults").on("click", ".saveIt", saveArticle);

$("#clearScrapedArticles").on("click", deleteAllScraped);