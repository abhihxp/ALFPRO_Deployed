export interface SDUISchema {
    type: string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: Record<string, any>;
    children?: SDUISchema[];
    visibleWhen?: {
        permission?: string;
    };
}
