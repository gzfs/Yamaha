import { prisma } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOpts: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                ein: {
                    label: "EIN",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req){
                const getUser = await prisma.user.findFirst({
                    where: {
                        EIN: credentials!.ein as string,
                        AND: {
                            Password: credentials!.password as string
                        }
                    }
                })

                if(getUser){
                    return {
                        id: getUser.EIN as string,
                        image: null,
                        email: getUser.EIN as string,
                        name: null,
                        role: getUser.Role
                    }
                } else {
                    return null
                }
            },
            type: "credentials"
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/"
    }
}

const handler = NextAuth(authOpts)

export { handler as GET, handler as POST }