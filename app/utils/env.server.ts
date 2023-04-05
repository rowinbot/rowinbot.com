import dotenv from 'dotenv'
const dotenvClient = dotenv.config({ path: '.env' })

export function getServerEnv<T extends string>(
  envName: T
): typeof process.env[T] | undefined {
  return process.env[envName] ?? dotenvClient?.parsed?.[envName]
}

export function getEnvForClient() {
  return {
    NODE_ENV: getServerEnv('NODE_ENV'),
  }
}

export function getRequiredServerEnv<T extends string>(envName: T) {
  const envValue = getServerEnv(envName)

  if (!envValue) {
    throw new Error(
      `The env var: "${envName}" is not set and it is required for the server to run. Consider setting it in the ".env" file.`
    )
  }

  return envValue
}
