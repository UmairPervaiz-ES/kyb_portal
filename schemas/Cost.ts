import { text, timestamp } from '@keystone-6/core/fields'
import { hasSession, isAdmin, isNotAdmin } from '../currentUser';
  
const costSchema = {
    access: {
        operation: {
            query: hasSession,
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin
        }
    },
    fields: {
        name: text({ validation: { isRequired: true } }),
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
        isHidden: isNotAdmin,
        listView: {
          initialSort: { field: 'createdAt', direction: 'DESC' },
          pageSize: 10
        }
    }
}

export default costSchema;