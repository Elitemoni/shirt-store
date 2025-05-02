import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'shirts.csv');
  const results: any[] = [];

  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(NextResponse.json(results));
      });
  });
}
