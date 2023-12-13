import { allOperations, allowAll, denyAll } from '@keystone-6/core/access'
import { text, timestamp } from '@keystone-6/core/fields'
import { isAdmin, isNotAdmin } from '../currentUser';
  
const coverageSchema = {
    access: {
        operation: {
            query: allowAll,
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

export default coverageSchema;