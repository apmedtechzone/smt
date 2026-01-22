// ==========================================
// 1. CONFIGURATION (Paste your Saved Data Here)
// ==========================================
const db = {
    lists: [
        { id: 'l1', name: 'Master List' },
        { id: 'l2', name: 'Biovalley Project' }
    ],
    categories: [
        { id: 'c1', name: 'COE' },
        { id: 'c2', name: 'MILD' },
        { id: 'c3', name: 'BioPharma' }
    ],
    tags: [
        { id: 101, type: 'twitter', value: '@mywaltair' },
        { id: 102, type: 'linkedin', value: 'AMTZ Ltd', link: 'https://linkedin.com/company/amtz' }
    ],
    orgs: [
        { 
            id: 1, 
            name: 'Andhra Pradesh MedTech Zone', 
            listId: 'l1', 
            catId: 'c1',
            tags: { twitter: 101, linkedin: 102 }
        }
    ]
};

// ==========================================
// 2. STATE & INIT
// ==========================================
let isAdmin = false;
let currentEditingOrgId = null;
let tempTagMap = {};

document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    renderTable();
});

function populateDropdowns() {
    const fill = (id, data, placeholder) => {
        const el = document.getElementById(id);
        const current = el.value;
        el.innerHTML = placeholder ? `<option value="all">${placeholder}</option>` : '';
        data.forEach(item => el.innerHTML += `<option value="${item.id}">${item.name}</option>`);
        if(current) el.value = current;
    };
    fill('filter-list', db.lists, 'All Lists');
    fill('filter-cat', db.categories, 'All Categories');
    fill('edit-list', db.lists, null);
    fill('edit-cat', db.categories, null);
}

// ==========================================
// 3. CORE LOGIC (Render & Copy)
// ==========================================
function getFilteredOrgs() {
    const filterList = document.getElementById('filter-list').value;
    const filterCat = document.getElementById('filter-cat').value;
    const searchTerms = document.getElementById('search-bar').value.toLowerCase().split(',').map(s => s.trim()).filter(s => s);

    return db.orgs.filter(org => {
        if (filterList !== 'all' && org.listId !== filterList) return false;
        if (filterCat !== 'all' && org.catId !== filterCat) return false;
        if (searchTerms.length > 0) {
            return searchTerms.some(term => org.name.toLowerCase().includes(term));
        }
        return true;
    });
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    const filteredOrgs = getFilteredOrgs();

    if (filteredOrgs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">No records found.</td></tr>';
        return;
    }

    filteredOrgs.forEach(org => {
        const getTagHtml = (type) => {
            const tagId = org.tags[type];
            if (!tagId) return '<span class="empty-cell">-</span>';
            const tagData = db.tags.find(t => t.id === tagId);
            if (!tagData) return '<span class="empty-cell">Err</span>';

            let url = '#';
            if (type === 'twitter') url = `https://x.com/${tagData.value.replace('@','')}`;
            else if (type === 'instagram') url = `https://instagram.com/${tagData.value.replace('@','')}`;
            else url = tagData.link || '#';

            return `<a href="${url}" target="_blank" class="tag-link">${tagData.value}</a>`;
        };

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:bold;">${org.name}</td>
            <td>${getTagHtml('twitter')}</td>
            <td>${getTagHtml('linkedin')}</td>
            <td>${getTagHtml('facebook')}</td>
            <td>${getTagHtml('instagram')}</td>
            <td>${getTagHtml('website')}</td>
            <td class="admin-col ${isAdmin ? '' : 'hidden'}">
                <button class="btn-sm" onclick="editOrg(${org.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-sm" style="color:#dc2626;" onclick="deleteOrg(${org.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- NEW FUNCTION: COPY COLUMN ---
function copyColumn(type) {
    const filteredOrgs = getFilteredOrgs();
    const values = [];

    filteredOrgs.forEach(org => {
        const tagId = org.tags[type];
        if (tagId) {
            const tag = db.tags.find(t => t.id === tagId);
            if (tag && tag.value) {
                values.push(tag.value);
            }
        }
    });

    if (values.length === 0) {
        alert("No tags found in this column for the current view.");
        return;
    }

    const textToCopy = values.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`Copied ${values.length} ${type} tags to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// ==========================================
// 4. ADMIN & EDITING
// ==========================================
function login() {
    const e = document.getElementById('email').value;
    const p = document.getElementById('password').value;
    // Client-side auth (as requested)
    if(e === 'saragadamteja.k@amtz.in' && p === '9989') {
        isAdmin = true;
        document.getElementById('admin-controls').classList.remove('hidden');
        document.getElementById('login-btn').classList.add('hidden');
        document.getElementById('add-org-btn').classList.remove('hidden');
        document.querySelectorAll('.admin-col').forEach(el => el.classList.remove('hidden'));
        closeModal('login-modal');
        renderTable();
    } else alert('Invalid Credentials');
}

function logout() { location.reload(); }

function openOrgModal() {
    currentEditingOrgId = null;
    tempTagMap = {};
    document.getElementById('edit-name').value = '';
    ['twitter','linkedin','facebook','instagram','website'].forEach(type => {
        const v = document.getElementById(type.includes('twitter')||type.includes('instagram')?`tag-${type}`:`tag-${type}-val`);
        if(v) v.value='';
        const l = document.getElementById(`tag-${type}-link`);
        if(l) l.value='';
    });
    openModal('org-modal');
}

function editOrg(id) {
    currentEditingOrgId = id;
    const org = db.orgs.find(o => o.id === id);
    tempTagMap = { ...org.tags };

    document.getElementById('edit-org-id').value = org.id;
    document.getElementById('edit-name').value = org.name;
    document.getElementById('edit-list').value = org.listId;
    document.getElementById('edit-cat').value = org.catId;

    ['twitter','linkedin','facebook','instagram','website'].forEach(type => {
        const tagId = org.tags[type];
        const t = tagId ? db.tags.find(tag => tag.id === tagId) : null;
        if(type === 'twitter' || type === 'instagram') {
            document.getElementById(`tag-${type}`).value = t ? t.value : '';
        } else {
            document.getElementById(`tag-${type}-val`).value = t ? t.value : '';
            document.getElementById(`tag-${type}-link`).value = t ? (t.link || '') : '';
        }
    });
    openModal('org-modal');
}

function updateTag(type) {
    let val, link;
    if (type === 'twitter' || type === 'instagram') {
        val = document.getElementById(`tag-${type}`).value.trim();
        link = null;
    } else {
        val = document.getElementById(`tag-${type}-val`).value.trim();
        link = document.getElementById(`tag-${type}-link`).value.trim();
    }

    if (!val) {
        delete tempTagMap[type];
        alert(`Removed ${type} tag.`);
        return;
    }

    // Reuse existing Tag ID if value matches (Master DB logic)
    let existingTag = db.tags.find(t => t.type === type && t.value.toLowerCase() === val.toLowerCase());

    if (existingTag) {
        tempTagMap[type] = existingTag.id;
        if(link) existingTag.link = link; // Update link globally if changed
        alert(`Linked to existing tag (ID: ${existingTag.id})`);
    } else {
        const newId = Date.now() + Math.floor(Math.random()*1000);
        db.tags.push({ id: newId, type, value: val, link });
        tempTagMap[type] = newId;
        alert(`Created new tag (ID: ${newId})`);
    }
}

function saveOrgChanges() {
    const name = document.getElementById('edit-name').value;
    if (!name) return alert("Name required");

    const newData = {
        name,
        listId: document.getElementById('edit-list').value,
        catId: document.getElementById('edit-cat').value,
        tags: { ...tempTagMap }
    };

    if (currentEditingOrgId) {
        const org = db.orgs.find(o => o.id === currentEditingOrgId);
        Object.assign(org, newData);
    } else {
        db.orgs.push({ id: Date.now(), ...newData });
    }
    renderTable();
    closeModal('org-modal');
}

function deleteOrg(id) {
    if(confirm("Delete this organization?")) {
        db.orgs = db.orgs.filter(o => o.id !== id);
        renderTable();
    }
}

// List/Category Manager
function addItem(coll, inpId) {
    const val = document.getElementById(inpId).value;
    if(!val) return;
    db[coll].push({ id: Date.now().toString(), name: val });
    document.getElementById(inpId).value = '';
    renderManageLists();
    populateDropdowns();
}
function renderManageLists() {
    const r = (arr, id) => {
        const ul = document.getElementById(id);
        ul.innerHTML = '';
        arr.forEach(i => ul.innerHTML += `<li>${i.name} <button class="btn-sm" style="color:red" onclick="removeItem('${id}','${i.id}')">x</button></li>`);
    };
    r(db.lists, 'manage-lists-ul');
    r(db.categories, 'manage-cats-ul');
}
function removeItem(elId, itemId) {
    const coll = elId.includes('lists') ? 'lists' : 'categories';
    db[coll] = db[coll].filter(i => i.id !== itemId);
    renderManageLists();
    populateDropdowns();
}

// Utils
function openModal(id) { 
    document.getElementById(id).classList.remove('hidden'); 
    if(id === 'manage-lists-modal') renderManageLists();
}
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function copyDataToClipboard() {
    const str = `const db = ${JSON.stringify(db, null, 4)};`;
    navigator.clipboard.writeText(str).then(()=>alert("Config copied! Paste into app.js top section."));
}
