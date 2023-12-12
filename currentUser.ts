import type { Lists } from '.keystone/types'

type Session = {
    itemId: string
    data: {
        isAdmin: boolean
        }
    }
    
export function hasSession ({ session }: { session?: Session }) {
    return Boolean(session)
}

export function currentUserID ({ session }: { session?: Session }) {
    if (!session) return false
    console.log(session.data.id, 'session.data.id')

    return session.data.id
}

export function isAdminOrSameUser ({ session, item }: { session?: Session, item: Lists.User.Item }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true

        // the authenticated user needs to be equal to the user we are updating
    return session.itemId === item.id
}

export function isAdminOrSameUserFilter ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can see everything
    if (session.data?.isAdmin) return {}

    // the authenticated user can only see themselves
    return {
        id: {
        equals: session.itemId,
        },
    }
}

export function isAdmin ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false
    if(session.data.isAdmin == false ) return false

    return session.data.isAdmin
}

export function isNotAdmin ({ session }: { session?: Session }) {
    if(!session) return false
    if(session.data.isAdmin == true ) return false

    return true
}

export function isAdminAndisNotDefaultAdminUser ({ session, item }: { session?: Session, item: Lists.User.Item }) {
    if(!session) return false

    if(!session.data.isAdmin) {return false};

    console.log(session.data, 'sessions.data')
    console.log(item.id, 'content did')

    if(item.id == 'clq0wowaq0005up6ho5jwvptm' ) {return false};

    return true;
}