window.siteData = {
    "categories": [
        { "id": "cat_coe", "name": "COE" },
        { "id": "cat_bio", "name": "Biovalley" },
        { "id": "cat_mild", "name": "MILD" }
    ],
    // The Master List of all tags and their specific links (if any)
    "masterTags": [
        { "name": "@mywaltair", "type": "twitter" },
        { "name": "@amtzltd", "type": "linkedin", "link": "https://www.linkedin.com/company/amtzltd" },
        { "name": "AMTZ Official", "type": "facebook", "link": "https://www.facebook.com/amtz" },
        { "name": "@vizag_vibe", "type": "instagram" }
    ],
    // The Organizations and which tags they have
    "organizations": [
        {
            "id": 1,
            "name": "Andhra Pradesh MedTech Zone",
            "category": "cat_coe",
            "website": "https://amtz.in",
            "tagNames": ["@amtzltd", "@mywaltair"] // References masterTags by name
        },
        {
            "id": 2,
            "name": "Bio Valley Inc",
            "category": "cat_bio",
            "website": "https://biovalley.com",
            "tagNames": ["@vizag_vibe"]
        }
    ]
};
