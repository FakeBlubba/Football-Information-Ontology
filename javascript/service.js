function getQuery(number) {
  if (number == 1) {
    query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
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
  else if(number == 2) {
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
  else if(number == 3) {
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
  else if(number == 4) {
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
  else if(number == 5) {
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

  return query;

}
