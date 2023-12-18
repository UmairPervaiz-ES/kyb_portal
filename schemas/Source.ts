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
    hooks: {
        afterOperation: async ({ listKey, operation, inputData, originalItem, item, resolvedData, context }: {
            listKey: string;
            operation: 'create' | 'update' | 'delete'; 
            inputData: any;
            originalItem: any;
            item: any;
            resolvedData: any;
            context: any;
          }) => 
        {
            await context.db.Log.createOne({
                data: {
                    operation: operation ?? 'null',
                    previous_data: JSON.stringify(originalItem) ?? 'null',
                    updated_data: JSON.stringify(item) ?? 'null',
                    updated_values: JSON.stringify(inputData) ?? 'null',
                    updated_by: {connect: {
                        id: context.session.itemId // Replace this ID with the actual user ID
                        }}
                },
                query: 'id operation previous_data updated_data updated_values updated_by',
            })
          },
    },
    fields: {
        authority_name: text({ validation: { isRequired: true } }),
        url: text({ 
            validation: { isRequired: true },
            ui: {
                itemView: {
                    fieldPosition: 'sidebar',
                },
                displayMode: 'textarea',
            },
        }),

        country: relationship({
            ref: 'Country',
            many: false,
            db: {
                foreignKey: {
                map: 'country',
                },
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {

                    if(operation == 'create'){
                        let { country } = resolvedData;
                        if (country === null || country === undefined) {
                            addValidationError('Please select country');
                        }
                    }
                  
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        region: relationship({
            ref: 'Region',
            many: false,
            db: {
                foreignKey: {
                map: 'region',
                },
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {

                    if(operation == 'create'){
                        let { region } = resolvedData;
                        if (region === null || region === undefined) {
                            addValidationError('Please select region');
                        }
                    }
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        coverage: relationship({
            ref: 'Coverage',
            many: false,
            db: {
                foreignKey: {
                    map:'coverage'
                }
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {

                    if(operation == 'create'){
                        let { coverage } = resolvedData;
                        if (coverage === null || coverage === undefined) {
                            addValidationError('Please select coverage');
                        }
                    }
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        type: relationship({
            ref: 'Type',
            many: false,
            db: {
                foreignKey: {
                    map:'type'
                }
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {

                    if(operation == 'create'){
                        let { type } = resolvedData;
                        if (type === null || type === undefined) {
                            addValidationError('Please select type');
                        }
                    }
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        source_type: relationship({
            ref: 'SourceType',
            many: false,
            db: {
                foreignKey: {
                map: 'source_type',
                },
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {

                    if(operation == 'create'){
                        let { source_type } = resolvedData;
                        if (source_type === null || source_type === undefined) {
                            addValidationError('Please select source type');
                        }
                    }
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        language: relationship({
            ref: 'Language',
            many: false,
            db: {
                foreignKey: {
                map: 'language',
                },
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {
                    
                    if(operation == 'create'){
                        let { language } = resolvedData;
                        if (language === null || language === undefined) {
                            addValidationError('Please select language');
                        }
                    }
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        format: relationship({
            ref: 'Format',
            many: false,
            db: {
                foreignKey: {
                    map:'format'
                }
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {

                    if(operation == 'create'){
                        let { format } = resolvedData;
                        if (format === null || format === undefined) {
                            addValidationError('Please select format');
                        }
                    }
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        comment: text(),

        cost: relationship({ 
            ref: 'Cost',
            many: false,
            db: {
                foreignKey: {
                    map: 'cost'
                }
            },
            hooks: {
                validateInput: ({ resolvedData, operation, addValidationError }) => {

                    if(operation == 'create'){
                        let { cost } = resolvedData;
                        if (cost === null || cost === undefined) {
                            addValidationError('Please select cost');
                        }
                    }
                }
             
            },
            ui: {
                hideCreate: true
            }
        }),

        keys: relationship({
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

        createdAt: timestamp({
            // default this timestamp to Date.now() when first created
            defaultValue: { kind: 'now' },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                },
                itemView: {
                    fieldMode: 'hidden'
                },
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
                itemView: {
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
        initialColumns: ['authority_name', 'url', 'country', 'region', 'coverage', 'type', 'source_type',
                         'lanaguage', 'format', 'comment', 'cost', 'keys', 'to_crawler', 'to_deo'],
        initialSort: { field: 'createdAt', direction: 'DESC' },
        pageSize: 10
      }
    },
}

export default sourceSchema;