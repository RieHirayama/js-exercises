import fs from "fs";
import { Worker } from "worker_threads";
import { PNG } from "pngjs";

const input = fs.createReadStream("input.png").pipe(new PNG());

input.on("parsed", function () {
  const worker = new Worker(new URL("./worker.js", import.meta.url), {
    workerData: {
      width: this.width,
      height: this.height,
      data: this.data,
    },
  });

  worker.on("message", (processed) => {
    const output = new PNG({ width: this.width, height: this.height });
    output.data = processed;

    output
      .pack()
      .pipe(fs.createWriteStream("output.png"))
      .on("finish", () => {
        console.log("output.png written");
      });
  });

  worker.on("error", console.error);
});
