import fs from 'fs';
import path from 'path';

export async function GET() {
  const questionsDir = path.join(process.cwd(), 'public', 'questions');
  let genres = [];
  if (fs.existsSync(questionsDir)) {
    const genreFolders = fs.readdirSync(questionsDir, { withFileTypes: true })
      .filter(d => d.isDirectory()).map(d => d.name);
    for (const genre of genreFolders) {
      const genrePath = path.join(questionsDir, genre);
      const yearFolders = fs.readdirSync(genrePath, { withFileTypes: true })
        .filter(d => d.isDirectory()).map(d => d.name);
      genres.push({ genre, years: yearFolders });
    }
  }
  return Response.json(genres);
}
