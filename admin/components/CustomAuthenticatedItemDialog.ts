import SignoutButton from '@keystone-6/core/admin-ui/components';
import { hasSession } from '../../currentUser'

export default function CustomAuthenticatedItemDialog() {
    if (!hasSession) return null; // Handle when there is no session data

    // Customize the user dialog content or actions based on the session data
    return (
        SignoutButton
    );
}