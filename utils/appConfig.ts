import getConfig from "next/config"

const runtimeConfig = getConfig()
const config = runtimeConfig?.publicRuntimeConfig || {}

export const apiBaseUrl = config?.apiBaseUrl
export const appENV = config?.appENV
