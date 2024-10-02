# Remix Vite and Hono with Google Auth sample

```shell
# generate session secret key
$ openssl rand -hex 16
# set google oauth
$ echo -n "SESSION_SECRET_KEY=\nGOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\nOAUTH_CALLBACK_URL=\n" > .dev.vars
```
