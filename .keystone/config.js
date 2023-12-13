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
function hasSession({ session: session2 }) {
  return Boolean(session2);
}
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
function isSuperAdmin({ session: session2 }) {
  if (!session2)
    return false;
  if (session2.data.isSuperAdmin == false)
    return false;
  return true;
}

// schemas/User.ts
var import_fields = require("@keystone-6/core/fields");
var userSchema = {
  access: {
    operation: {
      query: hasSession,
      create: isAdmin,
      update: isAdmin,
      delete: isSuperAdmin
    },
    filter: {}
  },
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user
      isIndexed: "unique",
      hooks: {
        validateInput: async ({ addValidationError, resolvedData, fieldKey, context }) => {
          const email = resolvedData[fieldKey];
          if (email !== void 0 && email !== null && !email.includes("@")) {
            addValidationError(`The email address ${email} provided must contain an '@' character`);
          }
          if (email) {
            const user = await context.db.User.findOne({
              where: { email: email.toLowerCase() }
            });
            if (user) {
              addValidationError(`The email address ${email} provided already exits`);
            }
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
    isSuperAdmin: (0, import_fields.checkbox)({
      access: isSuperAdmin,
      defaultValue: false,
      ui: {
        createView: {
          fieldMode: (args) => isSuperAdmin(args) ? "edit" : "hidden"
        },
        itemView: {
          fieldMode: (args) => isSuperAdmin(args) ? "edit" : "hidden"
        }
      }
    }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var User_default = userSchema;

// schemas/SourceType.ts
var import_fields2 = require("@keystone-6/core/fields");
var sourceTypeSchema = {
  access: {
    operation: {
      query: hasSession,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin
    }
  },
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var SourceType_default = sourceTypeSchema;

// schemas/Region.ts
var import_fields3 = require("@keystone-6/core/fields");
var regionSchema = {
  access: hasSession,
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var Region_default = regionSchema;

// schemas/Language.ts
var import_fields4 = require("@keystone-6/core/fields");
var languageSchema = {
  access: hasSession,
  fields: {
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields4.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var Language_default = languageSchema;

// schemas/Country.ts
var import_fields5 = require("@keystone-6/core/fields");
var countrySchema = {
  access: hasSession,
  fields: {
    name: (0, import_fields5.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields5.timestamp)({
      defaultValue: { kind: "now" },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var Country_default = countrySchema;

// schemas/Source.ts
var import_fields6 = require("@keystone-6/core/fields");
var sourceSchema = {
  access: {
    operation: {
      query: hasSession,
      create: hasSession,
      update: hasSession,
      delete: isAdmin
    }
  },
  fields: {
    authority_name: (0, import_fields6.text)({ validation: { isRequired: true } }),
    comment: (0, import_fields6.text)({ validation: { isRequired: true } }),
    cost: (0, import_fields6.text)({ validation: { isRequired: true } }),
    source_key: (0, import_fields6.relationship)({
      ref: "SourceKey",
      many: true,
      ui: {
        hideCreate: false,
        displayMode: "cards",
        cardFields: ["original_key", "map_to"],
        linkToItem: true,
        removeMode: "disconnect",
        inlineCreate: { fields: ["original_key", "map_to"] },
        inlineEdit: { fields: ["original_key", "map_to"] },
        inlineConnect: true
      }
    }),
    coverage: (0, import_fields6.relationship)({
      ref: "Coverage",
      many: false,
      db: {
        foreignKey: {
          map: "coverage"
        }
      }
    }),
    type: (0, import_fields6.relationship)({
      ref: "Type",
      many: false,
      db: {
        foreignKey: {
          map: "type"
        }
      }
    }),
    sourced: (0, import_fields6.relationship)({
      ref: "Sourced",
      many: false,
      db: {
        foreignKey: {
          map: "sourced"
        }
      }
    }),
    createdAt: (0, import_fields6.timestamp)({
      // default this timestamp to Date.now() when first created
      defaultValue: { kind: "now" },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
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
    createdBy: (0, import_fields6.relationship)({
      ref: "User",
      many: false,
      hooks: {
        resolveInput: ({ resolvedData, context }) => {
          let { createdBy } = resolvedData;
          if (createdBy === null || createdBy === void 0) {
            return { connect: { id: context.session.itemId } };
          }
          return resolvedData.createdBy;
        }
      },
      db: {
        foreignKey: {
          map: "created_by"
        }
      },
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        listView: {
          fieldMode: ({ session: session2 }) => {
            if (session2.data.isAdmin)
              return "read";
            return "hidden";
          }
        }
      }
    })
  },
  ui: {
    listView: {
      initialColumns: ["authority_name", "comment", "to_crawler", "to_deo", "country", "region"],
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var Source_default = sourceSchema;

// schemas/Coverage.ts
var import_fields7 = require("@keystone-6/core/fields");
var coverageSchema = {
  access: {
    operation: {
      query: hasSession,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin
    }
  },
  fields: {
    name: (0, import_fields7.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields7.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var Coverage_default = coverageSchema;

// schemas/Type.ts
var import_fields8 = require("@keystone-6/core/fields");
var typeSchema = {
  access: {
    operation: {
      query: hasSession,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin
    }
  },
  fields: {
    name: (0, import_fields8.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields8.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var Type_default = typeSchema;

// schemas/Sourced.ts
var import_fields9 = require("@keystone-6/core/fields");
var sourcedSchema = {
  access: {
    operation: {
      query: hasSession,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin
    }
  },
  fields: {
    name: (0, import_fields9.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields9.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    isHidden: isNotAdmin,
    listView: {
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var Sourced_default = sourcedSchema;

// schemas/SourceKey.ts
var import_fields10 = require("@keystone-6/core/fields");
var sourceKeySchema = {
  access: {
    operation: {
      query: hasSession,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin
    }
  },
  fields: {
    original_key: (0, import_fields10.text)({ validation: { isRequired: true } }),
    map_to: (0, import_fields10.text)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields10.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: false },
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      }
    })
  },
  ui: {
    //   isHidden: true,
    //   createView: isAdmin,
    labelField: "original_key",
    listView: {
      // initialColumns: ['original_key', /* ... */],
      initialSort: { field: "createdAt", direction: "DESC" },
      pageSize: 10
    }
  }
};
var SourceKey_default = sourceKeySchema;

// schema.ts
var lists = {
  User: (0, import_core.list)(User_default),
  SourceType: (0, import_core.list)(SourceType_default),
  Region: (0, import_core.list)(Region_default),
  Language: (0, import_core.list)(Language_default),
  Country: (0, import_core.list)(Country_default),
  Source: (0, import_core.list)(Source_default),
  Coverage: (0, import_core.list)(Coverage_default),
  Type: (0, import_core.list)(Type_default),
  Sourced: (0, import_core.list)(Sourced_default),
  SourceKey: (0, import_core.list)(SourceKey_default)
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
  sessionData: "id name email isAdmin isSuperAdmin createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"],
    itemData: {
      isAdmin: true,
      isSuperAdmin: true
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
      provider: "postgresql",
      url: process.env.DATABASE_URL || "provide_URL_for_database_to_connect"
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
