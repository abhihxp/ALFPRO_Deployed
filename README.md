Here is the complete **Frontend Architecture Document**, formatted for Confluence.

You can copy and paste this markdown directly into Confluence (most modern versions support Markdown import) or use it as a structure to build the page manually.

---

# 📘 Alftek ALFPRO HRMS - Frontend Architecture

| Metadata | Details |
| :--- | :--- |
| **Project** | Alftek ALFPRO HRMS (SaaS) |
| **Version** | 1.0 (Phase 1) |
| **Status** | 🟢 Approved |
| **Tech Stack** | Next.js 15, Ant Design 5, Redux Toolkit |
| **Last Updated** | December 23, 2025 |

---

## 1. Executive Summary
**For PMs & BAs:**
ALFPRO is a **Multi-Tenant SaaS HRMS**. Unlike traditional applications, it uses a **Server-Driven UI (SDUI)** architecture. This means the layout, forms, and tables are defined by data (JSON), not hardcoded code.
*   **Benefits:** We can enable features, change form fields, or update layouts for specific tenants without deploying new code.
*   **Global Ready:** Built from day one with **Arabic (RTL)** and **English (LTR)** support.

**For Developers:**
This is a **Next.js 15 App Router** application. It avoids subdomain routing in favor of **Session-Based Tenancy**. It relies heavily on **middleware** for context injection and uses a recursive **Component Engine** to render UI from backend schemas.

---

## 2. High-Level Architecture Diagram
*The flow of a request from User to UI Rendering.*

```mermaid
graph TD
    %% 1. AUTH FLOW
    User((User)) -->|1. Login| AuthAPI[Auth Service]
    AuthAPI -->|2. Set Cookie| Browser
    
    %% 2. REQUEST FLOW
    Browser -->|3. Navigates to /dashboard| Middleware
    Middleware -->|4. Read Cookie & Extract Tenant| Header[Request Header: x-tenant-id]
    
    %% 3. SERVER COMPONENT LAYER
    Header -->|5. Forward to| Page[Server Page (page.tsx)]
    Page -->|6. Fetch UI Schema| BackendAPI
    BackendAPI -->|7. Return JSON| Page
    
    %% 4. CLIENT RENDER LAYER
    Page -->|8. Pass JSON Schema| Engine[SDUI Engine (Client)]
    Engine -->|9. Check Permissions| Redux[Redux Store]
    Engine -->|10. Map to AntD| Registry
    Registry -->|11. Paint UI| UI[Final DOM]
```

---

## 3. Technology Stack (Strict Versions)
⚠️ **Strict adherence to these versions is required to prevent hydration errors.**

| Category | Technology | Version | Usage |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** | `v15.1+` | App Router, Server Actions, Turbopack. |
| **UI Library** | **Ant Design** | `v5.22+` | Core UI components. |
| **Styling** | **Tailwind CSS** | `v3.4+` | Layout, Spacing, Responsive utilities. |
| **State** | **Redux Toolkit** | `v2.5+` | Global Client State & RTK Query (Caching). |
| **Auth** | **NextAuth.js** | `v5 (Beta)`| Auth & Session Management. |
| **Icons** | **Lucide React** | `latest` | Consistent Iconography. |
| **Data Grid** | **Ag-Grid** | `v32+` | Complex Employee/Payroll Tables. |

---

## 4. Core Architectural Patterns

### 4.1. Post-Login Multi-Tenancy
We do **not** use subdomains (e.g., `client-a.alftek.com`).
*   **Mechanism:** Tenancy is derived from the **Auth Session**.
*   **Workflow:**
    1.  User logs in. Backend identifies their Tenant ID.
    2.  Tenant ID is stored in the encrypted Session Cookie.
    3.  **Middleware** intercepts every request, decrypts the cookie, and injects `x-tenant-id` into the Request Headers.
    4.  Backend APIs automatically scope data based on this header.

### 4.2. Server-Driven UI (SDUI)
We do **not** hardcode pages like "Employee List".
*   **Mechanism:** The Frontend is a "Rendering Engine." The Backend is the "Architect."
*   **Workflow:**
    1.  Next.js Page requests schema: `GET /api/schema?route=/employees`.
    2.  Backend returns JSON describing the page (Layouts, Tables, Buttons).
    3.  Frontend recursively renders this JSON using the **Component Registry**.

### 4.3. Internationalization (i18n)
*   **RTL Support:** The entire app layout direction is controlled by `<ConfigProvider direction={dir}>`.
*   **Translations:** Loaded from CDN/S3 based on the user's preference.
*   **Mirroring:** Ant Design components (Inputs, Tables, Menus) automatically flip in RTL mode.

---

## 5. Project Structure
*Standardized layout for maintainability.*

```text
src/
├── app/
│   ├── (auth)/                 # Public Routes (Login, Forgot Pass)
│   ├── (dashboard)/            # Protected Routes (Require Tenant Context)
│   │   ├── layout.tsx          # Main App Shell (Sidebar/Header)
│   │   └── [[...slug]]/        # The Catch-All SDUI Route
│   ├── api/                    # Next.js Route Handlers (BFF)
│   └── layout.tsx              # Root Layout (AntdRegistry)
├── components/
│   ├── sdui/                   # THE ENGINE
│   │   ├── registry.tsx        # Mapping JSON keys to React Components
│   │   ├── renderer.tsx        # Recursive Rendering Logic
│   │   └── smart-table.tsx     # Data-Driven Table Wrapper
│   └── ui/                     # Reusable Atomic Components
├── lib/
│   ├── axios.ts                # HTTP Client (Auto-injects x-tenant-id)
│   └── theme-config.ts         # AntD Theme Definitions
├── store/                      # Global State (Redux)
└── middleware.ts               # Tenancy & Auth Logic
```

---

## 6. Key Development Workflows

### 🛠 How to create a new Page
**Do not create a `.tsx` file.**
1.  **Backend:** Create a new entry in the `ui_schemas` table for the route (e.g., `/payroll`).
2.  **JSON Definition:** Define the layout, columns, and actions in JSON.
3.  **Frontend:** The `[[...slug]]` catch-all route handles the rest automatically.

### 🎨 How to Style Components
*   **Layout & Spacing:** Use **Tailwind CSS**.
    *   *Good:* `className="p-4 flex gap-4"`
*   **Component Visuals:** Use **Ant Design Tokens** (via ConfigProvider).
    *   *Good:* Primary color changes automatically based on Tenant Config.
    *   *Bad:* Hardcoding `style={{ color: 'blue' }}` (Breaks theming).

### 🔐 Handling Permissions
Permissions are aggregated on the Client Side for UX (hiding buttons) but enforced on the Server Side for Security.
*   **JSON Rule:** `visibleWhen: { permission: "payroll.approve" }`
*   **Frontend Logic:** The Renderer checks Redux `auth.permissions`. If missing, the component returns `null`.

---

## 7. Common Pitfalls & FAQs

| Question | Answer |
| :--- | :--- |
| **Can I use `useState` in a Page?** | **No.** Pages are Server Components. Use `useState` only in components inside `src/components`. |
| **Why is my Table crashing?** | Ensure you mapped the column type correctly in `smart-table.tsx`. |
| **How do I fix Hydration Errors?** | Ensure `AntdRegistry` wraps the Root Layout. Avoid random IDs (use `useId` hook). |
| **Where do I put API calls?** | Use **RTK Query** (`store/api.ts`) for client-side data. Use **Server Actions** or `fetch` for server-side. |

---

## 8. Definition of Done (Frontend)
Before merging a PR, ensure:
1.  [ ] **RTL Check:** Switch language to Arabic. Does the layout flip correctly?
2.  [ ] **Theme Check:** Does it look correct in both Light and Dark mode?
3.  [ ] **Tenant Check:** Does data isolation work? (Switch users, ensure data clears).
4.  [ ] **Type Check:** No `any` types in TypeScript.
5.  [ ] **Build:** `npm run build` passes without errors.
