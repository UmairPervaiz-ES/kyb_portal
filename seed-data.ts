import { getContext } from '@keystone-6/core/context'
import { countires, regions, formats, languages } from './sample-data'
import config from './keystone'
import * as PrismaModule from './node_modules/.prisma/client'

async function main () {
  const context = getContext(config, PrismaModule)

  console.log(`🌱 Inserting seed data`)
  for (const country of countires) {
    console.log(`Adding country: ${country.name}`)
      await context.db.Country.createOne({
        data: country,
      })
  }
  for (const region of regions) {
    console.log(`Adding region: ${region.name}`)
      await context.db.Region.createOne({
        data: region,
      })
  }
  for (const format of formats) {
    console.log(`Adding format: ${format.name}`)
      await context.db.Format.createOne({
        data: format,
      })
  }
  for (const language of languages) {
    console.log(`Adding language: ${language.name}`)
      await context.db.Language.createOne({
        data: language,
      })
  }

  console.log(`✅ Seed data inserted`)
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``)
}

main()
