"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");

// currentUser.ts
function isAdmin({ session: session2 }) {
  if (!session2)
    return false;
  if (session2.data.isAdmin == false)
    return false;
  return session2.data.isAdmin;
}
function isNotAdmin({ session: session2 }) {
  if (!session2)
    return false;
  if (session2.data.isAdmin == true)
    return false;
  return true;
}

// schemas/User.ts
var import_fields = require("@keystone-6/core/fields");
var userSchema = {
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: {
    operation: {
      query: ({ session: session2, context, listKey, operation }) => true,
      create: isAdmin,
      update: ({ session: session2, context, listKey, operation }) => true,
      delete: isAdmin
    },
    filter: {}
  },
  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      isIndexed: "unique",
      hooks: {
        validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
          const email = resolvedData[fieldKey];
          if (email !== void 0 && email !== null && !email.includes("@")) {
            addValidationError(`The email address ${email} provided for the field ${fieldKey} must contain an '@' character`);
          }
        }
      }
    }),
    password: (0, import_fields.password)({ validation: { isRequired: true } }),
    isAdmin: (0, import_fields.checkbox)({
      access: {
        // only the respective user, or an admin can read this field
        // read: isAdminOrSameUser,
        // only admins can create, or update this field
        create: isAdmin,
        update: isAdmin
      },
      defaultValue: false,
      ui: {
        // only admins can edit this field
        createView: {
          fieldMode: (args) => isAdmin(args) ? "edit" : "hidden"
        },
        itemView: {
          fieldMode: (args) => isAdmin(args) ? "edit" : "read"
        }
      }
    }),
    sources: (0, import_fields.relationship)({
      ref: "Source",
      many: true
    }),
    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
    //   posts: relationship({ ref: 'Post.author', many: true }),
    createdAt: (0, import_fields.timestamp)({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" },
      validation: { isRequired: false }
    })
  },
  ui: {
    isHidden: isNotAdmin
  }
};
var User_default = userSchema;

// schemas/SourceType.ts
var import_access = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var sourceTypeSchema = {
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false }
    })
  },
  ui: {
    isHidden: isNotAdmin
  }
};
var SourceType_default = sourceTypeSchema;

// schemas/Region.ts
var import_access2 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var regionSchema = {
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false }
    })
  },
  ui: {
    isHidden: isNotAdmin
  }
};
var Region_default = regionSchema;

// schemas/Language.ts
var import_access3 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var languageSchema = {
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields4.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false }
    })
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
};
var Language_default = languageSchema;

// schemas/Country.ts
var import_access4 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var countrySchema = {
  access: import_access4.allowAll,
  fields: {
    name: (0, import_fields5.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields5.timestamp)({
      defaultValue: { kind: "now" }
    })
  },
  ui: {
    isHidden: isNotAdmin
  }
};
var Country_default = countrySchema;

// schemas/Source.ts
var import_access5 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var sourceSchema = {
  access: {
    operation: {
      query: import_access5.allowAll,
      create: import_access5.allowAll,
      update: import_access5.allowAll,
      delete: import_access5.allowAll
    }
  },
  fields: {
    authority_name: (0, import_fields6.text)({ validation: { isRequired: true } }),
    comment: (0, import_fields6.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields6.timestamp)({
      // default this timestamp to Date.now() when first created
      defaultValue: { kind: "now" }
    }),
    to_crawler: (0, import_fields6.checkbox)({
      defaultValue: false,
      db: { map: "to_crawler" }
    }),
    to_deo: (0, import_fields6.checkbox)({
      defaultValue: false,
      db: { map: "to_deo" },
      graphql: {
        isNonNull: {
          create: true
        }
      }
    }),
    country: (0, import_fields6.relationship)({
      ref: "Country",
      many: false,
      db: {
        foreignKey: {
          map: "country"
        }
      }
    }),
    region: (0, import_fields6.relationship)({
      ref: "Region",
      many: false,
      db: {
        foreignKey: {
          map: "region"
        }
      }
    }),
    source_type: (0, import_fields6.relationship)({
      ref: "SourceType",
      many: false,
      db: {
        foreignKey: {
          map: "source_type"
        }
      }
    }),
    lanaguage: (0, import_fields6.relationship)({
      ref: "Language",
      many: false,
      db: {
        foreignKey: {
          map: "language"
        }
      }
    }),
    // user: relationship({
    //     ref: 'User',
    //     many: false
    // }),
    // user: relationship({
    //     ref: 'User.sources',
    //     many: false,
    // }),
    createdBy: (0, import_fields6.relationship)({
      ref: "User",
      many: false,
      // hooks: {
      //     validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
      //         let createdBy = resolvedData[fieldKey];
      //         console.log(createdBy, 'createdBy')
      //         console.log(currentUserID, 'currentUserID')
      //         if (createdBy == undefined || createdBy == null) {
      //             createdBy = currentUserID
      //         //   addValidationError(`The email address ${email} provided for the field ${fieldKey} must contain an '@' character`);
      //         }
      //       },
      // dynamic default: if unassigned, find an anonymous user and assign the task to them
      // async resolveInput ({ context, operation, resolvedData }) {
      //   if (resolvedData.createdBy === null) {
      //     // if (context) {
      //       return { connect: { id: currentUserID } }
      //     // }
      //   }
      //   return resolvedData.createdBy
      // },
      //   },
      db: {
        foreignKey: {
          map: "user_id"
        }
      },
      ui: {
        hideCreate: true
      }
    })
  }
};
var Source_default = sourceSchema;

// schema.ts
var lists = {
  User: (0, import_core.list)(User_default),
  // Post: list(PostSchema),
  // Tag: list(TagSchema),
  SourceType: (0, import_core.list)(SourceType_default),
  Region: (0, import_core.list)(Region_default),
  Language: (0, import_core.list)(Language_default),
  Country: (0, import_core.list)(Country_default),
  Source: (0, import_core.list)(Source_default)
  // User: list({
  //   // WARNING
  //   //   for this starter project, anyone can create, query, update and delete anything
  //   //   if you want to prevent random people on the internet from accessing your data,
  //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  //   access: allowAll,
  //   // this is the fields for our User list
  //   fields: {
  //     // by adding isRequired, we enforce that every User should have a name
  //     //   if no name is provided, an error will be displayed
  //     name: text({ validation: { isRequired: true } }),
  //     email: text({
  //       validation: { isRequired: true },
  //       // by adding isIndexed: 'unique', we're saying that no user can have the same
  //       // email as another user - this may or may not be a good idea for your project
  //       isIndexed: 'unique',
  //     }),
  //     password: password({ validation: { isRequired: true } }),
  //     // we can use this field to see what Posts this User has authored
  //     //   more on that in the Post list below
  //     posts: relationship({ ref: 'Post.author', many: true }),
  //     createdAt: timestamp({
  //       // this sets the timestamp to Date.now() when the user is first created
  //       defaultValue: { kind: 'now' },
  //     }),
  //   },
  // }),
  // Post: list({
  //   // WARNING
  //   //   for this starter project, anyone can create, query, update and delete anything
  //   //   if you want to prevent random people on the internet from accessing your data,
  //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  //   access: allowAll,
  //   // this is the fields for our Post list
  //   fields: {
  //     title: text({ validation: { isRequired: true } }),
  //     // the document field can be used for making rich editable content
  //     //   you can find out more at https://keystonejs.com/docs/guides/document-fields
  //     content: document({
  //       formatting: true,
  //       layouts: [
  //         [1, 1],
  //         [1, 1, 1],
  //         [2, 1],
  //         [1, 2],
  //         [1, 2, 1],
  //       ],
  //       links: true,
  //       dividers: true,
  //     }),
  //     // with this field, you can set a User as the author for a Post
  //     author: relationship({
  //       // we could have used 'User', but then the relationship would only be 1-way
  //       ref: 'User.posts',
  //       // this is some customisations for changing how this will look in the AdminUI
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name', 'email'],
  //         inlineEdit: { fields: ['name', 'email'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //       },
  //       // a Post can only have one author
  //       //   this is the default, but we show it here for verbosity
  //       many: false,
  //     }),
  //     // with this field, you can add some Tags to Posts
  //     tags: relationship({
  //       // we could have used 'Tag', but then the relationship would only be 1-way
  //       ref: 'Tag.posts',
  //       // a Post can have many Tags, not just one
  //       many: true,
  //       // this is some customisations for changing how this will look in the AdminUI
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name'],
  //         inlineEdit: { fields: ['name'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //         inlineCreate: { fields: ['name'] },
  //       },
  //     }),
  //   },
  // }),
  // this last list is our Tag list, it only has a name field for now
  // Tag: list({
  //   // WARNING
  //   //   for this starter project, anyone can create, query, update and delete anything
  //   //   if you want to prevent random people on the internet from accessing your data,
  //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  //   access: allowAll,
  //   // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  //   ui: {
  //     isHidden: true,
  //   },
  //   // this is the fields for our Tag list
  //   fields: {
  //     name: text(),
  //     // this can be helpful to find out all the Posts associated with a Tag
  //     posts: relationship({ ref: 'Post.tags', many: true }),
  //   },
  // }),
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "id name email isAdmin createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"],
    itemData: {
      isAdmin: true
    }
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "postgresql",
      url: process.env.DATABASE_URL
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
