// reference the http module so we can create a webserver
var http = require("http");
var url = require("url");//urlモジュールのロード

// create a server
var server = http.createServer(function(req, res) {
    // on every request, we'll output 'Hello world'
    //res.end("Hello world from Cloud!");
    
    if(req.url == "/"){
        res.writeHead(200);
        res.write("here is root!!\n");            
    }else{
        res.writeHead(200);
        res.write("here is hoge!!\n");
        var urlElements = url.parse(req.url,true);
        var query = urlElements.query;
        
        res.write(" : " +query + "\n");
        
        Object.keys(query).forEach(function (key){
            res.write(key + " : " + query[key] + "\n");
        });
            
        res.write("\n");
    }
        
    
    
    res.write("URL : " + req.url + "\n");
    res.write("Method : " + req.method +"\n");

    Object.keys(req.headers).forEach(function (key){
        res.write(key + " : " + req.headers[key] + "\n");
    });
    
    res.end();
    //console.log("アクセスされました："+req.headers["host"]);

}).listen(process.env.PORT, process.env.IP);

// Note: when spawning a server on Cloud9 IDE, 
// listen on the process.env.PORT and process.env.IP environment variables

// Click the 'Run' button at the top to start your server,
// then click the URL that is emitted to the Output tab of the console