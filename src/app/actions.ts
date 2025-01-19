// app/actions.ts
'use server'

import { signIn } from "../auth/auth"

export async function githubSignIn() {
    await signIn("github",{ redirectTo: "/test_dash" })
}
