import{r as T,t as $}from"./chunk-4FFZMGGR.js";import{$ as V,B as I,Q as D,R as P,V as A,W as k,X as y,c as g,f as E,g as U,i as C,p as M,sa as R}from"./chunk-BXTUWIBR.js";import{f as B}from"./chunk-CWTPBX7D.js";function f(i,d,e,n){return new Promise((t,r)=>{i||r("IndexedDB not available");let o=i.open(d,e),s;o.onsuccess=c=>{s=o.result,t(s)},o.onerror=c=>{r(`IndexedDB error: ${o.error}`)},typeof n=="function"&&(o.onupgradeneeded=c=>{n(c,s)})})}function K(i,d,e,n,t){if(!i)return;let r=i.open(d,e);r.onupgradeneeded=o=>{let s=o.target.result;n.forEach(a=>{if(!s.objectStoreNames.contains(a.store)){let l=s.createObjectStore(a.store,a.storeConfig);a.storeSchema.forEach(u=>{l.createIndex(u.name,u.keypath,u.options)})}});let c=t&&t();c&&Object.keys(c).map(a=>parseInt(a,10)).filter(a=>a>o.oldVersion).sort((a,l)=>a-l).forEach(a=>{c[a](s,r.transaction)}),s.close()},r.onsuccess=o=>{o.target.result.close()}}function H(i,d,e){if(!i||!d||!e)throw Error('Params: "dbName", "version", "storeName" are mandatory.');return new g(n=>{try{let t=d+1,r=indexedDB.open(i,t);r.onupgradeneeded=o=>{let s=o.target.result;s.deleteObjectStore(e),s.close(),console.log("onupgradeneeded"),n.next(!0),n.complete()},r.onerror=o=>n.error(o)}catch(t){n.error(t)}})}function Q(i,d){return i.objectStoreNames.contains(d)}function b(i,d,e){i||e("You need to use the openDatabase function to create a database before you query it!"),Q(i,d)||e(`objectStore does not exists: ${d}`)}function p(i,d){let e=i.transaction(d.storeName,d.dbMode);return e.onerror=d.error,e.onabort=d.abort,e}function m(i,d,e,n){return{storeName:d,dbMode:i,error:t=>{e(t)},abort:t=>{e(t)}}}var x=function(i){return i.readonly="readonly",i.readwrite="readwrite",i}(x||{}),G=new A(null),O=(()=>{class i{constructor(e,n){if(this.dbConfigs=e,this.platformId=n,this.defaultDatabaseName=null,this.isBrowser=$(this.platformId),this.isBrowser){this.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;let t=Object.values(this.dbConfigs),r=t.length===1;for(let o of t)this.instanciateConfig(o,r)}}instanciateConfig(e,n){if(!e.name)throw new Error("NgxIndexedDB: Please, provide the dbName in the configuration");if(!e.version)throw new Error("NgxIndexedDB: Please, provide the db version in the configuration");if((e.isDefault??!1)&&this.defaultDatabaseName)throw new Error("NgxIndexedDB: Only one database can be set as default");((e.isDefault??!1)&&!this.defaultDatabaseName||n)&&(this.defaultDatabaseName=e.name,this.selectedDb=e.name),K(this.indexedDB,e.name,e.version,e.objectStoresMeta,e.migrationFactory),f(this.indexedDB,e.name).then(t=>{t.version!==e.version&&(this.dbConfigs[e.name].version=t.version)})}get dbConfig(){return this.dbConfigs[this.selectedDb]}selectDb(e){if(e=e??this.defaultDatabaseName,!e)throw new Error("No database name specified and no default database set.");if(!Object.keys(this.dbConfigs).includes(e))throw new Error(`NgxIndexedDB: Database ${e} is not initialized.`);this.selectedDb=e}createObjectStore(e,n){let t=[e];K(this.indexedDB,this.dbConfig.name,++this.dbConfig.version,t,n)}add(e,n,t){return new g(r=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(o=>{let c=p(o,m(x.readwrite,e,l=>r.error(l))).objectStore(e),a=t?c.add(n,t):c.add(n);a.onsuccess=l=>B(this,null,function*(){let u=l.target.result,h=c.get(u);h.onsuccess=S=>{r.next(S.target.result),r.complete()},h.onerror=S=>{r.error(S)}}),a.onerror=l=>{r.error(l)}}).catch(o=>r.error(o))})}bulkAdd(e,n){let t=new Promise((r,o)=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(s=>{let a=p(s,m(x.readwrite,e,r,o)).objectStore(e),l=n.map(u=>new Promise((h,S)=>{let q=u.key;delete u.key;let z=q?a.add(u,q):a.add(u);z.onsuccess=J=>{let L=J.target.result;h(L)}}));r(Promise.all(l))}).catch(s=>o(s))});return C(t)}bulkDelete(e,n){let t=n.map(r=>new Promise((o,s)=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(c=>{let a=p(c,m(x.readwrite,e,s,o));a.objectStore(e).delete(r),a.oncomplete=()=>{this.getAll(e).pipe(I(1)).subscribe(u=>{o(u)})}}).catch(c=>s(c))}));return C(Promise.all(t))}getByKey(e,n){return new g(t=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(r=>{let c=p(r,m(x.readonly,e,t.error)).objectStore(e).get(n);c.onsuccess=a=>{t.next(a.target.result),t.complete()},c.onerror=a=>{t.error(a)}}).catch(r=>t.error(r))})}bulkGet(e,n){let t=n.map(r=>this.getByKey(e,r));return new g(r=>{M(t).subscribe(o=>{r.next(o),r.complete()})})}getByID(e,n){return new g(t=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(r=>{b(r,e,a=>t.error(a));let c=p(r,m(x.readonly,e,t.error,t.next)).objectStore(e).get(n);c.onsuccess=a=>{t.next(a.target.result)}}).catch(r=>t.error(r))})}getByIndex(e,n,t){return new g(r=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(o=>{b(o,e,u=>r.error(u));let l=p(o,m(x.readonly,e,r.error)).objectStore(e).index(n).get(t);l.onsuccess=u=>{r.next(u.target.result),r.complete()}}).catch(o=>r.error(o))})}getAll(e){return new g(n=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(t=>{b(t,e,c=>n.error(c));let s=p(t,m(x.readonly,e,n.error,n.next)).objectStore(e).getAll();s.onerror=c=>{n.error(c)},s.onsuccess=({target:{result:c}})=>{n.next(c),n.complete()}}).catch(t=>n.error(t))})}update(e,n){return new g(t=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(r=>{b(r,e,a=>t.error(a));let s=p(r,m(x.readwrite,e,a=>t.error(a))).objectStore(e),c=s.put(n);c.onsuccess=a=>B(this,null,function*(){let l=a.target.result,u=s.get(l);u.onsuccess=h=>{t.next(h.target.result),t.complete()}})}).catch(r=>t.error(r))})}bulkPut(e,n){let t;return new g(r=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(o=>{b(o,e,c=>r.error(c)),t=p(o,m(x.readwrite,e,c=>r.error(c)));let s=t.objectStore(e);n.forEach((c,a)=>{let l=s.put(c);a===n.length-1&&(l.onsuccess=u=>{t.commit(),r.next(u.target.result),r.complete()}),l.onerror=u=>{t.abort(),r.error(u)}})}).catch(o=>{t?.abort(),r.error(o)})})}delete(e,n){return new g(t=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(r=>{b(r,e,c=>t.error(c));let o=p(r,m(x.readwrite,e,c=>t.error(c)));o.objectStore(e).delete(n),o.oncomplete=()=>{this.getAll(e).pipe(I(1)).subscribe(c=>{t.next(c),t.complete()})}}).catch(r=>t.error(r))})}deleteByKey(e,n){return new g(t=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(r=>{b(r,e,c=>t.error(c));let o=p(r,m(x.readwrite,e,c=>t.error(c))),s=o.objectStore(e);o.oncomplete=()=>{t.next(!0),t.complete()},s.delete(n)}).catch(r=>t.error(r))})}clear(e){return new g(n=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(t=>{b(t,e,s=>n.error(s));let r=p(t,m(x.readwrite,e,s=>n.error(s)));r.objectStore(e).clear(),r.oncomplete=()=>{n.next(!0),n.complete()}}).catch(t=>n.error(t))})}deleteDatabase(){return new g(e=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(n=>B(this,null,function*(){yield n.close();let t=this.indexedDB.deleteDatabase(this.dbConfig.name);t.onsuccess=()=>{e.next(!0),e.complete()},t.onerror=r=>e.error(r),t.onblocked=()=>{throw new Error("Unable to delete database because it's blocked")}})).catch(n=>e.error(n))})}openCursor(e,n){return new g(t=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(r=>{b(r,e,a=>t.error(a));let s=p(r,m(x.readonly,e,t.error)).objectStore(e),c=n===void 0?s.openCursor():s.openCursor(n);c.onsuccess=a=>{t.next(a),t.complete()}}).catch(r=>t.error(r))})}openCursorByIndex(e,n,t,r=x.readonly){let o=new E;return f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(s=>{b(s,e,h=>{o.error(h)});let u=p(s,m(r,e,h=>{o.error(h)},()=>{o.next()})).objectStore(e).index(n).openCursor(t);u.onsuccess=h=>{o.next(h)}}).catch(s=>o.error(s)),o}getAllByIndex(e,n,t){let r=[];return new g(o=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(s=>{b(s,e,h=>o.error(h));let u=p(s,m(x.readonly,e,o.error)).objectStore(e).index(n).openCursor(t);u.onsuccess=h=>{let S=h.target.result;S?(r.push(S.value),S.continue()):(o.next(r),o.complete())}}).catch(s=>o.error(s))})}getAllKeysByIndex(e,n,t){let r=[];return new g(o=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(s=>{b(s,e,h=>o.error(h));let u=p(s,m(x.readonly,e,o.error)).objectStore(e).index(n).openKeyCursor(t);u.onsuccess=h=>{let S=h.target.result;S?(r.push({primaryKey:S.primaryKey,key:S.key}),S.continue()):(o.next(r),o.complete())}}).catch(s=>o.error(s))})}count(e,n){return new g(t=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(r=>{b(r,e,a=>t.error(a));let c=p(r,m(x.readonly,e,t.error)).objectStore(e).count(n);c.onerror=a=>t.error(a),c.onsuccess=a=>{t.next(a.target.result),t.complete()}}).catch(r=>t.error(r))})}countByIndex(e,n,t){return new g(r=>{f(this.indexedDB,this.dbConfig.name,this.dbConfig.version).then(o=>{b(o,e,u=>r.error(u));let l=p(o,m(x.readonly,e,r.error)).objectStore(e).index(n).count(t);l.onerror=u=>r.error(u),l.onsuccess=u=>{r.next(u.target.result),r.complete()}}).catch(o=>r.error(o))})}deleteObjectStore(e){return H(this.dbConfig.name,++this.dbConfig.version,e)}}return i.\u0275fac=function(e){return new(e||i)(k(G),k(R))},i.\u0275prov=D({token:i,factory:i.\u0275fac}),i})(),re=(()=>{class i{static forRoot(...e){let n={};for(let t of e)Object.assign(n,{[t.name]:t});return{ngModule:i,providers:[O,{provide:G,useValue:n}]}}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=V({type:i}),i.\u0275inj=P({imports:[T]}),i})();var Y=(()=>{let d=class d{constructor(){this.db=y(O)}create(n,t){return this.db.add(t,n)}read(n,t){return t?this.db.getByKey(n,t):this.db.getAll(n)}update(n,t){return this.db.update(t,n)}delete(n,t){return this.db.delete(t,n)}};d.\u0275fac=function(t){return new(t||d)},d.\u0275prov=D({token:d,factory:d.\u0275fac,providedIn:"root"});let i=d;return i})();var j=class{static setItem(d,e,n=!0){(n?sessionStorage:localStorage).setItem(d,JSON.stringify(e))}static getItem(d,e=!0){let t=(e?sessionStorage:localStorage).getItem(d);return t?JSON.parse(t):null}static removeItem(d,e=!0){(e?sessionStorage:localStorage).removeItem(d)}static clear(d=!0){(d?sessionStorage:localStorage).clear()}};var w=function(i){return i.User="usuario",i.Token="token",i.Role="rol",i.OAuth2="oauth2",i}(w||{});var v=function(i){return i.USER="users",i.TOKEN="tokens",i}(v||{});var Se=(()=>{let d=class d{constructor(){this.idxDB=y(Y),this.currentUserSubject=new U(null),this.user$=this.currentUserSubject.asObservable()}get userValue(){return this.currentUserSubject.value}getUser(){return this.user$}getToken(){return this.userValue&&this.userValue.token?this.userValue.token:j.getItem(w.User)?.token??j.getItem(w.Token)??null}updateUser(n){j.setItem(w.User,n),this.userValue?this.idxDB.create(n,v.USER):this.idxDB.update(n,v.USER),this.currentUserSubject.next(n)}clearUser(){j.removeItem(w.User),this.idxDB.delete(this.userValue.Sid,v.USER),this.currentUserSubject.next(null)}};d.\u0275fac=function(t){return new(t||d)},d.\u0275prov=D({token:d,factory:d.\u0275fac,providedIn:"root"});let i=d;return i})();export{re as a,Y as b,j as c,w as d,v as e,Se as f};
