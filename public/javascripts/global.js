// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/show/questions', function( data ) {

   //console.log(data)
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      //console.log(this.count)
      tableContent += '<tr>';
      tableContent += '<td><a href="' + this.url + '" target="_blank">' + this.url + '</a></td>';
      tableContent += '<td>' + this.location_id + '</td>';
      tableContent += '<td>'+this.count+'</td>';
      tableContent += '<td>'+this.status+'</td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#busiList table tbody').html(tableContent);
  });
};

