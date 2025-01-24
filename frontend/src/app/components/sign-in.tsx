// app/components/SignIn.tsx
import { githubSignIn } from '../actions'

export default function SignIn() {
  return (
    <form action={githubSignIn}>
      <button type="submit">Signin with GitHub</button>
    </form>
  )
}

