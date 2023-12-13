import { allowAll, denyAll } from '@keystone-6/core/access'
import { text, timestamp } from '@keystone-6/core/fields'
import { hasSession, isNotAdmin } from '../currentUser';
  
const countrySchema = {
    access: hasSession,
    fields: {
        name: text({ validation: { isRequired: true } }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
            ui: {
                createView: {
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