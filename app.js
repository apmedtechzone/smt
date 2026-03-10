const { Client, Account, Databases, ID, Query } = Appwrite;
const client = new Client().setEndpoint('https://sgp.cloud.appwrite.io/v1').setProject('69abc18f00304e23f121');
const account = new Account(client);
const databases = new Databases(client);

const DB_ID = '69abd4a8000d0b820e8b';
const TABLE_ID = 'apps';
let isAdmin = false; let apps = []; let editingId = null; let draggedId = null;

async function initApp() {
    try { await account.get(); isAdmin = true; updateUIForAdmin(); } catch (e) { isAdmin = false; }
    await fetchApps();
    client.subscribe(`databases.${DB_ID}.collections.${TABLE_ID}.documents`, response => fetchApps());
}

async function fetchApps() {
    try {
        const res = await databases.listDocuments(DB_ID, TABLE_ID, [Query.limit(100)]);
        apps = res.documents.sort((a,b) => (a.order||0) - (b.order||0));
        document.getElementById('loading-state').classList.add('hidden');
        renderApps();
    } catch(e) {}
}

function renderApps() {
    const grid = document.getElementById('apps-grid'); grid.innerHTML = '';
    const visibleApps = isAdmin ? apps : apps.filter(a => a.visible);
    
    visibleApps.forEach(app => {
        const adminTools = isAdmin ? `
            <div class="admin-tools">
                <button class="btn-toggle ${app.visible?'':'off'}" onclick="event.preventDefault(); toggleVisibility('${app.$id}', ${app.visible})"><i class="fa-solid ${app.visible?'fa-eye':'fa-eye-slash'}"></i></button>
                <button class="btn-edit" onclick="event.preventDefault(); editApp('${app.$id}')"><i class="fa-solid fa-pen"></i></button>
            </div>` : '';

        const dragAttrs = isAdmin ? `draggable="true" ondragstart="dragStart(event, '${app.$id}')" ondragover="event.preventDefault()" ondrop="dropTarget(event, '${app.$id}')" ondragend="this.classList.remove('dragging')"` : '';

        grid.innerHTML += `
            <a href="${app.url}" class="app-card ${!app.visible?'hidden-card':''}" ${dragAttrs}>
                ${adminTools}
                <div class="app-icon"><i class="fa-solid ${app.icon}"></i></div>
                <div class="app-title">${app.title}</div>
            </a>`;
    });
}

// Drag & Drop
function dragStart(e, id) { if(!isAdmin) return; draggedId = id; e.dataTransfer.effectAllowed = 'move'; setTimeout(() => e.target.classList.add('dragging'), 0); }
async function dropTarget(e, targetId) {
    if(!isAdmin || !draggedId || draggedId === targetId) return;
    e.preventDefault();
    const sorted = [...apps].sort((a,b) => (a.order||0) - (b.order||0));
    const targetIdx = sorted.findIndex(a => a.$id === targetId);
    const prev = targetIdx > 0 ? sorted[targetIdx - 1] : null;
    const next = sorted[targetIdx];

    let pOrd = prev ? (prev.order||0) : null;
    let nOrd = next.order||0;
    let newOrder = pOrd === null ? nOrd - 10000 : (pOrd + nOrd) / 2;

    apps.find(a => a.$id === draggedId).order = newOrder;
    renderApps();
    try { await databases.updateDocument(DB_ID, TABLE_ID, draggedId, { order: newOrder }); } catch(err){}
}

// Admin Logic
async function login() { 
    try { await account.createEmailPasswordSession(document.getElementById('login-email').value, document.getElementById('login-pass').value); isAdmin = true; updateUIForAdmin(); closeModal('login-modal'); } catch(e){ alert("Login Failed"); } 
}
function updateUIForAdmin() { document.getElementById('admin-panel').classList.remove('hidden'); document.getElementById('login-trigger').classList.add('hidden'); renderApps(); }
async function logout(){ try { await account.deleteSession('current'); } catch(e){} location.reload(); }

async function toggleVisibility(id, curr) { await databases.updateDocument(DB_ID, TABLE_ID, id, { visible: !curr }); }
function openAppModal(){ editingId=null; document.getElementById('edit-title').value=''; document.getElementById('edit-url').value=''; document.getElementById('edit-icon').value=''; document.getElementById('btn-delete').classList.add('hidden'); openModal('app-modal'); }
function editApp(id){ const a = apps.find(x=>x.$id===id); editingId=id; document.getElementById('edit-title').value=a.title; document.getElementById('edit-url').value=a.url; document.getElementById('edit-icon').value=a.icon; document.getElementById('btn-delete').classList.remove('hidden'); openModal('app-modal'); }

async function saveApp() {
    const data = { title: document.getElementById('edit-title').value, url: document.getElementById('edit-url').value, icon: document.getElementById('edit-icon').value, visible: true };
    if(!editingId) data.order = Date.now(); // Put new apps at the end
    try { if(editingId) await databases.updateDocument(DB_ID, TABLE_ID, editingId, data); else await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), data); closeModal('app-modal'); } catch(e){}
}
async function deleteApp() { if(confirm("Delete App?")) { await databases.deleteDocument(DB_ID, TABLE_ID, editingId); closeModal('app-modal'); } }

function openModal(id){ document.getElementById(id).classList.remove('hidden'); }
function closeModal(id){ document.getElementById(id).classList.add('hidden'); }
initApp();
