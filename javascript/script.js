
$(document).ready(function() {

  // when you switch the options of the select the description of the query will change
  $('#query_type').on('change', function() {
    var opt = $('#query_type option:selected').val();

    // if the user had not selected anything the description will be the default description
    if(opt == 0) {
      var desc = 'Please, select a query.';
    }

    // changes the query description when the user selects a different option
    else if(opt == 1) {
      var desc = "Query the ontology to find out what rounds of matches are to be played.";
    }

    // changes the query description when the user selects a different option
    else if(opt == 2) {
      var desc = "Query the ontology to find out who is the coach of a certain team.";
    }

    // changes the query description when the user selects a different option
    else if(opt == 3) {
      var desc = "This query returns the matches not played.";
    }

    // changes the query description when the user selects a different option
    else if(opt == 4) {
      var desc = 'Returns the matches already played and their referees.';
    }

    // changes the query description when the user selects a different option
    else if(opt == 5) {
      var desc = "The query returns the Team where a certain player is.";

    }

    $('#query_description').text(desc); // the description will change text
  });

  // when the button is clicked the software will run the query selected
  $('.enter').on('click', function() {
    var opt = $('#query_type option:selected').val(); // the value of the selected option

    // get the required query if the option selected is not the default one
    if(opt != 0) {

      $('#result').fadeIn('slow');  //Mostra i risultati nella pagina
      var query = getQuery(opt);
      console.log(query);

      $.ajax({
       url: "http://localhost:7200/repositories/FIO",
       type: "get",
       dataType: "text",
       data: { query: query },
       success: function (result) {

         while (result.includes('http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#')) {
           result = result.replace('http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#', ' ');
         }

         $("#output").text(result);
       }

      });
     } else {
      alert('Please: select a query!'); // Messaggio di errore in caso non si sia compilato il campo
    }

});
});
