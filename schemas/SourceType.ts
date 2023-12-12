
import { allowAll, denyAll } from '@keystone-6/core/access'
import { text, timestamp } from '@keystone-6/core/fields'
import { isNotAdmin } from '../currentUser';
  
const sourceTypeSchema = {
    access: allowAll,
    fields: {
        name: text({ validation: { isRequired: true } }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' }, 
            validation: { isRequired: false },
        }),
    },
    ui: {
        isHidden: isNotAdmin
    }
}

export default sourceTypeSchema;