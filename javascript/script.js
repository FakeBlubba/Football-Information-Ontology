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

      // get the required query
      if(opt == 1) {
        query =`
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

SELECT ?round ?comp ?match

WHERE {
?round fio:containsMatch ?match.

	{
    SELECT ?match
	WHERE {
    	?match a fio:Match.
		MINUS{?playedmatches rdf:type fio:PlayedMatch}
		}
	}
	OPTIONAL{?comp fio:containsRound ?round}
}`;
        }

        // get the required query
        else if(opt == 2) {
          var filter_value = prompt('Write the name of the team you are looking for', 'For example: "JuventusFC"');
          var query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

SELECT  ?coach ?team
	WHERE {
		?team 	fio:trainedBy 	?coach;
				fio:name "`+ filter_value +`"^^<http://www.w3.org/2000/01/rdf-schema#String>.
	}`;
        }

        // get the required query
        else if(opt == 3) {
          var query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

SELECT ?match
	WHERE {
	       ?match rdf:type fio:Match.
	       MINUS{?playedmatches rdf:type fio:PlayedMatch}
	}`;
        }

      // get the required query
      else if(opt == 4) {
        var query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

SELECT ?match ?referee
WHERE {
  ?match a fio:PlayedMatch;
  fio:matchUmpiredBy ?referee.
         }`;
      }

      // get the required query
      else if(opt == 5) {
        var filter_value = prompt('Write the name of the player you are looking for', 'For example: "PauloDybala"');
        var query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

SELECT  ?player ?role ?team
  	WHERE {
  		?player rdf:type	fio:ActivePlayer;
                           	fio:hasPosition ?role;
 							fio:playsFor ?team;
							fio:name "`+ filter_value +`"^^<http://www.w3.org/2000/01/rdf-schema#String>
  	}`;
      }

      alert(query);
      $('#result').fadeIn('slow');  //Mostra i risultati nella pagina

      } else {
        alert('Please: select a query!'); // Messaggio di errore in caso non si sia compilato il campo

    }
    // TODO Esegui la query sparql
  });
});
