import { createDatabase } from 'typeorm-extension'
import { dataSource, options } from '../../application/config/datasource.js'
import ExceptionHandler from '../exceptions/exceptions-handler.js'

/**
 * Database connection function.
 * Is called in bootstrap class app.ts.
 * @returns 
 */
const dbConnection = async () => {
  let attempts = 0
  const maxAttempts = 3
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  while (attempts < maxAttempts) {
    try {
      await createDatabase({
        options,
        "ifNotExist": true
      })
      await dataSource.initialize()
      await dataSource.synchronize()
      console.log("Successfully connected to database")
      return
    } catch (error) {
      console.error(error)
      attempts++
      console.log(`database connection failed. retrying in 3 seconds... (attempt ${attempts}/${maxAttempts})`)
      await delay(3000)
    }
  }
  throw new ExceptionHandler(500, `database connection failed after ${attempts} attempts`)
}

export default dbConnection