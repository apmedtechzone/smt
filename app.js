// GLOBAL STATE
let isAdmin = false;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Populate Dropdowns
    populateCategoryDropdowns();
    // Render initial Public View
    renderPublicTable();
});

// --- AUTHENTICATION ---
function login() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    // HARDCODED CREDENTIALS (Client Side)
    if (email === 'saragadamteja.k@amtz.in' && pass === '9989') {
        isAdmin = true;
        document.getElementById('public-view').classList.add('hidden');
        document.getElementById('admin-view').classList.remove('hidden');
        document.getElementById('login-btn').classList.add('hidden');
        document.getElementById('logout-btn').classList.remove('hidden');
        document.getElementById('save-btn').classList.remove('hidden');
        document.getElementById('user-status').classList.remove('hidden');
        
        closeModal('login-modal');
        renderMasterTags();
        renderAdminTable();
    } else {
        alert('Invalid Credentials');
    }
}

function logout() {
    isAdmin = false;
    location.reload(); // Simple reload to clear state
}

// --- PUBLIC VIEW LOGIC ---
function renderPublicTable() {
    const catSelect = document.getElementById('public-category-select');
    const catId = catSelect.value || window.siteData.categories[0].id;
    const tbody = document.getElementById('public-table-body');
    tbody.innerHTML = '';

    const orgs = window.siteData.organizations.filter(o => o.category === catId);

    if (orgs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">No organizations found in this category.</td></tr>';
        return;
    }

    orgs.forEach(org => {
        // Build Tag HTML
        let tagsHtml = '';
        org.tagNames.forEach(tagName => {
            const masterTag = window.siteData.masterTags.find(t => t.name === tagName);
            if (masterTag) {
                const link = generateLink(masterTag);
                const icon = getIcon(masterTag.type);
                if (link) {
                    tagsHtml += `<a href="${link}" target="_blank" class="tag-badge ${masterTag.type}">${icon} ${tagName}</a> `;
                } else {
                    tagsHtml += `<span class="tag-badge ${masterTag.type}">${icon} ${tagName}</span> `;
                }
            }
        });

        tbody.innerHTML += `
            <tr>
                <td><strong>${org.name}</strong></td>
                <td><a href="${org.website}" target="_blank">Visit Site</a></td>
                <td>${tagsHtml}</td>
            </tr>
        `;
    });
}

// --- ADMIN: MASTER TAGS ---
function renderMasterTags() {
    const list = document.getElementById('master-tag-list');
    const filter = document.getElementById('tag-search').value.toLowerCase();
    list.innerHTML = '';

    window.siteData.masterTags.forEach((tag, index) => {
        if (!tag.name.toLowerCase().includes(filter)) return;

        const div = document.createElement('div');
        div.className = 'master-tag-item';
        div.innerHTML = `
            <div>
                <strong>${tag.name}</strong> 
                <small class="text-muted">(${tag.type})</small>
            </div>
            <div>
                <button class="btn-sm" onclick="openCrossRefModal('${tag.name}')" title="See where used"><i class="fa-solid fa-eye"></i></button>
                <button class="btn-sm btn-danger" onclick="deleteMasterTag(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        list.appendChild(div);
    });
}

function saveMasterTag() {
    const name = document.getElementById('tag-name').value.trim();
    const type = document.getElementById('tag-type').value;
    const link = document.getElementById('tag-link').value.trim();

    if (!name) return alert('Tag Name is required');

    // Check duplicate
    if (window.siteData.masterTags.find(t => t.name === name)) {
        return alert('Tag already exists');
    }

    const newTag = { name, type };
    if (['linkedin', 'facebook', 'website'].includes(type) && link) {
        newTag.link = link;
    }

    window.siteData.masterTags.push(newTag);
    renderMasterTags();
    closeModal('add-tag-modal');
}

function deleteMasterTag(index) {
    if (!confirm('Delete this tag? It will be removed from all organizations.')) return;
    
    const tagName = window.siteData.masterTags[index].name;
    
    // Remove from Master
    window.siteData.masterTags.splice(index, 1);
    
    // Remove from all Orgs
    window.siteData.organizations.forEach(org => {
        org.tagNames = org.tagNames.filter(t => t !== tagName);
    });

    renderMasterTags();
    renderAdminTable(); // Refresh org table in case a tag disappeared
}

// --- ADMIN: ORGANIZATIONS ---
function renderAdminTable() {
    const catId = document.getElementById('admin-category-select').value;
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = '';

    const orgs = window.siteData.organizations.filter(o => o.category === catId);

    orgs.forEach(org => {
        tbody.innerHTML += `
            <tr>
                <td>${org.name}</td>
                <td>${org.tagNames.length} Tags</td>
                <td>
                    <button class="btn-sm" onclick="editOrg(${org.id})">Edit</button>
                    <button class="btn-sm btn-danger" onclick="deleteOrg(${org.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editOrg(id) {
    const org = window.siteData.organizations.find(o => o.id === id);
    if (!org) return;

    document.getElementById('org-id').value = org.id;
    document.getElementById('org-name').value = org.name;
    document.getElementById('org-cat').value = org.category;
    document.getElementById('org-web').value = org.website;
    
    // Render Tag Selector with current tags selected
    renderOrgTagSelector(org.tagNames);
    
    document.getElementById('org-modal-title').innerText = "Edit Organization";
    openModal('org-modal');
}

function openOrgModal() {
    // New Org Setup
    document.getElementById('org-id').value = '';
    document.getElementById('org-name').value = '';
    document.getElementById('org-web').value = '';
    renderOrgTagSelector([]);
    document.getElementById('org-modal-title').innerText = "New Organization";
    openModal('org-modal');
}

function renderOrgTagSelector(selectedTags = []) {
    const container = document.getElementById('org-tag-selector');
    const filter = document.getElementById('org-tag-search').value.toLowerCase();
    container.innerHTML = '';

    window.siteData.masterTags.forEach(tag => {
        if (!tag.name.toLowerCase().includes(filter)) return;

        const el = document.createElement('div');
        el.className = `select-tag-item ${selectedTags.includes(tag.name) ? 'selected' : ''}`;
        el.innerText = tag.name;
        el.onclick = () => {
            el.classList.toggle('selected');
        };
        container.appendChild(el);
    });
}

function saveOrg() {
    const id = document.getElementById('org-id').value;
    const name = document.getElementById('org-name').value;
    const cat = document.getElementById('org-cat').value;
    const web = document.getElementById('org-web').value;
    
    // Harvest Selected Tags
    const selectedEls = document.querySelectorAll('.select-tag-item.selected');
    const newTags = Array.from(selectedEls).map(el => el.innerText);

    if (id) {
        // UPDATE
        const org = window.siteData.organizations.find(o => o.id == id);
        org.name = name;
        org.category = cat;
        org.website = web;
        org.tagNames = newTags;
    } else {
        // CREATE
        const newOrg = {
            id: Date.now(),
            name: name,
            category: cat,
            website: web,
            tagNames: newTags
        };
        window.siteData.organizations.push(newOrg);
    }
    
    renderAdminTable();
    closeModal('org-modal');
}

function deleteOrg(id) {
    if(!confirm("Delete this organization?")) return;
    window.siteData.organizations = window.siteData.organizations.filter(o => o.id !== id);
    renderAdminTable();
}

// --- ADMIN: CROSS REFERENCE (Edit Tag Presence) ---
function openCrossRefModal(tagName) {
    const tbody = document.getElementById('cross-ref-body');
    document.getElementById('cross-ref-title').innerText = `Editing presence for: ${tagName}`;
    tbody.innerHTML = '';

    window.siteData.organizations.forEach(org => {
        const hasTag = org.tagNames.includes(tagName);
        const catName = window.siteData.categories.find(c => c.id === org.category)?.name || 'Unknown';
        
        tbody.innerHTML += `
            <tr>
                <td><small>${catName}</small></td>
                <td>${org.name}</td>
                <td>
                    <input type="checkbox" ${hasTag ? 'checked' : ''} 
                    onchange="toggleTagOnOrg(${org.id}, '${tagName}', this.checked)">
                </td>
            </tr>
        `;
    });
    openModal('cross-ref-modal');
}

function toggleTagOnOrg(orgId, tagName, isAdding) {
    const org = window.siteData.organizations.find(o => o.id === orgId);
    if (isAdding) {
        if (!org.tagNames.includes(tagName)) org.tagNames.push(tagName);
    } else {
        org.tagNames = org.tagNames.filter(t => t !== tagName);
    }
    renderAdminTable(); // background refresh
}

// --- UTILITIES ---
function populateCategoryDropdowns() {
    const publicSel = document.getElementById('public-category-select');
    const adminSel = document.getElementById('admin-category-select');
    const modalSel = document.getElementById('org-cat');
    
    [publicSel, adminSel, modalSel].forEach(sel => {
        sel.innerHTML = '';
        window.siteData.categories.forEach(c => {
            sel.innerHTML += `<option value="${c.id}">${c.name}</option>`;
        });
    });
}

function generateLink(tag) {
    const cleanName = tag.name.replace('@', '').trim();
    if (tag.link) return tag.link; // Custom override
    if (tag.type === 'twitter') return `https://x.com/${cleanName}`;
    if (tag.type === 'instagram') return `https://instagram.com/${cleanName}`;
    return null; // LinkedIn/FB require explicit link usually, or handle default
}

function getIcon(type) {
    const map = {
        'twitter': '<i class="fa-brands fa-x-twitter"></i>',
        'facebook': '<i class="fa-brands fa-facebook"></i>',
        'linkedin': '<i class="fa-brands fa-linkedin"></i>',
        'instagram': '<i class="fa-brands fa-instagram"></i>',
        'website': '<i class="fa-solid fa-globe"></i>'
    };
    return map[type] || '<i class="fa-solid fa-tag"></i>';
}

function toggleTagLinkInput() {
    const type = document.getElementById('tag-type').value;
    const container = document.getElementById('tag-link-container');
    if (['twitter', 'instagram'].includes(type)) {
        container.classList.add('hidden');
    } else {
        container.classList.remove('hidden');
    }
}

function processBulkTags() {
    const raw = document.getElementById('bulk-text').value;
    const lines = raw.split('\n');
    let addedCount = 0;

    lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length >= 2) {
            const name = parts[0].trim();
            const type = parts[1].trim().toLowerCase();
            const link = parts[2] ? parts[2].trim() : null;

            if (name && !window.siteData.masterTags.find(t => t.name === name)) {
                const newTag = { name, type };
                if (link) newTag.link = link;
                window.siteData.masterTags.push(newTag);
                addedCount++;
            }
        }
    });
    alert(`Added ${addedCount} tags.`);
    renderMasterTags();
    closeModal('bulk-tag-modal');
}

function downloadData() {
    const dataStr = "window.siteData = " + JSON.stringify(window.siteData, null, 4) + ";";
    const blob = new Blob([dataStr], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.js";
    a.click();
    alert("File downloaded! Now upload 'data.js' to your GitHub repository to go live.");
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
