import fetch from "node-fetch";

function Delay(attempt: number): number {
  const baseDelay = 1000; 
  
  const exponentialDelay = baseDelay * Math.pow(2, attempt);

  const jitter = (Math.random() - 0.5) * exponentialDelay;  

  return Math.max(exponentialDelay + jitter, 0);
}

async function fetchJson(url: string, maxTry: number = 5): Promise<any> {
  let attempt = 0;

  while (attempt < maxTry) {
    try {
      console.log(`Fetching URL: ${url}`);

      const response = await fetch(url);  

      console.log(`Response status code: ${response.status}`);

      if (response.status >= 400 && response.status < 500) {

        if (response.status === 429) {

          const retryAfter = response.headers.get('Retry-After');
          if (retryAfter) {
            const retryDelay = parseInt(retryAfter) * 1000; 
            console.log("Rate limit exceeded");
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          } else {
            console.log('Rate limit exceeded but no retry-after header found.');
          }
        }
        throw new Error(`Request failed with status ${response.status}`);
      }
      
      if (![200, 201, 202, 204].includes(response.status)) {
        if ([502, 503, 504].includes(response.status)) {
          
          throw new Error(`Server error (${response.status})`);
        } else {
          
          throw new Error(`Request failed with status ${response.status}`);
        }
      }

      const data = await response.json();
      return data;  

    } catch (err) {
      
      if (attempt < maxTry ) {
        attempt++;
        const delay = Delay(attempt);
        console.log("Retrying due to error");

        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error("request cannot complete");
      }
    }
  }
}

