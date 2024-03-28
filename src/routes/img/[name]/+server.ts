// src/routes/api/[file]/+server.js
import { promises as fs } from 'fs';
import path from 'path';

export async function GET({ params, url }) {
  // const name = url.searchParams.get('name')
  const name = params.name;

  // // Extract the file name from the params
  // const { file } = params;
  // const filePath = path.resolve('path_to_your_files', file);
  const filePath = path.resolve('static/uploads/', name);

  // try {
    const data = await fs.readFile(filePath);
  //   // Determine the Content-Type from the file extension
    const contentType = 'Content-Type: image/jpeg';

  // } catch (error) {
  //   // Handle errors, like file not found
  return new Response(data, { status: 200, headers : { 'Content-Type': contentType }});
  // }
}