import { allOperations, allowAll, denyAll } from '@keystone-6/core/access'
import { text, timestamp } from '@keystone-6/core/fields'
import { hasSession, isAdmin, isNotAdmin } from '../currentUser';
  
const sourcedSchema = {
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
                }
            },
        }),
    },
    
    ui: {
      isHidden: isNotAdmin
    }
}

export default sourcedSchema;