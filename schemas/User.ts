import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import type { Lists } from '.keystone/types'
import { isAdmin, isNotAdmin, isAdminAndisNotDefaultAdminUser } from '../currentUser'
import {
    text,
    relationship,
    password,
    timestamp,
    select,
    checkbox,
  } from '@keystone-6/core/fields';


const userSchema = {
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: {
        operation: {
            query: ({ session, context, listKey, operation }) => true,
            create: isAdmin,
            update: ({ session, context, listKey, operation }) => true,
            delete: isAdmin,
        },
        filter: {}
    },

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
        hooks: {
            validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
              const email = resolvedData[fieldKey];
              if (email !== undefined && email !== null && !email.includes('@')) {
                addValidationError(`The email address ${email} provided for the field ${fieldKey} must contain an '@' character`);
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

        sources: relationship({
            ref: 'Source',
            many: true
        }),

      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
    //   posts: relationship({ ref: 'Post.author', many: true }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
        validation: { isRequired: false },
      }),
    },
    ui: {
        isHidden: isNotAdmin,
    }
}

export default userSchema;