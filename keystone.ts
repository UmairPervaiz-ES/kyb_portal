import 'dotenv/config'
import { config } from '@keystone-6/core';
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || 'provide_URL_for_database_to_connect',
    },
    lists,
    session,
  })
);
