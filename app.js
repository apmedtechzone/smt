// ==========================================
// 1. DATABASE CONFIGURATION
// ==========================================
const defaultDB = {
    "lists": [
        {
            "id": "master",
            "name": "★ Master List"
        },
        {
            "id": "1769152748576",
            "name": "AMTZ"
        },
        {
            "id": "1769152751181",
            "name": "KIHT"
        },
        {
            "id": "1769152754642",
            "name": "COE"
        },
        {
            "id": "1769152758115",
            "name": "WHIF"
        },
        {
            "id": "1769152761251",
            "name": "IBSC"
        },
        {
            "id": "1769152763902",
            "name": "WTC"
        },
        {
            "id": "1769152766592",
            "name": "KCS"
        },
        {
            "id": "1769152769571",
            "name": "ALC"
        },
        {
            "id": "1769152774058",
            "name": "BioValley"
        },
        {
            "id": "1769152779600",
            "name": "MediValley"
        }
    ],
    "cats": [],
    "orgs": [
        {
            "id": 1769152845342.9998,
            "name": "Indian Council Of Medical Research",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@ICMRDELHI",
                "linkedin": {
                    "val": "@Indian Council of Medical Research (ICMR)",
                    "link": "https://www.linkedin.com/company/icmrorganization/"
                },
                "facebook": {
                    "val": "@ICMROrganisation",
                    "link": "https://www.facebook.com/ICMROrganisation"
                },
                "instagram": "@icmrorganisation",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.icmr.gov.in/"
                }
            }
        },
        {
            "id": 1769152845342.34,
            "name": "Ministry of Health and Family Welfare, Government of India",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@MoHFW_INDIA",
                "linkedin": {
                    "val": "@Ministry of Health and Family Welfare, Government of India",
                    "link": "https://www.linkedin.com/company/%E5%93%87%E5%96%94/"
                },
                "facebook": {
                    "val": "@MoHFWIndia",
                    "link": "https://www.facebook.com/MoHFWIndia/"
                },
                "instagram": "@mohfwindia",
                "website": {
                    "val": "Visit Site",
                    "link": "https://mohfw.gov.in/"
                }
            }
        },
        {
            "id": 1769152845343.2192,
            "name": "Invest India",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@investindia",
                "linkedin": {
                    "val": "@Invest India",
                    "link": "https://www.linkedin.com/company/invest-india/"
                },
                "facebook": {
                    "val": "@InvestIndiaIPA",
                    "link": "https://www.facebook.com/InvestIndiaIPA/"
                },
                "instagram": "@investindiaofficial",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.investindia.gov.in/"
                }
            }
        },
        {
            "id": 1769152845343.7021,
            "name": "TiE Vizag",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@TiEVizag",
                "linkedin": {
                    "val": "@TiE Vizag",
                    "link": "https://www.linkedin.com/company/tievizag/"
                },
                "facebook": {
                    "val": "@TiEVizag",
                    "link": "https://www.facebook.com/TiEVizag"
                },
                "instagram": "@tievizag",
                "website": {
                    "val": "Visit Site",
                    "link": "https://vizag.tie.org/"
                }
            }
        },
        {
            "id": 1769152845343.3083,
            "name": "TiE Global",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@TiEGlobal",
                "linkedin": {
                    "val": "@TiE",
                    "link": "https://www.linkedin.com/company/tieglobal1/"
                },
                "facebook": {
                    "val": "@TiEGlobal1",
                    "link": "https://www.facebook.com/TiEGlobal1/"
                },
                "instagram": "@tieglobal_",
                "website": {
                    "val": "Visit Site",
                    "link": "https://tie.org/"
                }
            }
        },
        {
            "id": 1769152845343.1897,
            "name": "Ficci",
            "listIds": [
                "master",
                "1769152748576"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@ficci_india",
                "linkedin": {
                    "val": "@FICCI",
                    "link": "https://www.linkedin.com/company/ficci/"
                },
                "facebook": {
                    "val": "@ficciindia",
                    "link": "https://www.facebook.com/ficciindia"
                },
                "instagram": "@ficci_india",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.ficci.in/"
                }
            }
        },
        {
            "id": 1769152845343.053,
            "name": "World Trade Center AMTZ",
            "listIds": [
                "master",
                "1769152748576"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@wtcamtz",
                "linkedin": {
                    "val": "@World Trade Center AMTZ",
                    "link": "https://www.linkedin.com/company/world-trade-center-wtc-amtz-business-centre/"
                },
                "facebook": {
                    "val": "@World-Trade-Center-AMTZ",
                    "link": "https://www.facebook.com/people/World-Trade-Center-AMTZ"
                },
                "instagram": "@wtcamtz",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.amtz.in/"
                }
            }
        },
        {
            "id": 1769152845343.459,
            "name": "Andhra & Amaravati Updates",
            "listIds": [
                "master",
                "1769152748576"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@AP_CRDANews",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "-"
                }
            }
        },
        {
            "id": 1769152845343.3313,
            "name": "Indian Biomedical Skill Consortium",
            "listIds": [
                "master",
                "1769152748576"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@ibsc_skill",
                "linkedin": {
                    "val": "@Indian Biomedical Skill Consortium",
                    "link": "https://www.linkedin.com/company/ibsc-indian-biomedical-skill-consortium-promoting-biomedical-engineering-skill-training-programs/"
                },
                "facebook": {
                    "val": "@IBSCskill",
                    "link": "https://www.facebook.com/IBSCskill/"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "http://www.ibsc-amtz.in"
                }
            }
        },
        {
            "id": 1769152845343.9583,
            "name": "Association of Indian Medical Devices Industry",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@MiIAiMeD",
                "linkedin": {
                    "val": "@Association of Indian Medical Device Industry (AIMED)",
                    "link": "https://www.linkedin.com/company/association-of-indian-medical-device-industry-aimed-"
                },
                "facebook": {
                    "val": "@Aimedindia2017",
                    "link": "https://www.facebook.com/Aimedindia2017"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.aimedindia.com/"
                }
            }
        },
        {
            "id": 1769152845343.865,
            "name": "CoE Additive Manufacturing - MDS",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@CoE_AM_MDS",
                "linkedin": {
                    "val": "@CoE Additive Manufacturing-MDS",
                    "link": "https://www.linkedin.com/company/center-of-excellence-for-additive-manufacturing-medical-device-sector-coe-am-mds"
                },
                "facebook": {
                    "val": "@CoE-Additive-Manufacturing-MDS",
                    "link": "https://www.facebook.com/people/CoE-Additive-Manufacturing-MDS/61563391881588/"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://coe.amtz.in/"
                }
            }
        },
        {
            "id": 1769152845343.2852,
            "name": "Kalam Institute Of Health Technology",
            "listIds": [
                "master",
                "1769152748576"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@KIHTech",
                "linkedin": {
                    "val": "@Kalam Institute Of Health Technology",
                    "link": "https://www.linkedin.com/company/kalam-institute-of-health-technology-2016"
                },
                "facebook": {
                    "val": "@KIHTech",
                    "link": "https://www.facebook.com/KIHTech"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://kiht.in/"
                }
            }
        },
        {
            "id": 1769152845343.4985,
            "name": "Bio Valley Incubation Council",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {
                "1769152751181": 1769152893947
            },
            "tags": {
                "twitter": "@Biovalley2",
                "linkedin": {
                    "val": "@Bio Valley Incubation Council",
                    "link": "https://www.linkedin.com/company/bio-valley-incubation-council-amtz-bio-technology-incubators-biotech-incubation-centre"
                },
                "facebook": {
                    "val": "@Biovalley-Incubation-Council",
                    "link": "https://www.facebook.com/people/Biovalley-Incubation-Council/61563349198355/"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.biovalley-amtz.in/"
                }
            }
        },
        {
            "id": 1769152845343.5867,
            "name": "Confederation of Indian Industry",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@FollowCII",
                "linkedin": {
                    "val": "@Confederation of Indian Industry",
                    "link": "https://www.linkedin.com/company/confederation-of-indian-industry/"
                },
                "facebook": {
                    "val": "@FollowCII",
                    "link": "https://www.facebook.com/FollowCII/"
                },
                "instagram": "@followcii",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.cii.in/"
                }
            }
        },
        {
            "id": 1769152845343.9219,
            "name": "Medivalley Incubation Council",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@MediValleyAMTZ",
                "linkedin": {
                    "val": "@AIC-AMTZ MediValley || NITI Aayog, GoI.",
                    "link": "https://www.linkedin.com/company/aic-medivalley/"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.medivalley-aic.in/"
                }
            }
        },
        {
            "id": 1769152845343.3103,
            "name": "Ficci Heal",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@ficci_heal",
                "linkedin": {
                    "val": "@FICCI Health Services",
                    "link": "https://www.linkedin.com/company/ficci-healthcare-excellence-awards/"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "instagram": "@ficcihealthservices",
                "website": {
                    "val": "Visit Site",
                    "link": "https://health.ficci.in/"
                }
            }
        },
        {
            "id": 1769152845343.0981,
            "name": "Andhra Pradesh Infra Story",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@APInfraStory",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "@AndhraPradeshInfraStory",
                    "link": "https://www.facebook.com/AndhraPradeshInfraStory/"
                },
                "instagram": "@apinfra_story",
                "website": {
                    "val": "Visit Site",
                    "link": "-"
                }
            }
        },
        {
            "id": 1769152845343.4634,
            "name": "Vizag - A Predestined City",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@destined_vizag2",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "-"
                }
            }
        },
        {
            "id": 1769152845343.8293,
            "name": "Vizag- The beautiful city of destiny",
            "listIds": [
                "master",
                "1769152748576",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@mywaltair",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "-"
                }
            }
        },
        {
            "id": 1769152862673.18,
            "name": "Andhra Pradesh MedTech Zone Limited",
            "listIds": [
                "master",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@AP_MedTechZone",
                "linkedin": {
                    "val": "@Andhra Pradesh MedTech Zone Limited",
                    "link": "https://www.linkedin.com/company/andhra-pradesh-medtech-zone-limited-medical-technology-park-in-india/"
                },
                "facebook": {
                    "val": "@amtzltd",
                    "link": "https://www.facebook.com/amtzltd/"
                },
                "instagram": "@apmedtechzone",
                "website": {
                    "val": "Visit Site",
                    "link": "https://amtz.in/"
                }
            }
        },
        {
            "id": 1769152862673.6936,
            "name": "Health Technology Assessment in India",
            "listIds": [
                "master",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@DhrHtain",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://htain.dhr.gov.in/"
                }
            }
        },
        {
            "id": 1769152862673.3203,
            "name": "JBI",
            "listIds": [
                "master",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@JBIEBHC",
                "linkedin": {
                    "val": "@JBI",
                    "link": "https://www.linkedin.com/company/jbiebhc/"
                },
                "facebook": {
                    "val": "@JBIEBHC",
                    "link": "https://www.facebook.com/JBIEBHC/"
                },
                "instagram": "@jbiebhc",
                "website": {
                    "val": "Visit Site",
                    "link": "https://jbi.global/"
                }
            }
        },
        {
            "id": 1769152862673.845,
            "name": "ISPOR",
            "listIds": [
                "master",
                "1769152751181"
            ],
            "catIds": [],
            "starredIn": {},
            "tags": {
                "twitter": "@ISPORorg",
                "linkedin": {
                    "val": "@ISPOR—The Professional Society for Health Economics and Outcomes Research",
                    "link": "https://www.linkedin.com/company/ispororg/"
                },
                "facebook": {
                    "val": "@ISPORorg",
                    "link": "https://www.facebook.com/ISPORorg/#"
                },
                "instagram": "@ispororg",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.ispor.org/"
                }
            }
        }
    ]
};

// ==========================================
// 2. STATE & SECURITY INIT
// ==========================================
let isAdmin = false;
let db = defaultDB;

if (localStorage.getItem('amtz_admin') === 'true') {
    isAdmin = true;
    const localWork = localStorage.getItem('amtz_db');
    if (localWork) {
        db = JSON.parse(localWork);
        db.orgs.forEach(o => { if(!o.starredIn) o.starredIn = {}; });
    }
}

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
// SORTING UTILITIES (Applies to EVERYONE)
// ==========================================
function sortDataAlphabetically(data) {
    return data.sort((a, b) => {
        if (a.id === 'master') return -1;
        if (b.id === 'master') return 1;
        return a.name.localeCompare(b.name);
    });
}

function sortTableData(data, currentListId) {
    return data.sort((a, b) => {
        if (currentListId !== 'all') {
            const aStarTime = (a.starredIn && a.starredIn[currentListId]) ? a.starredIn[currentListId] : 0;
            const bStarTime = (b.starredIn && b.starredIn[currentListId]) ? b.starredIn[currentListId] : 0;
            if (aStarTime !== bStarTime) return bStarTime - aStarTime; 
        }
        return a.name.localeCompare(b.name);
    });
}

// ==========================================
// APP INITIALIZATION
// ==========================================
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

    // APPLY TIME & ALPHABETICAL SORTING (Works for both Admin and Regular Users)
    results = sortTableData(results, listId);

    if(document.getElementById('stats-count')) {
        document.getElementById('stats-count').innerText = `${results.length} Organizations`;
        document.getElementById('stats-filter').innerText = (listId === 'all' && catId === 'all' && searchGroups.length === 0) ? `Total Database: ${total}` : `Filtered from ${total}`;
    }

    if (results.length === 0) { tbody.innerHTML = ''; empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');

    tbody.innerHTML = results.map(org => {
        // FIX: The star button is ONLY rendered if the current user is an Admin
        const isStarred = (listId !== 'all') && org.starredIn && org.starredIn[listId];
        const starHTML = (isAdmin && listId !== 'all') 
            ? `<button class="btn-star ${isStarred ? 'starred' : ''}" onclick="toggleStar(${org.id}, '${listId}')" title="Star this org"><i class="fa-solid fa-star"></i></button>` 
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

function exportToCSV() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const rawSearch = document.getElementById('search-bar').value.toLowerCase();
    const searchGroups = rawSearch.split(',').map(s => s.trim()).filter(s => s !== '');
    
    const visibleOrgs = db.orgs.filter(org => {
        if (listId!=='all' && !org.listIds.includes(listId)) return false;
        if (catId!=='all' && !org.catIds.includes(catId)) return false;
        if (searchGroups.length > 0) {
            let txt = org.name.toLowerCase();
            Object.values(org.tags).forEach(t => {
                if(typeof t === 'string') txt += " " + t.toLowerCase();
                else if(t && t.val) txt += " " + t.val.toLowerCase();
            });
            return searchGroups.some(group => {
                const terms = group.split(' ').filter(t => t);
                return terms.every(term => txt.includes(term));
            });
        }
        return true;
    });

    let csvContent = "data:text/csv;charset=utf-8,Name,Twitter,LinkedIn,Facebook,Instagram,Website\n";
    visibleOrgs.forEach(org => {
        const row = [`"${org.name}"`, org.tags.twitter || "", org.tags.linkedin.link || "", org.tags.facebook.link || "", org.tags.instagram || "", org.tags.website.link || ""].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "amtz_data_export.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("Export downloaded!");
}

function resetFilters() { document.getElementById('filter-list').value = 'all'; document.getElementById('filter-cat').value = 'all'; document.getElementById('search-bar').value = ''; renderTable(); }

// ==========================================
// 5. POPULATE & EDIT MODALS
// ==========================================
function openPopulateModal(type, id, name) { targetType = type; targetId = id; document.getElementById('target-name').innerText = name; renderPopulateList(); openModal('populate-modal'); }
function renderPopulateList() {
    const listId = document.getElementById('pop-src-list').value;
    const catId = document.getElementById('pop-src-cat').value;
    const container = document.getElementById('populate-check-list');
    let matches = db.orgs.filter(org => {
        if (listId!=='all' && !org.listIds.includes(listId)) return false;
        if (catId!=='all' && !org.catIds.includes(catId)) return false;
        if (targetType === 'lists' && org.listIds.includes(targetId)) return false;
        if (targetType === 'cats' && org.catIds.includes(targetId)) return false;
        return true;
    });
    matches = sortDataAlphabetically(matches);
    if (matches.length === 0) { container.innerHTML = '<p class="small-text" style="text-align:center; padding:20px;">No new organizations found.</p>'; return; }
    container.innerHTML = matches.map(org => `<label class="check-item"><input type="checkbox" value="${org.id}"> ${org.name}</label>`).join('');
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
    closeModal('populate-modal'); renderTable(); saveDataLocally(); alert(`Added ${count} organizations.`);
}
function triggerBulkForTarget() { closeModal('populate-modal'); closeModal('meta-modal'); if (targetType === 'lists') { document.getElementById('bulk-list').value = targetId; } else { document.getElementById('bulk-list').value = 'master'; showToast("Bulk upload adds to Lists. Adding to Master first.", "error"); } openModal('bulk-modal'); }

function openEditListModal(type, id, name) {
    targetType = type; targetId = id; document.getElementById('edit-meta-type-label').innerText = (type === 'lists' ? 'List' : 'Category'); document.getElementById('rename-input').value = name;
    const container = document.getElementById('edit-meta-list-container');
    let currentItems = db.orgs.filter(org => (type === 'lists' && org.listIds.includes(id)) || (type === 'cats' && org.catIds.includes(id)));
    currentItems = sortDataAlphabetically(currentItems);
    if (currentItems.length === 0) { container.innerHTML = '<p class="small-text" style="text-align:center; padding:20px;">This list is empty.</p>'; } 
    else { container.innerHTML = currentItems.map(org => `<label class="check-item"><input type="checkbox" value="${org.id}"> ${org.name}</label>`).join(''); }
    openModal('edit-meta-modal');
}
function saveRenamedMeta() {
    const newName = document.getElementById('rename-input').value.trim();
    if (!newName) return showToast("Name required", "error");
    const item = db[targetType].find(x => x.id === targetId);
    if (item) { item.name = newName; saveDataLocally(); renderMetaList(); initDropdowns(); closeModal('edit-meta-modal'); alert("Renamed successfully."); }
}
function removeSelectedFromMeta() {
    const checkboxes = document.querySelectorAll('#edit-meta-list-container input:checked');
    const idsToRemove = Array.from(checkboxes).map(cb => parseFloat(cb.value));
    if (idsToRemove.length === 0) return showToast("No items selected", "error");
    if (!confirm(`Remove ${idsToRemove.length} organizations from this list?`)) return;
    db.orgs.forEach(org => {
        if (idsToRemove.includes(org.id)) {
            if (targetType === 'lists') { org.listIds = org.listIds.filter(id => id !== targetId); } 
            else { org.catIds = org.catIds.filter(id => id !== targetId); }
        }
    });
    saveDataLocally(); renderTable(); closeModal('edit-meta-modal'); alert("Removed successfully.");
}

// ==========================================
// 6. BULK UPLOAD
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
function handleGridPaste(e) {
    e.preventDefault(); e.stopPropagation();
    const clipboardData = (e.clipboardData || window.clipboardData).getData('text');
    const rows = clipboardData.split(/\r\n|\n|\r/).filter(row => row.length > 0);
    let target = e.target;
    if (target.tagName !== 'INPUT') return; 
    let currentRow = target.closest('tr');
    let startRowIndex = Array.from(currentRow.parentElement.children).indexOf(currentRow);
    let startColIndex = Array.from(currentRow.children).indexOf(target.parentElement);
    const tableBody = document.getElementById('bulk-tbody');

    rows.forEach((rowData, rIdx) => {
        const cells = rowData.split('\t');
        if (startRowIndex + rIdx >= tableBody.children.length) addBulkRows(1);
        const targetRow = tableBody.children[startRowIndex + rIdx];
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
            listIds: [...targetListIds],
            catIds: [],
            starredIn: {},
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
    if(pendingConflicts.length===0) { closeModal('conflict-modal'); renderTable(); showToast("Resolved"); saveDataLocally(); }
}
function resolveAll(act) { [...pendingConflicts].forEach(c=>resolveConflict(c.id,act)); }

// ==========================================
// 7. ADMIN & AUTH
// ==========================================
function login() { 
    if(document.getElementById('login-email').value==='saragadamteja.k@amtz.in' && document.getElementById('login-pass').value==='9989'){ 
        isAdmin=true; 
        localStorage.setItem('amtz_admin', 'true'); 
        const localWork = localStorage.getItem('amtz_db');
        if (localWork) db = JSON.parse(localWork);
        updateUIForAdmin(); 
        initDropdowns();
        renderTable();
        closeModal('login-modal'); 
        showToast("Logged in successfully"); 
    } else { showToast("Invalid Credentials", "error"); }
}

function updateUIForAdmin() { 
    document.getElementById('admin-panel').classList.remove('hidden'); 
    document.getElementById('login-trigger').classList.add('hidden'); 
    document.getElementById('add-btn').classList.remove('hidden'); 
    document.querySelectorAll('.col-action').forEach(el=>el.classList.remove('hidden')); 
}

function logout(){ localStorage.removeItem('amtz_admin'); localStorage.removeItem('amtz_db'); location.reload(); }

function openOrgModal(){editingId=null; document.getElementById('edit-name').value=''; ['twitter','instagram'].forEach(k=>document.getElementById(`tag-${k}`).value=''); ['linkedin','facebook','website'].forEach(k=>{document.getElementById(`tag-${k}-val`).value='';document.getElementById(`tag-${k}-link`).value=''}); renderCheckboxes(['master'],[]); openModal('org-modal');}
function editOrg(id){editingId=id; const o=db.orgs.find(i=>i.id===id); document.getElementById('edit-name').value=o.name; document.getElementById('tag-twitter').value=o.tags.twitter||''; document.getElementById('tag-instagram').value=o.tags.instagram||''; ['linkedin','facebook','website'].forEach(k=>{const t=o.tags[k]||{}; document.getElementById(`tag-${k}-val`).value=t.val||''; document.getElementById(`tag-${k}-link`).value=t.link||''}); renderCheckboxes(o.listIds,o.catIds); openModal('org-modal');}

function renderCheckboxes(sl, sc){ 
    const sortedLists = sortDataAlphabetically([...db.lists]);
    const sortedCats = sortDataAlphabetically([...db.cats]);
    const b=(d,s,id)=>document.getElementById(id).innerHTML=d.map(i=>`<label class="check-item ${i.id==='master'?'disabled':''}"><input type="checkbox" value="${i.id}" ${s.includes(i.id)||i.id==='master'?'checked':''} ${i.id==='master'?'disabled':''}> ${i.name}</label>`).join(''); 
    b(sortedLists,sl,'check-lists'); b(sortedCats,sc,'check-cats'); 
}

function saveOrg(){ 
    const n=document.getElementById('edit-name').value; if(!n)return showToast("Name required", "error");
    const l=Array.from(document.querySelectorAll('#check-lists input:checked')).map(c=>c.value); if(!l.includes('master'))l.push('master'); 
    const c=Array.from(document.querySelectorAll('#check-cats input:checked')).map(x=>x.value); 
    const tags={
        twitter: ensureHandle(document.getElementById('tag-twitter').value), instagram: ensureHandle(document.getElementById('tag-instagram').value), 
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
        const sortedData = sortDataAlphabetically([...data]);
        document.getElementById(elementId).innerHTML = sortedData.filter(x => x.id !== 'master').map(item => `
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

function openModal(id){
    document.getElementById(id).classList.remove('hidden'); 
    if(id==='meta-modal') renderMetaList();
    if(id==='bulk-modal') { initBulkRows(20); document.getElementById('bulk-list').value = 'master'; }
}
function closeModal(id){document.getElementById(id).classList.add('hidden');}
