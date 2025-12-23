import { SDUISchema } from '@/types/sdui';

export function checkVisibility(
    schema: SDUISchema,
    userPermissions: string[] = [] // Default to empty array if user/permissions are null
): boolean {
    if (!schema.visibleWhen) {
        return true;
    }

    if (schema.visibleWhen.permission) {
        return userPermissions.includes(schema.visibleWhen.permission);
    }

    return true;
}
