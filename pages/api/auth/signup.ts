import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("")
    if (req.method === 'POST') {
        // get email and password from req
        console.log("POST request received")
        const { email, password } = req.body;
        console.log(`Email: ${email}\nPassword: ${password}`);
        const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.MONGO_URL}`);
        const db = client.db();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment; connected to database.")

        // check if user exists
        const existingUser = await db
            .collection('users')
            .findOne({ email: email });
        if (existingUser) {
            res.status(422).json({ message: 'User already exists.' });
            await client.close();
            return;
        }
        // hash password
        const result = await db.collection('users').insertOne({
            email, 
            password: await hash(password, 12)
        });
        
        res.status(201).json({ message: 'Created user', ...result });
        await client.close();
    }
    else {
        res.status(500).json({ message: 'Invalid route.' });
    }
}