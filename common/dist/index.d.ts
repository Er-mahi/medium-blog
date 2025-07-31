import z from "zod";
export declare const signupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    username: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
