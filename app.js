var component = {};
var listOfToggles = [];
var itemClassName = 'list-group-item';

// Heading component
component.heading = function(params) {
    params = params || {};
    var text = params.text,
        level = params.level,
        ariaLabel = params.ariaLabel ? 'aria-label="' + escapeHtml(params.ariaLabel) + '"' : '',
        html = '';
    
    html = '<h' + level + ' ' + ariaLabel + ' ' + 'tabindex="0">' + text + '</h' + level + '>';
    
    return html;
};

// Simple Text component
component.text = function(params) {
    params = params || {};
    var text = params.text,
        html = '';

    html = '<div tabindex="0">' + text + '</div>';
    
    return html;
};

// Link component
component.link = function(params) {
    params = params || {};
    var text = params.text,
        href = params.href,
        html = '';
    
    html = '<a href="' + href + '" class="link-body-emphasis d-inline-flex text-decoration-none rounded">' + text + '</a>';
    
    return html;
};

// Link component
component.button = function(params) {
    params = params || {};
    var text = params.text,
        style = params.style,
        html = '';

    style = style ? style : 'primary';

    var html = '<button class="btn btn-' + style + ' d-inline-flex align-items-center" type="button">' + text + '</button>';
    
    return html;
};

// Toggle component
component.toggle = function(text, content) {
    var html = '',
        rand_id = 'id-' + Math.round(Math.random(10000, 1000000)*100) + '-collapse';

    listOfToggles.push(rand_id);
    
    html += '<button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#' + rand_id + '" aria-expanded="false">';
        html += text;
    html += '</button>';

    html += '<div class="collapse" id="' + rand_id + '">';
        html += '<ul class="list-group">';
        html += content;
        html += '</ul>';
    html += '</div>';
    
    
    return html;
};


var createPage = function(data) {
    var html = '';

    for (var i = 0; i < data.length; i++) {
        if (data[i] && data[i].component) {
            html += '<li class="' + itemClassName + '">';
                if (data[i].component == 'text') {
                    html += component.text(data[i].params);
                } else if (data[i].component == 'link') {
                    html += component.link(data[i].params);
                } else if (data[i].component == 'button') {
                    html += component.button(data[i].params);
                } else if (data[i].component == 'toggle') {
                    var toggleContent = createPage(data[i].data);
                    html += component.toggle(data[i].text, toggleContent);
                } else if (data[i].component == 'heading') {
                    html += component.heading(data[i].params);
                }
            html += '</li>';
        }
    }

    return html;
};


var renderPage = function(id, data) {
    var pageElement = document.getElementById(id);
    var html = '';

    html += '<ul class="list-group">';
        html += createPage(data);
    html += '</ul>';

    pageElement.innerHTML = html;

    collapseTabHandller();
};


// var collapseTabHandller = function() {
//     for (var i = 0; i < listOfToggles.length; i++) {
//         // console.log(listOfToggles[i]);
//         var myCollapsible = document.getElementById(listOfToggles[i])

//         // myCollapsible.addEventListener('hidden.bs.collapse', function () {
//         //     console.log('hidden');
//         // });

//         // myCollapsible.addEventListener('show.bs.collapse', function () {
//         //     console.log('show');
//         // });

//         myCollapsible.addEventListener('shown.bs.collapse', function () {
//             // console.log('showN');
//             setTimeout(function() {
//                 var nodes = myCollapsible.querySelectorAll('.' + itemClassName);
//                 var first = nodes[0].children[0];
//                 if (first) {
//                     first.focus();
//                     // console.log(first);
//                 }
//             }, 0); // you can adjust the delay time as needed
//         });
//     }
// };

var collapseTabHandller = function() {
    for (var i = 0; i < listOfToggles.length; i++) {
        var myCollapsible = document.getElementById(listOfToggles[i]);

        myCollapsible.addEventListener('shown.bs.collapse', function () {
            setTimeout(function() {
                var nodes = myCollapsible.querySelectorAll('.' + itemClassName);
                var first = nodes[0].children[0];
                if (first) {
                    first.focus();
                }
            }, 0); 
        });

        myCollapsible.addEventListener('focusout', function(e) {
            // Check if focus is really out of the current collapse element
            var isLeavingElement = !myCollapsible.contains(e.relatedTarget);
            if (isLeavingElement) {
                // Use bootstrap's collapse method to close the collapse
                var bsCollapse = new bootstrap.Collapse(myCollapsible, {toggle: false});
                bsCollapse.hide();
            }
        });
    }
};





var escapeHtml = function(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 };