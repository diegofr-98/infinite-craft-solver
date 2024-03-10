(async function() {
    'use strict';
    const pairs = new Map([
        ["Water", {result: "Water",emoji: "💧",isNew: false,}],
        ["Earth", {result: "Earth",emoji: "🌎",isNew: false,}],
        ["Fire" ,{result: "Fire",emoji: "🔥",isNew: false,}],
        ["Wind" ,{result: "Wind",emoji: "🌬️",isNew: false,}]
    ]);
    async function getInfiniteCraftPair() {
        const firstPair = getPair();
        const secondPair = getPair();
        const response = await fetch(`https://neal.fun/api/infinite-craft/pair?first=${firstPair.result}&second=${secondPair.result}`, {
            "headers": {
              "accept": "*/*",
              "accept-language": "es-ES,es;q=0.9",
              "cache-control": "no-cache",
              "pragma": "no-cache",
              "sec-ch-ua": "\"Brave\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Linux\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "cookie": "cf_clearance=6E.YhCc0sIg_heS1EpR50pB5C4b.WQdhdRoI6g5vtQk-1710019680-1.0.1.1-A4m5CWpqkdoLXsAEpCoOzKBcWAKYbjL37OgBR8S5kWVUOKvIEkIXnvZBdo5SaSfRbtaBgfG29nOJe6dkgXLhEA; __cf_bm=hwwQtxmMsnQ8J8zD_1eoM0mZ52ndy5M47bWX9OeWMSc-1710020376-1.0.1.1-qJvYzei97IGrbD4XcmPuJoSwwJ0jZF5jZI5G9Gb0Mhd_EWWesKVj06bSM7YGqTKRdA22zfDOynKsF_jzQN_KbQ",
              "Referer": "https://neal.fun/infinite-craft/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
          });
    
          return await response.json();
    }
    
    async function setPair() {
        const pair = await getInfiniteCraftPair();
        if(pair.result === "Nothing") {
            return;
        }
        pairs.set(pair.result,pair);
        if(!getLocalStorageInfiniteCraftData().some(x =>x.text === pair.result)) {
            setLocalStorageInfiniteCraftData(pair)
        }
    }
    
    function setLocalStorageInfiniteCraftData(pair) {
        let values = getLocalStorageInfiniteCraftData();
        values.push({
            text: pair.result,
            emoji: pair.emoji,
            discovered: pair.isNew,
        });
        const data = {elements: values, darkMode: false}
        localStorage.setItem("infinite-craft-data", JSON.stringify(data));
    }

    if(!localStorage.getItem("infinite-craft-data")) {
        localStorage.setItem("infinite-craft-data", JSON.stringify({elements: [
            {text: "Earth",emoji: "🌎",discovered: true,},
            {text: "Wind",emoji: "🌬️",discovered: true,},
            {text: "Fire",emoji: "🔥",discovered: true,},
            {text: "Water",emoji: "💧",discovered: true,},
        ], darkMode: false}));
    }
    const getLocalStorageInfiniteCraftData = () => JSON.parse(localStorage.getItem("infinite-craft-data")).elements;
    const getPair = () => pairs.get([...pairs.entries()].at(Math.floor(Math.random()*pairs.size))[0]);
    
        for (let i = 0; i < getLocalStorageInfiniteCraftData().length; i++) {
            await setPair();
        }
})();