import React, { useState, useEffect, useRef } from "react";
import { SCOREKEEPER_PASS } from "./lib/supabaseClient.js";

const DATA = {"TEAMS":{"MEX":{"n":"Mexico","g":"A"},"KOR":{"n":"South Korea","g":"A"},"RSA":{"n":"South Africa","g":"A"},"CZE":{"n":"Czechia","g":"A"},"CAN":{"n":"Canada","g":"B"},"SUI":{"n":"Switzerland","g":"B"},"QAT":{"n":"Qatar","g":"B"},"BIH":{"n":"Bosnia & Herzegovina","g":"B"},"BRA":{"n":"Brazil","g":"C"},"MAR":{"n":"Morocco","g":"C"},"SCO":{"n":"Scotland","g":"C"},"HAI":{"n":"Haiti","g":"C"},"USA":{"n":"United States","g":"D"},"AUS":{"n":"Australia","g":"D"},"PAR":{"n":"Paraguay","g":"D"},"TUR":{"n":"Turkiye","g":"D"},"GER":{"n":"Germany","g":"E"},"ECU":{"n":"Ecuador","g":"E"},"CIV":{"n":"Ivory Coast","g":"E"},"CUW":{"n":"Curacao","g":"E"},"NED":{"n":"Netherlands","g":"F"},"JPN":{"n":"Japan","g":"F"},"TUN":{"n":"Tunisia","g":"F"},"SWE":{"n":"Sweden","g":"F"},"BEL":{"n":"Belgium","g":"G"},"IRN":{"n":"Iran","g":"G"},"EGY":{"n":"Egypt","g":"G"},"NZL":{"n":"New Zealand","g":"G"},"ESP":{"n":"Spain","g":"H"},"URU":{"n":"Uruguay","g":"H"},"KSA":{"n":"Saudi Arabia","g":"H"},"CPV":{"n":"Cape Verde","g":"H"},"FRA":{"n":"France","g":"I"},"SEN":{"n":"Senegal","g":"I"},"NOR":{"n":"Norway","g":"I"},"IRQ":{"n":"Iraq","g":"I"},"ARG":{"n":"Argentina","g":"J"},"AUT":{"n":"Austria","g":"J"},"ALG":{"n":"Algeria","g":"J"},"JOR":{"n":"Jordan","g":"J"},"POR":{"n":"Portugal","g":"K"},"COL":{"n":"Colombia","g":"K"},"UZB":{"n":"Uzbekistan","g":"K"},"COD":{"n":"DR Congo","g":"K"},"ENG":{"n":"England","g":"L"},"CRO":{"n":"Croatia","g":"L"},"PAN":{"n":"Panama","g":"L"},"GHA":{"n":"Ghana","g":"L"}},"MATCHES":[{"h":"MEX","a":"RSA","ph":0.6508,"pd":0.2238,"pa":0.1253},{"h":"KOR","a":"CZE","ph":0.3592,"pd":0.3012,"pa":0.3396},{"h":"CAN","a":"BIH","ph":0.5199,"pd":0.2674,"pa":0.2127},{"h":"USA","a":"PAR","ph":0.4744,"pd":0.2847,"pa":0.2409},{"h":"QAT","a":"SUI","ph":0.0785,"pd":0.1507,"pa":0.7708},{"h":"BRA","a":"MAR","ph":0.597,"pd":0.2358,"pa":0.1672},{"h":"HAI","a":"SCO","ph":0.1402,"pd":0.2024,"pa":0.6573},{"h":"AUS","a":"TUR","ph":0.2127,"pd":0.2674,"pa":0.5199},{"h":"GER","a":"CUW","ph":0.9194,"pd":0.0598,"pa":0.0208},{"h":"NED","a":"JPN","ph":0.4667,"pd":0.2667,"pa":0.2667},{"h":"CIV","a":"ECU","ph":0.2676,"pd":0.3252,"pa":0.4072},{"h":"SWE","a":"TUN","ph":0.5652,"pd":0.327,"pa":0.1079},{"h":"ESP","a":"CPV","ph":0.8625,"pd":0.0958,"pa":0.0417},{"h":"BEL","a":"EGY","ph":0.6302,"pd":0.2078,"pa":0.162},{"h":"KSA","a":"URU","ph":0.1393,"pd":0.2238,"pa":0.6369},{"h":"IRN","a":"NZL","ph":0.4919,"pd":0.2846,"pa":0.2236},{"h":"FRA","a":"SEN","ph":0.6446,"pd":0.2165,"pa":0.1389},{"h":"IRQ","a":"NOR","ph":0.0788,"pd":0.1401,"pa":0.7811},{"h":"ARG","a":"ALG","ph":0.6704,"pd":0.2086,"pa":0.1211},{"h":"AUT","a":"JOR","ph":0.7132,"pd":0.1811,"pa":0.1057},{"h":"POR","a":"COD","ph":0.7509,"pd":0.1585,"pa":0.0906},{"h":"ENG","a":"CRO","ph":0.5493,"pd":0.2545,"pa":0.1962},{"h":"GHA","a":"PAN","ph":0.4577,"pd":0.2887,"pa":0.2536},{"h":"UZB","a":"COL","ph":0.1246,"pd":0.2077,"pa":0.6677},{"h":"CZE","a":"RSA","ph":0.4961,"pd":0.2519,"pa":0.2519},{"h":"SUI","a":"BIH","ph":0.5669,"pd":0.2475,"pa":0.1856},{"h":"CAN","a":"QAT","ph":0.6907,"pd":0.1964,"pa":0.1129},{"h":"MEX","a":"KOR","ph":0.5039,"pd":0.2786,"pa":0.2175},{"h":"USA","a":"AUS","ph":0.5224,"pd":0.2675,"pa":0.2102},{"h":"SCO","a":"MAR","ph":0.2524,"pd":0.2849,"pa":0.4627},{"h":"BRA","a":"HAI","ph":0.8574,"pd":0.0942,"pa":0.0484},{"h":"TUR","a":"PAR","ph":0.4206,"pd":0.2944,"pa":0.2849},{"h":"NED","a":"SWE","ph":0.5546,"pd":0.2474,"pa":0.1979},{"h":"GER","a":"CIV","ph":0.6217,"pd":0.2125,"pa":0.1658},{"h":"ECU","a":"CUW","ph":0.7603,"pd":0.1574,"pa":0.0823},{"h":"TUN","a":"JPN","ph":0.2116,"pd":0.2778,"pa":0.5106},{"h":"ESP","a":"KSA","ph":0.8304,"pd":0.1107,"pa":0.0589},{"h":"BEL","a":"IRN","ph":0.6682,"pd":0.2064,"pa":0.1254},{"h":"URU","a":"CPV","ph":0.6388,"pd":0.2181,"pa":0.1431},{"h":"NZL","a":"EGY","ph":0.1975,"pd":0.2693,"pa":0.5332},{"h":"ARG","a":"AUT","ph":0.5629,"pd":0.2528,"pa":0.1843},{"h":"FRA","a":"IRQ","ph":0.826,"pd":0.1184,"pa":0.0556},{"h":"NOR","a":"SEN","ph":0.4444,"pd":0.2778,"pa":0.2778},{"h":"JOR","a":"ALG","ph":0.1762,"pd":0.2518,"pa":0.572},{"h":"POR","a":"UZB","ph":0.7343,"pd":0.1632,"pa":0.1026},{"h":"ENG","a":"GHA","ph":0.7,"pd":0.1875,"pa":0.1125},{"h":"PAN","a":"CRO","ph":0.1425,"pd":0.2408,"pa":0.6167},{"h":"COL","a":"COD","ph":0.6187,"pd":0.2383,"pa":0.143},{"h":"BIH","a":"QAT","ph":0.5832,"pd":0.2473,"pa":0.1695},{"h":"SUI","a":"CAN","ph":0.4424,"pd":0.2854,"pa":0.2722},{"h":"MAR","a":"HAI","ph":0.6989,"pd":0.1954,"pa":0.1057},{"h":"SCO","a":"BRA","ph":0.1383,"pd":0.2193,"pa":0.6423},{"h":"CZE","a":"MEX","ph":0.2347,"pd":0.2787,"pa":0.4865},{"h":"RSA","a":"KOR","ph":0.2546,"pd":0.2785,"pa":0.4668},{"h":"CUW","a":"CIV","ph":0.0846,"pd":0.1544,"pa":0.761},{"h":"ECU","a":"GER","ph":0.1934,"pd":0.2417,"pa":0.5649},{"h":"JPN","a":"SWE","ph":0.4424,"pd":0.2854,"pa":0.2722},{"h":"TUN","a":"NED","ph":0.1522,"pd":0.2202,"pa":0.6276},{"h":"PAR","a":"AUS","ph":0.4303,"pd":0.294,"pa":0.2757},{"h":"TUR","a":"USA","ph":0.3497,"pd":0.2787,"pa":0.3716},{"h":"NOR","a":"FRA","ph":0.2217,"pd":0.2688,"pa":0.5095},{"h":"SEN","a":"IRQ","ph":0.6207,"pd":0.2299,"pa":0.1494},{"h":"CPV","a":"KSA","ph":0.3606,"pd":0.2995,"pa":0.3398},{"h":"URU","a":"ESP","ph":0.1872,"pd":0.247,"pa":0.5658},{"h":"EGY","a":"IRN","ph":0.4135,"pd":0.3087,"pa":0.2778},{"h":"NZL","a":"BEL","ph":0.1134,"pd":0.1814,"pa":0.7053},{"h":"CRO","a":"GHA","ph":0.5505,"pd":0.2631,"pa":0.1864},{"h":"PAN","a":"ENG","ph":0.1101,"pd":0.173,"pa":0.7169},{"h":"COL","a":"POR","ph":0.2753,"pd":0.2842,"pa":0.4405},{"h":"COD","a":"UZB","ph":0.3916,"pd":0.2937,"pa":0.3147},{"h":"ALG","a":"AUT","ph":0.2945,"pd":0.2945,"pa":0.411},{"h":"JOR","a":"ARG","ph":0.0824,"pd":0.151,"pa":0.7666}],"OWNERS_OF":{"ESP":["Maurer/Russell","Maccaroni"],"ARG":["O'Neill","O'Neill"],"ENG":["Roz/Ohman","Green/Parks"],"FRA":["Roz/Ohman","Maccaroni"],"BRA":["Maurer/Russell","Maccaroni"],"GER":["Green/Parks","Maino/Harrahy"],"POR":["Maino/Harrahy","Maurer/Russell"],"BEL":["Maurer/Russell","Mohar/Sasina"],"MEX":["Maccaroni","Mohar/Sasina"],"NED":["Maccaroni","Roz/Ohman"],"COL":["Maino/Harrahy","Mohar/Sasina"],"SUI":["Green/Parks","Green/Parks"],"NOR":["Roz/Ohman","McGregor/Stalls"],"CAN":["O'Neill","McGregor/Stalls"],"TUR":["Maino/Harrahy","Mohar/Sasina"],"URU":["Maurer/Russell","McGregor/Stalls"],"ECU":["Maino/Harrahy","Green/Parks"],"USA":["Mohar/Sasina","McGregor/Stalls"],"CRO":["Maurer/Russell","Mohar/Sasina"],"JPN":["Mohar/Sasina","Mohar/Sasina"],"MAR":["Maino/Harrahy","Maino/Harrahy"],"AUT":["Maino/Harrahy","Roz/Ohman"],"SEN":["Maurer/Russell","Mohar/Sasina"],"PAR":["O'Neill","O'Neill"],"EGY":["O'Neill","O'Neill"],"KOR":["O'Neill","Green/Parks"],"CZE":["Roz/Ohman","McGregor/Stalls"],"SCO":["Green/Parks","Green/Parks"],"CIV":["Mohar/Sasina","O'Neill"],"SWE":["McGregor/Stalls","Green/Parks"],"BIH":["Roz/Ohman","Roz/Ohman"],"ALG":["Maccaroni","McGregor/Stalls"],"IRN":["McGregor/Stalls","McGregor/Stalls"],"AUS":["McGregor/Stalls","McGregor/Stalls"],"PAN":["Green/Parks","McGregor/Stalls"],"RSA":["O'Neill","McGregor/Stalls"],"COD":["Maino/Harrahy","Mohar/Sasina"],"GHA":["Green/Parks","Green/Parks"],"UZB":["O'Neill","O'Neill"],"TUN":["O'Neill","McGregor/Stalls"],"NZL":["Roz/Ohman","Roz/Ohman"],"KSA":["Maccaroni","Maino/Harrahy"],"CPV":["McGregor/Stalls","McGregor/Stalls"],"JOR":["McGregor/Stalls","O'Neill"],"HAI":["McGregor/Stalls","McGregor/Stalls"],"QAT":["Maurer/Russell","McGregor/Stalls"],"IRQ":["Maurer/Russell","Maurer/Russell"],"CUW":["Green/Parks","McGregor/Stalls"]},"STRENGTH":{"MEX":0.102378,"KOR":0.0431,"RSA":0.020356,"CZE":0.042809,"CAN":0.07049,"SUI":0.107221,"QAT":0.020233,"BIH":0.041505,"BRA":0.266925,"MAR":0.109155,"SCO":0.046826,"HAI":0.012994,"USA":0.113886,"AUS":0.029882,"PAR":0.057163,"TUR":0.120877,"GER":0.245162,"ECU":0.113376,"CIV":0.04657,"CUW":0.0128,"NED":0.184767,"JPN":0.105238,"TUN":0.028687,"SWE":0.066275,"BEL":0.13049,"IRN":0.029119,"EGY":0.042457,"NZL":0.020233,"ESP":0.408922,"URU":0.114395,"KSA":0.020233,"CPV":0.020233,"FRA":0.356368,"SEN":0.096106,"NOR":0.178333,"IRQ":0.020356,"ARG":0.36685,"AUT":0.060982,"ALG":0.044132,"JOR":0.020356,"POR":0.264239,"COL":0.172235,"UZB":0.020356,"COD":0.024508,"ENG":0.321308,"CRO":0.091538,"PAN":0.023757,"GHA":0.028687}};

const OWNERS = ["Maurer/Russell","Mohar/Sasina","Green/Parks","Maino/Harrahy","Roz/Ohman","Maccaroni","O'Neill","McGregor/Stalls"];
const GROUPS = "ABCDEFGHIJKL".split("");
const P_REG = 0.61, P_ET = 0.13, P_PK = 0.26;
const STORE_SHARED = "wc2026-official-v3";   // official results — shared with everyone on the link
const STORE_LOCAL  = "wc2026-personal-v3";   // your private what-if planning + scorekeeper role
const HAS_STORAGE = typeof window!=="undefined" && window.storage && typeof window.storage.get==="function";
const SEED_DATE = "Sat, Jun 20, 2026 (through Day 9; Day 10 underway)";
const SEED_RESULTS = {"0":{"r":"H","hg":2,"ag":0},"1":{"r":"H","hg":2,"ag":1},"2":{"r":"D","hg":1,"ag":1},"3":{"r":"H","hg":4,"ag":1},"8":{"r":"H","hg":7,"ag":1},"4":{"r":"D","hg":1,"ag":1},"5":{"r":"D","hg":1,"ag":1},"6":{"r":"A","hg":0,"ag":1},"7":{"r":"H","hg":2,"ag":0},"9":{"r":"D","hg":2,"ag":2},"10":{"r":"H","hg":1,"ag":0},"11":{"r":"H","hg":5,"ag":1},"13":{"r":"D","hg":1,"ag":1},"15":{"r":"D","hg":2,"ag":2},"12":{"r":"D","hg":0,"ag":0},"14":{"r":"D","hg":1,"ag":1},"16":{"r":"H","hg":3,"ag":1},"17":{"r":"A","hg":1,"ag":4},"18":{"r":"H","hg":3,"ag":0},"19":{"r":"H","hg":3,"ag":1},"20":{"r":"D","hg":1,"ag":1},"23":{"r":"A","hg":1,"ag":3},"21":{"r":"H","hg":4,"ag":2},"22":{"r":"H","hg":1,"ag":0},"24":{"r":"D","hg":1,"ag":1},"25":{"r":"H","hg":4,"ag":1},"26":{"r":"H","hg":6,"ag":0},"27":{"r":"H","hg":1,"ag":0},"28":{"r":"H","hg":2,"ag":0},"29":{"r":"A","hg":0,"ag":1},"30":{"r":"H","hg":3,"ag":0},"31":{"r":"A","hg":0,"ag":1}};
const ME = "McGregor/Stalls";
const isMine = (c)=> (DATA.OWNERS_OF[c]||[]).includes(ME);
const myCount = (c)=> (DATA.OWNERS_OF[c]||[]).filter(o=>o===ME).length;
const MY_SCHEDULE = [{"i":0,"dw":"Thu","d":"Jun 11","t":""},{"i":1,"dw":"Thu","d":"Jun 11","t":""},{"i":2,"dw":"Fri","d":"Jun 12","t":""},{"i":3,"dw":"Fri","d":"Jun 12","t":""},{"i":4,"dw":"Sat","d":"Jun 13","t":""},{"i":6,"dw":"Sat","d":"Jun 13","t":""},{"i":7,"dw":"Sat","d":"Jun 13","t":""},{"i":8,"dw":"Sun","d":"Jun 14","t":""},{"i":11,"dw":"Sun","d":"Jun 14","t":""},{"i":15,"dw":"Mon","d":"Jun 15","t":""},{"i":12,"dw":"Mon","d":"Jun 15","t":""},{"i":14,"dw":"Mon","d":"Jun 15","t":""},{"i":17,"dw":"Tue","d":"Jun 16","t":""},{"i":18,"dw":"Tue","d":"Jun 16","t":""},{"i":19,"dw":"Tue","d":"Jun 16","t":""},{"i":22,"dw":"Wed","d":"Jun 17","t":""},{"i":24,"dw":"Thu","d":"Jun 18","t":"12:00 PM"},{"i":26,"dw":"Thu","d":"Jun 18","t":"6:00 PM"},{"i":28,"dw":"Fri","d":"Jun 19","t":"3:00 PM"},{"i":30,"dw":"Fri","d":"Jun 19","t":"9:00 PM"},{"i":32,"dw":"Sat","d":"Jun 20","t":"1:00 PM"},{"i":34,"dw":"Sat","d":"Jun 20","t":"8:00 PM"},{"i":35,"dw":"Sun","d":"Jun 21","t":"12:00 AM"},{"i":37,"dw":"Sun","d":"Jun 21","t":"3:00 PM"},{"i":38,"dw":"Sun","d":"Jun 21","t":"6:00 PM"},{"i":42,"dw":"Mon","d":"Jun 22","t":"8:00 PM"},{"i":43,"dw":"Mon","d":"Jun 22","t":"11:00 PM"},{"i":46,"dw":"Tue","d":"Jun 23","t":"7:00 PM"},{"i":49,"dw":"Wed","d":"Jun 24","t":"3:00 PM"},{"i":48,"dw":"Wed","d":"Jun 24","t":"3:00 PM"},{"i":50,"dw":"Wed","d":"Jun 24","t":"6:00 PM"},{"i":52,"dw":"Wed","d":"Jun 24","t":"9:00 PM"},{"i":53,"dw":"Wed","d":"Jun 24","t":"9:00 PM"},{"i":54,"dw":"Thu","d":"Jun 25","t":"4:00 PM"},{"i":56,"dw":"Thu","d":"Jun 25","t":"7:00 PM"},{"i":57,"dw":"Thu","d":"Jun 25","t":"7:00 PM"},{"i":59,"dw":"Thu","d":"Jun 25","t":"10:00 PM"},{"i":58,"dw":"Thu","d":"Jun 25","t":"10:00 PM"},{"i":60,"dw":"Fri","d":"Jun 26","t":"3:00 PM"},{"i":62,"dw":"Fri","d":"Jun 26","t":"8:00 PM"},{"i":63,"dw":"Fri","d":"Jun 26","t":"8:00 PM"},{"i":64,"dw":"Fri","d":"Jun 26","t":"11:00 PM"},{"i":67,"dw":"Sat","d":"Jun 27","t":"5:00 PM"},{"i":70,"dw":"Sat","d":"Jun 27","t":"10:00 PM"},{"i":71,"dw":"Sat","d":"Jun 27","t":"10:00 PM"}];

// Official FIFA bracket
const R32_FIXED = { M73:["RU","A","RU","B"], M75:["W","F","RU","C"], M76:["W","C","RU","F"], M78:["RU","E","RU","I"],
  M83:["RU","K","RU","L"], M84:["W","H","RU","J"], M86:["W","J","RU","H"], M88:["RU","D","RU","G"] };
const THIRD_SLOTS = { M74:{w:"E",allow:"ABCDF"}, M77:{w:"I",allow:"CDFGH"}, M79:{w:"A",allow:"CEFHI"}, M80:{w:"L",allow:"EHIJK"},
  M81:{w:"D",allow:"BEFIJ"}, M82:{w:"G",allow:"AEHIJ"}, M85:{w:"B",allow:"EFGIJ"}, M87:{w:"K",allow:"DEIJL"} };
const R16 = { M89:["M74","M77"], M90:["M73","M75"], M91:["M76","M78"], M92:["M79","M80"],
  M93:["M83","M84"], M94:["M81","M82"], M95:["M86","M88"], M96:["M85","M87"] };
const QF = { M97:["M89","M90"], M98:["M93","M94"], M99:["M91","M92"], M100:["M95","M96"] };
const SF = { M101:["M97","M98"], M102:["M99","M100"] };
const KO_ORDER = ["M73","M74","M75","M76","M77","M78","M79","M80","M81","M82","M83","M84","M85","M86","M87","M88",
  "M89","M90","M91","M92","M93","M94","M95","M96","M97","M98","M99","M100","M101","M102","BRONZE","FINAL"];
const ROUND_OF = c => { const n = parseInt(c.slice(1)); if (c==="FINAL") return "Final"; if (c==="BRONZE") return "Third place";
  if (n<=88) return "Round of 32"; if (n<=96) return "Round of 16"; if (n<=100) return "Quarterfinal"; return "Semifinal"; };

// ---------- engine helpers ----------
function thirdMatching(qualGroups, override) {
  // returns {slot: group} honoring overrides, else first feasible (deterministic)
  const slots = Object.keys(THIRD_SLOTS);
  const assign = {}, used = new Set();
  for (const s of slots) { const o = override && override[s];
    if (o && qualGroups.includes(o) && THIRD_SLOTS[s].allow.includes(o) && !used.has(o)) { assign[s]=o; used.add(o); } }
  const free = slots.filter(s=>!assign[s]);
  function bt(i){ if (i===free.length) return true; const s=free[i];
    for (const g of qualGroups) { if (used.has(g)||!THIRD_SLOTS[s].allow.includes(g)) continue;
      assign[s]=g; used.add(g); if (bt(i+1)) return true; used.delete(g); delete assign[s]; }
    return false; }
  return bt(0) ? assign : null;
}
function shuffled(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

function groupTables(results){ // FIFA pts from entered results
  const fp={}, played={}; Object.keys(DATA.TEAMS).forEach(c=>{fp[c]=0;played[c]=0;});
  DATA.MATCHES.forEach((m,i)=>{ const r=results[i]; if(!r) return; played[m.h]++; played[m.a]++;
    if(r==="H") fp[m.h]+=3; else if(r==="A") fp[m.a]+=3; else {fp[m.h]++;fp[m.a]++;} });
  return {fp, played};
}
function auctionPointsFromEntered(results, koResults){
  const pts={}; Object.keys(DATA.TEAMS).forEach(c=>pts[c]=0);
  DATA.MATCHES.forEach((m,i)=>{ const r=results[i]; if(!r) return;
    if(r==="H") pts[m.h]+=2; else if(r==="A") pts[m.a]+=2; else {pts[m.h]+=1;pts[m.a]+=1;} });
  Object.values(koResults||{}).forEach(kr=>{ if(!kr||!kr.w||!kr.l) return;
    if(kr.t==="ET"){pts[kr.w]+=2;pts[kr.l]+=1;} else if(kr.t==="PK"){pts[kr.w]+=1.5;pts[kr.l]+=1;} else pts[kr.w]+=2; });
  return pts;
}
function ownerTotals(teamPts){ const t={}; OWNERS.forEach(o=>t[o]=0);
  Object.entries(DATA.OWNERS_OF).forEach(([c,list])=>list.forEach(o=>{t[o]+=teamPts[c];})); return t; }

// Real bracket from fully entered groups (deterministic display)
function realBracket(results, thirdOverride){
  if (DATA.MATCHES.some((_,i)=>!results[i])) return null;
  const {fp}=groupTables(results);
  const W={},RU={},TH={};
  GROUPS.forEach(g=>{ const t=Object.keys(DATA.TEAMS).filter(c=>DATA.TEAMS[c].g===g)
      .sort((a,b)=> fp[b]-fp[a] || a.localeCompare(b));
    W[g]=t[0]; RU[g]=t[1]; TH[g]=t[2]; });
  const thirds=GROUPS.map(g=>TH[g]).sort((a,b)=>fp[b]-fp[a]||a.localeCompare(b)).slice(0,8);
  const qg=thirds.map(c=>DATA.TEAMS[c].g);
  const amap=thirdMatching(qg, thirdOverride); if(!amap) return null;
  const t3={}; thirds.forEach(c=>t3[DATA.TEAMS[c].g]=c);
  const pair={};
  Object.entries(R32_FIXED).forEach(([m,[k1,g1,k2,g2]])=>{ pair[m]=[k1==="W"?W[g1]:RU[g1], k2==="W"?W[g2]:RU[g2]]; });
  Object.entries(THIRD_SLOTS).forEach(([m,{w}])=>{ pair[m]=[W[w], t3[amap[m]]]; });
  return {pair, qualThirdGroups:qg, amap};
}
function bracketWithResults(pair, koResults){
  // extend pairings forward where winners are known
  const p={...pair};
  const winOf=m=>koResults[m]&&koResults[m].w;
  const ext=(tbl)=>Object.entries(tbl).forEach(([m,[a,b]])=>{ const wa=winOf(a),wb=winOf(b); if(wa&&wb) p[m]=[wa,wb]; });
  ext(R16); ext(QF); ext(SF);
  const w1=winOf("M101"),w2=winOf("M102");
  if(w1&&w2){ p["FINAL"]=[w1,w2];
    const l=m=>koResults[m].l; p["BRONZE"]=[l("M101"),l("M102")]; }
  return p;
}

// ---------- Monte Carlo ----------
function runMC(results, koResults, thirdOverride, N, progressCb){
  const codes=Object.keys(DATA.TEAMS);
  const allEntered=!DATA.MATCHES.some((_,i)=>!results[i]);
  const rb=allEntered?realBracket(results,thirdOverride):null;
  const tally={}; OWNERS.forEach(o=>tally[o]={pts:0,win:0,cash:0,rel:0,fin:0});
  const champCount={};
  for(let n=0;n<N;n++){
    const pts={},fp={}; codes.forEach(c=>{pts[c]=0;fp[c]=0;});
    DATA.MATCHES.forEach((m,i)=>{ const r=results[i];
      if(r==="H"){pts[m.h]+=2;fp[m.h]+=3;}
      else if(r==="A"){pts[m.a]+=2;fp[m.a]+=3;}
      else if(r==="D"){pts[m.h]+=1;pts[m.a]+=1;fp[m.h]++;fp[m.a]++;}
      else { const u=Math.random();
        if(u<m.ph){pts[m.h]+=2;fp[m.h]+=3;}
        else if(u<m.ph+m.pd){pts[m.h]++;pts[m.a]++;fp[m.h]++;fp[m.a]++;}
        else {pts[m.a]+=2;fp[m.a]+=3;} } });
    // standings
    let pair;
    if(rb){ pair={...rb.pair}; }
    else {
      const W={},RU={},TH={};
      GROUPS.forEach(g=>{ const t=codes.filter(c=>DATA.TEAMS[c].g===g)
          .sort((a,b)=> fp[b]-fp[a] || Math.random()-0.5);
        W[g]=t[0];RU[g]=t[1];TH[g]=t[2]; });
      const thirds=GROUPS.map(g=>TH[g]).sort((a,b)=>fp[b]-fp[a]||Math.random()-0.5).slice(0,8);
      const qg=shuffled(thirds.map(c=>DATA.TEAMS[c].g));
      const amap=thirdMatching(qg,null); const t3={}; thirds.forEach(c=>t3[DATA.TEAMS[c].g]=c);
      pair={};
      Object.entries(R32_FIXED).forEach(([m,[k1,g1,k2,g2]])=>{pair[m]=[k1==="W"?W[g1]:RU[g1],k2==="W"?W[g2]:RU[g2]];});
      Object.entries(THIRD_SLOTS).forEach(([m,{w}])=>{pair[m]=[W[w],t3[amap[m]]];});
    }
    const winners={};
    const play=(m,a,b)=>{ const kr=koResults[m];
      let w,l,t;
      if(kr&&kr.w&&(kr.w===a||kr.w===b)){ w=kr.w; l=w===a?b:a; t=kr.t||"REG"; }
      else { const sa=DATA.STRENGTH[a],sb=DATA.STRENGTH[b];
        w=Math.random()<sa/(sa+sb)?a:b; l=w===a?b:a;
        const u=Math.random(); t=u<P_REG?"REG":u<P_REG+P_ET?"ET":"PK"; }
      if(t==="ET"){pts[w]+=2;pts[l]+=1;} else if(t==="PK"){pts[w]+=1.5;pts[l]+=1;} else pts[w]+=2;
      winners[m]={w,l}; return w; };
    const r32slots=[...Object.keys(R32_FIXED),...Object.keys(THIRD_SLOTS)];
    r32slots.forEach(m=>play(m,pair[m][0],pair[m][1]));
    Object.entries(R16).forEach(([m,[x,y]])=>play(m,winners[x].w,winners[y].w));
    Object.entries(QF).forEach(([m,[x,y]])=>play(m,winners[x].w,winners[y].w));
    Object.entries(SF).forEach(([m,[x,y]])=>play(m,winners[x].w,winners[y].w));
    play("BRONZE",winners["M101"].l,winners["M102"].l);
    const champ=play("FINAL",winners["M101"].w,winners["M102"].w);
    champCount[champ]=(champCount[champ]||0)+1;
    const ot=ownerTotals(pts);
    const order=[...OWNERS].sort((a,b)=> ot[b]-ot[a] || Math.random()-0.5);
    order.forEach((o,idx)=>{ const rk=idx+1; tally[o].pts+=ot[o]; tally[o].fin+=rk;
      if(rk===1)tally[o].win++; if(rk<=3)tally[o].cash++; if(rk>=7)tally[o].rel++; });
    if(progressCb && n%50===0) progressCb(n);
  }
  return {tally,champCount,N};
}

// ---------- UI ----------
const C = { pitch:"#0C2B22", panel:"#10342A", panel2:"#0E2E25", line:"#1E4A3C", chalk:"#EDE9DC",
  dim:"#9DB5A8", amber:"#FFB300", gold:"#E8C35A", red:"#E2574C", green:"#5BC489" };
const num = { fontVariantNumeric:"tabular-nums" };

function Seg({value,onChange,opts}){
  return <div style={{display:"inline-flex",border:`1px solid ${C.line}`,borderRadius:6,overflow:"hidden"}}>
    {opts.map(([v,label])=>(
      <button key={v} onClick={()=>onChange(value===v?null:v)}
        style={{padding:"4px 10px",fontSize:12,border:"none",cursor:"pointer",
          background:value===v?C.amber:"transparent",color:value===v?"#1A1206":C.chalk,
          fontWeight:value===v?700:400}}>{label}</button>))}
  </div>;
}

function AppInner(){
  const [tab,setTab]=useState("standings");
  const [manual,setManual]=useState({});      // what-if entries (editable)
  const [live,setLive]=useState({});           // finished games (locked)
  const [koResults,setKoResults]=useState({});
  const [thirdOverride,setThirdOverride]=useState({});
  const [scorekeeper,setScorekeeper]=useState(false);  // per-device role; only the scorekeeper enters official results
  const [draft,setDraft]=useState({});                 // in-progress score steppers, keyed by match index
  const saveFinal=(i,hg,ag)=>{ const r=hg>ag?"H":(ag>hg?"A":"D");
    setLive(p=>({...p,[i]:{r,hg,ag}}));
    setManual(p=>{ const q={...p}; delete q[i]; return q; }); };
  const clearFinal=(i)=>setLive(p=>{ const q={...p}; delete q[i]; return q; });
  const bump=(i,side,d,lv)=>setDraft(p=>{ const cur=p[i]||{hg:lv?lv.hg:0,ag:lv?lv.ag:0};
    return {...p,[i]:{...cur,[side]:Math.max(0,Math.min(20,(cur[side]||0)+d))}}; });
  const [loaded,setLoaded]=useState(false);
  const [saveState,setSaveState]=useState("");
  const [simBusy,setSimBusy]=useState(false);
  const [sim,setSim]=useState(null);
  const localTimer=useRef(null);
  const sharedTimer=useRef(null);
  const skipSharedSave=useRef(false);   // true when a live-change arrived from the server (don't echo it back)

  const eff={}; DATA.MATCHES.forEach((_,i)=>{ eff[i]= live[i]?live[i].r:(manual[i]||null); });
  const lockedCount=Object.keys(live).length;
  const whatifCount=DATA.MATCHES.filter((_,i)=>!live[i]&&manual[i]).length;

  // Apply a shared-results blob that arrived from the cloud (realtime). Merge onto the baseline,
  // drop any what-ifs for games that are now final, and flag the next shared-save as a no-op.
  const applyShared=(sharedObj)=>{
    const officialLive=(sharedObj&&sharedObj.live)||{};
    const mergedLive={...SEED_RESULTS,...officialLive};
    skipSharedSave.current=true;
    setLive(mergedLive);
    setManual(prev=>{ const q={...prev}; Object.keys(mergedLive).forEach(id=>{ delete q[id]; }); return q; });
  };

  // Initial load: read shared (cloud) + local (this device), hydrate, then subscribe to live updates.
  useEffect(()=>{ let cancelled=false; let unsub=null; (async()=>{
    let shared=null, local=null;
    if(HAS_STORAGE){
      try{ const r=await window.storage.get(STORE_SHARED,true); if(r&&r.value) shared=JSON.parse(r.value); }catch(e){}
      try{ const r=await window.storage.get(STORE_LOCAL,false); if(r&&r.value) local=JSON.parse(r.value); }catch(e){}
    }
    if(!cancelled){
      const officialLive=(shared&&shared.live)||{};
      const mergedLive={...SEED_RESULTS,...officialLive};   // entered official results override the baseline
      const sm=(local&&local.manual)||{};
      const mergedManual={...sm}; Object.keys(mergedLive).forEach(id=>{ delete mergedManual[id]; });
      skipSharedSave.current=true;                          // don't write back what we just loaded
      setLive(mergedLive); setManual(mergedManual);
      setKoResults((local&&local.koResults)||{}); setThirdOverride((local&&local.thirdOverride)||{});
      setScorekeeper(!!(local&&local.scorekeeper));
      setLoaded(true);
      if(HAS_STORAGE && window.storage.subscribeShared){
        unsub=window.storage.subscribeShared(STORE_SHARED,(valStr)=>{
          let obj=null; if(valStr){ try{ obj=JSON.parse(valStr); }catch(e){} }
          applyShared(obj);
        });
      }
    }
  })(); return ()=>{ cancelled=true; if(unsub) unsub(); }; },[]);

  // Save official results to the SHARED cloud store (skipped when the change came from the server).
  useEffect(()=>{ if(!loaded) return;
    if(skipSharedSave.current){ skipSharedSave.current=false; return; }
    if(!HAS_STORAGE){ setSaveState("Running locally — changes stay on this screen"); return; }
    if(sharedTimer.current) clearTimeout(sharedTimer.current);
    sharedTimer.current=setTimeout(async()=>{
      try{ await window.storage.set(STORE_SHARED, JSON.stringify({live}), true);
        setSaveState("Saved — results synced to everyone on the link"); }
      catch(e){ setSaveState("Couldn't reach the cloud — will retry"); }
      setTimeout(()=>setSaveState(""),2500);
    },500);
  },[live,loaded]);

  // Save private what-ifs + scorekeeper role to THIS device only.
  useEffect(()=>{ if(!loaded||!HAS_STORAGE) return;
    if(localTimer.current) clearTimeout(localTimer.current);
    localTimer.current=setTimeout(async()=>{
      try{ await window.storage.set(STORE_LOCAL, JSON.stringify({manual,koResults,thirdOverride,scorekeeper}), false); }catch(e){}
    },500);
  },[manual,koResults,thirdOverride,scorekeeper,loaded]);

  const teamPts=auctionPointsFromEntered(eff,koResults);
  const ot=ownerTotals(teamPts);
  const ladder=[...OWNERS].sort((a,b)=>ot[b]-ot[a]||a.localeCompare(b));
  const {fp,played}=groupTables(eff);
  const rb=realBracket(eff,thirdOverride);
  const pairAll=rb?bracketWithResults(rb.pair,koResults):null;
  const maxPts=Math.max(1,...ladder.map(o=>ot[o]));

  const setKo=(m,patch)=>setKoResults(p=>{ const cur=p[m]||{}; const next={...cur,...patch};
    if(patch.w===null){ const q={...p}; delete q[m]; return q; } return {...p,[m]:next}; });

  const runSim=async()=>{ setSimBusy(true); setSim(null);
    await new Promise(r=>setTimeout(r,30));
    setSim(runMC(eff,koResults,thirdOverride,10000,null)); setSimBusy(false); };

  const Tab=({id,label})=>(
    <button onClick={()=>setTab(id)} style={{padding:"8px 16px",cursor:"pointer",fontSize:13,letterSpacing:1.5,
      textTransform:"uppercase",fontWeight:700,border:"none",borderBottom:tab===id?`3px solid ${C.amber}`:"3px solid transparent",
      background:"transparent",color:tab===id?C.chalk:C.dim}}>{label}</button>);

  return <div style={{minHeight:"100vh",background:C.pitch,color:C.chalk,fontFamily:"system-ui,-apple-system,sans-serif"}}>
    <div style={{maxWidth:980,margin:"0 auto",padding:"24px 16px 64px"}}>
      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontSize:11,letterSpacing:3,color:C.amber,fontWeight:700}}>WORLD CUP 2026 · AUCTION POOL</div>
          <h1 style={{margin:"4px 0 0",fontSize:30,fontWeight:800,letterSpacing:-0.5}}>The Scoreboard</h1>
        </div>
        <div style={{fontSize:11,color:C.dim,textAlign:"right"}}>
          {lockedCount} final · {whatifCount} what-if · {72-lockedCount-whatifCount} open<br/>
          <span style={{color:C.green}}>{saveState||(HAS_STORAGE?(scorekeeper?"Scorekeeper — your results sync to everyone":"Live link — results update automatically"):"Running locally")}</span>
          <br/><button onClick={()=>{ if(confirm("Clear what-if entries (manual group picks + knockout picks)? Finished games stay locked.")){ setManual({}); setKoResults({}); setThirdOverride({}); } }}
            style={{marginTop:6,background:"transparent",color:C.dim,border:`1px solid ${C.line}`,borderRadius:6,padding:"3px 10px",fontSize:11,cursor:"pointer"}}>Clear what-ifs</button>
        </div>
      </div>

      <div style={{margin:"16px 0",padding:"10px 14px",background:C.panel,borderRadius:10,fontSize:12,color:C.dim,lineHeight:1.5}}>
        <b style={{color:C.chalk}}>Results update live for everyone on this link.</b> They start from a baseline current as of {SEED_DATE}; after that, the pool’s scorekeeper enters each final and it syncs to every viewer automatically — no re-sharing. Your own what-if picks stay private to you.
      </div>

      <div style={{display:"flex",gap:4,marginBottom:16,borderBottom:`1px solid ${C.line}`}}>
        <Tab id="standings" label="Standings"/><Tab id="watch" label="My games"/><Tab id="results" label="Enter results"/><Tab id="simulate" label="Simulate"/>
      </div>

      {tab==="standings" && <div>
        <div style={{background:C.panel,borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:11,letterSpacing:2,color:C.dim,marginBottom:10}}>OWNER LADDER · POINTS FROM FINISHED GAMES{whatifCount?` + ${whatifCount} WHAT-IF`:""}</div>
          {ladder.map((o,i)=>{ const zone=i<3?"cash":i>=6?"rel":"mid";
            return <div key={o} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderTop:i?`1px solid ${C.line}`:"none"}}>
              <div style={{width:18,textAlign:"right",color:zone==="cash"?C.gold:zone==="rel"?C.red:C.dim,fontWeight:800,...num}}>{i+1}</div>
              <div style={{width:8,height:8,borderRadius:2,background:zone==="cash"?C.gold:zone==="rel"?C.red:"transparent"}}/>
              <div style={{flex:"0 0 150px",fontWeight:o==="McGregor/Stalls"?800:500}}>{o}</div>
              <div style={{flex:1,height:10,background:C.panel2,borderRadius:5,overflow:"hidden"}}>
                <div style={{width:`${(ot[o]/maxPts)*100}%`,height:"100%",background:zone==="rel"?C.red:zone==="cash"?C.amber:C.dim,opacity:.9}}/></div>
              <div style={{width:52,textAlign:"right",fontWeight:800,fontSize:16,...num}}>{ot[o].toFixed(1)}</div>
            </div>;})}
          <div style={{fontSize:11,color:C.dim,marginTop:10}}>Gold = cash places (50 / 33 / 17%) · Red = relegation ($25 / $50){whatifCount?" · includes unfinished what-if games":""}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginTop:14}}>
          {GROUPS.map(g=>{ const t=Object.keys(DATA.TEAMS).filter(c=>DATA.TEAMS[c].g===g).sort((a,b)=>fp[b]-fp[a]||a.localeCompare(b));
            return <div key={g} style={{background:C.panel,borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontSize:11,letterSpacing:2,color:C.amber,fontWeight:700,marginBottom:6}}>GROUP {g}</div>
              {t.map(c=><div key={c} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"3px 0"}}>
                <span style={{color:played[c]?C.chalk:C.dim}}>{DATA.TEAMS[c].n}
                  <span style={{color:C.dim,fontSize:11}}> · {DATA.OWNERS_OF[c].map(o=>o.split("/")[0]).join(", ")}</span></span>
                <span style={{...num,fontWeight:700}}>{fp[c]}</span></div>)}
            </div>;})}
        </div>
      </div>}

      {tab==="results" && <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap",marginBottom:12,padding:"10px 14px",background:C.panel,borderRadius:10}}>
          <div style={{fontSize:12,color:C.dim,lineHeight:1.5,flex:1,minWidth:220}}>
            {scorekeeper
              ? <span><b style={{color:C.amber}}>Scorekeeper mode on.</b> Set each final score and tap Save — it syncs to everyone on the link.</span>
              : <span>Tap a result to set a private <b style={{color:C.chalk}}>what-if</b> (visible only to you). Official finals are entered by the pool’s scorekeeper and sync to all.</span>}
          </div>
          <button onClick={()=>{ if(scorekeeper){ setScorekeeper(false); return; }
              const entry=(typeof window!=="undefined"&&window.prompt)?window.prompt("Enter the scorekeeper passphrase:"):null;
              if(entry===null) return;
              if(entry===SCOREKEEPER_PASS) setScorekeeper(true);
              else if(typeof window!=="undefined"&&window.alert) window.alert("That passphrase didn’t match — scorekeeper mode stays off."); }}
            style={{background:scorekeeper?C.amber:"transparent",color:scorekeeper?"#1A1206":C.dim,fontWeight:800,
              border:`1px solid ${scorekeeper?C.amber:C.line}`,borderRadius:8,padding:"7px 14px",fontSize:12,cursor:"pointer",whiteSpace:"nowrap"}}>
            {scorekeeper?"Scorekeeper: ON":"I’m the scorekeeper"}</button>
        </div>
        {GROUPS.map(g=>{ const ms=DATA.MATCHES.map((m,i)=>({...m,i})).filter(m=>DATA.TEAMS[m.h].g===g);
          return <div key={g} style={{background:C.panel,borderRadius:10,padding:"12px 14px",marginBottom:10}}>
            <div style={{fontSize:11,letterSpacing:2,color:C.amber,fontWeight:700,marginBottom:8}}>GROUP {g}</div>
            {ms.map(m=>{ const lv=live[m.i]; const d=draft[m.i]||{hg:lv?lv.hg:0,ag:lv?lv.ag:0};
              const Step=({side})=>(<span style={{display:"inline-flex",alignItems:"center",gap:4}}>
                <button onClick={()=>bump(m.i,side,-1,lv)} style={{width:22,height:22,borderRadius:5,border:`1px solid ${C.line}`,background:C.panel2,color:C.chalk,cursor:"pointer",fontSize:14,lineHeight:1}}>−</button>
                <span style={{...num,fontWeight:800,fontSize:15,minWidth:14,textAlign:"center"}}>{d[side]}</span>
                <button onClick={()=>bump(m.i,side,1,lv)} style={{width:22,height:22,borderRadius:5,border:`1px solid ${C.line}`,background:C.panel2,color:C.chalk,cursor:"pointer",fontSize:14,lineHeight:1}}>+</button>
              </span>);
              return <div key={m.i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"6px 0",borderTop:`1px solid ${C.line}`,flexWrap:"wrap"}}>
                <div style={{fontSize:13,minWidth:200}}>{DATA.TEAMS[m.h].n} <span style={{color:C.dim}}>v</span> {DATA.TEAMS[m.a].n}</div>
                {scorekeeper
                  ? <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                      <Step side="hg"/><span style={{color:C.dim}}>–</span><Step side="ag"/>
                      <button onClick={()=>saveFinal(m.i,d.hg,d.ag)}
                        style={{background:C.gold,color:"#1A1206",fontWeight:800,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,cursor:"pointer"}}>{lv?"Update":"Save final"}</button>
                      {lv && <button onClick={()=>{ clearFinal(m.i); setDraft(p=>{const q={...p};delete q[m.i];return q;}); }}
                        style={{background:"transparent",color:C.dim,border:`1px solid ${C.line}`,borderRadius:6,padding:"4px 8px",fontSize:11,cursor:"pointer"}}>Clear</button>}
                    </div>
                  : (lv
                    ? <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{...num,fontWeight:800,fontSize:14}}>{lv.hg}–{lv.ag}</span>
                        <span style={{fontSize:10,letterSpacing:1,color:"#1A1206",background:C.gold,fontWeight:800,borderRadius:4,padding:"2px 6px"}}>FINAL</span></div>
                    : <div style={{display:"flex",alignItems:"center",gap:6}}>
                        {manual[m.i] && <span style={{fontSize:10,color:C.dim}}>what-if</span>}
                        <Seg value={manual[m.i]||null} onChange={v=>setManual(p=>({...p,[m.i]:v}))}
                          opts={[["H",DATA.TEAMS[m.h].n.split(" ")[0]],["D","Draw"],["A",DATA.TEAMS[m.a].n.split(" ")[0]]]}/></div>)}
              </div>;})}
          </div>;})}

        <div style={{background:C.panel,borderRadius:10,padding:"12px 14px",marginTop:4}}>
          <div style={{fontSize:11,letterSpacing:2,color:C.amber,fontWeight:700,marginBottom:8}}>KNOCKOUT STAGE</div>
          {!rb && <div style={{fontSize:13,color:C.dim}}>Once all 72 group games are settled (final or what-if), the bracket builds here for knockout entry. ({72-lockedCount-whatifCount} still open) — knockout games are entered by hand.</div>}
          {rb && <div>
            <div style={{fontSize:12,color:C.dim,marginBottom:10}}>Built from current standings. Check the third-place slots against FIFA’s official assignment and override if needed.</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12}}>
              {Object.entries(THIRD_SLOTS).map(([m,{w,allow}])=>{ const opts=rb.qualThirdGroups.filter(g=>allow.includes(g));
                return <div key={m} style={{fontSize:12}}><span style={{color:C.dim}}>1{w} vs 3rd of </span>
                  <select value={rb.amap[m]} onChange={e=>setThirdOverride(p=>({...p,[m]:e.target.value}))}
                    style={{background:C.panel2,color:C.chalk,border:`1px solid ${C.line}`,borderRadius:4,padding:"2px 4px"}}>
                    {opts.map(g=><option key={g} value={g}>{g}</option>)}</select></div>;})}
            </div>
            {KO_ORDER.map(m=>{ const p=pairAll&&pairAll[m]; if(!p) return null; const kr=koResults[m]||{};
              return <div key={m} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderTop:`1px solid ${C.line}`,flexWrap:"wrap"}}>
                <div style={{fontSize:11,color:C.dim,width:90}}>{ROUND_OF(m)}</div>
                <div style={{fontSize:13,minWidth:220}}>{DATA.TEAMS[p[0]].n} <span style={{color:C.dim}}>v</span> {DATA.TEAMS[p[1]].n}</div>
                <Seg value={kr.w||null} onChange={v=>{ if(v===null) setKo(m,{w:null}); else setKo(m,{w:v,l:v===p[0]?p[1]:p[0],t:kr.t||"REG"}); }}
                  opts={[[p[0],DATA.TEAMS[p[0]].n.split(" ")[0]],[p[1],DATA.TEAMS[p[1]].n.split(" ")[0]]]}/>
                {kr.w && <Seg value={kr.t||"REG"} onChange={v=>setKo(m,{t:v||"REG"})} opts={[["REG","90'"],["ET","ET"],["PK","Pens"]]}/>}
              </div>;})}
          </div>}
        </div>
      </div>}

      {tab==="watch" && <div>
        <div style={{margin:"0 0 14px",padding:"10px 14px",background:C.panel,borderRadius:10,fontSize:12,color:C.dim,lineHeight:1.5}}>
          Every group-stage game with one of your teams. Times are <b style={{color:C.chalk}}>Eastern</b>. <b style={{color:C.chalk}}>Bold</b> = your team · <span style={{color:C.amber,fontWeight:800}}>✦</span> = both teams yours. Finished games show the score and update automatically as results lock.
        </div>
        <div style={{background:C.panel,borderRadius:10,overflow:"hidden"}}>
          {(()=>{ let lastDate=null; return MY_SCHEDULE.map((g,row)=>{
            const m=DATA.MATCHES[g.i]; const lv=live[g.i];
            const hMine=isMine(m.h), aMine=isMine(m.a), both=hMine&&aMine;
            const newDay=g.d!==lastDate; lastDate=g.d;
            // outcome coloring from your perspective (only when not both yours)
            let res=null;
            if(lv){ const myWin=(hMine&&lv.r==="H")||(aMine&&lv.r==="A");
              const myLoss=(hMine&&lv.r==="A")||(aMine&&lv.r==="H");
              res = both?"both":(lv.r==="D"?"draw":(myWin?"win":(myLoss?"loss":null))); }
            const dotColor = !lv?C.line : res==="win"?C.green : res==="loss"?C.red : res==="both"?C.amber : C.dim;
            return <div key={row} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",
                borderTop:newDay&&row?`1px solid ${C.line2||C.line}`:row?`1px solid ${C.line}`:"none",
                background:newDay&&row%2?"transparent":"transparent"}}>
              <div style={{flex:"0 0 64px"}}>
                <div style={{fontSize:11,color:C.dim,fontWeight:newDay?700:400}}>{newDay?g.dw:""}</div>
                <div style={{fontSize:13,fontWeight:newDay?700:400,color:newDay?C.chalk:C.dim}}>{newDay?g.d:""}</div>
              </div>
              <div style={{flex:"0 0 72px",textAlign:"center"}}>
                {lv
                  ? <div><span style={{...num,fontWeight:800,fontSize:15,color:res==="win"?C.green:res==="loss"?C.red:C.chalk}}>{lv.hg}–{lv.ag}</span>
                      <div style={{fontSize:9,letterSpacing:1,color:C.dim}}>FT</div></div>
                  : <span style={{...num,fontSize:13,color:C.amber,fontWeight:700}}>{g.t}</span>}
              </div>
              <div style={{width:7,height:7,borderRadius:2,background:dotColor,flex:"0 0 auto"}}/>
              <div style={{flex:1,fontSize:13.5}}>
                <span style={{fontWeight:hMine?800:400,color:hMine?C.chalk:C.dim}}>{DATA.TEAMS[m.h].n}</span>
                {myCount(m.h)===2 && <span style={{fontSize:10.5,fontWeight:800,color:C.amber}}> (×2)</span>}
                <span style={{color:C.dim}}> v </span>
                <span style={{fontWeight:aMine?800:400,color:aMine?C.chalk:C.dim}}>{DATA.TEAMS[m.a].n}</span>
                {myCount(m.a)===2 && <span style={{fontSize:10.5,fontWeight:800,color:C.amber}}> (×2)</span>}
                {both && <span style={{color:C.amber,fontWeight:800}}> ✦</span>}
              </div>
            </div>;
          }); })()}
        </div>
        <div style={{fontSize:11,color:C.dim,marginTop:10}}>
          You have a stake in {MY_SCHEDULE.length} of the 72 group games. {MY_SCHEDULE.filter(g=>live[g.i]).length} done, {MY_SCHEDULE.filter(g=>!live[g.i]).length} to go.
        </div>
      </div>}

      {tab==="simulate" && <div>
        <div style={{background:C.panel,borderRadius:10,padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:11,letterSpacing:2,color:C.dim}}>MONTE CARLO · 10,000 TOURNAMENTS</div>
              <div style={{fontSize:13,color:C.dim,marginTop:4}}>Holds finished games fixed and any what-if picks you’ve set as given, then simulates everything else — remaining group games (market odds), qualification, the official bracket, and every knockout game (model strengths, 61/13/26 regulation/ET/penalty timing).</div>
            </div>
            <button onClick={runSim} disabled={simBusy}
              style={{background:C.amber,color:"#1A1206",fontWeight:800,border:"none",borderRadius:8,padding:"10px 22px",fontSize:14,cursor:simBusy?"wait":"pointer",letterSpacing:1}}>
              {simBusy?"Running…":"Run 10,000 simulations"}</button>
          </div>
          {sim && <div style={{marginTop:16,overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{color:C.dim,fontSize:11,letterSpacing:1,textAlign:"right"}}>
                <th style={{textAlign:"left",padding:"6px 4px"}}>OWNER</th><th style={{padding:"6px 4px"}}>WIN</th>
                <th style={{padding:"6px 4px"}}>CASH (TOP 3)</th><th style={{padding:"6px 4px"}}>RELEGATION</th>
                <th style={{padding:"6px 4px"}}>AVG PTS</th><th style={{padding:"6px 4px"}}>AVG FINISH</th></tr></thead>
              <tbody>{[...OWNERS].sort((a,b)=>sim.tally[b].win-sim.tally[a].win).map(o=>{ const t=sim.tally[o];
                return <tr key={o} style={{borderTop:`1px solid ${C.line}`,textAlign:"right",fontWeight:o==="McGregor/Stalls"?700:400}}>
                  <td style={{textAlign:"left",padding:"7px 4px"}}>{o}</td>
                  <td style={{padding:"7px 4px",color:C.amber,...num}}>{(t.win/sim.N*100).toFixed(1)}%</td>
                  <td style={{padding:"7px 4px",color:C.gold,...num}}>{(t.cash/sim.N*100).toFixed(1)}%</td>
                  <td style={{padding:"7px 4px",color:C.red,...num}}>{(t.rel/sim.N*100).toFixed(1)}%</td>
                  <td style={{padding:"7px 4px",...num}}>{(t.pts/sim.N).toFixed(1)}</td>
                  <td style={{padding:"7px 4px",...num}}>{(t.fin/sim.N).toFixed(2)}</td></tr>;})}
              </tbody></table>
            <div style={{fontSize:11,color:C.dim,marginTop:10}}>Most frequent champions: {Object.entries(sim.champCount).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([c,n])=>`${DATA.TEAMS[c].n} ${(n/sim.N*100).toFixed(0)}%`).join(" · ")}</div>
            <div style={{fontSize:11,color:C.dim,marginTop:4}}>Group tiebreaks are randomized (goal difference isn’t tracked), so teams level on points are approximate; at 10,000 runs, re-running varies only ~±1%.</div>
          </div>}
        </div>
      </div>}
    </div>
  </div>;
}

class ErrorBoundary extends React.Component{
  constructor(p){ super(p); this.state={err:null}; }
  static getDerivedStateFromError(err){ return {err}; }
  render(){
    if(this.state.err){
      return <div style={{minHeight:"100vh",background:"#0C2B22",color:"#EDE9DC",fontFamily:"system-ui,-apple-system,sans-serif",padding:24}}>
        <div style={{maxWidth:560,margin:"48px auto",background:"#10342A",border:"1px solid #1E4A3C",borderRadius:10,padding:24}}>
          <div style={{fontSize:11,letterSpacing:3,color:"#FFB300",fontWeight:700}}>WORLD CUP 2026 · POOL TRACKER</div>
          <h2 style={{margin:"8px 0 6px",fontSize:22}}>This screen hit a snag.</h2>
          <p style={{color:"#9DB5A8",fontSize:14,lineHeight:1.5,margin:0}}>The app errored while drawing. Any results entered are stored separately and are not affected — reload to pick them back up.</p>
          <button onClick={()=>{ try{window.location.reload();}catch(e){ this.setState({err:null}); } }}
            style={{marginTop:14,background:"#FFB300",color:"#1A1206",fontWeight:800,border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer"}}>Reload the app</button>
          <pre style={{marginTop:16,whiteSpace:"pre-wrap",fontSize:11,color:"#9DB5A8",opacity:.7}}>{String((this.state.err&&this.state.err.message)||this.state.err)}</pre>
        </div></div>;
    }
    return this.props.children;
  }
}

export default function App(){ return <ErrorBoundary><AppInner/></ErrorBoundary>; }
