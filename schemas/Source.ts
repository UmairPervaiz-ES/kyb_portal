import { allowAll, denyAll } from '@keystone-6/core/access'
import { text, checkbox, timestamp, select, relationship } from '@keystone-6/core/fields'
import { isAdmin, isNotAdmin, isAdminAndisNotDefaultAdminUser, currentUserID } from '../currentUser'
  
const sourceSchema = {
    access: {
        operation: {
            query: allowAll,
            create: allowAll,
            update: allowAll,
            delete: allowAll
        }
    },
    fields: {
        authority_name: text({ validation: { isRequired: true } }),
        comment: text({ validation: { isRequired: true } }),
        createdAt: timestamp({
            // default this timestamp to Date.now() when first created
            defaultValue: { kind: 'now' },
        }),

        to_crawler: checkbox({
            defaultValue: false,
            db: { map: 'to_crawler' }
        }),

        to_deo: checkbox({
            defaultValue: false,
            db: { map: 'to_deo' },
            graphql: {
                isNonNull: {
                  create: true,
                },
              }
        }),

        country: relationship({
            ref: 'Country',
            many: false,
            db: {
                foreignKey: {
                map: 'country',
                },
            },
        }),
        region: relationship({
            ref: 'Region',
            many: false,
            db: {
                foreignKey: {
                map: 'region',
                },
            },
        }),

        source_type: relationship({
            ref: 'SourceType',
            many: false,
            db: {
                foreignKey: {
                map: 'source_type',
                },
            },
        }),
        lanaguage: relationship({
            ref: 'Language',
            many: false,
            db: {
                foreignKey: {
                map: 'language',
                },
            },
        }),

        // user: relationship({
        //     ref: 'User',
        //     many: false
        // }),
        // user: relationship({
        //     ref: 'User.sources',
        //     many: false,
        // }),

        createdBy: relationship({
            ref: 'User', 
            many: false,
            // hooks: {
            //     validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
            //         let createdBy = resolvedData[fieldKey];
            //         console.log(createdBy, 'createdBy')
            //         console.log(currentUserID, 'currentUserID')
            //         if (createdBy == undefined || createdBy == null) {
            //             createdBy = currentUserID
            //         //   addValidationError(`The email address ${email} provided for the field ${fieldKey} must contain an '@' character`);
            //         }
            //       },
                // dynamic default: if unassigned, find an anonymous user and assign the task to them
                // async resolveInput ({ context, operation, resolvedData }) {
                //   if (resolvedData.createdBy === null) {
      
                //     // if (context) {
                //       return { connect: { id: currentUserID } }
                //     // }
                //   }
      
                //   return resolvedData.createdBy
                // },
            //   },
            db: {
                foreignKey: {
                map: 'user_id',
                },
            },
            ui: {
                hideCreate: true
            }
            
        }),
        
    },
}

export default sourceSchema;