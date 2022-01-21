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
    var query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

    SELECT DISTINCT ?person ?country
    WHERE {
      ?person fio:bornIn ?country.
    }
    ORDER BY ?country`;
  }

  // get the required query
  else if(number == 3) {
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
  else if(number == 4) {

    var query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX fio: <http://www.semanticweb.org/nikpa/ontologies/2021/11/fio#>

    SELECT ?match ?home ?guest ?date
    WHERE { ?match a fio:PlayedMatch;
      fio:homeGoals ?home;
      fio:hostGoals ?guest;
      fio:playedOn ?date.
    }
    ORDER BY ?date`;
  }

  return query;

}

// Returns the titles and the records of the query in two array
function formatResult(query_output) {
  var titles = [];
  var records = [];
  var body = [];

  body = query_output.split(' ');
  titles = body[0].split(',');


  // put data into records
  for( var i = 1; i < body.length; i++ ) {

    var chars = [',', '_', '-'];

    // to avoid errors like in the 4th query
    if(body.length == 2) {
      body = body[1].split(',');
      i--
    }

    // to better format the result text
    for( var j = 0; j < chars.length; j++ ) {

      while( body[i].includes(chars[j]) ) {
        body[i] = body[i].replace(chars[j], ' ')
      }

    }

    records.push(body[i]);
  }

  return [titles, records];
}

// creates a table and populate it with results
function tableMaker(query_result) {
  $("#output tr").remove(); // reset the table' data

  // declaration of variables
  var table = document.getElementById('output');
  //console.log(query_result);
  var title_array = formatResult(query_result)[0];
  //console.log(title_array)
  var records_array = formatResult(query_result)[1];
  //console.log(records_array)
  var number_of_rows = records_array.length / title_array.length;
  var number_of_cells = records_array.length / number_of_rows;
  var data = 0

  // creates rows for data
  for( var rows = 0; rows < number_of_rows; rows++) {
    var r = table.insertRow(rows);

    // creates cells for data
    for( var cells = 0; cells < number_of_cells; cells++) {
      var c = r.insertCell(cells);
      c.innerHTML = records_array[data];
      data++;
    }
  }

  // inserting first table row and th
  var row = table.insertRow(0);
  for(var i = 0; i < title_array.length; i++) {
    head = "<th>" + title_array[i];
    head = head.concat("</th>")
    var cell = row.insertCell(i).outerHTML = head;
  }
}
