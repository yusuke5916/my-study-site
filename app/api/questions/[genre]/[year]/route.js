import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { genre, year } = params;
  const file = path.join(process.cwd(), 'public', 'questions', genre, year, 'questions.json');
  if (!fs.existsSync(file)) {
    return new Response(JSON.stringify([]), { status: 200 });
  }
  const data = fs.readFileSync(file, "utf-8");
  return new Response(data, { status: 200 });
}
