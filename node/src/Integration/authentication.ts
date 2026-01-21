import fetch,{RequestInit} from "node-fetch";
import dotenv from 'dotenv';
import { stringify } from "querystring";
dotenv.config();

const api = process.env.API_KEY


async function withAuth(url: string, options: RequestInit = {}): Promise<any> {
  const apiKey = api;
  
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  
  const headers = {
    ...options.headers,              
    "Authorization": `Bearer ${apiKey}`,  
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();  
}


interface Data{
    access_token : string;
}



async function OAuth2Token() {
    const tokenUrl = process.env.OAUTH2_TOKEN_URL;
    const clientId = process.env.OAUTH2_CLIENT_ID;
    const clientSecret = process.env.OAUTH2_CLIENT_SECRET;
  
    if (!tokenUrl || !clientId || !clientSecret) {
      throw new Error('OAuth2 credentials are missing');
    }
  
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.statusText}`);
    }
  
    const data  = await response.json() as Data;
    return data.access_token;  
  }
  


  
  async function withAuth2(url: string) {
    const token = await OAuth2Token();  
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json',  
      },
    });
  
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }
  
    
    return response.json();
  }