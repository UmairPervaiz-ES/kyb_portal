import { getContext } from '@keystone-6/core/context'
import { countires } from './sample-data'
import config from './keystone'
import * as PrismaModule from './node_modules/.prisma/client'

async function main () {
  const context = getContext(config, PrismaModule)
//    let countrsy = await context.db.Country.findOne({
//     where: { name: 'Pakistan' },
//   })
//  console.log(countrsy, 'cCountry')

  console.log(`🌱 Inserting seed data`)
  for (const country of countires) {
    console.log(`Adding country: ${country.name}`)
    // const item = await context.db.Country.findMany({
    //   where: [{ name: country.name }],
    // })

    // if (!item) {
      await context.db.Country.createOne({
        data: country,
      })
    // }
  }

  console.log(`✅ Seed data inserted`)
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``)
}

main()
