let currentFilter = 'all';
let visibleCount = 12;

// RENDER FUNCTION
function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Filter logic
  const filtered = reviewsData.filter(review => {
    if (currentFilter === 'all') return true;
    return review.tags.includes(currentFilter);
  });

  // Pagination slice
  const visible = filtered.slice(0, visibleCount);

  // Render cards
  visible.forEach(review => {
    const card = document.createElement('div');
    card.className = 'neo-card bg-white rounded-[24px] border-2 border-primary p-6 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#32170d]';

    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      const isFilled = i < review.rating;
      starsHTML += `<span class="material-symbols-outlined text-banana-yellow text-lg ${isFilled ? 'fill-current' : ''}" style="font-variation-settings: 'FILL' ${isFilled ? 1 : 0}">star</span>`;
    }

    // Tag badges
    let tagsHTML = '';
    review.tags.forEach(tag => {
      let colorClass = 'bg-surface-variant';
      if (tag === 'strawberry') colorClass = 'bg-[#ffe4e6] text-strawberry-vibrant';
      if (tag === 'blueberry') colorClass = 'bg-[#dbeafe] text-blueberry-blue';
      if (tag === 'banana') colorClass = 'bg-[#fef3c7] text-[#b45309]';
      if (tag === 'mango') colorClass = 'bg-[#ffedd5] text-[#c2410c]';
      if (tag === 'ut') colorClass = 'bg-[#ffedd5] text-[#c2410c]'; // burnt orange-ish
      if (tag === 'houston') colorClass = 'bg-[#dcfce7] text-[#15803d]';

      tagsHTML += `<span class="px-2 py-0.5 rounded-md font-body text-[9px] font-black uppercase border border-primary/20 ${colorClass}">${tag}</span>`;
    });

    card.innerHTML = `
      <div>
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="font-display font-black text-primary text-base">${review.name}</p>
            <p class="font-body text-[10px] text-primary/40 font-bold">${review.date}</p>
          </div>
          <div class="flex text-banana-yellow">${starsHTML}</div>
        </div>
        <p class="font-body text-xs text-primary/80 leading-relaxed mb-4">"${review.comment}"</p>
      </div>
      <div class="flex flex-wrap gap-1.5 pt-3 border-t border-primary/5">
        ${tagsHTML}
      </div>
    `;
    grid.appendChild(card);
  });

  // Show/Hide Load More button
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    if (visibleCount >= filtered.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }
  }
}

// FILTER HANDLER
function filterReviews(filterName) {
  currentFilter = filterName;
  visibleCount = 12; // reset pagination
  
  // Update active chip style
  const chips = document.querySelectorAll('#filter-container button');
  chips.forEach(chip => {
    chip.className = 'filter-chip neo-btn bg-white text-primary px-5 py-2 rounded-full font-body font-bold text-xs uppercase tracking-wide hover:bg-surface-variant';
  });

  // Find the clicked button and make it active
  const evt = window.event || arguments.callee.caller.arguments[0];
  if (evt && evt.currentTarget) {
    evt.currentTarget.className = 'filter-chip neo-btn bg-primary text-white px-5 py-2 rounded-full font-body font-black text-xs uppercase tracking-wide';
  }

  renderReviews();
}

// PAGINATION
function loadMore() {
  visibleCount += 12;
  renderReviews();
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderReviews();
});
