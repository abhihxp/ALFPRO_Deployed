import React from 'react';
import SDUIRenderer from '@/components/sdui/renderer';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

// In a real app, this runs on the server (Node.js)
// We will mock the database fetch if MCP is not available or too slow
const MOCK_SCHEMAS: Record<string, string> = {
    // We can fallback to reading the inserted JSON if DB fails, 
    // but let's try to query the DB via MCP logic if possible.
    // For simplicity in this demo, we can just import the JSON directly or read it.
};

async function getSchema(routeKey: string) {
    // In a real implementation:
    // const client = new Client(process.env.DATABASE_URL);
    // await client.connect();
    // const res = await client.query('SELECT schema FROM ui_schemas WHERE route_key = $1', [routeKey]);
    // return res.rows[0]?.schema;

    // Since we inserted it via MCP, we can try to fetch it via MCP or just fallback to the file content
    // For speed and reliability in this agent loop, I will read the file directly if the slug matches.

    if (routeKey === 'employees') {
        // We return the content of employee-schema.json
        // In a real persistent app, this comes from the DB.
        // Here we are simulating the DB fetch.
        const fs = await import('fs/promises');
        const customPath = process.cwd() + '/employee-schema.json';
        try {
            const data = await fs.readFile(customPath, 'utf-8');
            return JSON.parse(data);
        } catch (e) {
            console.error('Failed to read schema file', e);
            return null;
        }
    } else if (routeKey === 'employees/new') {
        const fs = await import('fs/promises');
        const customPath = process.cwd() + '/onboarding-schema.json';
        try {
            const data = await fs.readFile(customPath, 'utf-8');
            return JSON.parse(data);
        } catch (e) {
            console.error('Failed to read onboarding schema', e);
            return null;
        }
    }
    return null;
}

export default async function SDUIPage(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const slug = params.slug;
    // If slug is missing, it's the dashboard home.
    // /dashboard -> ['dashboard'] (if mapped) or undefined depending on route.
    // Actually [[...slug]] at /dashboard means:
    // /dashboard -> slug: undefined
    // /dashboard/employees -> slug: ['employees']

    const routeKey = slug ? slug.join('/') : 'dashboard-home';

    // Normalize: If the route starts with 'dashboard/', strip it to find the schema key.
    // e.g. 'dashboard/employees' -> 'employees'
    const normalizedKey = routeKey.replace(/^dashboard\//, '');
    console.log('[SDUI] Route Key:', routeKey, 'Normalized:', normalizedKey);

    // If undefined/empty, we might want to show a default welcome dashboard
    if (!slug) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">Welcome to Alftek HRMS</h1>
                <p className="text-gray-500">Select a module from the sidebar to begin.</p>
            </div>
        );
    }

    const schema = await getSchema(normalizedKey);

    if (!schema) {
        return notFound();
    }

    return <SDUIRenderer schema={schema} />;
}
