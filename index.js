import http from "http";
import fetch from "node-fetch";

const server = http
  .createServer((req, res) => {
    const url = req.url;
    let tableData =
      "<table border='1'><tr><th>Name</th><th>Height</th><th>Birth Year</th><th>Gender</th><th>URL</th></tr>";

    if (url === "/") {
      res.write("<h1>Welcome to the Home Page</h1>");
      res.end(
        '<img src="https://dummyimage.com/600x400/2e71db/ded41f&text=Hello!">'
      );
    } else if (url === "/list") {
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => {
          createData(data);
          res.write(tableData);
          res.end();
        });
    } else {
      url === "";
      res.write("Error 404: Page Not Found");
      res.end();
    }

    function createData(data) {
      data.results.forEach((element) => {
        tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birthYear}</td><td>${element.gender}</td><td>${element.url}</td></tr>`;
      });
      tableData += `</table>`;
    }
  })
  .listen(8090, console.log(`Server listening on port 8090`));
