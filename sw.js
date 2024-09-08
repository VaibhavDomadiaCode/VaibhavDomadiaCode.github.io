// The name of the cache your app uses.
//const CACHE_NAME = "buybackstore";
//let cache;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        console.log("App Installed");
        //cache = await caches.open(CACHE_NAME);
    })());
});

self.addEventListener('notificationclick', event => {
    console.log("notification clicked");
    // Close the notification.
    event.notification.close();

    const symbol = event.notification.data;
    const announcementURL = event.notification.tag;

    // React to the action.
    if (event.action === 'copy-symbol') {
        navigator.clipboard.writeText(symbol);
        console.log(`${symbol} copied to clipboard`);
    } else if (event.action === 'open-announcement') {
        clients.openWindow(announcementURL);
        console.log("open-announcement action was clicked");
    } else {
        console.log("main body of the notification was clicked");
    }
}, false);

self.addEventListener("fetch", event => {
    console.log("Fetching", event.request);
});

function getFormattedDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const fetchAnnouncements = async () => {
    console.log("Fetch Announcement called");

    const today = new Date();

    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 1);

    const url = `https://www.nseindia.com/api/corporate-announcements?index=equities&from_date=${getFormattedDate(previousDate)}&to_date=${getFormattedDate(today)}`;
    console.log(`URL used to fetch daily nse announcements: ${url}`);
    
    try {
        const response = await fetch(url, {
            "mode": "no-cors",
            "headers": {
                "cookie": "nsit=b6Hcn1TKxzn7Cpt_HYnDQPCL; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcyNTgwMzAxOCwiZXhwIjoxNzI1ODEwMjE4fQ.mMVo2VvRX2CbFEJyOVupNUi5wrTTYIrE5WI10qOzj1A;"
            }
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const announcements = await response.json();

        console.log(announcements);
        /*const announcements = [
            {
                "symbol": "BHARATRAS",
                "desc": "Loss/Duplicate-Share Certificate-XBRL",
                "dt": "07092024100808",
                "attchmntFile": "https://nsearchives.nseindia.com/corporate/xbrl/BHARATRAS_07092024100808_LOSS_OF_SHARE_1240180_07092024100807_WEB.xml",
                "sm_name": "Bharat Rasayan Limited",
                "sm_isin": "INE838B01013",
                "an_dt": "07-Sep-2024 10:08:08",
                "sort_date": "2024-09-07 10:08:08",
                "seq_id": null,
                "smIndustry": "Pesticides And Agrochemicals",
                "orgid": null,
                "attchmntText": "BHARAT RASAYAN LIMITED has informed the Exchange about Issue of duplicate share certificates/Letter of Confirmation",
                "bflag": null,
                "old_new": null,
                "csvName": null,
                "exchdisstime": "07-Sep-2024 10:08:09",
                "difference": "00:00:01"
            },
            {
                "symbol": "BHARATRAS",
                "desc": "Loss of Share Certificates",
                "dt": "07092024095914",
                "attchmntFile": "https://nsearchives.nseindia.com/corporate/BHARATRAS_07092024095914_DUPL_Intimation_Letter_06_09_2024__BHARATRAS.pdf",
                "sm_name": "Bharat Rasayan Limited",
                "sm_isin": "INE838B01013",
                "an_dt": "07-Sep-2024 09:59:14",
                "sort_date": "2024-09-07 09:59:14",
                "seq_id": null,
                "smIndustry": "Pesticides And Agrochemicals",
                "orgid": null,
                "attchmntText": "Bharat Rasayan Limited has informed the Exchange about Loss of Share Certificates",
                "bflag": null,
                "old_new": null,
                "csvName": null,
                "exchdisstime": "07-Sep-2024 09:59:15",
                "difference": "00:00:01"
            },
            {
                "symbol": "VEDL",
                "desc": "Loss/Duplicate-Share Certificate-XBRL",
                "dt": "07092024095341",
                "attchmntFile": "https://nsearchives.nseindia.com/corporate/xbrl/VEDL_07092024095341_LOSS_OF_SHARE_1240178_07092024095340_WEB.xml",
                "sm_name": "Vedanta Limited",
                "sm_isin": "INE205A01025",
                "an_dt": "07-Sep-2024 09:53:41",
                "sort_date": "2024-09-07 09:53:41",
                "seq_id": null,
                "smIndustry": null,
                "orgid": null,
                "attchmntText": "VEDANTA LIMITED has informed the Exchange about Loss of share certificates",
                "bflag": null,
                "old_new": null,
                "csvName": null,
                "exchdisstime": "07-Sep-2024 09:53:42",
                "difference": "00:00:01"
            },
            {
                "symbol": "TCI",
                "desc": "Buyback",
                "dt": "06092024222107",
                "attchmntFile": "https://nsearchives.nseindia.com/corporate/TCI_06092024222107_TCistx.pdf",
                "sm_name": "Transport Corporation of India Limited",
                "sm_isin": "INE688A01022",
                "an_dt": "06-Sep-2024 22:21:07",
                "sort_date": "2024-09-06 22:21:07",
                "seq_id": null,
                "smIndustry": "Travel And Transport",
                "orgid": null,
                "attchmntText": "Submission of Letter of Offer pertaining to buyback of up to 13,33,333 fully paid-up equity shares having a face value of INR 2/- each ( Equity Shares ) of Transport Corporation of India Limited ( Company ), on a proportionate basis through tender offer route ( Buyback ), pursuant to the provisions of Regulation 7 of the Securities and Exchange Board of India (Buy-Back of Securities) Regulations, 2018, as amended ( Buyback Regulations ).",
                "bflag": null,
                "old_new": null,
                "csvName": null,
                "exchdisstime": "06-Sep-2024 22:21:08",
                "difference": "00:00:01"
            }
        ]*/

        for (const announcement of announcements) {
            const nseSymbol = announcement["symbol"];
            const equityName = announcement["sm_name"];
            const title = announcement["desc"];
            const text = announcement["attchmntText"];
            const announcementURL = announcement["attchmntFile"];

            if (title.toLowerCase().includes("buyback") || text.toLowerCase().includes("buyback")) {
                self.registration.showNotification("Buyback Alert", {
                    body: `Symbol: ${nseSymbol} Name: ${equityName}`,
                    data: nseSymbol,
                    tag: announcementURL,
                    actions: [
                        {
                            action: "copy-symbol",
                            title: "Copy Symbol"
                        },
                        {
                            action: "open-announcement",
                            title: "Open Announcement"
                        }
                    ]
                });
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

const fetchAnnouncementsTimeout = setInterval(fetchAnnouncements, 10000);