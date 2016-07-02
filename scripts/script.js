// event handler for the random page button
$("#random").click(function () {
      window.open("http://en.wikipedia.org/wiki/Special:Random");
    });

// event handler for search button. Inserts a form, sets it to the focus and creates an event listener for the form being submitted.
$("#search").click(function () {
      $("#btn-row2").html('');
      var html = '<form id = "as" action = ""><input type="text" id="bar" placeholder = "Search for" name="q"><input type="submit" value="Submit"></form>';
      $("#searchbar").html(html);
      $("#bar").focus();
      $( "form" ).submit(function( event ) {  
        event.preventDefault();
        var q = $("#bar").val();
        searchWiki(q);
      });
});  


  
// make a call to wiki api using the supplied query.
function searchWiki(q) {
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + q +  "&limit=210&namespace=0&format=json&callback=?";
  $.getJSON(url, function(data) {
    console.log(data);
    displayResults(data, 0);
  });
}

function displayResults(data, i) {
  var html = "";
  var end = i + 5;
  while (i < end) {
    var results = "<a href='" + data[3][i] + "'><div class='panel panel-primary'>";
    results += '<div class="panel-heading">' + data[1][i]  + '</div> - <div class="panel-body">' + data[2][i] + '</div></div>' ;
    results += "</a><hr>";
    html+= results;
    i++;
  }
  
   
      
      
    





  $("#results").html(html);
  var buttonHTML = '<div id="btn-row2" class="row">'
    if (i > 5) {
    buttonHTML += '<button id="prev" class="btn btn-default text-wrap">Previous page</button>';
  }
  if (i < 20) { // add next page button
     buttonHTML += '<button id="next" class="btn btn-default text-wrap">Next page</button>';

  }

  buttonHTML += '</div>';
  $("#resultnav").html(buttonHTML);
  $("#next").click(function () {
    displayResults(data, i);
  });  
  $("#prev").click(function () {
    displayResults(data, i-10);  
  });
}
   

