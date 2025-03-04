import { exec } from "child_process";

export async function GET(request) {
  return new Promise((resolve, reject) => {
    exec("python Billboard.py", (error, stdout, stderr) => {
      if (error) {
        console.error("Exec error:", error);
        return resolve(
          new Response(JSON.stringify({ error: "Failed to run Python script" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
      try {
        const data = JSON.parse(stdout);
        return resolve(
          new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      } catch (err) {
        return resolve(
          new Response(JSON.stringify({ error: "Failed to parse Python script output" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
    });
  });
}

