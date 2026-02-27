import 'dotenv/config'
import { seedAcademyData } from './academyData'
import { getPayload } from 'payload'
import config from '../payload.config'

async function runSeeder() {
  try {
    console.log('🚀 Initializing Payload...')
    const payload = await getPayload({ config })
    
    console.log('🌱 Starting academy data seeder...')
    await seedAcademyData(payload)
    
    console.log('✅ Seeder completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeder failed:', error)
    process.exit(1)
  }
}

runSeeder()
