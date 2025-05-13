import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

(
  async () => {
    const url = `${process.env.APIURL}/session`;
    const usr = process.env.ADMIN;
    const pass = process.env.ADMINPASS;
    let output = null;
    try {
      const response = await fetch(url, {
        method: 'POST', // Use POST or another HTTP method as needed
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify({ user: { email_address: usr, password: pass }}) // Send the body as JSON
      });
      output = await response.json();
    } catch (e) {
      console.error(e)
    }
    console.log(output);
    const url2 = `${process.env.APIURL}/users`;
    let output2;
    let headers2;
    console.log(process.env.USER);
    try {
      const response = await fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${output.data.token}`,
        },
        body: JSON.stringify({ user: {email_address: process.env.USER1, password: process.env.USERPASS1 }}) // Send the body as JSON
      });
      output2 = await response.json();
      headers2 = response.headers;
    } catch (e) {
      console.error(e)
    }
    console.log(output2);
    console.log(headers2.get('authorization'));
  }
)();