import getConfig from "next/config"

const runtimeConfig = getConfig()
const config = runtimeConfig?.publicRuntimeConfig || {}
const assetPrefix = config?.assetPrefix

export default assetPrefix
