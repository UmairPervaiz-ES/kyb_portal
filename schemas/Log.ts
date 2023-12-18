import { allowAll, denyAll } from '@keystone-6/core/access';
import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { hasSession, isAdmin, isNotAdmin } from '../currentUser';
  
const logSchema = {
    access: {
        operation: {
            query: isAdmin,
            create: hasSession,
            update: denyAll,
            delete: denyAll
        }
    },
    fields: {
        operation: text(),  // operation
        previous_data: text(),  // originalItem
        updated_data: text(),  // item
        updated_values: text(),   // inputData
        updated_by: relationship({   // context
            ref: 'User',
            many: false,
            db: {
                foreignKey: {
                    map: 'updated_by'
                }
            }, 
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
            ui: {
                createView: {
                    fieldMode: 'hidden'
                },
                itemView: {
                    fieldMode: 'hidden'
                }
            },
        }),
    },
    ui: {
        isHidden: isNotAdmin,
        hideCreate: true,
        hideDelete: true,
        createView: {
            defaultFieldMode: 'hidden',
          },
        itemView: {
            defaultFieldMode: 'read',
        },
        listView: {
          defaultFieldMode: 'read',
          initialColumns: ['operation', 'updated_values', 'updated_by', 'createdAt'],
          initialSort: { field: 'createdAt', direction: 'DESC' },
          pageSize: 10
        }
    }
}

export default logSchema;