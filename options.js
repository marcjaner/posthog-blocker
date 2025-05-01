// options.js

// SVGs for mode toggle
const lightModeSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" fill="currentColor"/></svg>`;
const darkModeSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.28451 10.3333C7.10026 10.8546 7 11.4156 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C11.4156 7 10.8546 7.10026 10.3333 7.28451" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

// ------------------------------
// Custom modal popup helper
// ------------------------------
function showModal({ message, placeholder }) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("modalOverlay");
    const msgElem = document.getElementById("modalMessage");
    const input = document.getElementById("modalInput");
    const okBtn = document.getElementById("modalConfirm");
    const cancel = document.getElementById("modalCancel");

    msgElem.textContent = message;
    if (placeholder != null) {
      input.style.display = "block";
      input.value = placeholder;
    } else {
      input.style.display = "none";
    }

    function cleanup(result) {
      overlay.style.display = "none";
      okBtn.removeEventListener("click", onOk);
      cancel.removeEventListener("click", onCancel);
      resolve(result);
    }
    function onOk() {
      cleanup(placeholder != null ? input.value.trim() : true);
    }
    function onCancel() {
      cleanup(false);
    }

    okBtn.addEventListener("click", onOk);
    cancel.addEventListener("click", onCancel);
    overlay.style.display = "flex";
    if (placeholder != null) input.focus();
  });
}

// ------------------------------
// Element references
// ------------------------------
const domainInput = document.getElementById("domainInput");
const addBtn = document.getElementById("addBtn");
const filterToggleBtn = document.getElementById("filterToggleBtn");
const filterContainer = document.getElementById("filterContainer");
const filterInput = document.getElementById("filterInput");
const clearAllBtn = document.getElementById("clearAllBtn");
const countBadge = document.getElementById("countBadge");
const tbody = document.getElementById("domainsTbody");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageIndicator = document.getElementById("pageIndicator");
const paginationControls = document.getElementById("paginationControls");
const darkModeBtn = document.getElementById("darkModeBtn");

// ------------------------------
// State & helpers
// ------------------------------
let currentPage = 1;
const itemsPerPage = 10;

async function getBlocked() {
  const { blocked } = await chrome.storage.sync.get({ blocked: [] });
  return blocked;
}
async function setBlocked(list) {
  await chrome.storage.sync.set({ blocked: list });
}

// ------------------------------
// Add domain
// ------------------------------
async function addDomain() {
  const dom = domainInput.value.trim();
  if (!dom) return;
  const list = await getBlocked();
  if (list.includes(dom)) {
    alert("Already blocked.");
  } else {
    list.push(dom);
    await setBlocked(list);
    render();
  }
  domainInput.value = "";
}

// ------------------------------
// Render table, badge, pagination
// ------------------------------
async function render() {
  const all = await getBlocked();
  countBadge.querySelector("strong").textContent = all.length;

  // if no domains, placeholder + hide pagination
  if (all.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="2" style="text-align:center;color:#57606a;padding:16px;">
          No domains blocked yet
        </td>
      </tr>`;
    paginationControls.style.display = "none";
    return;
  } else {
    paginationControls.style.display = "";
  }

  // apply filter
  const q = filterInput.value.trim().toLowerCase();
  const filtered = q ? all.filter((d) => d.toLowerCase().includes(q)) : all;

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  tbody.innerHTML = "";
  for (const domain of pageItems) {
    const tr = document.createElement("tr");
    const tdDom = document.createElement("td");
    tdDom.textContent = domain;
    const tdAct = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("action-btn");
    editBtn.onclick = async () => {
      const nd = await showModal({
        message: "Edit domain:",
        placeholder: domain,
      });
      if (!nd || nd === domain) return;
      const lst = await getBlocked();
      if (lst.includes(nd)) {
        alert("Already in list.");
        return;
      }
      lst[lst.indexOf(domain)] = nd;
      await setBlocked(lst);
      render();
    };

    const remBtn = document.createElement("button");
    remBtn.textContent = "Remove";
    remBtn.classList.add("action-btn");
    remBtn.onclick = async () => {
      const ok = await showModal({ message: `Remove "${domain}"?` });
      if (!ok) return;
      const updated = (await getBlocked()).filter((d) => d !== domain);
      await setBlocked(updated);
      render();
    };

    tdAct.append(editBtn, remBtn);
    tr.append(tdDom, tdAct);
    tbody.append(tr);
  }

  pageIndicator.textContent = `${currentPage} / ${totalPages}`;
  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= totalPages;
}

// ------------------------------
// Events
// ------------------------------
addBtn.addEventListener("click", addDomain);
domainInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addDomain();
});

filterToggleBtn.addEventListener("click", () => {
  filterContainer.style.display =
    filterContainer.style.display === "none" ? "block" : "none";
});

filterInput.addEventListener("input", () => {
  currentPage = 1;
  render();
});

clearAllBtn.addEventListener("click", async () => {
  const ok = await showModal({ message: "Remove all blocked domains?" });
  if (ok) {
    await setBlocked([]);
    filterInput.value = "";
    render();
  }
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    render();
  }
});
nextPageBtn.addEventListener("click", () => {
  currentPage++;
  render();
});

// ------------------------------
// Dark mode toggle
// ------------------------------
function setDark(on) {
  document.body.classList.toggle("dark", on);
  darkModeBtn.innerHTML = on ? darkModeSVG : lightModeSVG;
  chrome.storage.sync.set({ dark: on });
}
darkModeBtn.addEventListener("click", () =>
  setDark(!document.body.classList.contains("dark"))
);

// ------------------------------
// Init
// ------------------------------
chrome.storage.sync.get({ dark: false }).then(({ dark }) => {
  setDark(dark);
  render();
});
