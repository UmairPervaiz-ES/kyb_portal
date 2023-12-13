import { text, checkbox, timestamp, select, relationship } from '@keystone-6/core/fields'
import { hasSession, isAdmin, isNotAdmin } from '../currentUser'
  
const sourceSchema = {
    access: {
        operation: {
            query: hasSession,
            create: hasSession,
            update: hasSession,
            delete: isAdmin
        }
    },
    fields: {
        authority_name: text({ validation: { isRequired: true } }),
        comment: text({ validation: { isRequired: true } }),
        cost: text({ validation: { isRequired: true } }),

        source_key: relationship({
            ref: 'SourceKey',
            many: true,
            ui: {
                hideCreate: false,
                displayMode: 'cards',
                cardFields: ['original_key', 'map_to'],
                linkToItem: true,
                removeMode: 'disconnect',
                inlineCreate: { fields: ['original_key', 'map_to'] },
                inlineEdit: { fields: ['original_key', 'map_to'] },
                inlineConnect: true,
            }
        }),

        coverage: relationship({
            ref: 'Coverage',
            many: false,
            db: {
                foreignKey: {
                    map:'coverage'
                }
            }
        }),

        type: relationship({
            ref: 'Type',
            many: false,
            db: {
                foreignKey: {
                    map:'type'
                }
            }
        }),

        sourced: relationship({
            ref: 'Sourced',
            many: false,
            db: {
                foreignKey: {
                    map:'sourced'
                }
            }
        }),

        createdAt: timestamp({
            // default this timestamp to Date.now() when first created
            defaultValue: { kind: 'now' },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            },
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

        createdBy: relationship({
            ref: 'User', 
            many: false,
            hooks: {
                  resolveInput: ({ resolvedData, context }) => {

                    let { createdBy } = resolvedData;
                    if (createdBy === null || createdBy === undefined) {
                      return { connect: { id: context.session.itemId } }
                    }
                    return resolvedData.createdBy;
                  }
               
              },
            db: {
                foreignKey: {
                map: 'created_by',
                },
            },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                },
                listView: {
                    fieldMode: ({ session }) => {
                        if(session.data.isAdmin) return 'read'
                        return 'hidden'
                    }
                }
            }
        }),
        
    },

    ui: {
      listView: {
        initialColumns: ['authority_name', 'comment', 'to_crawler', 'to_deo', 'country', 'region'],
        initialSort: { field: 'createdAt', direction: 'DESC' },
        pageSize: 10
      }
    }
}

export default sourceSchema;