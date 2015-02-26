

     //POPULAARSETE FILMIDE SAAMINE
                
      function popularMovies() {
         var url = 'http://api.themoviedb.org/3/movie/popular?query&api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
                    
         $.getJSON(url, function(data){
            console.log('pealkiri',data);
                for(var i = 0; i < 20; i++){
                       
                $("#matsioon").append('<li><img onclick="makeDetails('+data.results[i].id+');trailer('+data.results[i].id+')" src= "' + 'http://image.tmdb.org/t/p/w92' +
                    data.results[i].poster_path + '"><br>'+data.results[i].title+'<br>'+data.results[i].release_date+'  <input type ="button" value="Like" id="array"  class="ui-btn" onclick="makeArray('
                        +data.results[i].id+')"></li>'); 

                             }
                      
                       });
                    }

//LISAMINE WATCHLISTI
function makeArray(nr){
    

    var url = 'https://api.themoviedb.org/3/movie/'+nr+'?api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
    $.getJSON(url, function(data){
    
    var movies = new Array(data.title);
    localStorage["movies"] = JSON.stringify(movies);
        if(movies === undefined){
            movies = [];   
            }
    console.log(movies);
    

    console.log('TeinePealkiri',data);
    var storedMovies = JSON.parse(localStorage["movies"]);
    movies.unshift( $('#demomine').append('<li><form>' + data.title +'</form>' + '<form>' + 'Release Date: ' + data.release_date+'</form>' + '<input type ="button" value="Delete" id="deleteButton" class="ui-btn" onclick="removeArray()"><form><img onclick="makeDetails('+data.id+');trailer('+data.id+')" src= "' + 'http://image.tmdb.org/t/p/w154' + data.poster_path + '" alt="Submit"></form></li>' ).innerHTML );
   

    });

    //document.getElementById("array").value="Liked";
}

//EEMALDAMINE WATCHLISTIST
function removeArray(){

var themovies = localStorage[''];

document.getElementById("demomine").innerHTML = themovies;


}



//TRAILER
function trailer(trail){
var url = 'https://api.themoviedb.org/3/movie/'+trail+'?api_key=42a8123408c5a55c08ab4a2bb5b4fa76&append_to_response=releases,trailers';
var trailers = [""];
$.getJSON(url, function(data){
    console.log('Trailerid',data);

    trailers.push($('#trailer').append('<form>' + '<iframe width="300" height="200" class="youtube-player" type="text/html" src="https://www.youtube.com/v/'+data.trailers.youtube[0].source+ '" frameborder="0"></iframe></form>'));
});
    document.getElementById("trailer").innerHTML = trailers;
}


    //DETAILVAADE
    function makeDetails(uno){
        //NIMI, KUUPÄEV, POSTER
        var url = 'https://api.themoviedb.org/3/movie/'+uno+'?api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
        var theURL = 'http://api.themoviedb.org/3/movie/'+uno+'/credits?api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
        var details = [""];
             $.getJSON(url, function(data){
                console.log('Detailid',data);
                details.unshift($('#specs').append('<form><b><br> Movie name: </b><br>' + data.title +'</form>') + $('#specs').append('<br><form><b> Overview: </b><br>' + data.overview +'</form>') + $('#specs').append('<br><form>' + '<b>Release Date: </b><br>' + data.release_date+'<br><br></form>') + $('#specs').append('<form>' + '<img src= "' + 'http://image.tmdb.org/t/p/w300' + data.poster_path + '" alt="Submit"></form>'));
         
                });

         //NÄITLEJAD JA TEGELASED
             $.getJSON(theURL, function(data){
                console.log('Actors', data);
              
                for(var i = 0; i < 10; i++){

                $('#specs').append('<form> <b>' + data.cast[i].name + ' </b>as ' + data.cast[i].character + '</form>');

                }
            });
                document.getElementById("specs").innerHTML = details;
                $.mobile.navigate( "#pagefour", { transition : "pop"});
        }


//FILMIDE OTSING

/*$('#searches').bind('change paste keyup', function(){
    if($('#searches').val().trim() == ''){


    }

});*/
$(document).ready(function() {
//function searchMovies() {

                $('#searchButton').click(function(){
                    $('#info').empty();
                   var search = $('#searchValue').val();
                   var url = 'http://api.themoviedb.org/3/search/movie?query='+search+'&api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
                    $.getJSON(url, function(data){
                        console.log('otsing',data);
                        console.log(search);
                         saveSearch(search);
                         for(var i = 0; i < 20; i++){
                           $("#info").append('<li><img onclick="makeDetails('+data.results[i].id+');trailer('+data.results[i].id+')" src= "' + 'http://image.tmdb.org/t/p/w92' +
                             data.results[i].poster_path + '"><br>'+data.results[i].title+'<br>'+data.results[i].release_date+' <input type ="button" value="Like" class="ui-btn" id="array" onclick="makeArray('
                                +data.results[i].id+')"></li>');
                         }                      
                       
                    });
                });

        
            function saveSearch(search){
                
                    if(typeof(Storage) !== 'undefined'){
                        var searches = localStorage['searches'];
                        if(searches === undefined){
                            searches = "[]";   
                        }
                    //String to JSON    
                    var searchObject = JSON.parse(searches);
                    //Add new
                    searchObject.push(search);    
                    // Save
                    localStorage['searches'] = JSON.stringify(searchObject);
                        loadSearches();
                    }
                }

                                  
            function loadSearches(){
                           if(typeof(Storage) !== 'undefined' && localStorage['searches'] !== 'undefined'){
                                var searches = JSON.parse(localStorage['searches']);          
                               $('#searches').empty();
                                for(var i = 0; i < searches.length; i++){
                                    $('#searches').append('<option value="' + searches[i] + '"' );   
                                                          
                                }
                           }
                    }
                loadSearches();
                
            
                  
      //  }

    });