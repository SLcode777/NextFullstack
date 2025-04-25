import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "/app/exercises/m1-fundamentals/5.route-handler/data.json"
);

const getData = async () => {
  const fileContent = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(fileContent);
  return json;
};

const writeData = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const GET = async () => {
  return NextResponse.json(await getData());
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const name = body.name;

  if (!name) {
    return NextResponse.json({ error: "invalid name" }, { status: 400 });
  }

  const data = await getData();
  data.push({
    id: Date.now(),
    name,
  });

  writeData(data);

  return NextResponse.json(await getData());
};

//VIDEO CORRECTION A 7:45
//ON DOIT CREER L'API DELETE ET ASSOCIER LES CALLS API AUX BOUTONS CORRESPONDANTS
