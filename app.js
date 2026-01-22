const db = {
    lists: [{ id: 'master', name: '★ Master List' }, { id: 'l2', name: 'Biovalley Project' }],
    cats: [{ id: 'c1', name: 'COE' }, { id: 'c2', name: 'MILD' }],
    orgs: [{ 
        id: 1715420000000, name: 'Andhra Pradesh MedTech Zone',
        listIds: ['master', 'l2'], catIds: ['c1'],
        tags: {
            twitter: '@amtz_ltd', instagram: '@amtz_official',
            linkedin: { val: 'AMTZ Ltd', link: 'https://linkedin.com/company/amtz' },
            facebook: { val: 'AMTZ India', link: 'https://facebook.com/amtz' },
            website: { val: 'Visit Site', link: 'https://amtz.in' }
        }
    }]
};

let isAdmin = false;
let editingId = null;
let pendingConflicts = []; 

document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initBulkRows(10); // Init 10 rows
    renderTable();
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
    populate('bulk-cat', db.cats, null);
}

// --- RENDER ---
function renderTable() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const search = document.getElementById('search-bar').value.toLowerCase().split(' ').filter(s=>s);
    const tbody = document.getElementById('table-body');
    const empty = document.getElementById('empty-state');
    tbody.innerHTML = '';

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

    if (results.length === 0) { empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');

    results.forEach(org => {
        tbody.innerHTML += `<tr>
            <td class="col-fixed-name">${org.name}</td>
            <td>${renderLink(org.tags.twitter, 'twitter')}</td>
            <td>${renderLink(org.tags.linkedin, 'linkedin')}</td>
            <td>${renderLink(org.tags.facebook, 'facebook')}</td>
            <td>${renderLink(org.tags.instagram, 'instagram')}</td>
            <td>${renderLink(org.tags.website, 'website')}</td>
            <td class="col-action ${isAdmin?'':'hidden'}"><button class="btn-primary-action btn-sm" onclick="editOrg(${org.id})">Edit</button></td>
        </tr>`;
    });
}
function renderLink(d, t) {
    if(!d) return '<span class="empty-cell">&minus;</span>';
    if(typeof d === 'string') return d ? `<a href="${t==='twitter'?'https://x.com/':'https://instagram.com/'}${d.replace('@','')}" target="_blank" class="tag-link"><i class="fa-brands fa-${t}"></i> ${d}</a>` : '<span class="empty-cell">&minus;</span>';
    return d.val ? `<a href="${d.link||'#'}" target="_blank" class="tag-link"><i class="${t==='website'?'fa-solid fa-globe':'fa-brands fa-'+t}"></i> ${d.val}</a>` : '<span class="empty-cell">&minus;</span>';
}

// --- BULK GRID SYSTEM ---
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
            <td><input type="text" class="input-cell" name="name" placeholder="Name"></td>
            <td><input type="text" class="input-cell" name="twitter" placeholder="@handle"></td>
            <td><input type="text" class="input-cell" name="linkedin" placeholder="Full Link"></td>
            <td><input type="text" class="input-cell" name="facebook" placeholder="Full Link"></td>
            <td><input type="text" class="input-cell" name="instagram" placeholder="@handle"></td>
            <td><input type="text" class="input-cell" name="website" placeholder="Full Link"></td>
        </tr>`;
    }
}
function analyzeBulkUpload() {
    const rows = document.querySelectorAll('.bulk-row');
    const targetList = document.getElementById('bulk-list').value;
    const targetCat = document.getElementById('bulk-cat').value;
    let created = 0;
    pendingConflicts = [];

    rows.forEach((row, idx) => {
        const inputs = row.querySelectorAll('input');
        const name = inputs[0].value.trim();
        if(!name) return; // Skip empty rows

        const newDat = {
            name: name,
            listIds: ['master', targetList],
            catIds: [targetCat],
            tags: {
                twitter: inputs[1].value.trim(),
                linkedin: { val: inputs[2].value.trim()?"Profile":"", link: inputs[2].value.trim() },
                facebook: { val: inputs[3].value.trim()?"Page":"", link: inputs[3].value.trim() },
                instagram: inputs[4].value.trim(),
                website: { val: inputs[5].value.trim()?"Visit":"", link: inputs[5].value.trim() }
            }
        };

        const existing = db.orgs.find(o => o.name.toLowerCase() === name.toLowerCase());
        if(existing) pendingConflicts.push({ existingRef: existing, newData: newDat, id: idx });
        else { db.orgs.push({ id: Date.now()+Math.random(), ...newDat }); created++; }
    });

    closeModal('bulk-modal');
    if(pendingConflicts.length > 0) { renderConflicts(); document.getElementById('conflict-count').innerText=pendingConflicts.length; openModal('conflict-modal'); }
    else { alert(`Created: ${created} organizations.`); renderTable(); initBulkRows(10); } // reset grid
}

// --- CONFLICTS ---
function renderConflicts() {
    document.getElementById('conflict-list').innerHTML = pendingConflicts.map(i => `
        <div class="conflict-item" id="conf-${i.id}">
            <div class="conflict-info">
                <h4>${i.existingRef.name}</h4>
                <p>Found in DB. Merging into List/Cat.</p>
            </div>
            <div class="conflict-actions">
                <button class="btn-secondary" onclick="resolveConflict(${i.id},'ignore')">Ignore</button>
                <button class="btn-overwrite" onclick="resolveConflict(${i.id},'overwrite')">Overwrite</button>
            </div>
        </div>`).join('');
}
function resolveConflict(id, action) {
    const idx = pendingConflicts.findIndex(c=>c.id===id);
    if(idx===-1) return;
    const item = pendingConflicts[idx];
    if(action==='overwrite') {
        const o = item.existingRef;
        item.newData.listIds.forEach(l=>{if(!o.listIds.includes(l))o.listIds.push(l)});
        item.newData.catIds.forEach(c=>{if(!o.catIds.includes(c))o.catIds.push(c)});
        const t = item.newData.tags;
        if(t.twitter) o.tags.twitter = t.twitter;
        if(t.instagram) o.tags.instagram = t.instagram;
        if(t.linkedin.link) o.tags.linkedin = t.linkedin;
        if(t.facebook.link) o.tags.facebook = t.facebook;
        if(t.website.link) o.tags.website = t.website;
    }
    pendingConflicts.splice(idx,1);
    document.getElementById(`conf-${id}`).remove();
    document.getElementById('conflict-count').innerText = pendingConflicts.length;
    if(pendingConflicts.length===0) { closeModal('conflict-modal'); renderTable(); alert("Resolved."); }
}
function resolveAll(act) { [...pendingConflicts].forEach(c=>resolveConflict(c.id,act)); }

// --- ADMIN ---
function login() { if(document.getElementById('login-email').value==='saragadamteja.k@amtz.in' && document.getElementById('login-pass').value==='9989'){ isAdmin=true; document.getElementById('admin-panel').classList.remove('hidden'); document.getElementById('login-trigger').classList.add('hidden'); document.getElementById('add-org-wrapper').classList.remove('hidden'); document.querySelectorAll('.col-action').forEach(el=>el.classList.remove('hidden')); closeModal('login-modal'); renderTable(); } else alert('Invalid'); }
function logout(){location.reload()}
function openOrgModal(){editingId=null; document.getElementById('edit-name').value=''; ['twitter','instagram'].forEach(k=>document.getElementById(`tag-${k}`).value=''); ['linkedin','facebook','website'].forEach(k=>{document.getElementById(`tag-${k}-val`).value='';document.getElementById(`tag-${k}-link`).value=''}); renderCheckboxes(['master'],[]); openModal('org-modal');}
function editOrg(id){editingId=id; const o=db.orgs.find(i=>i.id===id); document.getElementById('edit-name').value=o.name; document.getElementById('tag-twitter').value=o.tags.twitter||''; document.getElementById('tag-instagram').value=o.tags.instagram||''; ['linkedin','facebook','website'].forEach(k=>{const t=o.tags[k]||{}; document.getElementById(`tag-${k}-val`).value=t.val||''; document.getElementById(`tag-${k}-link`).value=t.link||''}); renderCheckboxes(o.listIds,o.catIds); openModal('org-modal');}
function renderCheckboxes(sl, sc){ const b=(d,s,id)=>document.getElementById(id).innerHTML=d.map(i=>`<label class="check-item ${i.id==='master'?'disabled':''}"><input type="checkbox" value="${i.id}" ${s.includes(i.id)||i.id==='master'?'checked':''} ${i.id==='master'?'disabled':''}> ${i.name}</label>`).join(''); b(db.lists,sl,'check-lists'); b(db.cats,sc,'check-cats'); }
function saveOrg(){ const n=document.getElementById('edit-name').value; if(!n)return alert('Name?'); const l=Array.from(document.querySelectorAll('#check-lists input:checked')).map(c=>c.value); if(!l.includes('master'))l.push('master'); const c=Array.from(document.querySelectorAll('#check-cats input:checked')).map(x=>x.value); const tags={twitter:document.getElementById('tag-twitter').value.trim(), instagram:document.getElementById('tag-instagram').value.trim(), linkedin:{val:document.getElementById('tag-linkedin-val').value.trim(), link:document.getElementById('tag-linkedin-link').value.trim()}, facebook:{val:document.getElementById('tag-facebook-val').value.trim(), link:document.getElementById('tag-facebook-link').value.trim()}, website:{val:document.getElementById('tag-website-val').value.trim(), link:document.getElementById('tag-website-link').value.trim()}}; if(editingId){const o=db.orgs.find(x=>x.id===editingId); o.name=n; o.listIds=l; o.catIds=c; o.tags=tags;}else{db.orgs.push({id:Date.now(), name:n, listIds:l, catIds:c, tags:tags});} renderTable(); closeModal('org-modal'); }
function deleteOrg(){if(editingId && confirm('Delete?')){db.orgs=db.orgs.filter(o=>o.id!==editingId); renderTable(); closeModal('org-modal');}}
function addMeta(t,i){const n=document.getElementById(i).value; if(n){db[t].push({id:Date.now().toString(),name:n}); document.getElementById(i).value=''; renderMetaList(); initDropdowns();}}
function renderMetaList(){const r=(d,id,t)=>document.getElementById(id).innerHTML=d.filter(x=>x.id!=='master').map(i=>`<li>${i.name} <button class="close-btn" style="font-size:1rem" onclick="removeMeta('${t}','${i.id}')">&times;</button></li>`).join(''); r(db.lists,'list-manager-ul','lists'); r(db.cats,'cat-manager-ul','cats');}
function removeMeta(t,id){db[t]=db[t].filter(i=>i.id!==id); renderMetaList(); initDropdowns();}
function copyColumn(t){const l=document.getElementById('filter-list').value, c=document.getElementById('filter-cat').value; const v=db.orgs.filter(o=>(l==='all'||o.listIds.includes(l))&&(c==='all'||o.catIds.includes(c))).map(o=>{const x=o.tags[t]; return (typeof x==='string')?x:(x?.val||"")}).filter(k=>k); navigator.clipboard.writeText(v.join('\n'));}
function copyConfig(){navigator.clipboard.writeText(`const db = ${JSON.stringify(db, null, 4)};`).then(()=>alert("Copied!"));}
function openModal(id){document.getElementById(id).classList.remove('hidden'); if(id==='meta-modal')renderMetaList();}
function closeModal(id){document.getElementById(id).classList.add('hidden');}
