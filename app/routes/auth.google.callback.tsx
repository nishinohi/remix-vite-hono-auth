import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getOrCreateAuthenticator } from '~/.server/auth'

export const loader = ({ request, context }: LoaderFunctionArgs) => {
    return getOrCreateAuthenticator(context.cloudflare.env).authenticate('google', request, {
        successRedirect: '/',
        failureRedirect: '/error',
    })
}
