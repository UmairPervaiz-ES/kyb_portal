import { allowAll, denyAll } from '@keystone-6/core/access'
import { text, timestamp } from '@keystone-6/core/fields'
import { isNotAdmin } from '../currentUser';
  
const languageSchema = {
    access: allowAll,
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
    // ui: {
    //     views: '/.keystone/admin/pages/languages',
    //     createView: {
    //       fieldMode: ({ session, context }) => 'hidden',
    //     },
    //     itemView: {
    //       fieldMode: ({ session, context, item }) => 'read',
    //     },
    //     listView: {
    //       fieldMode: ({ session, context }) => 'read',
    //     },
    //   },
    
    ui: {
      isHidden: isNotAdmin
    }
}

export default languageSchema;