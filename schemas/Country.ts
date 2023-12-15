import { allowAll, denyAll } from '@keystone-6/core/access'
import { text, timestamp } from '@keystone-6/core/fields'
import { hasSession, isAdmin, isNotAdmin } from '../currentUser';
  
const countrySchema = {
    access: {
        operation: {
            query: hasSession,
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin
        }
    },
    fields: {
        name: text({ 
                validation: { isRequired: true }, 
                isIndexed: 'unique', 
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
        listView: {
          initialSort: { field: 'createdAt', direction: 'DESC' },
          pageSize: 10
        }
    }
}

export default countrySchema;