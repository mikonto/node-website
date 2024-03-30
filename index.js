const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    let filePath = "." + req.url;

    if (filePath === "./") {
      filePath += "index.html";
    } else if (filePath === "./about" || filePath === "./contact-me") {
      filePath += ".html";
    } else {
      filePath = "./404.html";
    }

    fs.readFile(filePath, function (err, data) {
      if (err) {
        fs.readFile("./404.html", function (err404, data404) {
          if (err404) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("404 Page Not Found");
          } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(data404);
          }
          res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8080);
