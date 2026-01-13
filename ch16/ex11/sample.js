// p.674のノックノックジョークのサンプルコード
import net from "net";
import readline from "readline";

let server = net.createServer();
server.listen(6789, () => console.log("Delivering laughs on port 6789"));

server.on("connection", (socket) => {
  tellJoke(socket)
    .then(() => socket.end())
    .catch((err) => {
      console.error("Error telling joke:", err);
      socket.end();
    });
});

const jokes = {
  "Boo": "Don't cry, it's just a joke.",
  "Lettuce": "Let us in! it's freezing out here!",
  "A little old lady": "Wow, I didn't know you could yodel!"
};

async function tellJoke(socket) {
  let randomElement = a => a[Math.floor(Math.random() * a.length)];
  let who = randomElement(Object.keys(jokes));
  let punchline = jokes[who];

  let lineReader = readline.createInterface({
    input: socket,
    output: socket,
    prompt: ">> "
  });

  function output(text, prompt=true) {
    socket.write(`${text}\n`);
    if (prompt) lineReader.prompt();
  }

  let stage = 0;

  output("Knock! Knock!");

  for await (let inputLine of lineReader) {
    if (stage === 0) {
      if (inputLine.toLowerCase() ===  "who is there?") {
        output(who);
        stage = 1;
      } else {
        output('Please type "Who is there?" .');
      }
    } else if (stage === 1) {
      if (inputLine.toLowerCase() === `${who.toLowerCase()} who?`) {
        output(punchline, false);
        return;
      } else {
        output(`Please type "${who} who?" .`);
      }
    }
  }
}