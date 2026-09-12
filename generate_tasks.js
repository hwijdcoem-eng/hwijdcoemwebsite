const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'plan', 'team-tasks');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const conflictRules = `
## ⚠️ Zero Merge Conflict Rules (CRITICAL)
1. **Strict File Boundaries:** Only edit the files explicitly listed in your scope. Do not touch \`Navbar\`, \`Footer\`, or other shared UI components if they are not in your scope.
2. **No Dependency Changes:** Do NOT run \`npm install\` or modify \`package.json\`. If you need a library (like \`lucide-react\` or \`framer-motion\`), ask the Team Lead.
3. **No Drive-by Fixes:** If you see a typo in someone else's code, ignore it or tell them. Do not fix it in your branch.
4. **Stay Updated:** Run \`git fetch origin\` and \`git merge origin/develop\` frequently to pull in shared components.
`;

const tasks = [
    {
        name: 'feat-design-tokens.md',
        title: '# Task: Design Tokens',
        scope: `**Branch:** \`feat/design-tokens\`\n\n## Scope of Work\n- Setup Tailwind CSS config (\`tailwind.config.js\` or \`.ts\`).\n- Define color palette (\`--bg-void\`, \`--signal\`, \`--ink\`, etc.) in global CSS.\n- Setup typography scales (Space Grotesk / Inter).\n- Create \`src/styles/tokens.ts\` or equivalent.\n- **Note:** Do NOT build any React components in this branch. Just CSS and config.`
    },
    {
        name: 'feat-global-layout.md',
        title: '# Task: Global Layout',
        scope: `**Branch:** \`feat/global-layout\`\n\n## Scope of Work\n- Build \`components/layout/Navbar.tsx\`.\n- Build \`components/layout/Footer.tsx\`.\n- Build \`components/layout/PageContainer.tsx\`.\n- Set up the main routing shell/layout in Next.js/React Router.\n- Wait for Design Tokens to be merged before applying colors.`
    },
    {
        name: 'feat-core-ui.md',
        title: '# Task: Core UI Components',
        scope: `**Branch:** \`feat/core-ui\`\n\n## Scope of Work\n- Build reusable atomic components in \`components/ui/\`.\n- Create \`Button\`, \`Card\`, \`Badge\`, \`Modal\`, \`Avatar\`, and \`SectionHeading\`.\n- Ensure they use the Design Tokens for styling.\n- Do NOT build full pages, only these isolated components.`
    },
    {
        name: 'feat-page-home.md',
        title: '# Task: Home Page',
        scope: `**Branch:** \`feat/page-home\`\n\n## Scope of Work\n- Edit \`src/app/page.tsx\` (or \`pages/index.tsx\`).\n- Build the asymmetric Hero section (Headline left, Network visualization right).\n- Build the Stats section.\n- Use real data from \`src/data/\`.\n- **Allowed Files:** \`components/home/*\`, \`app/page.tsx\`.`
    },
    {
        name: 'feat-page-team.md',
        title: '# Task: Team Page',
        scope: `**Branch:** \`feat/page-team\`\n\n## Scope of Work\n- Edit the \`/team\` route.\n- Build the interactive Team Tree component (\`TeamTree\`, \`TeamNode\`, \`MemberCard\`).\n- Implement live filtering by domain (Web, Events, etc.).\n- **Allowed Files:** \`components/team/*\`, \`app/team/page.tsx\`, \`data/team.ts\`.`
    },
    {
        name: 'feat-page-events.md',
        title: '# Task: Events Page',
        scope: `**Branch:** \`feat/page-events\`\n\n## Scope of Work\n- Edit the \`/events\` route.\n- Build \`EventCard\`, \`EventGrid\`, and \`EventFilter\` components.\n- Setup dynamic routing for individual events (\`/events/:slug\`).\n- **Allowed Files:** \`components/events/*\`, \`app/events/*\`, \`data/events.ts\`.`
    },
    {
        name: 'feat-page-gallery.md',
        title: '# Task: Gallery Page',
        scope: `**Branch:** \`feat/page-gallery\`\n\n## Scope of Work\n- Edit the \`/gallery\` route.\n- Build the Masonry gallery layout (\`GalleryGrid\`, \`GalleryItem\`).\n- Implement image filtering with shared-layout animations (Motion for React).\n- Build a Lightbox component for clicking images.\n- **Allowed Files:** \`components/gallery/*\`, \`app/gallery/page.tsx\`, \`data/gallery.ts\`.`
    },
    {
        name: 'feat-page-community.md',
        title: '# Task: Community Page',
        scope: `**Branch:** \`feat/page-community\`\n\n## Scope of Work\n- Edit the \`/community\` route.\n- Build a data-driven map or node graph showing active chapters.\n- Read data from \`src/data/community.ts\`.\n- **Allowed Files:** \`components/community/*\`, \`app/community/page.tsx\`, \`data/community.ts\`.`
    },
    {
        name: 'feat-page-about.md',
        title: '# Task: About Page',
        scope: `**Branch:** \`feat/page-about\`\n\n## Scope of Work\n- Edit the \`/about\` route.\n- Build a vertical Timeline component for HWI history.\n- Read data from \`src/data/timeline.ts\`.\n- **Allowed Files:** \`components/about/*\`, \`app/about/page.tsx\`, \`data/timeline.ts\`.`
    }
];

for (const task of tasks) {
    const content = \`\${task.title}\n\n\${task.scope}\n\n\${conflictRules}\`;
    fs.writeFileSync(path.join(dir, task.name), content);
}
console.log('Successfully created team-tasks markdown files.');
