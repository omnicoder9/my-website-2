//TO DO: 
//- store spreadsheets in dictionary, dynamically render.
//api calls to retrieve ['riddle', 'theorem', 'equation', 'algorithm', 'element', 'chemical formula', 'quotation', 'philosophy publication', 'patent', 'rfc', 'xkcd', 'cwe', 'definition'] of the day



//smooth scrolling for navigation (works for dynamically injected headers too)
document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) {
    return;
  }

  const target = document.querySelector(anchor.getAttribute('href'));
  if (!target) {
    return;
  }

  event.preventDefault();
  target.scrollIntoView({
    behavior: 'smooth'
  });
});

//sticky nav bar
function getPrimaryHeader() {
  return document.querySelector('#site-header header') || document.querySelector('header');
}

window.addEventListener('scroll', () => {
  const header = getPrimaryHeader();
  if (!header) {
    return;
  }
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
// image slider/carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img');
if (slides.length !== 0) {
  console.log("valid carousel");
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 3000);
}else{
  console.log("no slides");
}
// document.getElementById('converterForm').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const substanceDensity = parseFloat(document.getElementById('substance').value);
//   const mass = parseFloat(document.getElementById('mass').value);

//   if (!substanceDensity || !mass) {
//     document.getElementById('result').textContent = "Please select a substance and enter a valid mass.";
//     return;
//   }

//   const volume = mass / substanceDensity;
//   document.getElementById('result').textContent = 
//     `The volume is ${volume.toFixed(2)} mL (or cm³ for solids).`;
// });

// document.getElementById('converterForm').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const inputType = document.getElementById('inputType').value;
//   const inputValue = parseFloat(document.getElementById('inputValue').value);
//   const substanceDensity = parseFloat(document.getElementById('substance').value);
//   const outputType = document.getElementById('outputType').value;

//   if (!substanceDensity || isNaN(inputValue)) {
//     document.getElementById('result').textContent = "Please provide valid inputs.";
//     return;
//   }

//   let resultValue;

//   if (inputType === outputType) {
//     resultValue = inputValue; // Same type, no conversion needed.
//   } else if (inputType === "mass" && outputType === "volume") {
//     resultValue = inputValue / substanceDensity; // Mass to Volume.
//   } else if (inputType === "volume" && outputType === "mass") {
//     resultValue = inputValue * substanceDensity; // Volume to Mass.
//   }

//   document.getElementById('result').textContent = 
//     `The ${outputType} is ${resultValue.toFixed(2)} ${outputType === "mass" ? "g" : "mL"}.`;
// });
const unitConversions = {
  grams: 1, // Base unit
  pounds: 453.592,
  milliliters: 1, // Assume mL is equivalent to cm³
  cups: 240, // 1 cup = 240 mL
};

// resources taxonomy dropdown
const resourceDropdown = document.getElementById('resourceDropdown');
const resourceStatus = document.getElementById('resourceLoadStatus');
const resourceRadios = document.querySelectorAll('input[name="resourceType"]');

const resourceFiles = {
  industry: 'data/industry2.json',
  occupation: 'data/occupations.json',
  academic: 'data/academic.json'
};

function uniqueKeepOrder(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
}

function mergeEntriesKeepOrder(entries) {
  const indexByLabel = new Map();
  const merged = [];

  entries.forEach((entry) => {
    if (!entry || !entry.label) {
      return;
    }

    if (!indexByLabel.has(entry.label)) {
      indexByLabel.set(entry.label, merged.length);
      merged.push({ label: entry.label, level: Math.max(0, entry.level || 0) });
      return;
    }

    const idx = indexByLabel.get(entry.label);
    merged[idx].level = Math.min(merged[idx].level, Math.max(0, entry.level || 0));
  });

  return merged;
}

function extractIndustryItems(data) {
  const entries = [];
  const sectors = (data && data.taxonomy && data.taxonomy.sectors) ? data.taxonomy.sectors : [];

  sectors.forEach((sectorObj) => {
    entries.push({ label: sectorObj.sector, level: 0 });
    (sectorObj.industry_groups || []).forEach((groupObj) => {
      entries.push({ label: groupObj.industry_group, level: 1 });
      (groupObj.industries || []).forEach((industryObj) => {
        entries.push({ label: industryObj.industry, level: 2 });
        (industryObj.subindustries || []).forEach((subindustry) => entries.push({ label: subindustry, level: 3 }));
      });
    });
  });

  return mergeEntriesKeepOrder(entries);
}

function extractOccupationItems(data) {
  const entries = [];
  const groups = (data && data.occupation_taxonomy) ? data.occupation_taxonomy : [];

  groups.forEach((majorGroup) => {
    entries.push({ label: majorGroup.major_group, level: 0 });
    (majorGroup.minor_groups || []).forEach((minorGroup) => {
      entries.push({ label: minorGroup.minor_group, level: 1 });
      (minorGroup.broad_occupations || []).forEach((broadOccupation) => {
        entries.push({ label: broadOccupation.broad_occupation, level: 2 });
        (broadOccupation.occupations || []).forEach((occupation) => entries.push({ label: occupation.title, level: 3 }));
      });
    });
  });

  return mergeEntriesKeepOrder(entries);
}

function extractAcademicItems(data) {
  const nodes = (data && data.nodes) ? data.nodes : [];
  const byId = new Map();
  const memoDepth = new Map();
  const visiting = new Set();

  nodes.forEach((node) => {
    byId.set(node.id, node);
  });

  function getDepth(nodeId) {
    if (memoDepth.has(nodeId)) {
      return memoDepth.get(nodeId);
    }
    if (visiting.has(nodeId)) {
      return 0;
    }

    const node = byId.get(nodeId);
    if (!node) {
      return 0;
    }

    const parents = Array.isArray(node.parents) ? node.parents : [];
    if (parents.length === 0) {
      memoDepth.set(nodeId, 0);
      return 0;
    }

    visiting.add(nodeId);
    let minParentDepth = Infinity;
    parents.forEach((parentId) => {
      minParentDepth = Math.min(minParentDepth, getDepth(parentId));
    });
    visiting.delete(nodeId);

    const depth = (minParentDepth === Infinity ? 0 : minParentDepth + 1);
    memoDepth.set(nodeId, depth);
    return depth;
  }

  const entries = nodes.map((node) => ({
    label: node.name,
    level: Math.min(getDepth(node.id), 4)
  }));

  return mergeEntriesKeepOrder(entries);
}

function getItemsForType(type, data) {
  if (type === 'industry') {
    return extractIndustryItems(data);
  }
  if (type === 'occupation') {
    return extractOccupationItems(data);
  }
  return extractAcademicItems(data);
}

function renderDropdownOptions(items) {
  resourceDropdown.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Choose an option...';
  resourceDropdown.appendChild(placeholder);

  items.forEach((item) => {
    const option = document.createElement('option');
    const label = typeof item === 'string' ? item : item.label;
    const level = typeof item === 'string' ? 0 : (item.level || 0);
    option.value = label;
    option.textContent = `${'\u00A0\u00A0'.repeat(level)}${label}`;
    resourceDropdown.appendChild(option);
  });
}

async function loadResourceDropdown(type) {
  if (!resourceDropdown || !resourceStatus) {
    return;
  }

  resourceStatus.textContent = 'Loading...';

  try {
    const resourcePath = resourceFiles[type];
    const response = await fetch(resourcePath, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load ${resourcePath}`);
    }

    const data = await response.json();
    const items = getItemsForType(type, data);
    renderDropdownOptions(items);
    resourceStatus.textContent = `Loaded ${items.length} items for ${type}.`;
  } catch (error) {
    resourceDropdown.innerHTML = '<option value="">Unable to load data</option>';
    resourceStatus.textContent = 'Error loading resource data. Use a local server (not file://).';
    console.error(error);
  }
}

if (resourceDropdown && resourceStatus && resourceRadios.length > 0) {
  resourceRadios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      loadResourceDropdown(event.target.value);
    });
  });

  const selectedRadio = document.querySelector('input[name="resourceType"]:checked');
  loadResourceDropdown(selectedRadio ? selectedRadio.value : 'industry');
}



//intended to fix navbar-convering-header problem but breaks main nav bar
// document.querySelectorAll('nav a').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault(); // Prevent default anchor behavior
//     const targetId = this.getAttribute('href').substring(1); // Get the target section ID
//     const targetSection = document.getElementById(targetId); // Find the target section
//     const navbarHeight = document.querySelector('nav').offsetHeight; // Get navbar height

//     if (targetSection) {
//       // Scroll to the section, accounting for the navbar height
//       window.scrollTo({
//         top: targetSection.offsetTop - navbarHeight,
//         behavior: 'smooth' // Optional: Add smooth scrolling
//       });
//     }
//   });
// });


console.log("the js is working")
