/*!
 * summernote highlight plugin
 * http://www.heyanlong.com/
 *
 * Released under the MIT license
 */
(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals: jQuery
        factory(window.jQuery);
    }
}(function ($) {
    // template
    var tmpl = $.summernote.renderer.getTemplate();

    // core functions: range, dom
    var range = $.summernote.core.range;
    var dom = $.summernote.core.dom;

    /**
     * createCodeNode
     *
     * @member plugin.highlight
     * @private
     * @param {String} code
     * @return {Node}
     */
    var createCodeNode = function (code, select) {
        var $code = $('<code>');
        $code.html(code);
        $code.addClass('language-' + select);

        var $pre = $('<pre>');
        $pre.html($code)
        $pre.addClass('prettyprint').addClass('linenums');

        return $pre[0];
    };

    var getTextOnRange = function ($editable) {
        $editable.focus();

        var rng = range.create();

        // if range on anchor, expand range with anchor
        if (rng.isOnAnchor()) {
            var anchor = dom.ancestor(rng.sc, dom.isAnchor);
            rng = range.createFromNode(anchor);
        }

        return rng.toString();
    };

    var toggleBtn = function ($btn, isEnable) {
        $btn.toggleClass('disabled', !isEnable);
        $btn.attr('disabled', !isEnable);
    };

    var showHighlightDialog = function ($editable, $dialog, text) {
        return $.Deferred(function (deferred) {
            var $highlightDialog = $dialog.find('.note-highlight-dialog');

            var $highlightCode = $highlightDialog.find('.note-highlight-code'),
                $highlightBtn = $highlightDialog.find('.note-highlight-btn'),
                $highlightSelect = $highlightDialog.find('.note-highlight-select');

            $highlightDialog.one('shown.bs.modal', function () {
                $highlightCode.val(text).on('input', function () {
                    toggleBtn($highlightBtn, $highlightCode.val());
                }).trigger('focus');

                $highlightBtn.click(function (event) {
                    event.preventDefault();
                    deferred.resolve($highlightCode.val(), $highlightSelect.val());
                    $highlightDialog.modal('hide');
                });
            }).one('hidden.bs.modal', function () {
                $highlightCode.off('input');
                $highlightBtn.off('click');

                if (deferred.state() === 'pending') {
                    deferred.reject();
                }
            }).modal('show');
        });
    };

    /**
     * @class plugin.highlight
     *
     * Code Highlight Plugin
     */
    $.summernote.addPlugin({
        /** @property {String} name name of plugin */
        name: 'highlight',
        /**
         * @property {Object} buttons
         * @property {Function} buttons.highlight   function to make button
         */
        buttons: { // buttons
            highlight: function (lang) {
                return tmpl.iconButton('fa fa-file-code-o', {
                    event: 'highlight',
                    title: 'highlight',
                    title: lang.highlight.highlight,
                    hide: true
                });
            }
        },
        /**
         * @property {Object} dialogs
         * @property {function(object, object): string} dialogs.highlight
         */
        dialogs: {
            highlight: function (lang) {
                var body = '<div class="form-group">' +
                    '<select class="form-control note-highlight-select">' +
                    '<option value="bsh">bsh</option>' +
                    '<option value="c">c</option>' +
                    '<option value="cc">cc</option>' +
                    '<option value="cpp">cpp</option>' +
                    '<option value="cs">cs</option>' +
                    '<option value="csh">csh</option>' +
                    '<option value="cyc">cyc</option>' +
                    '<option value="cv">cv</option>' +
                    '<option value="htm">htm</option>' +
                    '<option value="html">html</option>' +
                    '<option value="java">java</option>' +
                    '<option value="js">js</option>' +
                    '<option value="m">m</option>' +
                    '<option value="mxml">mxml</option>' +
                    '<option value="perl">perl</option>' +
                    '<option value="pl">pl</option>' +
                    '<option value="pm">pm</option>' +
                    '<option value="py">py</option>' +
                    '<option value="php">php</option>' +
                    '<option value="rb">rb</option>' +
                    '<option value="sh">sh</option>' +
                    '<option value="xhtml">xhtml</option>' +
                    '<option value="xml">xml</option>' +
                    '<option value="xsl">xsl</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label>' + lang.highlight.codeLabel + '</label>' +
                    '<textarea class="note-highlight-code form-control" rows="10"></textarea>' +
                    '</div>';
                var footer = '<button href="#" class="btn btn-primary note-highlight-btn disabled" disabled>' + lang.highlight.insert + '</button>';
                return tmpl.dialog('note-highlight-dialog', lang.highlight.insert, body, footer);
            }
        },

        /**
         * @property {Object} events
         * @property {Function} events.highlight  run function when button that has a 'highlight' event name  fires click
         */
        events: { // events
            highlight: function (event, editor, layoutInfo) {
                var $dialog = layoutInfo.dialog(),
                    $editable = layoutInfo.editable(),
                    text = getTextOnRange($editable);

                editor.saveRange($editable);
                showHighlightDialog($editable, $dialog, text).then(function (code, select) {
                    // when ok button clicked

                    // restore range
                    editor.restoreRange($editable);

                    // build node
                    var $node = createCodeNode(code, select);

                    if ($node) {
                        // insert code node
                        editor.insertNode($editable, $node);
                    }
                    //prettyPrint();
                }).fail(function () {
                    // when cancel button clicked
                    editor.restoreRange($editable);
                });
            }
        },
        // define language
        langs: {
            'en-US': {
                highlight: {
                    highlight: 'Insert code',
                    insert: 'Insert code',
                    codeLabel: 'Enter the code fragment'
                }
            },
            'ar-AR': {},
            'ca-ES': {},
            'cs-CZ': {},
            'da-DK': {},
            'de-DE': {},
            'es-ES': {},
            'es-EU': {},
            'fa-IR': {},
            'fi-FI': {},
            'fr-FR': {},
            'he-IL': {},
            'hu-HU': {},
            'id-ID': {},
            'it-IT': {},
            'ja-JP': {},
            'ko-KR': {},
            'nb-NO': {},
            'nl-NL': {},
            'pl-PL': {},
            'pt-BR': {},
            'ro-RO': {},
            'ru-RU': {},
            'sk-SK': {},
            'sl-SI': {},
            'sr-RS': {},
            'sr-RS-Latin': {},
            'sv-SE': {},
            'th-TH': {},
            'tr-TR': {},
            'uk-UA': {},
            'vi-VN': {},
            'zh-CN': {
                highlight: {
                    highlight: '插入代码',
                    insert: '插入代码',
                    codeLabel: '输入代码片段'
                }
            },
            'zh-TW': {}
        }
    });
}));
