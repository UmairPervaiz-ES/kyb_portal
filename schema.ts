import { list } from '@keystone-6/core';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';
import userSchema from './schemas/User'
import sourceTypeSchema from './schemas/SourceType'
import regionSchema from './schemas/Region'
import languageSchema from './schemas/Language'
import countrySchema from './schemas/Country'
import sourceSchema from './schemas/Source'
import coverageSchema from './schemas/Coverage'
import typeSchema from './schemas/Type'
import formatSchema from './schemas/Format'
import sourceKeySchema from './schemas/SourceKey'
import costSchema from './schemas/Cost'

export const lists: Lists = {
  User: list(userSchema),
  SourceType: list(sourceTypeSchema),
  Region: list(regionSchema),
  Language: list(languageSchema),
  Country: list(countrySchema),
  Source: list(sourceSchema),
  Coverage: list(coverageSchema),
  Type: list(typeSchema),
  Format: list(formatSchema),
  SourceKey: list(sourceKeySchema),
  Cost: list(costSchema),
};
