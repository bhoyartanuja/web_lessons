**CORS** - _Cross Origin Resource Sharing_

- works around same origin policy 
    - scripts from one website can't insert themselves into another
- When certain headers are returned by the the server, the browser will allow the cross-domain request to occur.
- For APIs that don't support CORS, other way around the same-origin policy is JSON-P (allow cross-domain request)

    Many APIs allow you to provide a callback function name,
    and they will generate a JavaScript file that passes the data into that function when it gets run in your browser.


**Improving performance on a webpage**

1. Request Generic HTML
2. Request Unique HTML
3. Render Generic HTML
4. Render Unique HTML

Example on Facebook or Google Search page  some strucure appears first, 
and then specific post or search result is displayed

#### Ajax Requests using JQuery
1. get url as src attribute of an img tag
2. Use [jQuery.getJSON()](https://api.jquery.com/jquery.getjson/) to get a JSON response
3. Use [jQuery.ajax()](https://api.jquery.com/jquery.ajax/) to make ajax requests 

#### Error Handling
1. Using [.error()](https://api.jquery.com/error/) through chaining
2. When Using JSONP, there's no built-in method for error handling,
handled using setTimeout.
