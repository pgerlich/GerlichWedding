/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-br-car': '&#xe900;',
		'icon-br-champaign': '&#xe901;',
		'icon-br-meal': '&#xe902;',
		'icon-br-ring': '&#xe903;',
		'icon-br-arrow-forward': '&#xe917;',
		'icon-br-check-circle-outline-blank': '&#xe929;',
		'icon-br-check-circle': '&#xe904;',
		'icon-br-check': '&#xe905;',
		'icon-br-chevron-left': '&#xe906;',
		'icon-br-chevron-right': '&#xe907;',
		'icon-br-clear': '&#xe92b;',
		'icon-br-close': '&#xe908;',
		'icon-br-done': '&#xe940;',
		'icon-br-expand-less': '&#xe956;',
		'icon-br-expand-more': '&#xe957;',
		'icon-br-favorite-outline': '&#xe95c;',
		'icon-br-lock-open': '&#xe983;',
		'icon-br-lock-outline': '&#xe984;',
		'icon-br-loop': '&#xe986;',
		'icon-br-play-arrow': '&#xe999;',
		'icon-br-play-circle-outline': '&#xe99b;',
		'icon-br-replay': '&#xe9a8;',
		'icon-br-star-outline': '&#xe9c2;',
		'icon-br-logo': '&#xe602;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-br[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
