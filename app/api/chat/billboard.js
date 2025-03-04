import { exec } from "child_process";

export default function handler(req, res) {
  exec("python Billboard.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).json({ error: "Failed to run Python script" });
      return;
    }
    try {
      const data = JSON.parse(stdout);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to parse Python script output" });
    }
  });
}
