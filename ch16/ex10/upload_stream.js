import fs from "fs";

fetch("http://localhost:8000/foo/bar/hello.txt", {
  method: "PUT",
  body: fs.createReadStream("file.txt"),
  duplex: "half",
}).then(async (res) => {
  console.log("status:", res.status);
  console.log("body:", await res.text());
});
