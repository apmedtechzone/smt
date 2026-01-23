// ==========================================
// 1. DATABASE CONFIGURATION
// ==========================================
const defaultDB = {
    "lists": [
        { "id": "master", "name": "★ Master List" }
    ],
    "cats": [],
    "orgs": []
};

// ==========================================
// 2. STATE & SECURITY INIT
// ==========================================
let isAdmin = false;
let db = defaultDB;

// Load Admin Status & Data
if (localStorage.getItem('amtz_admin') === 'true') {
    isAdmin = true;
    const localWork = localStorage.getItem('amtz_db');
    if (localWork) db = JSON.parse(localWork);
}

// THEME MANAGEMENT (New feature)
function initTheme() {
    const savedTheme = localStorage.getItem('amtz_theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('amtz_theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// Variables
let editingId = null;
let pendingConflicts = []; 
let targetType = null; 
let targetId = null; 
let searchTimer = null; 

// ==========================================
// ALPHABETICAL SORTING UTILITY (New feature)
// ==========================================
function sortDataAlphabetically(data) {
    return data.sort((a, b) => {
        // Keep master at top
        if (a.id === 'master') return -1;
        if (b.id === 'master') return 1;
        return a.name.localeCompare(b.name);
    });
}

function initApp() {
    initTheme(); // Initialize Dark Mode
    initDropdowns();
    initBulkRows(20); 
    renderTable();
    if (isAdmin) updateUIForAdmin();
    
    document.getElementById('bulk-tbody').addEventListener('paste', handleGridPaste);
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape") document.querySelectorAll('.modal').forEach(m => closeModal(m.id));
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initDropdowns() {
    const populate = (id, data, ph) => {
        const el = document.getElementById(id);
        if(!el) return;
        const curr = el.value;
        el.innerHTML = ph ? `<option value="all">${ph}</option>` : '';
        // Sort before populating
        sortDataAlphabetically([...data]).forEach(i => el.innerHTML += `<option value="${i.id}">${i.name}</option>`);
        if(curr) el.value = curr;
    };
    populate('filter-list', db.lists, 'All Lists');
    populate('filter-cat', db.cats, 'All Categories');
    populate('bulk-list', db.lists, null);
    populate('pop-src-list', db.lists, 'All Lists');
    populate('pop-src-cat', db.cats, 'All Categories');
}

// ... (KEEP SECTIONS 3 UTILITIES AS IS FROM YOUR PREVIOUS CODE) ...

// ==========================================
// 4. RENDER ENGINE (UPDATED WITH SORTING)
// ==========================================
function renderTable() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const rawSearch = document.getElementById('search-bar').value.toLowerCase();
    const searchGroups = rawSearch.split(',').map(s => s.trim()).filter(s => s !== '');
    
    const tbody = document.getElementById('table-body');
    const empty = document.getElementById('empty-state');
    
    // Filter the results
    let results = db.orgs.filter(org => {
        if (listId!=='all' && !org.listIds.includes(listId)) return false;
        if (catId!=='all' && !org.catIds.includes(catId)) return false;
        
        if (searchGroups.length > 0) {
            let txt = org.name.toLowerCase();
            Object.values(org.tags).forEach(t => {
                if(typeof t === 'string') txt += " " + t.toLowerCase();
                else if(t && t.val) txt += " " + t.val.toLowerCase() + " " + (t.link||"").toLowerCase();
            });
            return searchGroups.some(group => {
                const terms = group.split(' ').filter(t => t);
                return terms.every(term => txt.includes(term));
            });
        }
        return true;
    });

    // Sort Organizations Alphabetically
    results = sortDataAlphabetically(results);

    // ... (KEEP REST OF RENDERTABLE FUNCTION THE SAME) ...
    if(document.getElementById('stats-count')) {
        document.getElementById('stats-count').innerText = `${results.length} Organizations`;
    }

    if (results.length === 0) { tbody.innerHTML = ''; empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');

    tbody.innerHTML = results.map(org => `
        <tr>
            <td class="col-fixed-name">${org.name}</td>
            <td>${renderLink(org.tags.twitter, 'twitter')}</td>
            <td>${renderLink(org.tags.linkedin, 'linkedin')}</td>
            <td>${renderLink(org.tags.facebook, 'facebook')}</td>
            <td>${renderLink(org.tags.instagram, 'instagram')}</td>
            <td>${renderLink(org.tags.website, 'website')}</td>
            <td class="col-action ${isAdmin?'':'hidden'}"><button class="btn-primary-action btn-sm" onclick="editOrg(${org.id})">Edit</button></td>
        </tr>
    `).join('');
}

// ... (KEEP REST OF THE JS FUNCTIONS THE SAME, APPLYING `sortDataAlphabetically()` TO MODAL RENDERERS) ...

function renderPopulateList() {
    const listId = document.getElementById('pop-src-list').value;
    const catId = document.getElementById('pop-src-cat').value;
    const container = document.getElementById('populate-check-list');
    let matches = db.orgs.filter(org => {
        // ... filter logic ...
        return true;
    });
    
    // Sort before rendering
    matches = sortDataAlphabetically(matches);
    
    if (matches.length === 0) { container.innerHTML = '<p class="small-text">No new organizations found.</p>'; return; }
    container.innerHTML = matches.map(org => `<label class="check-item"><input type="checkbox" value="${org.id}"> ${org.name}</label>`).join('');
}

function renderMetaList(){
    const render = (data, elementId, type) => {
        // Sort the lists/categories before rendering
        const sortedData = sortDataAlphabetically([...data]);
        document.getElementById(elementId).innerHTML = sortedData.filter(x => x.id !== 'master').map(item => `
            <li>
                <span style="font-weight:600;">${item.name}</span>
                <div style="display:flex; align-items:center;">
                    </div>
            </li>`).join('');
    };
    render(db.lists, 'list-manager-ul', 'lists'); render(db.cats, 'cat-manager-ul', 'cats');
}
