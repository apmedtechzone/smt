// ==========================================
// 1. APPWRITE INITIALIZATION
// ==========================================
const { Client, Account, Databases, Storage, ID, Query } = Appwrite;

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1') 
    .setProject('69abc18f00304e23f121'); // Your main project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// TARGET IDs
const DB_ID = '69abd4a8000d0b820e8b';            // AMTZ_DB
const TABLE_ID = 'directory';                    // The newly created Directory table
const BUCKET_ID = '69afc921002bc8f541d7';        // The ID you just provided for Logos

// ==========================================
// 2. STATE & GLOBALS
// ==========================================
let isAdmin = false;
let departments = []; 
let editingId = null;
let currentImageId = null;

// ==========================================
// 3. STARTUP & CLOUD FETCHING
// ==========================================
async function initApp() {
    // Attempt to connect to existing admin session
    try {
        await account.get();
        isAdmin = true;
        updateUIForAdmin();
    } catch (e) { isAdmin = false; }

    await fetchCloudData();

    // Subscribe to live database updates
    client.subscribe(`databases.${DB_ID}.collections.${TABLE_ID}.documents`, response => {
        console.log("Live update detected! Syncing...");
        fetchCloudData(); 
    });
}

async function fetchCloudData() {
    try {
        const res = await databases.listDocuments(DB_ID, TABLE_ID, [Query.limit(100)]);
        // Sort Alphabetically
        departments = res.documents.sort((a,b) => a.name.localeCompare(b.name)); 
        
        document.getElementById('loading-state').classList.add('hidden');
        renderGrid();
    } catch(e) { 
        console.error(e); 
        document.getElementById('loading-state').innerText = "Error loading data.";
    }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initApp);
else initApp();

// ==========================================
// 4. RENDERING THE GRID
// ==========================================
function renderGrid() {
    const grid = document.getElementById('companies-grid');
    grid.innerHTML = '';

    if (departments.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color: #7f8c8d; font-size: 1.1rem; padding: 40px;">No organizations added yet. Login as Admin to add your first!</p>';
        return;
    }

    departments.forEach(dept => {
        // Build Logo URL. Fallback if no logo was uploaded.
        let logoUrl = 'https://via.placeholder.com/150?text=No+Logo';
        if (dept.imageId) {
            logoUrl = storage.getFileView(BUCKET_ID, dept.imageId).href;
        }

        // Build HTML for social links only if they exist in DB
        let socialsHtml = '';
        if (dept.twitter) socialsHtml += `<a href="${dept.twitter}" class="social-link twitter" target="_blank"><i class="fab fa-twitter"></i></a>`;
        if (dept.linkedin) socialsHtml += `<a href="${dept.linkedin}" class="social-link linkedin" target="_blank"><i class="fab fa-linkedin-in"></i></a>`;
        if (dept.facebook) socialsHtml += `<a href="${dept.facebook}" class="social-link facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>`;
        if (dept.instagram) socialsHtml += `<a href="${dept.instagram}" class="social-link instagram" target="_blank"><i class="fab fa-instagram"></i></a>`;

        // Build Website button
        let websiteHtml = '';
        if (dept.website) {
            websiteHtml = `<a href="${dept.website}" class="website-link" target="_blank"><i class="fas fa-globe"></i> Visit Website</a>`;
        }

        // Show edit button on cards ONLY if Admin
        let adminBtn = isAdmin ? `<button class="btn-edit-card" onclick="editDept('${dept.$id}')"><i class="fa-solid fa-pen"></i> Edit</button>` : '';

        // Construct Card using original CSS classes
        const cardHtml = `
            <div class="company-card">
                ${adminBtn}
                <div class="card-header">
                    <div class="company-logo">
                        <img src="${logoUrl}" alt="${dept.name} Logo">
                    </div>
                    <h2 class="company-name">${dept.name}</h2>
                </div>
                <div class="card-body">
                    ${websiteHtml}
                    <div class="social-links">
                        ${socialsHtml}
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

// ==========================================
// 5. AUTHENTICATION
// ==========================================
async function login() { 
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    try {
        await account.createEmailPasswordSession(email, pass);
        isAdmin = true; 
        updateUIForAdmin(); 
        closeModal('login-modal'); 
        showToast("Logged in securely"); 
        document.getElementById('login-email').value = ''; document.getElementById('login-pass').value = '';
    } catch (e) { showToast(e.message, "error"); }
}

function updateUIForAdmin() { 
    document.getElementById('admin-panel').classList.remove('hidden'); 
    document.getElementById('login-trigger').classList.add('hidden'); 
    renderGrid(); 
}

async function logout(){ try { await account.deleteSession('current'); } catch(e){} location.reload(); }

// ==========================================
// 6. CRUD & IMAGE UPLOADS
// ==========================================
function openDeptModal() {
    editingId = null;
    currentImageId = null;
    document.getElementById('modal-title').innerText = "Add Department";
    document.getElementById('btn-delete-dept').classList.add('hidden');
    document.getElementById('current-logo-text').style.display = 'none';
    
    ['name', 'website', 'twitter', 'linkedin', 'facebook', 'instagram', 'logo'].forEach(id => {
        document.getElementById(`edit-${id}`).value = '';
    });
    
    openModal('dept-modal');
}

function editDept(id) {
    const dept = departments.find(d => d.$id === id);
    if (!dept) return;

    editingId = id;
    currentImageId = dept.imageId || null;
    document.getElementById('modal-title').innerText = "Edit Department";
    document.getElementById('btn-delete-dept').classList.remove('hidden');
    
    document.getElementById('edit-name').value = dept.name || '';
    document.getElementById('edit-website').value = dept.website || '';
    document.getElementById('edit-twitter').value = dept.twitter || '';
    document.getElementById('edit-linkedin').value = dept.linkedin || '';
    document.getElementById('edit-facebook').value = dept.facebook || '';
    document.getElementById('edit-instagram').value = dept.instagram || '';
    document.getElementById('edit-logo').value = ''; 
    
    if (currentImageId) document.getElementById('current-logo-text').style.display = 'block';
    
    openModal('dept-modal');
}

async function saveDept() {
    const btn = document.getElementById('btn-save');
    const name = document.getElementById('edit-name').value.trim();
    if (!name) return showToast("Department Name is required!", "error");

    btn.innerText = "Saving to Cloud...";
    btn.disabled = true;

    try {
        // 1. Process Logo Upload
        const fileInput = document.getElementById('edit-logo');
        let newImageId = currentImageId;

        if (fileInput.files.length > 0) {
            showToast("Uploading logo...");
            const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), fileInput.files[0]);
            newImageId = uploadedFile.$id;

            // Delete old image if we are replacing it
            if (currentImageId) {
                try { await storage.deleteFile(BUCKET_ID, currentImageId); } catch(e){}
            }
        } 

        // 2. Build Database Request
        const dataObj = {
            name: name,
            website: document.getElementById('edit-website').value.trim(),
            twitter: document.getElementById('edit-twitter').value.trim(),
            linkedin: document.getElementById('edit-linkedin').value.trim(),
            facebook: document.getElementById('edit-facebook').value.trim(),
            instagram: document.getElementById('edit-instagram').value.trim(),
            imageId: newImageId
        };

        // 3. Save to Directory Table
        if (editingId) {
            await databases.updateDocument(DB_ID, TABLE_ID, editingId, dataObj);
        } else {
            await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), dataObj);
        }

        showToast("Saved successfully!");
        closeModal('dept-modal');

    } catch(e) {
        showToast("Error saving: " + e.message, "error");
    } finally {
        btn.innerText = "Save to Cloud";
        btn.disabled = false;
    }
}

async function deleteDept() {
    if(!editingId || !confirm("Are you sure you want to delete this department?")) return;
    
    try {
        // Delete image first
        if (currentImageId) {
            try { await storage.deleteFile(BUCKET_ID, currentImageId); } catch(e){}
        }
        // Delete record
        await databases.deleteDocument(DB_ID, TABLE_ID, editingId);
        showToast("Deleted successfully.");
        closeModal('dept-modal');
    } catch(e) {
        showToast("Error deleting: " + e.message, "error");
    }
}

// ==========================================
// 7. UTILS & MODALS
// ==========================================
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

function showToast(msg, type = "success") { 
    const container = document.getElementById('toast-container'); 
    const toast = document.createElement('div'); 
    toast.className = `toast ${type}`; 
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'circle-exclamation'}"></i> ${msg}`; 
    container.appendChild(toast); 
    setTimeout(() => toast.remove(), 3000); 
}
