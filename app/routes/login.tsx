import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
import { getOrCreateAuthenticator } from '~/.server/auth'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
    const authenticator = getOrCreateAuthenticator(context.cloudflare.env)
    const uesr = await authenticator.isAuthenticated(request, {
        successRedirect: '/',
    })

    const { env } = context.cloudflare
    return json({ myVar: env.MY_VAR, user: uesr })
}

export default function Login() {
    return (
        <main>
            <Form method="post" action="/auth/google">
                <button type="submit">login</button>
            </Form>
        </main>
    )
}
