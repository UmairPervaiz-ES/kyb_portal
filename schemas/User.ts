import { allowAll, denyAll } from '@keystone-6/core/access';
import { isAdmin, isNotAdmin, isAdminAndisNotDefaultAdminUser, isSuperAdmin } from '../currentUser'
import {
    text,
    relationship,
    password,
    timestamp,
    select,
    checkbox,
  } from '@keystone-6/core/fields';


const userSchema = {
    access: {
        operation: {
            query: isAdmin,
            create: isAdmin,
            update: isAdmin,
            delete: isSuperAdmin
        },
        filter: {}
    },

    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user
        isIndexed: 'unique',
        hooks: {
            validateInput: async({ addValidationError, resolvedData, fieldKey, context }) => {
              const email = resolvedData[fieldKey];
              if (email !== undefined && email !== null && !email.includes('@')) {
                addValidationError(`The email address ${email} provided must contain an '@' character`);
              }
              if(email){
                const user = await context.db.User.findOne({
                  where: { email: email.toLowerCase() },
                })
  
                if(user){
                  addValidationError(`The email address ${email} provided already exits`);
                }
              }
            },
          },
      }),

      password: password({ validation: { isRequired: true } }),
      isAdmin: checkbox({
        access: {
            // only the respective user, or an admin can read this field
            // read: isAdminOrSameUser,
    
            // only admins can create, or update this field
            create: isAdmin,
            update: isAdmin,
        },
        defaultValue: false,
        ui: {
            // only admins can edit this field
            createView: {
                fieldMode: args => (isAdmin(args) ? 'edit' : 'hidden'),
            },
            itemView: {
                fieldMode: args => (isAdmin(args) ? 'edit' : 'read'),
            },
        },

        }),

      isSuperAdmin: checkbox({
        access: isSuperAdmin,
        defaultValue: false,
        ui: {
          createView: {
            fieldMode: args => isSuperAdmin(args) ? 'edit' : 'hidden',
          },
          itemView: {
            fieldMode: args => isSuperAdmin(args) ? 'edit' : 'hidden',
          },
        },
      }),

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
        isHidden: isNotAdmin,
        listView: {
          initialSort: { field: 'createdAt', direction: 'DESC' },
          pageSize: 10
        }
    }
}

export default userSchema;