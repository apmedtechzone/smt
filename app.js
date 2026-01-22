// ==========================================
// 1. DATABASE CONFIGURATION
// ==========================================
// This object holds your data. The system updates this automatically.
const defaultDB = {
    "lists": [
        {
            "id": "master",
            "name": "★ Master List"
        },
        {
            "id": "1769114358812",
            "name": "AMTZ"
        },
        {
            "id": "1769114363921",
            "name": "KIHT"
        },
        {
            "id": "1769114542066",
            "name": "COE"
        },
        {
            "id": "1769114547655",
            "name": "WHIF"
        },
        {
            "id": "1769114561503",
            "name": "IBSC"
        },
        {
            "id": "1769114565686",
            "name": "WTC"
        },
        {
            "id": "1769114570939",
            "name": "KCS"
        },
        {
            "id": "1769114577053",
            "name": "ALC"
        },
        {
            "id": "1769114585861",
            "name": "BioValley"
        },
        {
            "id": "1769114591607",
            "name": "MediValley"
        }
    ],
    "cats": [],
    "orgs": [
        {
            "id": 1769111092340.9883,
            "name": "Indian Council Of Medical Research",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114547655",
                "1769114577053"
            ],
            "catIds": [],
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
            "id": 1769111092341.6191,
            "name": "Ministry of Health and Family Welfare, Government of India",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114547655",
                "1769114577053"
            ],
            "catIds": [],
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
            "id": 1769111092341.4207,
            "name": "Invest India",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114565686",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.921,
            "name": "TiE Vizag",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114565686",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.057,
            "name": "TiE Global",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114565686",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.9744,
            "name": "Ficci",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114565686"
            ],
            "catIds": [],
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
            "id": 1769111092341.2678,
            "name": "World Trade Center AMTZ",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114565686",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.2122,
            "name": "Andhra & Amaravati Updates",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@AP_CRDANews",
                "instagram": "",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "website": {
                    "val": "Visit Site",
                    "link": "-"
                }
            }
        },
        {
            "id": 1769111092341.1755,
            "name": "Indian Biomedical Skill Consortium",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114570939"
            ],
            "catIds": [],
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
            "id": 1769111092341.9783,
            "name": "Association of Indian Medical Devices Industry",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114542066",
                "1769114585861",
                "1769114565686",
                "1769114547655",
                "1769114570939",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.0447,
            "name": "CoE Additive Manufacturing - MDS",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921"
            ],
            "catIds": [],
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
            "id": 1769111092341.2295,
            "name": "Kalam Institute Of Health Technology",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114542066"
            ],
            "catIds": [],
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
            "id": 1769111092341.8828,
            "name": "Bio Valley Incubation Council",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921"
            ],
            "catIds": [],
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
            "id": 1769111092341.5352,
            "name": "Confederation of Indian Industry",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114565686",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.0203,
            "name": "Medivalley Incubation Council",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114570939"
            ],
            "catIds": [],
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
            "id": 1769111092341.0786,
            "name": "Ficci Heal",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.9375,
            "name": "Andhra Pradesh Infra Story",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.7017,
            "name": "Vizag - A Predestined City",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114585861",
                "1769114565686",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769111092341.1343,
            "name": "Vizag- The beautiful city of destiny",
            "listIds": [
                "master",
                "1769111742355",
                "1769114358812",
                "1769114363921",
                "1769114542066",
                "1769114585861",
                "1769114565686",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769114824175.9727,
            "name": "Andhra Pradesh MedTech Zone Limited",
            "listIds": [
                "master",
                "1769114363921",
                "1769114585861",
                "1769114570939",
                "1769114561503"
            ],
            "catIds": [],
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
            "id": 1769114824175.2632,
            "name": "Health Technology Assessment in India",
            "listIds": [
                "master",
                "1769114363921"
            ],
            "catIds": [],
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
            "id": 1769114824175.9146,
            "name": "JBI",
            "listIds": [
                "master",
                "1769114363921"
            ],
            "catIds": [],
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
            "id": 1769114824175.3218,
            "name": "ISPOR",
            "listIds": [
                "master",
                "1769114363921",
                "1769114547655"
            ],
            "catIds": [],
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
        },
        {
            "id": 1769116101877.6086,
            "name": "ASM International",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@ASMInternatnl",
                "linkedin": {
                    "val": "@ASM International",
                    "link": "https://www.linkedin.com/company/asm-international/"
                },
                "facebook": {
                    "val": "@asminternational",
                    "link": "https://www.facebook.com/asminternational/"
                },
                "instagram": "@asminternational",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.asminternational.org/"
                }
            }
        },
        {
            "id": 1769116101877.1055,
            "name": "Ministry of Electronics & IT",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@GoI_MeitY",
                "linkedin": {
                    "val": "@Ministry of Electronics and Information Technology",
                    "link": "https://www.linkedin.com/company/meity-in/"
                },
                "facebook": {
                    "val": "",
                    "link": ""
                },
                "instagram": "",
                "website": {
                    "val": "",
                    "link": ""
                }
            }
        },
        {
            "id": 1769116101877.3584,
            "name": "Ministry of MSME",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@minmsme",
                "linkedin": {
                    "val": "@Ministry of Micro, Small and Medium Enterprises, Government of India",
                    "link": "https://www.linkedin.com/company/ministry-of-micro-small-and-medium-enterprises-government-of-india/about/"
                },
                "facebook": {
                    "val": "@minmsme",
                    "link": "https://www.facebook.com/minmsme/"
                },
                "instagram": "@minmsme",
                "website": {
                    "val": "Visit Site",
                    "link": "https://msme.gov.in/"
                }
            }
        },
        {
            "id": 1769116101877.7078,
            "name": "Ministry of Education",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@EduMinOfIndia",
                "linkedin": {
                    "val": "@MINISTRY OF EDUCATION, GOVERNMENT OF INDIA",
                    "link": "https://www.linkedin.com/company/ministry-of-education-government-of-india/"
                },
                "facebook": {
                    "val": "@EduMinOfIndia",
                    "link": "https://www.facebook.com/EduMinOfIndia"
                },
                "instagram": "@eduminofindia",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.education.gov.in/"
                }
            }
        },
        {
            "id": 1769116101877.9087,
            "name": "IIT Hyderabad",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@IITHyderabad",
                "linkedin": {
                    "val": "@Indian Institute of Technology Hyderabad",
                    "link": "https://www.linkedin.com/school/iithyderabad/"
                },
                "facebook": {
                    "val": "@iithyderabad",
                    "link": "https://www.facebook.com/iithyderabad/"
                },
                "instagram": "@iithyderabad",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.iith.ac.in/"
                }
            }
        },
        {
            "id": 1769116101877.0847,
            "name": "Sarda Metals & Alloys Ltd.",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@sardametalsltd",
                "linkedin": {
                    "val": "@Sarda Metals & Alloys Ltd.",
                    "link": "https://www.linkedin.com/company/sarda-metals-alloys-ltd"
                },
                "facebook": {
                    "val": "@sardametalsltd",
                    "link": "https://www.facebook.com/sardametalsltd"
                },
                "instagram": "@sardametalsltd",
                "website": {
                    "val": "Visit Site",
                    "link": "https://sardametals.com/"
                }
            }
        },
        {
            "id": 1769116101877.9036,
            "name": "VIZAGAPATAM CHAMBER OF COMMERCE & INDUSTRY",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@VCCI14",
                "linkedin": {
                    "val": "@The Vizagapatam Chamber of Commerce and Industry",
                    "link": "https://www.linkedin.com/in/the-vizagapatam-chamber-of-commerce-and-industry-7ab0152a8/"
                },
                "facebook": {
                    "val": "@vizagchamber",
                    "link": "https://www.facebook.com/vizagchamber/"
                },
                "instagram": "@vizagchamber",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.vizagchamber.com/"
                }
            }
        },
        {
            "id": 1769116101877.4365,
            "name": "GITAM Deemed University",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "",
                "linkedin": {
                    "val": "",
                    "link": "https://www.linkedin.com/school/gitam-deemed-university"
                },
                "facebook": {
                    "val": "@gitamdeemeduniversity",
                    "link": "https://www.facebook.com/gitamdeemeduniversity"
                },
                "instagram": "@gitamdeemeduniversity",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.gitam.edu/"
                }
            }
        },
        {
            "id": 1769116101878.214,
            "name": "Principal Scientific Adviser, Govt. of India",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@PrinSciAdvGoI",
                "linkedin": {
                    "val": "@Office of the Principal Scientific Adviser to the Government of India",
                    "link": "https://www.linkedin.com/company/prinsciadvoff/"
                },
                "facebook": {
                    "val": "@prinsciadvoff",
                    "link": "https://www.facebook.com/prinsciadvoff/"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.psa.gov.in/"
                }
            }
        },
        {
            "id": 1769116101878.2952,
            "name": "Office of Principal Scientific Adviser to the GoI",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@PrinSciAdvOff",
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
                    "link": "https://www.psa.gov.in/"
                }
            }
        },
        {
            "id": 1769116101878.1338,
            "name": "Atal Innovation Mission Official",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@AIMtoInnovate",
                "linkedin": {
                    "val": "@Atal Innovation Mission Official",
                    "link": "https://www.linkedin.com/company/atal-innovation-mission-official/"
                },
                "facebook": {
                    "val": "@AIMToInnovate",
                    "link": "https://www.facebook.com/AIMToInnovate/"
                },
                "instagram": "@aimtoinnovate",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.aim.gov.in/"
                }
            }
        },
        {
            "id": 1769116101879.697,
            "name": "CMO Andhra Pradesh",
            "listIds": [
                "master",
                "1769114542066",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@AndhraPradeshCM",
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
            "id": 1769116218107.229,
            "name": "Global Index",
            "listIds": [
                "master",
                "1769114565686"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@TheGlobal_Index",
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
            "id": 1769116276402.4526,
            "name": "Biotechnology Industry Research Assistance Council",
            "listIds": [
                "master",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@BIRAC_2012",
                "linkedin": {
                    "val": "@DBT BIRAC",
                    "link": "https://www.linkedin.com/in/dbt-birac-bba322232/"
                },
                "facebook": {
                    "val": "@dbt.birac.2012",
                    "link": "https://www.facebook.com/dbt.birac.2012"
                },
                "instagram": "@dbt.birac",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.birac.nic.in/"
                }
            }
        },
        {
            "id": 1769116276402.8691,
            "name": "World Health Organization (WHO)",
            "listIds": [
                "master",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@WHO",
                "linkedin": {
                    "val": "@World Health Organization",
                    "link": "https://www.linkedin.com/company/world-health-organization/"
                },
                "facebook": {
                    "val": "@WHO",
                    "link": "https://www.facebook.com/WHO"
                },
                "instagram": "@who",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.who.int/"
                }
            }
        },
        {
            "id": 1769116276402.3435,
            "name": "Department of Biotechnology",
            "listIds": [
                "master",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@DBTIndia",
                "linkedin": {
                    "val": "@Department of Biotechnology",
                    "link": "https://www.linkedin.com/company/dbtindia/"
                },
                "facebook": {
                    "val": "@DBTInd",
                    "link": "https://www.facebook.com/DBTInd"
                },
                "instagram": "@dbt_india",
                "website": {
                    "val": "Visit Site",
                    "link": "https://dbtindia.gov.in/"
                }
            }
        },
        {
            "id": 1769116276402.967,
            "name": "Institut Pasteur",
            "listIds": [
                "master",
                "1769114547655"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@institutpasteur",
                "linkedin": {
                    "val": "@Institut Pasteur",
                    "link": "https://www.linkedin.com/company/institut-pasteur/"
                },
                "facebook": {
                    "val": "@InstitutPasteur",
                    "link": "https://www.facebook.com/InstitutPasteur"
                },
                "instagram": "@institut.pasteur",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.pasteur.fr/fr"
                }
            }
        },
        {
            "id": 1769116353846.2036,
            "name": "The Medical Device Manufacturers Association (MDMA)",
            "listIds": [
                "master",
                "1769114570939"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@medicaldevices",
                "linkedin": {
                    "val": "@Medical Device Manufacturers Association (MDMA)",
                    "link": "https://www.linkedin.com/company/mdma-medicaldevices/"
                },
                "facebook": {
                    "val": "",
                    "link": "-"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.medicaldevices.org/"
                }
            }
        },
        {
            "id": 1769116353846.4797,
            "name": "AdvaMed",
            "listIds": [
                "master",
                "1769114570939"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@AdvaMedUpdate",
                "linkedin": {
                    "val": "@AdvaMed",
                    "link": "https://www.linkedin.com/company/advamed/"
                },
                "facebook": {
                    "val": "@AdvaMed",
                    "link": "https://www.facebook.com/AdvaMed"
                },
                "instagram": "@advamed",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.advamed.org/"
                }
            }
        },
        {
            "id": 1769116353846.2817,
            "name": "APACMed",
            "listIds": [
                "master",
                "1769114570939"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@APACMed",
                "linkedin": {
                    "val": "@Asia Pacific Medical Technology Association (APACMed)",
                    "link": "https://www.linkedin.com/company/asia-pacific-medical-technology-association/?originalSubdomain=sg"
                },
                "facebook": {
                    "val": "@APACMed",
                    "link": "https://www.facebook.com/APACMed/"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://apacmed.org/"
                }
            }
        },
        {
            "id": 1769116353846.2673,
            "name": "Consultants Consortium of Chennai (CCC)",
            "listIds": [
                "master",
                "1769114570939"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@ccofchennai",
                "linkedin": {
                    "val": "@Consultants Consortium of Chennai - CCC",
                    "link": "https://www.linkedin.com/company/ccofchennai/"
                },
                "facebook": {
                    "val": "@ccofchennai",
                    "link": "https://www.facebook.com/ccofchennai/"
                },
                "instagram": "@ccchennai",
                "website": {
                    "val": "Visit Site",
                    "link": "https://ccc-consultants.org/"
                }
            }
        },
        {
            "id": 1769116457625.9824,
            "name": "Wheelchair Basketball Federation of India",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@wbfi_info",
                "linkedin": {
                    "val": "@Wheelchair Basketball Federation of India",
                    "link": "https://www.linkedin.com/company/wheelchair-basketball-federation-of-india/"
                },
                "facebook": {
                    "val": "@wbfiindia",
                    "link": "https://www.facebook.com/wbfiindia/"
                },
                "instagram": "@wbfiindia",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.wbfi.org.in/"
                }
            }
        },
        {
            "id": 1769116457625.9163,
            "name": "Ministry of Social Justice & Empowerment, GOI",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@MSJEGOI",
                "linkedin": {
                    "val": "@Ministry of Social Justice & Empowerment, GOI",
                    "link": "https://www.linkedin.com/company/ministry-of-social-justice-empowerment-goi/"
                },
                "facebook": {
                    "val": "@goimsje",
                    "link": "https://www.facebook.com/goimsje"
                },
                "instagram": "@msjegoi",
                "website": {
                    "val": "Visit Site",
                    "link": "https://socialjustice.gov.in/"
                }
            }
        },
        {
            "id": 1769116457625.7656,
            "name": "Bhagavatula Charitable Trust",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@bct_ngo",
                "linkedin": {
                    "val": "@Bhagavatula Charitable Trust",
                    "link": "https://www.linkedin.com/company/bctindia/"
                },
                "facebook": {
                    "val": "@bctorg",
                    "link": "https://www.facebook.com/bctorg#"
                },
                "instagram": "@bct_india",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.bctindia.org/"
                }
            }
        },
        {
            "id": 1769116457625.8914,
            "name": "Boccia India",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@bocciaindia",
                "linkedin": {
                    "val": "@Boccia India",
                    "link": "https://www.linkedin.com/company/boccia-india/"
                },
                "facebook": {
                    "val": "@bocciaindia",
                    "link": "https://www.facebook.com/bocciaindia"
                },
                "instagram": "@artistsaritadwivedi",
                "website": {
                    "val": "Visit Site",
                    "link": "https://bocciaindia.com/"
                }
            }
        },
        {
            "id": 1769116457625.349,
            "name": "Inclusive Divyangjan Entrepreneur Association-IDEA",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@idea4newindia",
                "linkedin": {
                    "val": "@Inclusive Divyangjan Entrepreneur Association - IDEA",
                    "link": "https://www.linkedin.com/company/idea4newindia/"
                },
                "facebook": {
                    "val": "@idea4newindia",
                    "link": "https://www.facebook.com/idea4newindia/"
                },
                "instagram": "@idea4newindia",
                "website": {
                    "val": "Visit Site",
                    "link": "-"
                }
            }
        },
        {
            "id": 1769116457625.698,
            "name": "Paralympic Committee of India",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@PCI_IN_Official",
                "linkedin": {
                    "val": "@Paralympic Committee of India",
                    "link": "https://www.linkedin.com/company/pci-official/"
                },
                "facebook": {
                    "val": "@ParalympicCommitteeOfIndia",
                    "link": "https://www.facebook.com/ParalympicCommitteeOfIndia/"
                },
                "instagram": "@paralympicsindia_official",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.paralympicindia.com/"
                }
            }
        },
        {
            "id": 1769116457625.3323,
            "name": "Paralympic India",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@ParalympicIndia",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "@paralympicindia",
                    "link": "https://www.facebook.com/paralympicindia/"
                },
                "instagram": "@paralympicindia",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.paralympicindia.org.in/"
                }
            }
        },
        {
            "id": 1769116457625.3584,
            "name": "International Wheelchair Basketball Federation",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@IWBF",
                "linkedin": {
                    "val": "@International Wheelchair Basketball Federation (IWBF)",
                    "link": "https://www.linkedin.com/company/international-wheelchair-basketball-federation/"
                },
                "facebook": {
                    "val": "@IWBF",
                    "link": "https://www.facebook.com/InternationalWheelchairBasketballFederation"
                },
                "instagram": "@int_wheelchair_basketball_fed",
                "website": {
                    "val": "Visit Site",
                    "link": "https://www.iwbf.org/"
                }
            }
        },
        {
            "id": 1769116457626.4604,
            "name": "ICRC New Delhi",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@ICRC_nd",
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
                    "link": "https://blogs.icrc.org/new-delhi/"
                }
            }
        },
        {
            "id": 1769116457626.446,
            "name": "Orthotics and Prosthetics Association of India",
            "listIds": [
                "master",
                "1769114577053"
            ],
            "catIds": [],
            "tags": {
                "twitter": "@OPAI_India",
                "linkedin": {
                    "val": "",
                    "link": "-"
                },
                "facebook": {
                    "val": "@Opai-India",
                    "link": "https://www.facebook.com/people/Opai-India/pfbid0ARH4Co13qacWEfEzcYrQvZAfKb5cqDaEHW5u3s6icqwWkhMMHc7a1GctwkHmExwhl/"
                },
                "instagram": "",
                "website": {
                    "val": "Visit Site",
                    "link": "https://opai.org.in/"
                }
            }
        }
    ]
};

// LOAD STATE: Prefer LocalStorage (Recent work), else fallback to GitHub Code (defaultDB)
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
    
    // Global Listeners
    document.getElementById('bulk-tbody').addEventListener('paste', handleGridPaste);
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape") document.querySelectorAll('.modal').forEach(m => closeModal(m.id));
    });
});

function initDropdowns() {
    const populate = (id, data, ph) => {
        const el = document.getElementById(id);
        if(!el) return;
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
// 3. UTILITIES & SMART SAVE
// ==========================================
async function copyConfig() {
    // 1. Save to Local Storage first (Safety net)
    localStorage.setItem('amtz_db', JSON.stringify(db));
    
    try {
        showToast("Generating full code...", "success");
        
        // 2. Fetch the SOURCE CODE of this very file
        const response = await fetch('app.js');
        if (!response.ok) throw new Error("Network response was not ok");
        let sourceCode = await response.text();

        // 3. Prepare the new data string
        const newDataString = `const defaultDB = ${JSON.stringify(db, null, 4)};`;

        // 4. SMART REPLACE: Find the old defaultDB block and replace it
        // We look for 'const defaultDB =' up to the first semi-colon followed by 'let db ='
        // or we just replace the exact start lines if structure is maintained.
        
        // Robust Regex replacement:
        // Matches "const defaultDB = { ... };" (lazy match until semi-colon at end of line)
        const regex = /const defaultDB\s*=\s*\{[\s\S]*?\};/;
        
        if (regex.test(sourceCode)) {
            const newCode = sourceCode.replace(regex, newDataString);
            
            // 5. Copy FULL code to clipboard
            await navigator.clipboard.writeText(newCode);
            showToast("FULL CODE Copied! Paste entire file to GitHub.", "success");
        } else {
            // Fallback if regex fails (rare)
            alert("Auto-update failed. Copying data only.");
            navigator.clipboard.writeText(newDataString);
        }

    } catch (err) {
        console.error(err);
        // Fallback for offline testing
        const fallbackCode = `const defaultDB = ${JSON.stringify(db, null, 4)};\n\n// PASTE THIS AT THE TOP OF APP.JS (REPLACING OLD defaultDB)`;
        navigator.clipboard.writeText(fallbackCode);
        alert("Could not fetch source (are you offline?). \n\nData object copied. \n\nMANUAL UPDATE:\nReplace the top 'const defaultDB = ...' block in GitHub with your clipboard.");
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

// ==========================================
// 4. RENDER ENGINE
// ==========================================
function renderTable() {
    const listId = document.getElementById('filter-list').value;
    const catId = document.getElementById('filter-cat').value;
    const search = document.getElementById('search-bar').value.toLowerCase().split(' ').filter(s=>s);
    const tbody = document.getElementById('table-body');
    const empty = document.getElementById('empty-state');
    
    // Filter
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

    // Update Stats
    if(document.getElementById('stats-count')) {
        document.getElementById('stats-count').innerText = `${results.length} Organizations`;
        document.getElementById('stats-filter').innerText = (listId === 'all' && catId === 'all' && search.length === 0) ? `Total Database: ${total}` : `Filtered from ${total}`;
    }

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
// 5. POPULATE & EDIT MODALS
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
    else { container.innerHTML = currentItems.map(org => `<label class="check-item"><input type="checkbox" value="${org.id}"> ${org.name}</label>`).join(''); }
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
// 6. BULK UPLOAD
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
    e.stopPropagation();
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
function login() { if(document.getElementById('login-email').value==='saragadamteja.k@amtz.in' && document.getElementById('login-pass').value==='9989'){ isAdmin=true; localStorage.setItem('amtz_admin', 'true'); updateUIForAdmin(); closeModal('login-modal'); showToast("Logged in"); } else showToast("Invalid Credentials", "error"); }
function checkAdminStatus() { if(localStorage.getItem('amtz_admin') === 'true') { isAdmin = true; updateUIForAdmin(); } }
function updateUIForAdmin() { document.getElementById('admin-panel').classList.remove('hidden'); document.getElementById('login-trigger').classList.add('hidden'); document.getElementById('add-org-wrapper').classList.remove('hidden'); document.querySelectorAll('.col-action').forEach(el=>el.classList.remove('hidden')); }
function logout(){ localStorage.removeItem('amtz_admin'); location.reload(); }
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
function openModal(id){
    document.getElementById(id).classList.remove('hidden'); 
    if(id==='meta-modal') renderMetaList();
    if(id==='bulk-modal') { initBulkRows(20); document.getElementById('bulk-list').value = 'master'; }
}
function closeModal(id){document.getElementById(id).classList.add('hidden');}
