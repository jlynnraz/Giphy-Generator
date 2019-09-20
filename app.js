
$("#buttons-div").on("click", ".buttons", function(){
    $("#gifs-appear-here").empty();
    var keyword = $(this).attr("data-buttons");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
    console.log(keyword);
    console.log(this);
    $.ajax({
        url: queryURL,
        method: "GET" 
    }).then(function(response){
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>").addClass("gifClass");
            
            var rating = results[i].rating;
            
            var p = $("<p>").text("Rating: " + rating);
            
            var sportsImage = $("<img>").addClass("gif").attr("data-state", "still").attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url);
            sportsImage.attr("src", results[i].images.fixed_height_still.url);
            
            gifDiv.prepend(p);
            gifDiv.prepend(sportsImage);
            
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
    
});


$("#gifs-appear-here").on("click", ".gif", function(){

    var state = $(this).attr("data-state");

    var stillURL = $(this).attr("data-still");

    var animatedURL = $(this).attr("data-animate");

    if (state === "still"){
        $(this).attr({
            "src": animatedURL,
            "data-state": "animate"
        }
        )
    } else {
        $(this).attr({
            "src": stillURL,
            "data-state": "still"
        })
    }
console.log("click")
});

$("#submit-btn").on("click", function(){

    var input = $("#input-box").val();
    console.log(input);

    // $("<button data-buttons="Football" class="buttons">Football</button>")
    var newBtn = $("<button>").attr("data-buttons", input).addClass("buttons").text(input);

    $("#buttons-div").append(newBtn);
})

