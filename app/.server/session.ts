import { type SessionStorage, createCookie, createWorkersKVSessionStorage } from '@remix-run/cloudflare'

let sessionStorage: SessionStorage | undefined

/**
 * セッションストレージを無ければ生成しセッション操作用のメソッドを返す
 * @param kv
 * @param sessionSecret
 * @returns
 */
export const getOrCreateSessionStorage = (kv: KVNamespace, sessionSecret: string) => {
    if (!sessionStorage) {
        sessionStorage = createWorkersKVSessionStorage({
            kv,
            cookie: createCookie('__session', {
                secrets: [sessionSecret],
                sameSite: 'lax',
                httpOnly: true,
            }),
        })
    }

    return sessionStorage
}
