import { relationship, text, timestamp } from '@keystone-6/core/fields'
import { hasSession, isAdmin, isNotAdmin } from '../currentUser';
  
const sourceKeySchema = {
    access: {
        operation: {
            query: hasSession,
            create: hasSession,
            update: hasSession,
            delete: isAdmin
        }
    },
    fields: {
        original_key: text({ validation: { isRequired: true } }),
        map_to: text({ validation: { isRequired: true } }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' }, 
            validation: { isRequired: false },
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
      isHidden: true,
    //   createView: isAdmin,
    labelField: 'original_key',
    listView: {
        // initialColumns: ['original_key', /* ... */],
        initialSort: { field: 'createdAt', direction: 'DESC' },
        pageSize: 10
        }
    }
}

export default sourceKeySchema;