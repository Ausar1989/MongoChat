$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
    $("#scrapeResults").empty();
    initializeArticles();
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

var initializeArticles = function () {
    $("#scrapeResults").empty();
    API.init().then(function (data) {
        if (data.length > 0) {
            var $arts = data.map(function (artic) {
                var $li = $("<li>");

                var saveButton = $("<button>").addClass("btn-small waves-effect waves-light").attr("type", "submit").attr("name", "action").text("Save Article");
                var headline = $("<div>").text(artic.title).addClass("collapsible-header");

                var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);

                $li.append(headline).append(body);

                return $li;
            });
            $("#scrapeResults").append($arts);
        }
        else {
            var $li = $("<li>");

            var headline = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");

            $li.append(headline);
            $("#scrapeResults").append($li);
        }
    });

};

var newScrape = function () {
    $("#scrapeResults").empty();
    API.getScrape().then(function (data) {
        API.init().then(function (data) {
            if (data.length > 0) {
                var $arts = data.map(function (artic) {
                    var $li = $("<li>");
    
                    var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                    var title = $("<div>").text(artic.title).addClass("collapsible-header");
    
                    var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                    var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);
    
                    $li.append(title).append(body);
    
                    return $li;
                });
                $("#scrapeResults").append($arts);
            }
            else {
                var $li = $("<li>");
    
                var title = $("<h5>").text("Out of Articles. Scrape some new ones By Clicking The Button Above!").addClass("center-align");
    
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
                var $arts = data.map(function (artic) {
                    var $li = $("<li>");
    
                    var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                    var title = $("<div>").text(artic.title).addClass("collapsible-header");
    
                    var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                    var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);
    
                    $li.append(title).append(body);
    
                    return $li;
                });
                $("#scrapeResults").append($arts);
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
                    var $arts = data.map(function (artic) {
                        var $li = $("<li>");
        
                        var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                        var title = $("<div>").text(artic.title).addClass("collapsible-header");
        
                        var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                        var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);
        
                        $li.append(title).append(body);
        
                        return $li;
                    });
                    $("#scrapeResults").append($arts);
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



// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});






$(document).on("click", "p", function () {
    
    $("#notes").empty();
    
    var thisId = $(this).attr("data-id");

    
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
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
        // With that done
        .then(function (data) {
            
            console.log(data);
            
            $("#notes").empty();
        });


    $("#titleinput").val("");
    $("#bodyinput").val("");
});




$("#newScrape").on("click", newScrape);
$("#scrapeResults").on("click", ".saveIt", saveArticle);

$("#clearScrapedArticles").on("click", deleteAllScraped);