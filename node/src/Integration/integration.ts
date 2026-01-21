import fetch from "node-fetch";


async function fetchJson(url: string): Promise<any> {
  const timeout = 5000;
  const timeoutPromise = new Promise<any>((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );

  console.log(`Fetching URL: ${url}`);

  const response = await Promise.race([fetch(url), timeoutPromise]).catch((err)=>{throw err});

  console.log(`Response status code: ${response.status}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to parse JSON");
  }
}

