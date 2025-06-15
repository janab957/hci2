// Corrected JavaScript with HTML table data and proper mobile functionality
document.addEventListener('DOMContentLoaded', function() {
    // State management
    const selectedFilters = {
        type: [],
        state: []
    };
    let currentSort = 'Newest';
    let searchQuery = '';
    let currentMobilePage = 1;
    const rowsPerMobilePage = 11;

    // DOM elements
    const desktopTable = document.getElementById('desktop-table');
    const mobileTableBody = document.getElementById('mobile-table-body');
    const mobilePagination = document.getElementById('mobile-pagination');
    const mobileResultCount = document.getElementById('mobile-result-count');
    const desktopResultCount = document.getElementById('desktop-result-count');

    // Get all table rows from the desktop table
    function getAllTableRows() {
        if (!desktopTable) return [];
        
        const rows = Array.from(desktopTable.querySelectorAll('tbody tr'));
        return rows.map(row => {
            const cells = row.querySelectorAll('td');
            return {
                element: row,
                name: cells[0]?.textContent.trim() || '',
                id: cells[1]?.textContent.trim() || '',
                type: cells[2]?.textContent.trim() || '',
                requestedDate: cells[3]?.textContent.trim() || '',
                submittedDate: cells[4]?.textContent.trim() || '',
                state: cells[5]?.textContent.replace(/[^a-zA-Z]/g, '').trim() || '',
                viewLink: cells[6]?.innerHTML || ''
            };
        });
    }

    // Parse date string to Date object for sorting
    function parseDate(dateString) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0]);
            const monthNames = {
                'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
            };
            const month = monthNames[parts[1]] || 0;
            const year = parseInt(parts[2]);
            return new Date(year, month, day);
        }
        return new Date(dateString);
    }

    // Filter and sort table data
    function filterAndSortTable() {
        let allRows = getAllTableRows();
        let filteredRows = [...allRows];

        // Apply type filters
        if (selectedFilters.type.length > 0) {
            filteredRows = filteredRows.filter(row => 
                selectedFilters.type.includes(row.type)
            );
        }

        // Apply state filters
        if (selectedFilters.state.length > 0) {
            filteredRows = filteredRows.filter(row => 
                selectedFilters.state.includes(row.state)
            );
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filteredRows = filteredRows.filter(row => {
                const searchableText = [
                    row.name,
                    row.id,
                    row.type,
                    row.requestedDate,
                    row.submittedDate,
                    row.state
                ].join(' ').toLowerCase();
                
                return searchableText.includes(query);
            });
        }

        // Apply sorting
        filteredRows.sort((a, b) => {
            switch (currentSort) {
                case 'Newest':
                    return parseDate(b.submittedDate) - parseDate(a.submittedDate);
                case 'Oldest':
                    return parseDate(a.submittedDate) - parseDate(b.submittedDate);
                case 'Name (A-Z)':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        // Reset mobile page when filters change
        if (currentMobilePage > Math.ceil(filteredRows.length / rowsPerMobilePage)) {
            currentMobilePage = 1;
        }

        // Update displays
        updateDesktopTable(allRows, filteredRows);
        updateMobileTable(filteredRows);
        updateResultCounts(filteredRows.length);
    }

    // Update desktop table visibility
    function updateDesktopTable(allRows, filteredRows) {
        if (!desktopTable) return;
        
        const filteredIds = new Set(filteredRows.map(row => row.id));
        
        allRows.forEach(row => {
            if (filteredIds.has(row.id)) {
                row.element.style.display = '';
            } else {
                row.element.style.display = 'none';
            }
        });
    }

    // Update mobile table with pagination
    function updateMobileTable(filteredRows) {
        if (!mobileTableBody) return;
        
        const startIndex = (currentMobilePage - 1) * rowsPerMobilePage;
        const endIndex = startIndex + rowsPerMobilePage;
        const pageData = filteredRows.slice(startIndex, endIndex);
        
        mobileTableBody.innerHTML = '';
        pageData.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'border-b';
            
            const stateIcon = getStateIcon(row.state);
            
            tr.innerHTML = `
                <td class="px-2 py-2">${row.name}</td>
                <td class="px-2 py-2">${row.id}</td>
                <td class="px-2 py-2">${row.type}</td>
                <td class="px-2 py-2">${row.requestedDate}</td>
                <td class="px-2 py-2">${row.submittedDate}</td>
                <td class="px-2 py-2">${stateIcon} <span class="text-black">${row.state}</span></td>
                <td class="px-2 py-2 text-blue-600 underline">${row.viewLink}</td>
            `;
            mobileTableBody.appendChild(tr);
        });
        
        updateMobilePagination(filteredRows.length);
    }

    // Get state icon
    function getStateIcon(state) {
        switch(state) {
            case 'Pending':
                return '<i class="fas fa-circle text-yellow-500 mr-1 text-xs"></i>';
            case 'Accepted':
                return '<i class="fas fa-check text-green-500 mr-1 text-xs"></i>';
            case 'Rejected':
                return '<i class="fas fa-times text-red-500 mr-1 text-xs"></i>';
            default:
                return '<i class="fas fa-circle text-gray-500 mr-1 text-xs"></i>';
        }
    }

    // Update mobile pagination
    function updateMobilePagination(totalResults) {
        if (!mobilePagination) return;
        
        const totalPages = Math.ceil(totalResults / rowsPerMobilePage);
        mobilePagination.innerHTML = '';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.disabled = currentMobilePage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentMobilePage > 1) {
                currentMobilePage--;
                filterAndSortTable();
            }
        });
        mobilePagination.appendChild(prevBtn);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = currentMobilePage === i ? 'active' : '';
            pageBtn.addEventListener('click', () => {
                currentMobilePage = i;
                filterAndSortTable();
            });
            mobilePagination.appendChild(pageBtn);
        }
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentMobilePage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentMobilePage < totalPages) {
                currentMobilePage++;
                filterAndSortTable();
            }
        });
        mobilePagination.appendChild(nextBtn);
    }

    // Update result counts
    function updateResultCounts(totalResults) {
        if (mobileResultCount) {
            const startIndex = (currentMobilePage - 1) * rowsPerMobilePage + 1;
            const endIndex = Math.min(currentMobilePage * rowsPerMobilePage, totalResults);
            mobileResultCount.textContent = `${startIndex}-${endIndex} of ${totalResults} results`;
        }
        
        if (desktopResultCount) {
            desktopResultCount.textContent = `Showing ${totalResults} results`;
        }
    }

    // Mobile hamburger menu
    const hamburger = document.getElementById('hamburger');
    const sidebarMobile = document.getElementById('sidebar-mobile');
    
    if (hamburger && sidebarMobile) {
        hamburger.addEventListener('click', function () {
            sidebarMobile.classList.toggle('hidden');
        });
    }

    // Mobile filter toggle
    const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
    const mobileFilterPanel = document.getElementById('mobile-filter-panel');
    
    if (mobileFilterToggle && mobileFilterPanel) {
        mobileFilterToggle.addEventListener('click', function() {
            mobileFilterPanel.classList.toggle('hidden');
        });
    }

    // Mobile filter functionality
    const applyMobileFilters = document.getElementById('apply-mobile-filters');
    const clearMobileFilters = document.getElementById('clear-mobile-filters');

    if (applyMobileFilters) {
        applyMobileFilters.addEventListener('click', function() {
            const typeCheckboxes = document.querySelectorAll('.mobile-filter-type:checked');
            const stateCheckboxes = document.querySelectorAll('.mobile-filter-state:checked');
            
            selectedFilters.type = Array.from(typeCheckboxes).map(cb => cb.value);
            selectedFilters.state = Array.from(stateCheckboxes).map(cb => cb.value);
            
            currentMobilePage = 1;
            updateFilterChips();
            filterAndSortTable();
            mobileFilterPanel.classList.add('hidden');
        });
    }

    if (clearMobileFilters) {
        clearMobileFilters.addEventListener('click', function() {
            document.querySelectorAll('.mobile-filter-type, .mobile-filter-state').forEach(cb => {
                cb.checked = false;
            });
            
            selectedFilters.type = [];
            selectedFilters.state = [];
            currentMobilePage = 1;
            
            updateFilterChips();
            filterAndSortTable();
            mobileFilterPanel.classList.add('hidden');
        });
    }

    // Mobile sort functionality
    const mobileSortButton = document.getElementById('mobile-sort-button');
    const mobileSortMenu = document.getElementById('mobile-sort-menu');
    const mobileSortLabel = document.getElementById('mobile-sort-label');

    if (mobileSortButton && mobileSortMenu) {
        mobileSortButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(mobileSortButton, mobileSortMenu);
        });

        mobileSortMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const option = e.target.closest('.dropdown-option');
            if (option) {
                const value = option.getAttribute('data-value');
                
                mobileSortMenu.querySelectorAll('.dropdown-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                option.classList.add('selected');
                
                currentSort = value;
                mobileSortLabel.textContent = value;
                mobileSortMenu.classList.add('hidden');
                currentMobilePage = 1;
                filterAndSortTable();
            }
        });
    }

    // Search functionality
    function performSearch(inputElement) {
        searchQuery = inputElement ? inputElement.value : '';
        currentMobilePage = 1;
        filterAndSortTable();
    }

    // Desktop search
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput);
            }
        });
    }

    // Mobile search
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchIcon = document.getElementById('mobile-search-icon');
    
    if (mobileSearchIcon) {
        mobileSearchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(mobileSearchInput);
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(mobileSearchInput);
            }
        });
    }

    // Toggle dropdown menus
    function toggleDropdown(button, menu) {
        const isOpen = !menu.classList.contains('hidden');
        
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
        
        if (!isOpen) {
            menu.classList.remove('hidden');
        }
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });

    // Desktop dropdown functionality (original)
    const typeButton = document.getElementById('type-button');
    const typeMenu = document.getElementById('type-menu');
    const stateButton = document.getElementById('state-button');
    const stateMenu = document.getElementById('state-menu');
    const sortButton = document.getElementById('sort-button');
    const sortMenu = document.getElementById('sort-menu');
    const sortLabel = document.getElementById('sort-label');

    if (typeButton && typeMenu) {
        typeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(typeButton, typeMenu);
        });

        typeMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const option = e.target.closest('.dropdown-option');
            if (option) {
                const value = option.getAttribute('data-value');
                
                if (option.classList.contains('selected')) {
                    option.classList.remove('selected');
                    selectedFilters.type = selectedFilters.type.filter(item => item !== value);
                } else {
                    option.classList.add('selected');
                    if (!selectedFilters.type.includes(value)) {
                        selectedFilters.type.push(value);
                    }
                }
                updateFilterChips();
                filterAndSortTable();
            }
        });
    }

    if (stateButton && stateMenu) {
        stateButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(stateButton, stateMenu);
        });

        stateMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const option = e.target.closest('.dropdown-option');
            if (option) {
                const value = option.getAttribute('data-value');
                
                if (option.classList.contains('selected')) {
                    option.classList.remove('selected');
                    selectedFilters.state = selectedFilters.state.filter(item => item !== value);
                } else {
                    option.classList.add('selected');
                    if (!selectedFilters.state.includes(value)) {
                        selectedFilters.state.push(value);
                    }
                }
                updateFilterChips();
                filterAndSortTable();
            }
        });
    }

    if (sortButton && sortMenu) {
        sortButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(sortButton, sortMenu);
        });

        sortMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const option = e.target.closest('.dropdown-option');
            if (option) {
                const value = option.getAttribute('data-value');
                
                sortMenu.querySelectorAll('.dropdown-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                option.classList.add('selected');
                
                currentSort = value;
                sortLabel.textContent = `Sort: ${currentSort}`;
                sortMenu.classList.add('hidden');
                filterAndSortTable();
            }
        });
    }

    // Initialize sort selection
    const defaultSortOption = sortMenu?.querySelector('[data-value="Newest"]');
    if (defaultSortOption) {
        defaultSortOption.classList.add('selected');
    }

    const defaultMobileSortOption = mobileSortMenu?.querySelector('[data-value="Newest"]');
    if (defaultMobileSortOption) {
        defaultMobileSortOption.classList.add('selected');
    }

    // Update filter chips display
    function updateFilterChips() {
        const filterChipsContainer = document.getElementById('filter-chips');
        if (!filterChipsContainer) return;
        
        filterChipsContainer.innerHTML = '';
        
        const allFilters = [
            ...selectedFilters.type.map(item => ({ type: 'type', value: item })),
            ...selectedFilters.state.map(item => ({ type: 'state', value: item }))
        ];

        allFilters.forEach(filter => {
            const chip = createFilterChip(filter.value, filter.type);
            filterChipsContainer.appendChild(chip);
        });

        if (allFilters.length > 0) {
            const clearAllLink = document.createElement('a');
            clearAllLink.className = 'clear-all-link';
            clearAllLink.textContent = 'Clear All';
            clearAllLink.href = '#';
            clearAllLink.addEventListener('click', function(e) {
                e.preventDefault();
                clearAllFilters();
            });
            filterChipsContainer.appendChild(clearAllLink);
        }
    }

    // Create individual filter chip
    function createFilterChip(value, type) {
        const chip = document.createElement('div');
        chip.className = 'filter-chip';
        
        const text = document.createElement('span');
        text.textContent = value;
        
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-chip';
        removeButton.innerHTML = '×';
        removeButton.addEventListener('click', function() {
            removeFilter(value, type);
        });
        
        chip.appendChild(text);
        chip.appendChild(removeButton);
        
        return chip;
    }

    // Remove individual filter
    function removeFilter(value, type) {
        selectedFilters[type] = selectedFilters[type].filter(item => item !== value);
        
        const menu = type === 'type' ? typeMenu : stateMenu;
        const option = menu?.querySelector(`[data-value="${value}"]`);
        if (option) {
            option.classList.remove('selected');
        }
        
        const mobileCheckbox = document.querySelector(`.mobile-filter-${type}[value="${value}"]`);
        if (mobileCheckbox) {
            mobileCheckbox.checked = false;
        }
        
        updateFilterChips();
        filterAndSortTable();
    }

    // Clear all filters
    function clearAllFilters() {
        selectedFilters.type = [];
        selectedFilters.state = [];
        searchQuery = '';
        currentMobilePage = 1;
        
        if (searchInput) {
            searchInput.value = '';
        }
        
        if (mobileSearchInput) {
            mobileSearchInput.value = '';
        }
        
        document.querySelectorAll('#type-menu .dropdown-option, #state-menu .dropdown-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        document.querySelectorAll('.mobile-filter-type, .mobile-filter-state').forEach(cb => {
            cb.checked = false;
        });
        
        updateFilterChips();
        filterAndSortTable();
    }

    // Notification functionality
    const notificationToggleMobile = document.getElementById('notification-toggle-mobile');
    if (notificationToggleMobile) {
        notificationToggleMobile.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = 'notifications.html';
        });
    }

    const notificationToggle = document.getElementById('notification-toggle');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationToggle && notificationDropdown) {
        notificationToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('#notification-toggle') && !event.target.closest('#notification-dropdown')) {
                notificationDropdown.classList.add('hidden');
            }
        });
    }

    // Categories dropdown functionality
    const categoriesBtn = document.getElementById('categories-btn');
    const categoriesDropdown = document.getElementById('categories-dropdown');

    if (categoriesBtn && categoriesDropdown) {
        categoriesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            categoriesDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('#categories-btn') && !event.target.closest('#categories-dropdown')) {
                categoriesDropdown.classList.add('hidden');
            }
        });
    }

    // Dashboard navigation
    const dashboard = document.getElementById("dboard");
    if (dashboard) {
        dashboard.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    // Initialize the application
    filterAndSortTable();
});

// PWA Install functionality
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    document.querySelectorAll('.install-btn').forEach(btn => {
        btn.style.display = 'inline-block';
        btn.disabled = false;
    });
});

document.querySelectorAll('.install-btn').forEach(button => {
    button.style.display = 'none';
    button.disabled = true;

    button.addEventListener('click', async () => {
        if (!deferredPrompt) {
            alert('Install prompt not available yet. Please try again later.');
            return;
        }
        
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        deferredPrompt = null;
        document.querySelectorAll('.install-btn').forEach(btn => {
            btn.style.display = 'none';
            btn.disabled = true;
        });
    });
});

