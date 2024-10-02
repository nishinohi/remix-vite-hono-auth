import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Form, useLoaderData } from '@remix-run/react'
import { getOrCreateAuthenticator } from '~/.server/auth'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
    const authenticator = getOrCreateAuthenticator(context.cloudflare.env)
    const uesr = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
    })

    const { env } = context.cloudflare
    return json({ myVar: env.MY_VAR, user: uesr })
}

export default function Index() {
    const { user } = useLoaderData<typeof loader>()

    return (
        <div>
            {user && (
                <ul>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.id}</li>
                </ul>
            )}
            <Form method="post" action="/logout">
                <button className="p-4 border border-gray-800 bg-white hover:bg-slate-500" type="submit">
                    logout
                </button>
            </Form>
        </div>
    )
}
