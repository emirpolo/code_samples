if (typeof pbv === 'undefined') {
    // the variable is defined
    let pbv;
}

if (typeof default_mode_v === 'undefined') {
    // the variable is defined
    let default_mode_v;
}

checkNodes = (nodes, pb, default_mode, q_donwloadBoxText, q_threeDotTDirection) => {
    nodes.forEach(node => {
        endUser = !pb ? (document.querySelector('qeu-end-user') ? document.querySelector('qeu-end-user') : document.querySelector('qpb-root')) : document.querySelector('qpb-root');
        if (endUser && endUser.shadowRoot) {

            if (pb) {

                if (default_mode) {
                    customEUStyle += `
                    .qpb-bottom-bar-action.qpb-pages-bottom-bar-menu-trigger, .qpb-bottom-bar-action.qpb-add-more-tabs, .qpb-barmenu-selector:nth-child(1),
                    .qpb-navigation-link:nth-child(2), .qpb-navigation-link:nth-child(3),
                    .qpb-publish-container > *,
                    qpb-editable-tab qui-dropdownv2 > *, 
                    .qpb-pages-selector-drop.qpb-insert-menu-container .qpb-insert-selector-option:nth-child(2),
                    .qpb-pages-selector-drop.qpb-insert-menu-container .qpb-insert-selector-option:nth-child(3),
                    .qpb-pages-selector-drop.qpb-insert-menu-container .qpb-insert-selector-option:nth-child(7),
                    .qpb-pages-selector-drop.qpb-insert-menu-container .qpb-insert-selector-option:nth-child(8),
                    .qpb-pages-selector-drop.qpb-insert-menu-container .qpb-insert-selector-option:nth-child(9),
                    .qpb-item-topbar-container-center qui-dropdownv2:nth-child(1),
                    .qpb-item-topbar-container-center qui-dropdownv2:nth-child(11),
                    .qpb-item-topbar-container-center qui-dropdownv2:nth-child(12),
                    .qpb-item-topbar-container-center qpb-topbar-menu-icon:nth-child(7),qpb-bottombar, 
                    qpb-blue-topbar, .qpb-pages-bar .qpb-item-topbar-container-right{
                        display: none !important;
                        visibility: hidden !important;
                    }
                    .qpb-page-builder-container .qpb-page-builder-editor-container .horizontal-container{
                        height: calc(100% - 40px) !important;
                    }
                    .qpb-page-builder-container .qpb-page-builder-editor-container{
                        height: 100% !important;
                        z-index: 1 !important;
                    }
                    `;
                    if( endUser.parentElement && endUser.parentElement.parentElement && endUser.parentElement.parentElement.nodeName == 'QRVEY-END-USER'){
                        customEUStyle += window[endUser.parentElement.parentElement.getAttribute('settings')].customCSSRules ? window[endUser.parentElement.parentElement.getAttribute('settings')].customCSSRules : '';
                    }
                    
                }

                if (document.querySelector('qpb-root') && document.querySelector('qrvey-loader')) {
                    let loader = document.querySelector('qrvey-loader');
                    loader.querySelector('.qpb-qrvey-loading-container').style.cssText = 'background-color:#FFF';
                    loader.classList.add("temp-loader");
                    document.querySelector('qrvey-builders') && document.querySelector('qrvey-builders').appendChild(loader);
                }
            }

            // Styles for EndUser Shell
            let already_there = false;
            let allStyles = endUser.shadowRoot.querySelectorAll('style');
            for (let index = 0; index < allStyles.length; index++) {
                const style_el = allStyles[index];
                if (style_el.qid && style_el.qid == 'baseEU_custom') {
                    already_there = true;
                    break;
                }
            }

            if (!already_there) {
                let style = document.createElement('style');
                style.innerHTML = customEUStyle;
                style.qid = "baseEU_custom";
                endUser.shadowRoot.appendChild(style);
            }

            loadCSS(endUser, widgetCSSurl, 0).then(() => {

                // AN Panel
                window.customElements.whenDefined('an-panel').then(function () {
                    if (!endUser || !endUser.shadowRoot) return;
                    let panels = endUser.shadowRoot.querySelectorAll('an-panel');
                    if (panels.length > 0) {
                        document.querySelector('qrvey-end-user') && document.querySelector('qrvey-end-user').classList.remove("loading-qv-end-user");

                        // download button
                        let span_text = endUser.shadowRoot.querySelector('.qeu-download-manager-container .qeu-message-container .qeu-request-email-message span');
                        if (q_donwloadBoxText && (!span_text.qtext)) {
                            span_text.innerHTML = q_donwloadBoxText;
                            span_text.qtext = 'done'
                        }


                        // Styles to panels
                        for (let index = 0; index < panels.length; index++) {
                            const element = panels[index];

                            // Custom CSS Rules
                            let already_there = false;
                            let allStyles = element.shadowRoot.querySelectorAll('style');
                            for (let index = 0; index < allStyles.length; index++) {
                                const style_el = allStyles[index];
                                if (style_el.qid && style_el.qid == 'anpanels_custom') {
                                    already_there = true;
                                    break;
                                }
                            }

                            if (!already_there) {
                                let anStyles = document.createElement('style');
                                anStyles.innerHTML = customEUStyle;
                                anStyles['qid'] = "anpanels_custom";
                                element.shadowRoot.appendChild(anStyles);
                            }

                            // StyleSheet
                            for (let index2 = 0; index2 < widgetCSSurl.length; index2++) {
                                const url = widgetCSSurl[index2];
                                let stylesheet = document.createElement('link');
                                stylesheet.href = url;
                                stylesheet.rel = "stylesheet";
                                stylesheet.type = "text/css";
                                element.shadowRoot.appendChild(stylesheet);
                            }

                            window.customElements.whenDefined('an-panel-tablechart').then(function () {
                                let table_charts = element.shadowRoot.querySelectorAll('an-panel-tablechart');
                                if (table_charts.length > 0) {
                                    for (let index = 0; index < table_charts.length; index++) {
                                        const table_chart = table_charts[index];

                                        // Custom CSS Rules
                                        let iframe = table_chart.querySelectorAll('iframe');

                                        if (iframe.length > 0) {
                                            if (!iframe[0].contentDocument.getElementById('q-custom-enduser-inline-styles')) {
                                                let anStyles = document.createElement('style');
                                                anStyles.innerHTML = customEUStyle;
                                                anStyles.id = "q-custom-enduser-inline-styles";
                                                if(iframe[0] && iframe[0].contentDocument && iframe[0].contentDocument.head) iframe[0].contentDocument.head.appendChild(anStyles);
                                            }


                                            // StyleSheet
                                            for (let index2 = 0; index2 < widgetCSSurl.length; index2++) {
                                                if (!table_chart.querySelectorAll('iframe')[0].contentDocument.getElementById("q-custom-enduser-stylesheet-" + index2)) {
                                                    const url = widgetCSSurl[index2];
                                                    let stylesheet = document.createElement('link');
                                                    stylesheet.href = url;
                                                    stylesheet.rel = "stylesheet";
                                                    stylesheet.type = "text/css";
                                                    stylesheet.id = "q-custom-enduser-stylesheet-" + index2;
                                                    table_chart.querySelectorAll('iframe')[0].contentDocument.head.appendChild(stylesheet);
                                                }

                                            }
                                        }

                                    }
                                }
                            });

                        }

                        let anFilterModal;
                        window.customElements.whenDefined('an-filter-builder-modal').then(function () {
                            if (!endUser || !endUser.shadowRoot) return;
                            anFilterModal = endUser.shadowRoot.querySelectorAll('an-filter-builder-modal');
                            if (anFilterModal.length > 0) {

                                // Styles to anFilterModal
                                for (let index = 0; index < anFilterModal.length; index++) {
                                    const element = anFilterModal[index];

                                    // Custom CSS Rules
                                    let already_there = false;
                                    let allStyles = element.shadowRoot.querySelectorAll('style');
                                    for (let index = 0; index < allStyles.length; index++) {
                                        const style_el = allStyles[index];
                                        if (style_el.qid && style_el.qid == 'anfilterbuilder_custom') {
                                            already_there = true;
                                            break;
                                        }
                                    }

                                    if (!already_there) {
                                        let anStyles = document.createElement('style');
                                        anStyles.innerHTML = customEUStyle;
                                        anStyles['qid'] = "anfilterbuilder_custom";
                                        element.shadowRoot.appendChild(anStyles);
                                    }


                                    // StyleSheet
                                    for (let index2 = 0; index2 < widgetCSSurl.length; index2++) {
                                        const url = widgetCSSurl[index2];
                                        let stylesheet = document.createElement('link');
                                        stylesheet.href = url;
                                        stylesheet.rel = "stylesheet";
                                        stylesheet.type = "text/css";
                                        element.shadowRoot.appendChild(stylesheet);
                                    }
                                }



                            }
                        });

                        window.customElements.whenDefined('an-chart-builder-embed').then(function () {
                            let cb = document.querySelector('an-chart-builder-embed');
                            if (cb) {

                                // Custom CSS Rules
                                let already_there = false;
                                let allStyles = cb.shadowRoot.querySelectorAll('style');
                                for (let index = 0; index < allStyles.length; index++) {
                                    const style_el = allStyles[index];
                                    if (style_el.qid && style_el.qid == 'anchartbuilder_custom') {
                                        already_there = true;
                                        break;
                                    }
                                }

                                if (!already_there) {
                                    let anStyles = document.createElement('style');
                                    anStyles.innerHTML = customEUStyle;
                                    anStyles['qid'] = "anchartbuilder_custom";
                                    cb.shadowRoot.appendChild(anStyles);
                                }

                            }
                        })
                    }
                });

                window.customElements.whenDefined('qui-drawer-menu').then(function () {
                    if (!endUser || !endUser.shadowRoot) return;
                    drawerMenu = endUser.shadowRoot.querySelector('qui-drawer-menu');
                    if (drawerMenu) {

                        // Custom CSS Rules
                        let already_there = false;
                        let allStyles = drawerMenu.shadowRoot.querySelectorAll('style');
                        for (let index = 0; index < allStyles.length; index++) {
                            const style_el = allStyles[index];
                            if (style_el.qid && style_el.qid == 'drawerMenu_custom') {
                                already_there = true;
                                break;
                            }
                        }

                        if (!already_there) {
                            let anStyles = document.createElement('style');
                            anStyles.innerHTML = customEUStyle;
                            anStyles['qid'] = "drawerMenu_custom";
                            drawerMenu.shadowRoot.appendChild(anStyles);
                        }
                    }
                });

                window.customElements.whenDefined('qui-action-menu').then(function () {
                    if (!endUser || !endUser.shadowRoot) return;
                    actionMenu = endUser.shadowRoot.querySelector('qui-action-menu');
                    if (actionMenu) {

                        // Custom CSS Rules
                        let already_there = false;
                        let allStyles = actionMenu.shadowRoot.querySelectorAll('style');
                        for (let index = 0; index < allStyles.length; index++) {
                            const style_el = allStyles[index];
                            if (style_el.qid && style_el.qid == 'actionMenu_custom') {
                                already_there = true;
                                break;
                            }
                        }

                        if (!already_there) {
                            let anStyles = document.createElement('style');
                            anStyles.innerHTML = customEUStyle;
                            anStyles['qid'] = "actionMenu_custom";
                            actionMenu.shadowRoot.appendChild(anStyles);
                        }
                    }
                    if (q_threeDotTDirection) {
                        actionMenus = endUser.shadowRoot.querySelectorAll('qui-action-menu');
                        for (let index = 0; index < actionMenus.length; index++) {
                            const ael = actionMenus[index].shadowRoot;
                            if (ael) {
                                let tooltips = ael.querySelectorAll('qui-tooltip');
                                for (let index2 = 0; index2 < tooltips.length; index2++) {
                                    tooltips[index2].setAttribute('direction', q_threeDotTDirection)
                                }
                            }
                        }
                    }

                });

                window.customElements.whenDefined('qui-rich-editorv2').then(function () {
                    if (!endUser || !endUser.shadowRoot) return;
                    let editor = endUser.shadowRoot.querySelectorAll('qui-rich-editorv2');
                    if (editor.length > 0) {
                        for (let index = 0; index < editor.length; index++) {
                            const element = editor[index];

                            // Custom CSS Rules
                            let anStyles = document.createElement('style');
                            anStyles.innerHTML = customEUStyle;
                            anStyles['qid'] = "richeditor_custom";
                            let iframe = element.shadowRoot.querySelectorAll('iframe');
                            if (iframe && iframe[0]) {

                                let already_there = false;
                                let allStyles = iframe[0].contentDocument.body.querySelectorAll('style');
                                for (let index = 0; index < allStyles.length; index++) {
                                    const style_el = allStyles[index];
                                    if (style_el.qid && style_el.qid == 'richeditor_custom') {
                                        already_there = true;
                                        break;
                                    }
                                }

                                if (!already_there) {
                                    if(iframe[0] && iframe[0].contentDocument && iframe[0].contentDocument.body) iframe[0].contentDocument.body.appendChild(anStyles);
                                }

                            }

                            // StyleSheet
                            for (let index2 = 0; index2 < widgetCSSurl.length; index2++) {
                                const url = widgetCSSurl[index2];
                                let stylesheet = document.createElement('link');
                                stylesheet.href = url;
                                stylesheet.rel = "stylesheet";
                                stylesheet.type = "text/css";
                                element.shadowRoot.querySelectorAll('iframe')[0].contentDocument.body.appendChild(stylesheet);
                            }
                        }
                    }
                });

                // datePicker
                window.customElements.whenDefined('qui-datepicker').then(function () {
                    if (!endUser || !endUser.shadowRoot) return;
                    let pickers = endUser.shadowRoot.querySelectorAll('qui-datepicker');
                    if (pickers.length > 0) {

                        // Styles to datePickers
                        for (let index = 0; index < pickers.length; index++) {
                            const element = pickers[index];

                            // Custom CSS Rules
                            let already_there = false;
                            let allStyles = element.shadowRoot.querySelectorAll('style');
                            for (let index = 0; index < allStyles.length; index++) {
                                const style_el = allStyles[index];
                                if (style_el.qid && style_el.qid == 'datepicker_custom') {
                                    already_there = true;
                                    break;
                                }
                            }

                            if (!already_there) {
                                let anStyles = document.createElement('style');
                                anStyles.innerHTML = customEUStyle;
                                anStyles['qid'] = "datepicker_custom";
                                element.shadowRoot.appendChild(anStyles);
                            }

                            // StyleSheet
                            for (let index2 = 0; index2 < widgetCSSurl.length; index2++) {
                                const url = widgetCSSurl[index2];
                                let stylesheet = document.createElement('link');
                                stylesheet.href = url;
                                stylesheet.rel = "stylesheet";
                                stylesheet.type = "text/css";
                                element.shadowRoot.appendChild(stylesheet);
                            }
                        }

                    }
                });

                window.customElements.whenDefined('qui-input-box').then(function () {
                    if (!endUser || !endUser.shadowRoot) return;
                    let pickers = endUser.shadowRoot.querySelectorAll('qui-input-box');
                    if (pickers.length > 0) {

                        // Styles to datePickers
                        for (let index = 0; index < pickers.length; index++) {
                            const element = pickers[index];

                            // Custom CSS Rules
                            let already_there = false;
                            let allStyles = element.shadowRoot.querySelectorAll('style');
                            for (let index = 0; index < allStyles.length; index++) {
                                const style_el = allStyles[index];
                                if (style_el.qid && style_el.qid == 'qui-input-box_custom') {
                                    already_there = true;
                                    break;
                                }
                            }

                            if (!already_there) {
                                let anStyles = document.createElement('style');
                                anStyles.innerHTML = customEUStyle;
                                anStyles['qid'] = "qui-input-box_custom";
                                element.shadowRoot.appendChild(anStyles);
                            }

                            // StyleSheet
                            for (let index2 = 0; index2 < widgetCSSurl.length; index2++) {
                                const url = widgetCSSurl[index2];
                                let stylesheet = document.createElement('link');
                                stylesheet.href = url;
                                stylesheet.rel = "stylesheet";
                                stylesheet.type = "text/css";
                                element.shadowRoot.appendChild(stylesheet);
                            }
                        }

                    }
                });

                window.customElements.whenDefined('qui-value-list').then(function () {
                    if (!endUser || !endUser.shadowRoot) return;
                    let pickers = endUser.shadowRoot.querySelectorAll('qui-value-list');
                    if (pickers.length > 0) {

                        // Styles to datePickers
                        for (let index = 0; index < pickers.length; index++) {
                            const element = pickers[index];

                            // Custom CSS Rules
                            let already_there = false;
                            let allStyles = element.shadowRoot.querySelectorAll('style');
                            for (let index = 0; index < allStyles.length; index++) {
                                const style_el = allStyles[index];
                                if (style_el.qid && style_el.qid == 'qui-value-list_custom') {
                                    already_there = true;
                                    break;
                                }
                            }

                            if (!already_there) {
                                let anStyles = document.createElement('style');
                                anStyles.innerHTML = customEUStyle;
                                anStyles['qid'] = "qui-value-list_custom";
                                element.shadowRoot.appendChild(anStyles);

                                setTimeout(() => {
                                    let anStyles2 = document.createElement('style');
                                    anStyles2.innerHTML = customEUStyle;
                                    anStyles2['qid'] = "qui-value-list_custom2";
                                    element.shadowRoot.querySelector('qui-list-window').shadowRoot.appendChild(anStyles2);
                                }, 100);

                            }

                            // StyleSheet
                            for (let index2 = 0; index2 < widgetCSSurl.length; index2++) {
                                const url = widgetCSSurl[index2];
                                let stylesheet = document.createElement('link');
                                stylesheet.href = url;
                                stylesheet.rel = "stylesheet";
                                stylesheet.type = "text/css";
                                element.shadowRoot.appendChild(stylesheet);
                            }
                        }

                    }
                });

            })
        }

        var CSS_FONTS = document.querySelectorAll('link');
        for (let index = 0; index < CSS_FONTS.length; index++) {
            const element = CSS_FONTS[index];
            if (element.href.includes('qrvey-end-user/styles.css')) {
                element.remove();
            }
        }

        if (pb) {
            document.querySelector('qrvey-loader.temp-loader') && document.querySelector('qrvey-loader.temp-loader').remove();
        }
    })
}

function runEndUser(pb, default_mode = true) {
    pbv = pb;
    default_mode_v = default_mode;
    var globalStyle = `.loading-qv-end-user {
        display: none;
    }`;
    let globalRule = document.createElement('style');
    globalRule.innerHTML = globalStyle;
    document.body.appendChild(globalRule);

    const endUser = !pb ? document.querySelector('qrvey-end-user') : document.querySelector('qrvey-builders');
    let q_donwloadBoxText = undefined;
    let q_downloadingBoxText = undefined;
    let q_threeDotTDirection = undefined;

    if (endUser) {
        var att = endUser.getAttribute('settings') || endUser.settings || 'EUsetting' ;
        globalEUConfigName = att;
        if (typeof customEUStyle === 'undefined') {
            customEUStyle = '';
        }

        if (window[att].customCSSRules) {
            customEUStyle += window[att].customCSSRules;
        }
        if (window[att].downloadBoxText) {
            q_donwloadBoxText = window[att].downloadBoxText;
        }
        if (window[att].downloadingBoxText) {
            q_downloadingBoxText = window[att].downloadingBoxText;
        }
        if (window[att].ThreeDotTooltipDirection) {
            q_threeDotTDirection = window[att].ThreeDotTooltipDirection;
        }

        customEUStyle = customEUStyle.replaceAll('undefined', '');

        document.addEventListener('ON_AN_DOWNLOAD_PANEL', function (data) {
            if (window[att].automaticDownload && window[att].automaticDownload.chartPanelLevel) {
                var t_endUser = !pb ? (document.querySelector('qeu-end-user') ? document.querySelector('qeu-end-user') : document.querySelector('qpb-root')) : document.querySelector('qpb-root');
                let ill_wait = t_endUser.shadowRoot.querySelector('.qeu-download-manager-container .qeu-request-email-buttons .qeu-download-manager-custom-button:nth-child(1)');
                setTimeout(() => {
                    ill_wait.click();
                    setTimeout(() => {
                        afterDownload(t_endUser, window[att], q_downloadingBoxText);
                    }, 5);
                }, 0);
            }
        });

        window.addEventListener('ON_REQUEST_DOWNLOAD', function (data) {
            if (window[att].automaticDownload && window[att].automaticDownload.pageLevel) {
                var t_endUser = !pb ? (document.querySelector('qeu-end-user') ? document.querySelector('qeu-end-user') : document.querySelector('qpb-root')) : document.querySelector('qpb-root');
                let ill_wait = t_endUser.shadowRoot.querySelector('.qeu-download-manager-container .qeu-request-email-buttons .qeu-download-manager-custom-button:nth-child(1)');
                setTimeout(() => {
                    ill_wait.click();
                    setTimeout(() => {
                        afterDownload(t_endUser, window[att], q_downloadingBoxText);
                    }, 5);
                }, 0);
            }
        });

        const afterDownload = function (context, config, dtext) {
            if (config.automaticDownload.closeDownloadingBox) {
                let close_toast = context.shadowRoot.querySelector('.qeu-download-manager-container .qeu-message-container .qeu-close-download-manager');
                close_toast && close_toast.click();
            } else if (dtext) {
                let span_text = context.shadowRoot.querySelector('.qeu-download-manager-container .qeu-message-container .qeu-request-email-message span');
                span_text && (span_text.innerHTML = dtext);
            }
        }


        try {
            var att = endUser.getAttribute('settings') || 'EUsetting';
            widgetCSSurl = window[att].styleUrls ? window[att].styleUrls : [];
        } catch (error) {
            widgetCSSurl = [];
        }

        mutation = new MutationObserver(mutationList => {
            mutationList.forEach((mutation) => checkNodes(mutation.addedNodes, pb, default_mode, q_donwloadBoxText, q_threeDotTDirection));
        });

        window.customElements.whenDefined('qrvey-end-user').then(function () {
            mutation.observe(document.body, {
                childList: true,
            });
        })
    }

}

function loadCSS(endUser, urls, i) {
    if (!urls || urls.length == 0) return new Promise(resolve => { return resolve() })
    if (typeof pbv === 'undefined') {
        endUser = document.querySelector('qeu-end-user') ? document.querySelector('qeu-end-user') : document.querySelector('qpb-root')
    }else{
        endUser = !pbv ? (document.querySelector('qeu-end-user') ? document.querySelector('qeu-end-user') : document.querySelector('qpb-root')) : document.querySelector('qpb-root');
    }
    return new Promise(resolve => {
        var url = urls[i];
        var link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.onload = function () {
            if (urls.length < i) {
                resolve(loadCSS(urls, i++))
            }
            return resolve();
        }
        link.setAttribute("href", url);
        endUser.shadowRoot.appendChild(link);
    })
}

window.addEventListener('openFilterBuilder', function (event) {
    setTimeout(() => {
        let cb = document.querySelector('an-chart-builder-embed');

        if (typeof pbv === 'undefined') {
            endUser =  document.querySelector('qeu-end-user') ? document.querySelector('qeu-end-user') : document.querySelector('qpb-root');
        }else{
            endUser = !pbv ? (document.querySelector('qeu-end-user') ? document.querySelector('qeu-end-user') : document.querySelector('qpb-root')) : document.querySelector('qpb-root');
        }

        if (cb) {
            window.customElements.whenDefined('an-filter-builder-modal').then(function () {
                anFilterModal = cb.shadowRoot.querySelectorAll('an-filter-builder-modal');
                // Styles to anFilterModal
                for (let index = 0; index < anFilterModal.length; index++) {
                    const element = anFilterModal[index];

                    // Custom CSS Rules
                    let already_there = false;
                    let allStyles = element.shadowRoot.querySelectorAll('style');
                    for (let index = 0; index < allStyles.length; index++) {
                        const style_el = allStyles[index];
                        if (style_el.qid && style_el.qid == 'openfilterbuilder_custom') {
                            already_there = true;
                            break;
                        }
                    }

                    if (!already_there) {
                        let anStyles = document.createElement('style');
                        anStyles.innerHTML = customEUStyle;
                        anStyles['qid'] = "openfilterbuilder_custom";
                        element.shadowRoot.appendChild(anStyles);
                    }

                }
            })
        }


        window.customElements.whenDefined('an-filter-builder').then(function () {
            if (!endUser || !endUser.shadowRoot) return;
            let anFilterModal = endUser.shadowRoot.querySelectorAll('an-filter-builder-modal');
            if (anFilterModal.length > 0) {
                anFilterModal.forEach(element => {
                    let cb2 = element.shadowRoot.querySelectorAll('an-filter-builder');
                    cb2.forEach(element2 => {
                        // Custom CSS Rules
                        let already_there = false;
                        let allStyles = element2.shadowRoot.querySelectorAll('style');
                        for (let index = 0; index < allStyles.length; index++) {
                            const style_el = allStyles[index];
                            if (style_el.qid && style_el.qid == 'anfilterbuilder_custom2') {
                                already_there = true;
                                break;
                            }
                        }

                        if (!already_there) {
                            let anStyles = document.createElement('style');
                            anStyles.innerHTML = customEUStyle;
                            anStyles['qid'] = "anfilterbuilder_custom2";
                            element2.shadowRoot.appendChild(anStyles);
                        }
                    });
                });
            }
        });




    }, 200);


}, false);

window.addEventListener('ON_AN_PANEL_LOADING_STATUS',  (event) => {
    let anpv, apdefault_mode_v
    if (typeof pbv === 'undefined') {
        anpv = false;
    }
    
    if (typeof default_mode_v === 'undefined') {
        // the variable is defined
        apdefault_mode_v = false;
    }

    event.detail && runEndUser(anpv, apdefault_mode_v);
}, false);


document.addEventListener('DOMNodeInserted', e => {
    if (e.target.nodeName === 'AN-QV-POPUP-MENU') {
        e.target.shadowRoot.append(Object.assign(
            document.createElement('style'),
            { innerHTML: customEUStyle }
        ));
    }
});