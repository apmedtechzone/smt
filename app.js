// ==========================================
// 1. DATABASE CONFIGURATION
// ==========================================
// Paste your saved 'const db = ...' here to restore data.
const db = {
    lists: [
        { id: 'master', name: '★ Master List' }, 
        { id: 'l2', name: 'Biovalley Project' }
    ],
    cats: [
        { id: 'c1', name: 'COE' },
        { id: 'c2', name: 'MILD' }
    ],
    orgs: [
        { 
            id: 1715420000000, 
            name: 'Andhra Pradesh MedTech Zone',
            listIds: ['master', 'l2'], 
            catIds: ['c1'],
            tags: {
                twitter: '@amtz_ltd',
                instagram: '@amtz_official',
                linkedin: { val: 'AMTZ Ltd', link: 'https://linkedin.com/company/amtz' },
                facebook: { val: 'AMTZ India', link: 'https://facebook.com/amtz' },
                website: { val: 'Visit Site', link: 'https://amtz.in' }
            }
        }
    ]
};

// ==========================================
// 2. STATE & INIT
// ==========================================
let isAdmin = false;
let editingId = null;
let pendingConflicts = []; 

document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    renderTable();
});

function initDropdowns() {
    const populate = (id, data, placeholder) => {
        const el = document.getElementById(id);
        const curr = el.value;
        el.innerHTML = placeholder ? `<option value="all">${placeholder}</option>` : '';
        data.forEach(i => el.innerHTML += `<option value="${i.id}">${i.name}</option>`);
        if(curr) el.value = curr;
    };
    populate('filter-list', db.lists, 'All Lists');
    populate('filter-cat', db.cats, 'All Categories');
    populate('bulk-list', db.lists, null);
    populate('bulk-cat', db.cats, null);
}

// ==========================================
// 3. RENDER ENGINE
// ==========================================
function renderTable() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const searchTerms = document.getElementById('search-bar').value.toLowerCase().split(' ').filter(s=>s);
    
    const tbody = document.getElementById('table-body');
    const emptyState = document.getElementById('empty-state');
    tbody.innerHTML = '';

    const results = db.orgs.filter(org => {
        if (listId !== 'all' && !org.listIds.includes(listId)) return false;
        if (catId !== 'all' && !org.catIds.includes(catId)) return false;
        
        if (searchTerms.length > 0) {
            let searchableText = org.name.toLowerCase();
            Object.values(org.tags).forEach(tag => {
                if(typeof tag === 'string') searchableText += " " + tag.toLowerCase();
                else if(tag && tag.val) searchableText += " " + tag.val.toLowerCase() + " " + (tag.link || "").toLowerCase();
            });
            return searchTerms.every(term => searchableText.includes(term));
        }
        return true;
    });

    if (results.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    results.forEach(org => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="col-fixed-name">${org.name}</td>
            <td>${renderLink(org.tags.twitter, 'twitter')}</td>
            <td>${renderLink(org.tags.linkedin, 'linkedin')}</td>
            <td>${renderLink(org.tags.facebook, 'facebook')}</td>
            <td>${renderLink(org.tags.instagram, 'instagram')}</td>
            <td>${renderLink(org.tags.website, 'website')}</td>
            <td class="col-action ${isAdmin?'':'hidden'}">
                <button class="btn-primary-action btn-sm" onclick="editOrg(${org.id})">Edit</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderLink(data, type) {
    if (!data) return '<span class="empty-cell">&minus;</span>';
    if (typeof data === 'string') {
        if(!data) return '<span class="empty-cell">&minus;</span>';
        const url = type === 'twitter' ? `https://x.com/${data.replace('@','')}` : `https://instagram.com/${data.replace('@','')}`;
        return `<a href="${url}" target="_blank" class="tag-link"><i class="fa-brands fa-${type}"></i> ${data}</a>`;
    } else {
        if(!data.val) return '<span class="empty-cell">&minus;</span>';
        return `<a href="${data.link || '#'}" target="_blank" class="tag-link"><i class="fa-${type==='website'?'solid fa-globe':'brands fa-'+type}"></i> ${data.val}</a>`;
    }
}

// ==========================================
// 4. BULK UPLOAD & CONFLICT RESOLUTION
// ==========================================
function analyzeBulkUpload() {
    const raw = document.getElementById('bulk-input').value;
    const targetList = document.getElementById('bulk-list').value;
    const targetCat = document.getElementById('bulk-cat').value;
    
    if(!raw.trim()) return alert("Please paste data first.");

    const rows = raw.split('\n');
    let created = 0;
    pendingConflicts = []; 

    rows.forEach((row, index) => {
        // Handle Pipe or Tab separation
        let cols = row.includes('\t') ? row.split('\t') : row.split('|');
        if(cols.length < 1) return;
        const name = cols[0]?.trim();
        if(!name) return;

        // Construct New Data Object
        const newOrgData = {
            name: name,
            // Always include Master + Target List
            listIds: ['master', targetList], 
            catIds: [targetCat],
            tags: {
                twitter: cols[1]?.trim() || "",
                linkedin: { val: cols[2]?.trim()?"Profile":"", link: cols[2]?.trim() || "" },
                facebook: { val: cols[3]?.trim()?"Page":"", link: cols[3]?.trim() || "" },
                instagram: cols[4]?.trim() || "",
                website: { val: cols[5]?.trim()?"Visit":"", link: cols[5]?.trim() || "" }
            }
        };

        // 1. CHECK MASTER DB FOR DUPLICATE NAME
        const existing = db.orgs.find(o => o.name.toLowerCase() === name.toLowerCase());

        if(existing) {
            // Conflict found! Push to resolution queue.
            pendingConflicts.push({ 
                existingRef: existing, // Reference to live object
                newData: newOrgData, 
                id: index 
            });
        } else {
            // Unique? Create immediately.
            db.orgs.push({ id: Date.now() + Math.random(), ...newOrgData });
            created++;
        }
    });

    closeModal('bulk-modal');

    if(pendingConflicts.length > 0) {
        renderConflicts();
        document.getElementById('conflict-count').innerText = pendingConflicts.length;
        openModal('conflict-modal');
    } else {
        alert(`Upload Complete!\nCreated: ${created} new organizations.`);
        renderTable();
    }
}

function renderConflicts() {
    const container = document.getElementById('conflict-list');
    container.innerHTML = pendingConflicts.map(item => `
        <div class="conflict-item" id="conf-${item.id}">
            <div class="conflict-info">
                <h4>${item.existingRef.name}</h4>
                <p><strong>Found in DB.</strong> Action will merge into new List/Cat.</p>
                <div style="font-size:0.8rem; margin-top:5px; color:#64748b;">
                    <strong>New Tags:</strong> TW: ${item.newData.tags.twitter || '-'} | WEB: ${item.newData.tags.website.link || '-'}
                </div>
            </div>
            <div class="conflict-actions">
                <button class="btn-secondary" onclick="resolveConflict(${item.id}, 'ignore')">Ignore</button>
                <button class="btn-overwrite" onclick="resolveConflict(${item.id}, 'overwrite')">Overwrite Tags</button>
            </div>
        </div>
    `).join('');
}

function resolveConflict(id, action) {
    const conflictIndex = pendingConflicts.findIndex(c => c.id === id);
    if(conflictIndex === -1) return;

    const item = pendingConflicts[conflictIndex];

    if (action === 'overwrite') {
        const org = item.existingRef; // LIVE reference to DB object

        // 1. MERGE LISTS (Keep old lists + Add new list)
        item.newData.listIds.forEach(l => { 
            if(!org.listIds.includes(l)) org.listIds.push(l); 
        });

        // 2. MERGE CATS (Keep old cats + Add new cat)
        item.newData.catIds.forEach(c => { 
            if(!org.catIds.includes(c)) org.catIds.push(c); 
        });

        // 3. OVERWRITE TAGS (Updates everywhere since ID is same)
        const t = item.newData.tags;
        if(t.twitter) org.tags.twitter = t.twitter;
        if(t.instagram) org.tags.instagram = t.instagram;
        
        // Only overwrite complex tags if link provided
        if(t.linkedin.link) org.tags.linkedin = t.linkedin;
        if(t.facebook.link) org.tags.facebook = t.facebook;
        if(t.website.link) org.tags.website = t.website;
    }

    // Remove from UI
    pendingConflicts.splice(conflictIndex, 1);
    const el = document.getElementById(`conf-${id}`);
    if(el) el.remove();
    document.getElementById('conflict-count').innerText = pendingConflicts.length;

    // Finish
    if(pendingConflicts.length === 0) {
        closeModal('conflict-modal');
        renderTable();
        alert("All conflicts resolved.");
    }
}

function resolveAll(action) {
    const all = [...pendingConflicts];
    all.forEach(c => resolveConflict(c.id, action));
}

// ==========================================
// 5. ADMIN & EDITING (Existing Logic)
// ==========================================
function login() {
    const e = document.getElementById('login-email').value;
    const p = document.getElementById('login-pass').value;
    if(e === 'saragadamteja.k@amtz.in' && p === '9989') {
        isAdmin = true;
        document.getElementById('admin-panel').classList.remove('hidden');
        document.getElementById('login-trigger').classList.add('hidden');
        document.getElementById('add-org-wrapper').classList.remove('hidden');
        document.querySelectorAll('.col-action').forEach(el=>el.classList.remove('hidden'));
        closeModal('login-modal');
        renderTable();
    } else alert('Invalid Credentials');
}
function logout() { location.reload(); }

function openOrgModal() {
    editingId = null;
    document.getElementById('edit-name').value = '';
    ['twitter','instagram'].forEach(k => document.getElementById(`tag-${k}`).value = '');
    ['linkedin','facebook','website'].forEach(k => {
        document.getElementById(`tag-${k}-val`).value = '';
        document.getElementById(`tag-${k}-link`).value = '';
    });
    renderCheckboxes(['master'], []); 
    openModal('org-modal');
}

function editOrg(id) {
    editingId = id;
    const org = db.orgs.find(o => o.id === id);
    document.getElementById('edit-name').value = org.name;
    document.getElementById('tag-twitter').value = org.tags.twitter || '';
    document.getElementById('tag-instagram').value = org.tags.instagram || '';
    ['linkedin','facebook','website'].forEach(k => {
        const t = org.tags[k] || {};
        document.getElementById(`tag-${k}-val`).value = t.val || '';
        document.getElementById(`tag-${k}-link`).value = t.link || '';
    });
    renderCheckboxes(org.listIds, org.catIds);
    openModal('org-modal');
}

function renderCheckboxes(selLists, selCats) {
    const build = (data, selected, elId) => {
        document.getElementById(elId).innerHTML = data.map(item => {
            const isMaster = item.id === 'master';
            const isChecked = selected.includes(item.id) || isMaster;
            return `<label class="check-item ${isMaster?'disabled':''}"><input type="checkbox" value="${item.id}" ${isChecked?'checked':''} ${isMaster?'disabled':''}> ${item.name}</label>`;
        }).join('');
    };
    build(db.lists, selLists, 'check-lists');
    build(db.cats, selCats, 'check-cats');
}

function saveOrg() {
    const name = document.getElementById('edit-name').value;
    if(!name) return alert('Name required');
    const listIds = Array.from(document.querySelectorAll('#check-lists input:checked')).map(cb=>cb.value);
    if(!listIds.includes('master')) listIds.push('master');
    const catIds = Array.from(document.querySelectorAll('#check-cats input:checked')).map(cb=>cb.value);
    const tags = {
        twitter: document.getElementById('tag-twitter').value.trim(),
        instagram: document.getElementById('tag-instagram').value.trim(),
        linkedin: { val: document.getElementById('tag-linkedin-val').value.trim(), link: document.getElementById('tag-linkedin-link').value.trim() },
        facebook: { val: document.getElementById('tag-facebook-val').value.trim(), link: document.getElementById('tag-facebook-link').value.trim() },
        website: { val: document.getElementById('tag-website-val').value.trim(), link: document.getElementById('tag-website-link').value.trim() }
    };
    if(editingId) {
        const org = db.orgs.find(o => o.id === editingId);
        org.name = name; org.listIds = listIds; org.catIds = catIds; org.tags = tags;
    } else {
        db.orgs.push({ id: Date.now(), name, listIds, catIds, tags });
    }
    renderTable(); closeModal('org-modal');
}

function deleteOrg() {
    if(!editingId || !confirm('Delete org?')) return;
    db.orgs = db.orgs.filter(o => o.id !== editingId);
    renderTable(); closeModal('org-modal');
}

function addMeta(type, inpId) {
    const name = document.getElementById(inpId).value;
    if(!name) return;
    db[type].push({ id: Date.now().toString(), name });
    document.getElementById(inpId).value = '';
    renderMetaList(); initDropdowns();
}
function renderMetaList() {
    const r = (d, id, t) => document.getElementById(id).innerHTML = d.filter(x=>x.id!=='master').map(i=>`<li>${i.name} <button class="close-btn" style="font-size:1rem" onclick="removeMeta('${t}','${i.id}')">&times;</button></li>`).join('');
    r(db.lists, 'list-manager-ul', 'lists'); r(db.cats, 'cat-manager-ul', 'cats');
}
function removeMeta(type, id) { db[type] = db[type].filter(i => i.id !== id); renderMetaList(); initDropdowns(); }
function copyConfig() { navigator.clipboard.writeText(`const db = ${JSON.stringify(db, null, 4)};`).then(()=>alert("Config copied!")); }
function copyColumn(type) {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const vals = db.orgs.filter(o => (listId==='all'||o.listIds.includes(listId)) && (catId==='all'||o.catIds.includes(catId))).map(o => {
        const t = o.tags[type];
        return (typeof t === 'string') ? t : (t?.val || "");
    }).filter(v=>v);
    if(!vals.length) return alert('No tags visible.');
    navigator.clipboard.writeText(vals.join('\n'));
}
function openModal(id) { document.getElementById(id).classList.remove('hidden'); if(id==='meta-modal') renderMetaList(); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
