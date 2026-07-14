(function ($) {
    'use strict';

    var pageSize = 9;
    var products = [];
    var newReleaseSelection = [];
    var activeCategory = 'NEW RELEASE';
    var currentPage = 1;
    var $grid = $('#em_load');
    var $pagination = $('#product-pagination');
    var $status = $('#product-page-status');

    function parseCsv(text) {
        var rows = [];
        var row = [];
        var cell = '';
        var quoted = false;

        for (var i = 0; i < text.length; i += 1) {
            var char = text[i];
            if (char === '"') {
                if (quoted && text[i + 1] === '"') {
                    cell += '"';
                    i += 1;
                } else {
                    quoted = !quoted;
                }
            } else if (char === ',' && !quoted) {
                row.push(cell);
                cell = '';
            } else if ((char === '\n' || char === '\r') && !quoted) {
                if (char === '\r' && text[i + 1] === '\n') i += 1;
                row.push(cell);
                if (row.some(function (value) { return value !== ''; })) rows.push(row);
                row = [];
                cell = '';
            } else {
                cell += char;
            }
        }
        if (cell || row.length) {
            row.push(cell);
            rows.push(row);
        }

        var headerAliases = {
            '产品编号': 'id',
            '类目': 'category',
            '新品': 'is_new',
            '产品名称': 'name',
            '产品型号': 'model',
            '基本产品参数': 'specs',
            '图片路径': 'image',
            '图片说明': 'alt',
            '排序': 'sort_order',
            '展示': 'enabled'
        };
        var headers = rows.shift().map(function (header) {
            var cleanHeader = header.trim();
            return headerAliases[cleanHeader] || cleanHeader;
        });
        return rows.map(function (values) {
            var item = {};
            headers.forEach(function (header, index) { item[header] = (values[index] || '').trim(); });
            return item;
        });
    }

    function escapeHtml(value) {
        return $('<div>').text(value || '').html();
    }

    function filteredProducts() {
        return products.filter(function (product) {
            if (!product.id || !product.image) return false;
            if (product.enabled && product.enabled !== '1') return false;
            if (activeCategory === 'NEW RELEASE') return newReleaseSelection.indexOf(product) !== -1;
            return product.category === activeCategory;
        });
    }

    function selectRandomNewReleases() {
        var candidates = products.filter(function (product) {
            return product.id && product.image && product.is_new === '1' && (!product.enabled || product.enabled === '1');
        }).slice();
        for (var i = candidates.length - 1; i > 0; i -= 1) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var temporary = candidates[i];
            candidates[i] = candidates[randomIndex];
            candidates[randomIndex] = temporary;
        }
        newReleaseSelection = candidates.slice(0, pageSize);
    }

    function buildCategoryTabs() {
        var categories = [];
        products.forEach(function (product) {
            if (!product.id || !product.image || !product.category) return;
            if (product.enabled && product.enabled !== '1') return;
            if (categories.indexOf(product.category) === -1) categories.push(product.category);
        });

        var hasNewProducts = newReleaseSelection.length > 0;
        activeCategory = hasNewProducts ? 'NEW RELEASE' : (categories[0] || '');

        var $tabs = $('#filter').empty();
        var tabNames = hasNewProducts ? ['NEW RELEASE'].concat(categories) : categories;
        tabNames.forEach(function (category) {
            $('<li>')
                .text(category)
                .attr('data-category', category)
                .toggleClass('current_menu_item', category === activeCategory)
                .appendTo($tabs);
        });
    }

    function productMarkup(product) {
        var name = escapeHtml(product.model || product.name || product.id);
        var category = escapeHtml(product.specs || product.category);
        var image = escapeHtml(product.image);
        var alt = escapeHtml(product.alt || product.model || product.name || product.id);
        return '<div class="col-lg-4 col-md-6 col-xs-12 col-sm-12 witr_all_mb_30 product-card">' +
            '<div class="single_protfolio"><div class="prot_thumb">' +
            '<img src="' + image + '" alt="' + alt + '" loading="lazy">' +
            '<div class="prot_content em_port_content"><img class="product-hover-logo" src="static/picture/logo3.png" alt="BRESHINE">' +
            '<div class="prot_content_inner">' +
            '<div class="porttitle_inner"><h3><a class="product-model venobox" data-gall="productGallery" href="' + image + '" title="' + name + '">' + name + '</a></h3>' +
            '<p class="product-basic-specs"><span class="category-item-p">' + category + '</span></p></div>' +
            '</div></div></div></div></div>';
    }

    function render() {
        var filtered = filteredProducts();
        var pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (currentPage > pageCount) currentPage = pageCount;
        var start = (currentPage - 1) * pageSize;
        var visible = filtered.slice(start, start + pageSize);

        if ($grid.data('isotope')) $grid.isotope('destroy');
        $grid.html(visible.map(productMarkup).join(''));
        if ($.fn.venobox) $('.venobox').venobox();

        $pagination.prop('hidden', filtered.length <= pageSize);
        $status.text('Page ' + currentPage + ' / ' + pageCount);
        $('#product-prev').prop('disabled', currentPage <= 1);
        $('#product-next').prop('disabled', currentPage >= pageCount);
    }

    $.ajax({
        url: 'products/products.csv',
        dataType: 'text',
        cache: false
    }).done(function (csv) {
        products = parseCsv(csv.replace(/^\uFEFF/, ''));
        selectRandomNewReleases();
        buildCategoryTabs();
        $('.filter_menu li').off('click').on('click', function () {
            $('.filter_menu li').removeClass('current_menu_item');
            $(this).addClass('current_menu_item');
            activeCategory = $(this).data('category');
            currentPage = 1;
            render();
        });
        $('#product-prev').on('click', function () {
            if (currentPage > 1) {
                currentPage -= 1;
                render();
                document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
        $('#product-next').on('click', function () {
            if (currentPage < Math.ceil(filteredProducts().length / pageSize)) {
                currentPage += 1;
                render();
                document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
        render();
    }).fail(function () {
        console.warn('Product table could not be loaded; static product cards remain visible.');
    });
}(jQuery));
