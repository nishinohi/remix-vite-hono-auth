import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import { getOrCreateSessionStorage } from './session'

type User = {
    id: string
    name: string
    email: string
}

let authenticator: Authenticator<User> | undefined

export const getOrCreateAuthenticator = (env: Env) => {
    const {
        REMIX_HONO_SAMPLE_SESSION,
        SESSION_SECRET_KEY,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        OAUTH_CALLBACK_URL,
    } = env
    if (!authenticator) {
        authenticator = new Authenticator<User>(
            getOrCreateSessionStorage(REMIX_HONO_SAMPLE_SESSION, SESSION_SECRET_KEY),
        )
        const google = new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: OAUTH_CALLBACK_URL,
            },
            async ({ accessToken: _a, refreshToken: _t, extraParams: _e, profile }) => {
                return {
                    name: `${profile.name.familyName}${profile.name.givenName}`,
                    id: profile.id,
                    email: profile.emails[0].value,
                } satisfies User
            },
        )
        authenticator.use(google)
    }

    return authenticator
}
