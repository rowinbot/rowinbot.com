import dotenv from 'dotenv'
const dotenvClient = dotenv.config({ path: '.env' })

export function getServerEnv(envName: string): string | undefined {
  return process.env[envName] ?? dotenvClient?.parsed?.[envName]
}

export function getEnvForClient() {
  return {
    NODE_ENV: getServerEnv('NODE_ENV'),
  }
}

export function getRequiredServerEnv(envName: string): string {
  const envValue = getServerEnv(envName)

  if (!envValue) {
    throw new Error(
      `The env var: "${envName}" is not set and it is required for the server to run. Consider setting it in the ".env" file.`
    )
  }

  return envValue
}
