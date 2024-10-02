import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { getOrCreateAuthenticator } from '~/.server/auth'

export const action = ({ request, context }: ActionFunctionArgs) => {
    return getOrCreateAuthenticator(context.cloudflare.env).logout(request, {
        redirectTo: '/',
    })
}
