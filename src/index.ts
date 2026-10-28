import "dotenv/config";
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const app = express();

app.use(express.json());

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

app.post("/users", async (req, res) => {
    try {
        const { userName, password, address } = req.body;

        if (!userName || !password || !address) {
            return res.status(400).json({
                message: "userName, password, and address are required"
            });
        }

        const user = await prisma.user.create({
            data: {
                userName,
                password,
                address
            }
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create user"
        });
    }
});
app.get("/users",async(req,res)=>{
    try{
      const data  =  await prisma.user.findMany();
    return res.status(201).json({
         data :data,
         success : true
    })


    }
    catch(err){
         console.log(err);
         return res.status(504).json({
            success : false,
             data : "No data found"
         })
    }
      
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});