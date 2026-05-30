import { defineConfig } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  migrations: {
    seed: 'ts-node -P tsconfig.seed.json prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
