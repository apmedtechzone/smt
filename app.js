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
    if (localWork) {
        db = JSON.parse(localWork);
        // Data Migration: Ensure all orgs have a starredIn object
        db.orgs.forEach(o => { if(!o.starredIn) o.starredIn = {}; });
    }
}

// Variables
let editingId = null;
let pendingConflicts = []; 
let targetType = null; 
let targetId = null; 
let searchTimer = null; 

// ==========================================
// THEME MANAGEMENT
// ==========================================
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

// ==========================================
// SORTING UTILITIES
// ==========================================
function sortDataAlphabetically(data) {
    return data.sort((a, b) => {
        if (a.id === 'master') return -1;
        if (b.id === 'master') return 1;
        return a.name.localeCompare(b.name);
    });
}

// NEW: Sorts by Star Time (Descending) then Alphabetical
function sortTableData(data, currentListId) {
    return data.sort((a, b) => {
        // Only apply star sorting if we are viewing a specific list
        if (currentListId !== 'all') {
            const aStarTime = (a.starredIn && a.starredIn[currentListId]) ? a.starredIn[currentListId] : 0;
            const bStarTime = (b.starredIn && b.starredIn[currentListId]) ? b.starredIn[currentListId] : 0;
            
            // 1. Sort by Starred Time (Newest top)
            if (aStarTime !== bStarTime) {
                return bStarTime - aStarTime; 
            }
        }
        // 2. Sort Alphabetically
        return a.name.localeCompare(b.name);
    });
}

function initApp() {
    initTheme();
    initDropdowns();
    initBulkRows(20); 
    renderTable();
    if (isAdmin) updateUIForAdmin();
    
    document.getElementById('bulk-tbody').addEventListener('paste', handleGridPaste);
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape") document.querySelectorAll('.modal').forEach(m => closeModal(m.id));
    });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initApp);
else initApp();

function initDropdowns() {
    const populate = (id, data, ph) => {
        const el = document.getElementById(id);
        if(!el) return;
        const curr = el.value;
        el.innerHTML = ph ? `<option value="all">${ph}</option>` : '';
        sortDataAlphabetically([...data]).forEach(i => el.innerHTML += `<option value="${i.id}">${i.name}</option>`);
        if(curr) el.value = curr;
    };
    populate('filter-list', db.lists, 'All Lists');
    populate('filter-cat', db.cats, 'All Categories');
    populate('bulk-list', db.lists, null);
    populate('pop-src-list', db.lists, 'All Lists');
    populate('pop-src-cat', db.cats, 'All Categories');
}

// ==========================================
// 3. UTILITIES & TOASTS
// ==========================================
function saveDataLocally() { if (isAdmin) localStorage.setItem('amtz_db', JSON.stringify(db)); }

async function copyConfig() {
    saveDataLocally();
    try {
        showToast("Generating full code...", "success");
        const response = await fetch(window.location.href.split('?')[0].replace('index.html','') + 'app.js');
        if (!response.ok) throw new Error("Network response was not ok");
        let sourceCode = await response.text();
        const newDataString = `const defaultDB = ${JSON.stringify(db, null, 4)};`;
        const regex = /const defaultDB\s*=\s*\{[\s\S]*?\};/;
        if (regex.test(sourceCode)) {
            const newCode = sourceCode.replace(regex, newDataString);
            await navigator.clipboard.writeText(newCode);
            showToast("FULL CODE Copied! Paste to GitHub.", "success");
        } else {
            alert("Auto-update failed. Copying data only.");
            navigator.clipboard.writeText(newDataString);
        }
    } catch (err) {
        const fallbackCode = `const defaultDB = ${JSON.stringify(db, null, 4)};\n\n// PASTE THIS AT THE TOP OF APP.JS`;
        navigator.clipboard.writeText(fallbackCode);
        alert("Could not fetch source. Data copied manually.");
    }
}

function showToast(msg, type = "success") {
    const container = document.getElementById('toast-container');
    if(!container) return alert(msg);
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'circle-exclamation'}"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function debouncedRender() { clearTimeout(searchTimer); searchTimer = setTimeout(renderTable, 300); }

// ==========================================
// 4. RENDER ENGINE & STARRING
// ==========================================
function toggleStar(orgId, listId) {
    if (!isAdmin) return;
    const org = db.orgs.find(o => o.id === orgId);
    if (!org) return;
    if (!org.starredIn) org.starredIn = {};

    // Toggle logic: Remove if exists, Add current timestamp if it doesn't
    if (org.starredIn[listId]) {
        delete org.starredIn[listId];
        showToast("Removed from top", "success");
    } else {
        org.starredIn[listId] = Date.now();
        showToast("Starred to the top!", "success");
    }
    saveDataLocally();
    renderTable();
}

function renderTable() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const rawSearch = document.getElementById('search-bar').value.toLowerCase();
    const searchGroups = rawSearch.split(',').map(s => s.trim()).filter(s => s !== '');
    
    const tbody = document.getElementById('table-body');
    const empty = document.getElementById('empty-state');
    const total = db.orgs.length;
    
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

    // APPLY TIME & ALPHABETICAL SORTING
    results = sortTableData(results, listId);

    if(document.getElementById('stats-count')) {
        document.getElementById('stats-count').innerText = `${results.length} Organizations`;
        document.getElementById('stats-filter').innerText = (listId === 'all' && catId === 'all' && searchGroups.length === 0) ? `Total Database: ${total}` : `Filtered from ${total}`;
    }

    if (results.length === 0) { tbody.innerHTML = ''; empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');

    tbody.innerHTML = results.map(org => {
        // Determine Star UI
        const isStarred = (listId !== 'all') && org.starredIn && org.starredIn[listId];
        const starHTML = (listId !== 'all') 
            ? `<button class="btn-star ${isStarred ? 'starred' : ''}" onclick="toggleStar(${org.id}, '${listId}')" ${isAdmin ? '' : 'disabled'} title="${isAdmin ? 'Star this org in this list' : 'Starred Org'}"><i class="fa-solid fa-star"></i></button>` 
            : '';

        return `
        <tr>
            <td class="col-fixed-name">
                <div style="display:flex; align-items:center; gap:8px;">
                    ${starHTML}
                    <span>${org.name}</span>
                </div>
            </td>
            <td>${renderLink(org.tags.twitter, 'twitter')}</td>
            <td>${renderLink(org.tags.linkedin, 'linkedin')}</td>
            <td>${renderLink(org.tags.facebook, 'facebook')}</td>
            <td>${renderLink(org.tags.instagram, 'instagram')}</td>
            <td>${renderLink(org.tags.website, 'website')}</td>
            <td class="col-action ${isAdmin?'':'hidden'}"><button class="btn-primary-action btn-sm" onclick="editOrg(${org.id})">Edit</button></td>
        </tr>`;
    }).join('');
}

function renderLink(d, t) {
    if(!d) return '<span class="empty-cell">&minus;</span>';
    const text = (typeof d === 'string') ? d : d.val;
    if(!text) return '<span class="empty-cell">&minus;</span>';

    const fullText = text;
    let displayText = fullText;
    if(fullText.length > 15) { displayText = fullText.substring(0, 12) + '...'; }

    let url = '#';
    if(typeof d === 'string') {
        url = t === 'twitter' ? `https://x.com/${d.replace('@','')}` : `https://instagram.com/${d.replace('@','')}`;
    } else { url = d.link || '#'; }
    const icon = t === 'website' ? 'fa-solid fa-globe' : `fa-brands fa-${t}`;
    return `<a href="${url}" target="_blank" class="tag-link" title="${fullText}"><i class="${icon}"></i> <span class="tag-truncate">${displayText}</span></a>`;
}

// ... (CSV Export and other unchanged utility functions) ...
function exportToCSV() { /* same as before */ }
function resetFilters() { document.getElementById('filter-list').value = 'all'; document.getElementById('filter-cat').value = 'all'; document.getElementById('search-bar').value = ''; renderTable(); }

// ==========================================
// 6. BULK UPLOAD (BUG FIXED)
// ==========================================
function initBulkRows(count) { document.getElementById('bulk-tbody').innerHTML = ''; addBulkRows(count); }
function addBulkRows(count) {
    const tbody = document.getElementById('bulk-tbody');
    for(let i=0; i<count; i++) {
        tbody.innerHTML += `
        <tr class="bulk-row">
            <td><input type="text" class="input-cell" placeholder="Name"></td>
            <td><input type="text" class="input-cell" placeholder="@handle"></td>
            <td><input type="text" class="input-cell" placeholder="@handle"></td>
            <td><input type="text" class="input-cell" placeholder="Full Link"></td>
            <td><input type="text" class="input-cell" placeholder="@handle"></td>
            <td><input type="text" class="input-cell" placeholder="Full Link"></td>
            <td><input type="text" class="input-cell" placeholder="@handle"></td>
            <td><input type="text" class="input-cell" placeholder="Full Link"></td>
        </tr>`;
    }
}
function handleGridPaste(e) { /* same logic */ }
function resetBulkGrid() { if(confirm("Discard all changes in grid?")) initBulkRows(20); }
function validateTag(val) { return val.trim().startsWith('@') ? val.trim() : ''; }
function ensureHandle(val) { val = val.trim(); if (!val) return ''; return val.startsWith('@') ? val : '@' + val; }

function analyzeBulkUpload() {
    const rows = document.querySelectorAll('.bulk-row');
    const targetList = document.getElementById('bulk-list').value;
    let created = 0;
    pendingConflicts = [];
    const targetListIds = ['master'];
    if(targetList !== 'master') targetListIds.push(targetList);

    rows.forEach((row, idx) => {
        const inputs = row.querySelectorAll('input');
        const name = inputs[0].value.trim();
        if(!name) return;
        
        const newDat = {
            name: name,
            // THE FIX: Spread operator creates a NEW array instance for every row.
            listIds: [...targetListIds], 
            catIds: [],
            starredIn: {}, // Ensure new orgs can be starred
            tags: {
                twitter: validateTag(inputs[1].value),
                linkedin: { val: validateTag(inputs[2].value), link: inputs[3].value.trim() },
                facebook: { val: validateTag(inputs[4].value), link: inputs[5].value.trim() },
                instagram: validateTag(inputs[6].value),
                website: { val: inputs[7].value.trim() ? "Visit Site" : "", link: inputs[7].value.trim() }
            }
        };
        const existing = db.orgs.find(o => o.name.toLowerCase() === name.toLowerCase());
        if(existing) pendingConflicts.push({ existingRef: existing, newData: newDat, id: idx });
        else { db.orgs.push({ id: Date.now()+Math.random(), ...newDat }); created++; }
    });
    closeModal('bulk-modal');
    if(pendingConflicts.length > 0) { renderConflicts(); document.getElementById('conflict-count').innerText=pendingConflicts.length; openModal('conflict-modal'); }
    else { showToast(`Imported ${created} organizations`); renderTable(); initBulkRows(20); saveDataLocally(); }
}

// ... Rest of the Modal/Admin functions remain identical to the previous working version ...
function renderConflicts() { /* ... */ }
function resolveConflict(id, action) { /* ... */ }
function resolveAll(act) { /* ... */ }
function login() { /* ... */ }
// ... (All other functions retained for brevity as they did not change)
