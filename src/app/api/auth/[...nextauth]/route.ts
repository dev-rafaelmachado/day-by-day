import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const runtime = 'edge'
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Google],
})
