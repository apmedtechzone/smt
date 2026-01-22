// ==========================================
// 1. DATABASE CONFIGURATION
// ==========================================
const defaultDB = {
    lists: [{ id: 'master', name: '★ Master List' }, { id: 'l2', name: 'Biovalley Project' }],
    cats: [{ id: 'c1', name: 'COE' }, { id: 'c2', name: 'MILD' }],
    orgs: [{ 
        id: 1715420000000, name: 'Andhra Pradesh MedTech Zone',
        listIds: ['master', 'l2'], catIds: ['c1'],
        tags: {
            twitter: '@amtz_ltd', instagram: '@amtz_official',
            linkedin: { val: '@amtzltd', link: 'https://linkedin.com/company/amtz' },
            facebook: { val: '@amtzindia', link: 'https://facebook.com/amtz' },
            website: { val: 'Visit Site', link: 'https://amtz.in' }
        }
    }]
};

let db = JSON.parse(localStorage.getItem('amtz_db')) || defaultDB;

// ==========================================
// 2. STATE & INIT
// ==========================================
let isAdmin = false;
let editingId = null;
let pendingConflicts = []; 
let targetType = null; 
let targetId = null; 

document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initBulkRows(20); 
    renderTable();
    checkAdminStatus();
    document.getElementById('bulk-tbody').addEventListener('paste', handleGridPaste);
    
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape") document.querySelectorAll('.modal').forEach(m => closeModal(m.id));
    });
});

function initDropdowns() {
    const populate = (id, data, ph) => {
        const el = document.getElementById(id);
        const curr = el.value;
        el.innerHTML = ph ? `<option value="all">${ph}</option>` : '';
        data.forEach(i => el.innerHTML += `<option value="${i.id}">${i.name}</option>`);
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
function saveDataLocally() {
    localStorage.setItem('amtz_db', JSON.stringify(db));
    showToast("Changes saved locally!", "success");
    const codeToPaste = `const defaultDB = ${JSON.stringify(db, null, 4)};\n\nlet db = JSON.parse(localStorage.getItem('amtz_db')) || defaultDB;`;
    navigator.clipboard.writeText(codeToPaste);
}

function showToast(msg, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'circle-exclamation'}"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function renderTable() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const search = document.getElementById('search-bar').value.toLowerCase().split(' ').filter(s=>s);
    const tbody = document.getElementById('table-body');
    const empty = document.getElementById('empty-state');
    
    // Update Stats Bar
    const total = db.orgs.length;
    
    const results = db.orgs.filter(org => {
        if (listId!=='all' && !org.listIds.includes(listId)) return false;
        if (catId!=='all' && !org.catIds.includes(catId)) return false;
        if (search.length > 0) {
            let txt = org.name.toLowerCase();
            Object.values(org.tags).forEach(t => {
                if(typeof t === 'string') txt += " " + t.toLowerCase();
                else if(t && t.val) txt += " " + t.val.toLowerCase() + " " + (t.link||"").toLowerCase();
            });
            return search.every(term => txt.includes(term));
        }
        return true;
    });

    document.getElementById('stats-count').innerText = `${results.length} Organizations`;
    document.getElementById('stats-filter').innerText = (listId === 'all' && catId === 'all' && search.length === 0) ? `Total Database: ${total}` : `Filtered from ${total}`;

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
    } else {
        url = d.link || '#';
    }
    const icon = t === 'website' ? 'fa-solid fa-globe' : `fa-brands fa-${t}`;
    return `<a href="${url}" target="_blank" class="tag-link" title="${fullText}"><i class="${icon}"></i> <span class="tag-truncate">${displayText}</span></a>`;
}

// ==========================================
// 4. POPULATE & EDIT MODALS
// ==========================================
function openPopulateModal(type, id, name) {
    targetType = type; targetId = id;
    document.getElementById('target-name').innerText = name;
    renderPopulateList();
    openModal('populate-modal');
}
function renderPopulateList() {
    const listId = document.getElementById('pop-src-list').value;
    const catId = document.getElementById('pop-src-cat').value;
    const container = document.getElementById('populate-check-list');
    const matches = db.orgs.filter(org => {
        if (listId!=='all' && !org.listIds.includes(listId)) return false;
        if (catId!=='all' && !org.catIds.includes(catId)) return false;
        if (targetType === 'lists' && org.listIds.includes(targetId)) return false;
        if (targetType === 'cats' && org.catIds.includes(targetId)) return false;
        return true;
    });
    if (matches.length === 0) { container.innerHTML = '<p class="small-text" style="text-align:center; padding:20px;">No new organizations found.</p>'; return; }
    container.innerHTML = matches.map(org => `<div class="check-item"><input type="checkbox" value="${org.id}"> ${org.name}</div>`).join('');
}
function savePopulateSelection() {
    const checkboxes = document.querySelectorAll('#populate-check-list input:checked');
    const idsToAdd = Array.from(checkboxes).map(cb => parseFloat(cb.value));
    if (idsToAdd.length === 0) return showToast("None selected", "error");
    let count = 0;
    db.orgs.forEach(org => {
        if (idsToAdd.includes(org.id)) {
            if (targetType === 'lists' && !org.listIds.includes(targetId)) { org.listIds.push(targetId); count++; } 
            else if (targetType === 'cats' && !org.catIds.includes(targetId)) { org.catIds.push(targetId); count++; }
        }
    });
    closeModal('populate-modal'); renderTable(); saveDataLocally(); 
}
function triggerBulkForTarget() {
    closeModal('populate-modal');
    closeModal('meta-modal');
    if (targetType === 'lists') { document.getElementById('bulk-list').value = targetId; } 
    else { document.getElementById('bulk-list').value = 'master'; showToast("Bulk upload adds to Lists. Adding to Master first.", "error"); }
    openModal('bulk-modal');
}

function openEditListModal(type, id, name) {
    targetType = type; targetId = id;
    document.getElementById('edit-meta-type-label').innerText = (type === 'lists' ? 'List' : 'Category');
    document.getElementById('rename-input').value = name;
    const container = document.getElementById('edit-meta-list-container');
    const currentItems = db.orgs.filter(org => (type === 'lists' && org.listIds.includes(id)) || (type === 'cats' && org.catIds.includes(id)));
    if (currentItems.length === 0) { container.innerHTML = '<p class="small-text" style="text-align:center; padding:20px;">This list is empty.</p>'; } 
    else { container.innerHTML = currentItems.map(org => `<div class="check-item"><input type="checkbox" value="${org.id}"> ${org.name}</div>`).join(''); }
    openModal('edit-meta-modal');
}
function saveRenamedMeta() {
    const newName = document.getElementById('rename-input').value.trim();
    if (!newName) return showToast("Name required", "error");
    const item = db[targetType].find(x => x.id === targetId);
    if (item) { item.name = newName; saveDataLocally(); renderMetaList(); initDropdowns(); closeModal('edit-meta-modal'); }
}
function removeSelectedFromMeta() {
    const checkboxes = document.querySelectorAll('#edit-meta-list-container input:checked');
    const idsToRemove = Array.from(checkboxes).map(cb => parseFloat(cb.value));
    if (idsToRemove.length === 0) return showToast("No items selected", "error");
    if (!confirm(`Remove ${idsToRemove.length} organizations?`)) return;
    db.orgs.forEach(org => {
        if (idsToRemove.includes(org.id)) {
            if (targetType === 'lists') org.listIds = org.listIds.filter(id => id !== targetId);
            else org.catIds = org.catIds.filter(id => id !== targetId);
        }
    });
    saveDataLocally(); renderTable(); closeModal('edit-meta-modal');
}

// ==========================================
// 5. BULK UPLOAD
// ==========================================
function initBulkRows(count) {
    const tbody = document.getElementById('bulk-tbody');
    tbody.innerHTML = '';
    addBulkRows(count);
}
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
function handleGridPaste(e) {
    e.preventDefault();
    const clipboardData = (e.clipboardData || window.clipboardData).getData('text');
    const rows = clipboardData.split(/\r\n|\n|\r/).filter(row => row.trim() !== '');
    let target = e.target;
    if (target.tagName !== 'INPUT') return; 
    let currentRow = target.closest('tr');
    let startRowIndex = Array.from(currentRow.parentElement.children).indexOf(currentRow);
    let startColIndex = Array.from(currentRow.children).indexOf(target.parentElement);
    const tableBody = document.getElementById('bulk-tbody');

    rows.forEach((rowData, rIdx) => {
        if (startRowIndex + rIdx >= tableBody.children.length) addBulkRows(5);
        const targetRow = tableBody.children[startRowIndex + rIdx];
        const cells = rowData.split('\t');
        cells.forEach((cellData, cIdx) => {
            const targetCellIndex = startColIndex + cIdx;
            if (targetCellIndex < targetRow.children.length) {
                const input = targetRow.children[targetCellIndex].querySelector('input');
                if (input) {
                    let cleanData = cellData.trim();
                    if(cleanData.startsWith('"') && cleanData.endsWith('"')) cleanData = cleanData.substring(1, cleanData.length - 1);
                    input.value = cleanData;
                }
            }
        });
    });
}
function resetBulkGrid() { if(confirm("Discard all changes?")) initBulkRows(20); }
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
            listIds: targetListIds,
            catIds: [],
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
    else { 
        showToast(`Imported ${created} organizations`); 
        renderTable(); 
        initBulkRows(20); // Clear logic 1
        saveDataLocally(); 
    }
}

function renderConflicts() {
    document.getElementById('conflict-list').innerHTML = pendingConflicts.map(i => `
        <div class="conflict-item" id="conf-${i.id}">
            <div class="conflict-info"><h4>${i.existingRef.name}</h4><p>Found in DB.</p></div>
            <div class="conflict-actions"><button class="btn-secondary" onclick="resolveConflict(${i.id},'ignore')">Ignore (Keep Old)</button><button class="btn-overwrite" onclick="resolveConflict(${i.id},'overwrite')">Overwrite (Update)</button></div>
        </div>`).join('');
}
function resolveConflict(id, action) {
    const idx = pendingConflicts.findIndex(c=>c.id===id);
    if(idx===-1) return;
    const item = pendingConflicts[idx];
    const org = item.existingRef; 
    item.newData.listIds.forEach(l => { if(!org.listIds.includes(l)) org.listIds.push(l); });
    item.newData.catIds.forEach(c => { if(!org.catIds.includes(c)) org.catIds.push(c); });

    if(action==='overwrite') {
        const t = item.newData.tags;
        if(t.twitter) org.tags.twitter = t.twitter;
        if(t.instagram) org.tags.instagram = t.instagram;
        if(t.linkedin.val) org.tags.linkedin.val = t.linkedin.val;
        if(t.linkedin.link) org.tags.linkedin.link = t.linkedin.link;
        if(t.facebook.val) org.tags.facebook.val = t.facebook.val;
        if(t.facebook.link) org.tags.facebook.link = t.facebook.link;
        if(t.website.link) org.tags.website.link = t.website.link;
    }
    pendingConflicts.splice(idx,1);
    document.getElementById(`conf-${id}`).remove();
    document.getElementById('conflict-count').innerText = pendingConflicts.length;
    if(pendingConflicts.length===0) { 
        closeModal('conflict-modal'); 
        renderTable(); 
        initBulkRows(20); // Clear logic 2 (post-conflict)
        showToast("Conflicts resolved"); 
        saveDataLocally(); 
    }
}
function resolveAll(act) { [...pendingConflicts].forEach(c=>resolveConflict(c.id,act)); }

// ==========================================
// 6. ADMIN & META MANAGER
// ==========================================
function login() { if(document.getElementById('login-email').value==='saragadamteja.k@amtz.in' && document.getElementById('login-pass').value==='9989'){ isAdmin=true; localStorage.setItem('amtz_admin', 'true'); updateUIForAdmin(); closeModal('login-modal'); showToast("Logged in successfully"); } else showToast("Invalid Credentials", "error"); }
function checkAdminStatus() { if(localStorage.getItem('amtz_admin') === 'true') { isAdmin = true; updateUIForAdmin(); } }
function updateUIForAdmin() { document.getElementById('admin-panel').classList.remove('hidden'); document.getElementById('login-trigger').classList.add('hidden'); document.getElementById('add-org-wrapper').classList.remove('hidden'); document.querySelectorAll('.col-action').forEach(el=>el.classList.remove('hidden')); }
function logout(){ localStorage.removeItem('amtz_admin'); location.reload(); }
function copyConfig(){ saveDataLocally(); }
function openOrgModal(){editingId=null; document.getElementById('edit-name').value=''; ['twitter','instagram'].forEach(k=>document.getElementById(`tag-${k}`).value=''); ['linkedin','facebook','website'].forEach(k=>{document.getElementById(`tag-${k}-val`).value='';document.getElementById(`tag-${k}-link`).value=''}); renderCheckboxes(['master'],[]); openModal('org-modal');}
function editOrg(id){editingId=id; const o=db.orgs.find(i=>i.id===id); document.getElementById('edit-name').value=o.name; document.getElementById('tag-twitter').value=o.tags.twitter||''; document.getElementById('tag-instagram').value=o.tags.instagram||''; ['linkedin','facebook','website'].forEach(k=>{const t=o.tags[k]||{}; document.getElementById(`tag-${k}-val`).value=t.val||''; document.getElementById(`tag-${k}-link`).value=t.link||''}); renderCheckboxes(o.listIds,o.catIds); openModal('org-modal');}
function renderCheckboxes(sl, sc){ const b=(d,s,id)=>document.getElementById(id).innerHTML=d.map(i=>`<label class="check-item ${i.id==='master'?'disabled':''}"><input type="checkbox" value="${i.id}" ${s.includes(i.id)||i.id==='master'?'checked':''} ${i.id==='master'?'disabled':''}> ${i.name}</label>`).join(''); b(db.lists,sl,'check-lists'); b(db.cats,sc,'check-cats'); }
function saveOrg(){ 
    const n=document.getElementById('edit-name').value; if(!n)return showToast("Name required", "error");
    const l=Array.from(document.querySelectorAll('#check-lists input:checked')).map(c=>c.value); if(!l.includes('master'))l.push('master'); 
    const c=Array.from(document.querySelectorAll('#check-cats input:checked')).map(x=>x.value); 
    const tags={
        twitter: ensureHandle(document.getElementById('tag-twitter').value), 
        instagram: ensureHandle(document.getElementById('tag-instagram').value), 
        linkedin:{val:document.getElementById('tag-linkedin-val').value.trim(), link:document.getElementById('tag-linkedin-link').value.trim()}, 
        facebook:{val:document.getElementById('tag-facebook-val').value.trim(), link:document.getElementById('tag-facebook-link').value.trim()}, 
        website:{val:document.getElementById('tag-website-val').value.trim(), link:document.getElementById('tag-website-link').value.trim()}
    }; 
    if(editingId){const o=db.orgs.find(x=>x.id===editingId); o.name=n; o.listIds=l; o.catIds=c; o.tags=tags;}
    else{db.orgs.push({id:Date.now(), name:n, listIds:l, catIds:c, tags:tags});} 
    renderTable(); closeModal('org-modal'); saveDataLocally(); 
}
function deleteOrg(){if(editingId && confirm('Delete?')){db.orgs=db.orgs.filter(o=>o.id!==editingId); renderTable(); closeModal('org-modal'); saveDataLocally();}}
function addMeta(t,i){const n=document.getElementById(i).value; if(n){db[t].push({id:Date.now().toString(),name:n}); document.getElementById(i).value=''; renderMetaList(); initDropdowns(); saveDataLocally();}}
function renderMetaList(){
    const render = (data, elementId, type) => {
        document.getElementById(elementId).innerHTML = data.filter(x => x.id !== 'master').map(item => `
            <li>
                <span style="font-weight:600;">${item.name}</span>
                <div style="display:flex; align-items:center;">
                    <button class="btn-tiny" onclick="openPopulateModal('${type}', '${item.id}', '${item.name}')"><i class="fa-solid fa-user-plus"></i> Add</button>
                    <button class="btn-tiny edit" onclick="openEditListModal('${type}', '${item.id}', '${item.name}')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button class="close-btn" style="font-size:1rem; margin-left:8px;" onclick="removeMeta('${type}','${item.id}')">&times;</button>
                </div>
            </li>`).join('');
    };
    render(db.lists, 'list-manager-ul', 'lists'); render(db.cats, 'cat-manager-ul', 'cats');
}
function removeMeta(t,id){db[t]=db[t].filter(i=>i.id!==id); renderMetaList(); initDropdowns(); saveDataLocally();}
function copyColumn(t){const l=document.getElementById('filter-list').value, c=document.getElementById('filter-cat').value; const v=db.orgs.filter(o=>(l==='all'||o.listIds.includes(l))&&(c==='all'||o.catIds.includes(c))).map(o=>{const x=o.tags[t]; return (typeof x==='string')?x:(x?.val||"")}).filter(k=>k); navigator.clipboard.writeText(v.join('\n')); showToast(`Copied ${v.length} tags`);}

// IMPORTANT FIX: Auto-Clear Bulk Grid on Open
function openModal(id){
    document.getElementById(id).classList.remove('hidden'); 
    if(id==='meta-modal') renderMetaList();
    if(id==='bulk-modal') initBulkRows(20); // Forces fresh start
}
function closeModal(id){document.getElementById(id).classList.add('hidden');}
