import { client } from "@/configs/NileMongoConfig"

export async function POST(request:Request){

    const { username, email, studentId, image } = await request.json();

    await client.connect();
    const result = await client.query(`
        INSERT INTO USERS VALUES (DEFAULT, '${username}', '${email}', '${studentId}', '${image}')
    `);
    await client.end();
    return Response.json(result)
}