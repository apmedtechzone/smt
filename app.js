// ==========================================
// 1. DATABASE CONFIGURATION
// ==========================================
const db = {
    lists: [
        { id: 'l1', name: 'Master List' },
        { id: 'l2', name: 'Biovalley Project' }
    ],
    cats: [
        { id: 'c1', name: 'COE' },
        { id: 'c2', name: 'MILD' },
        { id: 'c3', name: 'BioPharma' }
    ],
    // The "Atom": Organization contains EVERYTHING about itself.
    orgs: [
        { 
            id: 1715420000000, 
            name: 'Andhra Pradesh MedTech Zone',
            // Arrays allow presence in multiple lists/cats
            listIds: ['l1', 'l2'], 
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

document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    renderTable();
});

function initDropdowns() {
    // Populate Filter Dropdowns
    const populate = (id, data, placeholder) => {
        const el = document.getElementById(id);
        const curr = el.value;
        el.innerHTML = `<option value="all">${placeholder}</option>` + 
            data.map(i => `<option value="${i.id}">${i.name}</option>`).join('');
        if(curr) el.value = curr;
    };
    populate('filter-list', db.lists, 'All Lists');
    populate('filter-cat', db.cats, 'All Categories');
}

// ==========================================
// 3. RENDER LOGIC
// ==========================================
function renderTable() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const search = document.getElementById('search-bar').value.toLowerCase().split(',').map(s=>s.trim()).filter(s=>s);
    
    const tbody = document.getElementById('table-body');
    const noRes = document.getElementById('no-results');
    tbody.innerHTML = '';

    // Filter Logic
    const results = db.orgs.filter(org => {
        // Must contain the selected list ID (if not 'all')
        if (listId !== 'all' && !org.listIds.includes(listId)) return false;
        // Must contain the selected cat ID (if not 'all')
        if (catId !== 'all' && !org.catIds.includes(catId)) return false;
        // Search
        if (search.length > 0) {
            return search.some(term => org.name.toLowerCase().includes(term));
        }
        return true;
    });

    if (results.length === 0) {
        noRes.classList.remove('hidden');
        return;
    }
    noRes.classList.add('hidden');

    // Build Rows
    results.forEach(org => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="col-name">${org.name}</td>
            <td>${renderLink(org.tags.twitter, 'twitter')}</td>
            <td>${renderLink(org.tags.linkedin, 'linkedin')}</td>
            <td>${renderLink(org.tags.facebook, 'facebook')}</td>
            <td>${renderLink(org.tags.instagram, 'instagram')}</td>
            <td>${renderLink(org.tags.website, 'website')}</td>
            <td class="col-action ${isAdmin?'':'hidden'}">
                <button class="btn-sec btn-sm" onclick="editOrg(${org.id})"><i class="fa-solid fa-pen"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderLink(data, type) {
    if (!data) return '<span class="tag-empty">&minus;</span>';
    
    // For Twitter/Insta (Simple String)
    if (typeof data === 'string') {
        if(!data) return '<span class="tag-empty">&minus;</span>';
        const url = type === 'twitter' ? `https://x.com/${data.replace('@','')}` 
                  : `https://instagram.com/${data.replace('@','')}`;
        return `<a href="${url}" target="_blank" class="tag-link"><i class="fa-brands fa-${type}"></i> ${data}</a>`;
    } 
    // For FB/LinkedIn/Web (Object with val/link)
    else {
        if(!data.val) return '<span class="tag-empty">&minus;</span>';
        return `<a href="${data.link || '#'}" target="_blank" class="tag-link">
            <i class="fa-${type==='website'?'solid fa-globe':'brands fa-'+type}"></i> ${data.val}
        </a>`;
    }
}

// ==========================================
// 4. ADMIN & EDITING
// ==========================================
function login() {
    const e = document.getElementById('login-email').value;
    const p = document.getElementById('login-pass').value;
    if(e === 'saragadamteja.k@amtz.in' && p === '9989') {
        isAdmin = true;
        document.getElementById('admin-panel').classList.remove('hidden');
        document.getElementById('login-trigger').classList.add('hidden');
        document.getElementById('add-btn').classList.remove('hidden');
        document.querySelectorAll('.col-action').forEach(el=>el.classList.remove('hidden'));
        closeModal('login-modal');
        renderTable();
    } else alert('Invalid Credentials');
}
function logout() { location.reload(); }

// --- Organization Editor ---
function openOrgModal() {
    editingId = null;
    document.getElementById('edit-name').value = '';
    
    // Clear Tags
    ['twitter','instagram'].forEach(k => document.getElementById(`tag-${k}`).value = '');
    ['linkedin','facebook','website'].forEach(k => {
        document.getElementById(`tag-${k}-val`).value = '';
        document.getElementById(`tag-${k}-link`).value = '';
    });

    renderCheckboxes([], []); // Empty checks
    openModal('org-modal');
}

function editOrg(id) {
    editingId = id;
    const org = db.orgs.find(o => o.id === id);
    
    document.getElementById('edit-name').value = org.name;
    
    // Fill Tags
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

// Render Multi-Select Checkboxes
function renderCheckboxes(selLists, selCats) {
    const build = (data, selected, containerId, prefix) => {
        const container = document.getElementById(containerId);
        container.innerHTML = data.map(item => `
            <label class="checkbox-item">
                <input type="checkbox" value="${item.id}" ${selected.includes(item.id)?'checked':''}>
                ${item.name}
            </label>
        `).join('');
    };
    build(db.lists, selLists, 'check-lists');
    build(db.cats, selCats, 'check-cats');
}

function saveOrg() {
    const name = document.getElementById('edit-name').value;
    if(!name) return alert('Organization name required');

    // Gather Checkboxes
    const getChecked = (id) => Array.from(document.querySelectorAll(`#${id} input:checked`)).map(cb => cb.value);
    const listIds = getChecked('check-lists');
    const catIds = getChecked('check-cats');

    // Gather Tags
    const tags = {
        twitter: document.getElementById('tag-twitter').value.trim(),
        instagram: document.getElementById('tag-instagram').value.trim(),
        linkedin: { 
            val: document.getElementById('tag-linkedin-val').value.trim(), 
            link: document.getElementById('tag-linkedin-link').value.trim() 
        },
        facebook: { 
            val: document.getElementById('tag-facebook-val').value.trim(), 
            link: document.getElementById('tag-facebook-link').value.trim() 
        },
        website: { 
            val: document.getElementById('tag-website-val').value.trim(), 
            link: document.getElementById('tag-website-link').value.trim() 
        }
    };

    if(editingId) {
        const org = db.orgs.find(o => o.id === editingId);
        org.name = name;
        org.listIds = listIds;
        org.catIds = catIds;
        org.tags = tags;
    } else {
        db.orgs.push({
            id: Date.now(),
            name, listIds, catIds, tags
        });
    }
    
    renderTable();
    closeModal('org-modal');
}

function deleteOrg() {
    if(!editingId) return;
    if(confirm('Delete this organization permanently?')) {
        db.orgs = db.orgs.filter(o => o.id !== editingId);
        renderTable();
        closeModal('org-modal');
    }
}

// --- Meta Manager (Lists/Cats) ---
function addMeta(type, inputId) {
    const name = document.getElementById(inputId).value;
    if(!name) return;
    db[type].push({ id: Date.now().toString(), name });
    document.getElementById(inputId).value = '';
    renderMetaManager();
    initDropdowns();
}

function renderMetaManager() {
    const draw = (arr, id, type) => {
        document.getElementById(id).innerHTML = arr.map(i => `
            <li>${i.name} <button class="btn-text" style="color:red" onclick="removeMeta('${type}','${i.id}')">&times;</button></li>
        `).join('');
    };
    draw(db.lists, 'list-manager-ul', 'lists');
    draw(db.cats, 'cat-manager-ul', 'cats');
}

function removeMeta(type, id) {
    db[type] = db[type].filter(i => i.id !== id);
    renderMetaManager();
    initDropdowns();
}

// ==========================================
// 5. UTILITIES
// ==========================================
function copyColumn(type) {
    // Determine data source based on current view filters
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    
    const visibleOrgs = db.orgs.filter(org => {
        if (listId !== 'all' && !org.listIds.includes(listId)) return false;
        if (catId !== 'all' && !org.catIds.includes(catId)) return false;
        return true;
    });

    const values = [];
    visibleOrgs.forEach(org => {
        const t = org.tags[type];
        if(!t) return;
        if(typeof t === 'string' && t) values.push(t);
        else if(t.val) values.push(t.val);
    });

    if(values.length === 0) return alert('No tags visible in this column.');
    
    navigator.clipboard.writeText(values.join('\n')).then(() => {
        const btn = document.querySelector(`button[onclick="copyColumn('${type}')"]`);
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => btn.innerHTML = original, 1500);
    });
}

function copyConfig() {
    const code = `const db = ${JSON.stringify(db, null, 4)};`;
    navigator.clipboard.writeText(code).then(() => alert("Configuration copied! Paste this into the top of app.js to save changes permanently."));
}

function openModal(id) { 
    document.getElementById(id).classList.remove('hidden'); 
    if(id === 'manage-meta-modal') renderMetaManager();
}
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
