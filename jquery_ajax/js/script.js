function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var street = $('#street').val()
    var city = $('#city').val()
    var address = street + ',' + city

    $('#greeting').text('So, you want to live at ' + address + '?' )
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    // Adding new source as currently GCP account billing is not set up
    streetviewUrl = 'https://picsum.photos/600/400'

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load New york times
    // https://developer.nytimes.com/
    // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=newyork,newyork&api-key=api_key
    NYTKey = 'XXXXXXXXXXXXXXXXXXXXXXXXX'
    NYTUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+address+'&api-key='+NYTKey
    $.getJSON(NYTUrl, function(data){
//         console.log(data)
        var articles = data['response']['docs']
        $.each(articles, function(index, article){
            $nytElem.append('<li class=article>'
            + '<a href=' + article.web_url +'>'
            + article.headline.main + '</a>'
            + '<p>'
            + article.abstract
            + '</p>'
            + '</li>')
        })
    }).error(function(){
        $nytHeaderElem.text('New York Times Articles Could Not be Loaded')
    })

    //Wikipedia Articles
    //MediaWiki
    //Error Handling for json isn't built in, So this timeout to handle such errors
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('Failed to get wikipedia resources')
    }, 8000)

    //USing CORS
//    var wikiApiEndpoint = 'https://commons.wikimedia.org/w/api.php?action=opensearch&search='+city+'&format=json&origin=*'
//    $.ajax(
//        {
//        url : wikiApiEndpoint,
//        dataType : 'json',
//        success : function(response){
//            console.log(response)
//            var articleList = response[1]
//            for (var i=0; i< articleList.length; i++){
//                articleStr = articleList[i]
//                var url = 'https://en.wikipedia.org/wiki/'+articleStr
//                $wikiElem.append('<li><a href=' + url + '>'+
//                    articleStr + '</a></li> <br>')
//            }
//            //remove timeout if request was successful
//            clearTimeout(wikiRequestTimeout)
//        }
//    })

    //Using JSONP
    var wikiApiEndpoint = 'https://commons.wikimedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback'
    $.ajax(
        {
        url : wikiApiEndpoint,
        dataType : 'jsonp',
        jsonp: 'callback',
        success : function(response){
            console.log(response)
            var articleList = response[1]
            for (var i=0; i< articleList.length; i++){
                articleStr = articleList[i]
                var url = 'https://en.wikipedia.org/wiki/'+articleStr
                $wikiElem.append('<li><a href=' + url + '>'+
                    articleStr + '</a></li> <br>')
            }
            //remove timeout if request was successful
            clearTimeout(wikiRequestTimeout)
        }
    })
    return false;
};

$('#form-container').submit(loadData);

// loadData();


/* CORS - Cross Origin Resource Sharing
    - works around same origin policy -- scripts from one website can't insert themselves into another
    - When certain headers are returned by the the server, the browser will allow the cross-domain request to occur.
    - For APIs that don't support CORS, other way around the same-origin policy is JSON-P (allow cross-domain request)
    Many APIs allow you to provide a callback function name,
    and they will generate a JavaScript file that passes the data into that function when it gets run in your browser.
*/