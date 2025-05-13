import fetch from 'node-fetch';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';

dotenv.config();

const filename = process.argv[2];

(
  async () => {
    const url = `${process.env.APIURL}/session`;
    const usr = process.env.USER1;
    const pass = process.env.USERPASS1;

    let output = null;
    try {
      const response = await fetch(url, {
        method: 'POST', // Use POST or another HTTP method as needed
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify({ user: { email_address: usr, password: pass } }) // Send the body as JSON
      });
      output = await response.json();
    } catch (e) {
      console.error(e)
    }
    console.log(output);


    let output2;
    let headers2;

    const imagePath = filename;
    const railsEndpoint = `${process.env.APIURL}/photos`;

    const imageBuffer = fs.readFileSync(imagePath);
    const form = new FormData();

    form.append('photo[title]', 'Sample Title');
    form.append('photo[image]', imageBuffer, {
      filename: 'image.jpeg',
      contentType: 'image/jpeg',
    });
    try {
      const response = await fetch(railsEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${output.data.token}`,
        },
        body: form,
      });
      output2 = await response.json();
      headers2 = response.headers;

    } catch (error) {
      console.error('Error during fetch:', error);
    }
    console.log(output2);
    console.log(headers2.get('authorization'));

  }

)();
