import { type ActionFunctionArgs, redirect } from '@remix-run/cloudflare'
import { getOrCreateAuthenticator } from '~/.server/auth'

export const loader = () => redirect('/login')

export const action = ({ request, context }: ActionFunctionArgs) => {
    return getOrCreateAuthenticator(context.cloudflare.env).authenticate('google', request)
}
