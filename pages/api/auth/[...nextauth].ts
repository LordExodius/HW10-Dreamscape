import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from 'next';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            async authorize(credentials, req) {
                const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.MONGO_URL}`);
                await client.db("admin").command({ ping: 1 });
                console.log("Pinged your deployment; connected to database.")
                const users = client.db().collection("users");
                const result = await users.findOne({ email: credentials!.email });
                if (!result) {
                    client.close();
                    throw new Error("No user found!");
                }
                const matchPassword = await compare(credentials!.password, result.password);
                if (!matchPassword) {
                    client.close();
                    throw new Error("Incorrect password!");
                }
                client.close();
                return { email: result.email };
            }
        })
    ],
});