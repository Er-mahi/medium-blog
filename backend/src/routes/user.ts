
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@xcr18/xcr-medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

//signup route
userRouter.post('/signup', async (c) => {
  try {
    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
      return c.json({
        message: "inputs are incorrect"
      }, 400);
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password 
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token
    });
  } catch (err) {
    console.error('[SIGNUP ERROR]', err);
    return c.json({
      message: "Something went wrong",
      error: err instanceof Error ? err.message : String(err)
    }, 500);
  }
});


userRouter.post('/signin', async(c)=>{
   const body = await c.req.json();
   const success = signinInput.safeParse(body);
   if(!success){
    c.status(411);
    return c.json({
      message: "inputs are incorrect"
    })
  }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

   
    const user = await prisma.user.findUnique({
      where:{
        username: body.username,
        password: body.password
      }
    });

    if(!user){
      c.status(403);
      return c.json({ error: "user not found" });
    }
    //@ts-ignore
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({ jwt })
})