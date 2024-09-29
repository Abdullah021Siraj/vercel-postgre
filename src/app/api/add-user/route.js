import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const id = searchParams.get('id');
 
  try {
    if (!name || !id) throw new Error('Pet and id names required');
    await sql`INSERT INTO users (name, id) VALUES (${name}, ${id});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
}