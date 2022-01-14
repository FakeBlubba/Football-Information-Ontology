$(document).ready(function() {
  $('#filter').hide();
  $('#query_type').on('change', function() {
    var opt = $('#query_type option:selected').val();

    if(opt == 0) {
      var query = -1;
      var desc = 'Please, select a query.';
    }

    else if(opt == 1) {
      var desc = "Query the ontology to find out what rounds of matches are to be played.";

    }

    else if(opt == 2) {
      var desc = "Query the ontology to find out who is the coach of a certain team.";
        }

    else if(opt == 3) {
      var desc = "This query returns the matches not played.";
    }

    else if(opt == 4) {
      var desc = 'Returns the matches already played and their referees.';
    }

    else if(opt == 5) {
      var desc = "The query returns the Team where a certain player is.";

    }

    $('#query_description').text(desc);
    return query;
    });


  $('.enter').on('click', function() {
    var opt = $('#query_type option:selected').val();
    if(opt != 0) {

      if(opt == 1) {
        query =`
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

                SELECT ?t ?c
                  WHERE {
                    ?t rdf:type fio:Round;
                    fio:hasMatch ?match
                    {SELECT ?match
                      WHERE {
                        ?match rdf:type fio:Match
                        MINUS{?playedmatches rdf:type fio:PlayedMatches}
                      }

                    }
                    OPTIONAL{?t fio:belongsToCompetition ?c}
                  }`;
        }

        else if(opt == 2) {
          var filter_value = prompt('Filter: write the name of the team you are looking for', 'Team');
          var query = `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
          PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

          SELECT ?coach ?team
          WHERE {
            ?team rdf:type fio:Team;
              fio:teamHasPosition ?c.
            ?c rdf:type fio:Coach;
              fio:positionOf ?coach.

            filter("` + filter_value + `")
          }`;
        }

        else if(opt == 3) {
          var query = `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
          PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

          SELECT ?match
            WHERE {
              ?match rdf:type fio:Match
              MINUS{?playedmatches rdf:type fio:PlayedMatch}
            }`;
        }

      else if(opt == 4) {
        var query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
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

      else if(opt == 5) {
        var filter_value = prompt('Filter: write the name of the player you are looking for', 'Name of the player');
        var query = `
              PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
              PREFIX owl: <http://www.w3.org/2002/07/owl#>
              PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
              PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
              PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

              SELECT ?player ?team
              WHERE {
                ?player rdf:type fio:ActivePlayer;
                  fio:hasPosition ?role.
                ?role rdf:type fio:Player;
                  fio:positionInTeam ?team.

                filter("` + filter_value + `")
              }`;
      }
      alert(query);
      $('#result').show();
      } else {
        alert('Please: select a query!');

    }
    // Esegui la query sparql
  });
});
