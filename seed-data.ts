import { getContext } from '@keystone-6/core/context'
import { countires, regions, formats, languages, source_types, coverages, types, costs } from './sample-data'
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
  for( const source_type of source_types ){
    console.log(`Adding format: ${source_type.name}`)
      await context.db.SourceType.createOne({
        data: source_type,
      })
  }
  for( const coverage of coverages ){
    console.log(`Adding format: ${coverage.name}`)
      await context.db.Coverage.createOne({
        data: coverage,
      })
  }
  for( const type of types ){
    console.log(`Adding format: ${type.name}`)
      await context.db.Type.createOne({
        data: type,
      })
  }
  for( const cost of costs ){
    console.log(`Adding format: ${cost.name}`)
      await context.db.Cost.createOne({
        data: cost,
      })
  }

  console.log(`✅ Seed data inserted`)
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``)
}

main()
