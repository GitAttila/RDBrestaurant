/*jshint esversion: 6 */

class LangController {
    constructor(nav) {
        $.ajaxSetup({ cache: false });
        this.navigation = nav;
        this.langDefs = {
            'english': {
                'short': 'en',
                'full': 'english',
                'active': true
            },
            'czech': {
                'short': 'cz',
                'full': 'czech',
                'active': false
            }
        }
        this.URL = './assets/data/langDB.json';
        this.langSwitch = $("#lang-switch");
        this.getLangDB(this.URL);
    }

    events() {
        let _self = this;
        $(this.langSwitch).on('click', function() {
            let isLangSwitchDisabled = $(this).hasClass('primary-nav__link--disabled');
            if (isLangSwitchDisabled) {
                return;
            }

            let $next = $(this).children('.lang-btn--active').next();
            if ($next.length === 0) {
                $(this).children().removeClass('lang-btn--active').eq(0).addClass('lang-btn--active').animateCss('pulse');
            } else {
                $(this).children('.lang-btn--active').removeClass('lang-btn--active').next().addClass('lang-btn--active').animateCss('pulse');
            }
            let active = $(this).children('.lang-btn--active').attr('id');
            active = active.split('-').pop();
            _self.translate(active);
        });
    }

    getLangDB(url, callbackFn) {
        var _self = this;
        callbackFn = callbackFn || function() {};
        $.getJSON( url, function() {
            })
            .done(function(data) {
                console.log( "Translation keys loaded." );
                _self.langDB = data;
                _self.buildLangSwitch(_self.langDefs);
                _self.events();
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ": " + error;
                console.log( "Unable to load lang DB: " + err );
                console.log('Removing the language switcher.');
                _self.langDB = [];
                $('#lang-switch').parent().remove();
            })
            .always(function() {
                callbackFn();
            });
    }

    translate(langKey) {
        langKey = (langKey || 'en').toLowerCase();
        let _self = this;
        $('[data-lang]').each(function(key,val){
            let dataKey = $(val).data('lang');
            if (_self.langDB[dataKey]) {
                $(this).text(_self.langDB[dataKey][langKey]).animateCss('fadeInDown');
            }
        });
        $('[data-lang-' + langKey + ']').each(function(key,val){
            let translation = $(val).data('lang-' + langKey);
            $(this).text(translation).animateCss('fadeInDown');
        });
        this.navigation.updateGrid();
    }

    buildLangSwitch (lngDefinitions) {
        let html = '';
        $(Object.keys(lngDefinitions)).each(function(key,val){
            let activeClass = '';
            if (lngDefinitions[val].active) { activeClass = 'lang-btn--active'}
            html += '<div id="lang-switch-' + lngDefinitions[val].short + '" class="lang-btn ' + activeClass + '">';
            html += '<span class="lang-btn-text__short">' + lngDefinitions[val].short + '</span>';
            html += '<span class="lang-btn-text__full" data-lang="' + lngDefinitions[val].full + '">' + lngDefinitions[val].full + '</span>';
            html += '</div>';
        });
        $('#lang-switch').append(html);
    }

}

export default LangController;
