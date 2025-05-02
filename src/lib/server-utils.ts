import "server-only"

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export async function checkAuthentication(waitMS: number = 0) {
   // autentication check
   const { isAuthenticated, getUser } = getKindeServerSession()
   const user = await getUser()
   
   if (!(await isAuthenticated()) || !user) {
      return redirect("/api/auth/login")
   }
   
   return user
}