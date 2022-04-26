/*! For license information please see 756.284c15ce.chunk.js.LICENSE.txt */
(self.webpackChunkgh_stats=self.webpackChunkgh_stats||[]).push([[756],{5095:function(t,e,o){var n=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,s=/^0o[0-7]+$/i,l=parseInt,a="object"==typeof o.g&&o.g&&o.g.Object===Object&&o.g,c="object"==typeof self&&self&&self.Object===Object&&self,h=a||c||Function("return this")(),u=Object.prototype.toString,p=Math.max,f=Math.min,d=function(){return h.Date.now()};function v(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function m(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==u.call(t)}(t))return NaN;if(v(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=v(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(n,"");var o=i.test(t);return o||s.test(t)?l(t.slice(2),o?2:8):r.test(t)?NaN:+t}t.exports=function(t,e,o){var n,r,i,s,l,a,c=0,h=!1,u=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function T(e){var o=n,i=r;return n=r=void 0,c=e,s=t.apply(i,o)}function y(t){return c=t,l=setTimeout(b,e),h?T(t):s}function w(t){var o=t-a;return void 0===a||o>=e||o<0||u&&t-c>=i}function b(){var t=d();if(w(t))return E(t);l=setTimeout(b,function(t){var o=e-(t-a);return u?f(o,i-(t-c)):o}(t))}function E(t){return l=void 0,g&&n?T(t):(n=r=void 0,s)}function S(){var t=d(),o=w(t);if(n=arguments,r=this,a=t,o){if(void 0===l)return y(a);if(u)return l=setTimeout(b,e),T(a)}return void 0===l&&(l=setTimeout(b,e)),s}return e=m(e)||0,v(o)&&(h=!!o.leading,i=(u="maxWait"in o)?p(m(o.maxWait)||0,e):i,g="trailing"in o?!!o.trailing:g),S.cancel=function(){void 0!==l&&clearTimeout(l),c=0,n=a=r=l=void 0},S.flush=function(){return void 0===l?s:E(d())},S}},4771:function(t,e,o){"use strict";var n=o(2791),r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])},r(t,e)};var i=function(){return i=Object.assign||function(t){for(var e,o=1,n=arguments.length;o<n;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},i.apply(this,arguments)};var s="Pixel",l="Percent",a={unit:l,value:.8};function c(t){return"number"===typeof t?{unit:l,value:100*t}:"string"===typeof t?t.match(/^(\d*(\.\d+)?)px$/)?{unit:s,value:parseFloat(t)}:t.match(/^(\d*(\.\d+)?)%$/)?{unit:l,value:parseFloat(t)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),a):(console.warn("scrollThreshold should be string or number"),a)}var h=function(t){function e(e){var o=t.call(this,e)||this;return o.lastScrollTop=0,o.actionTriggered=!1,o.startY=0,o.currentY=0,o.dragging=!1,o.maxPullDownDistance=0,o.getScrollableTarget=function(){return o.props.scrollableTarget instanceof HTMLElement?o.props.scrollableTarget:"string"===typeof o.props.scrollableTarget?document.getElementById(o.props.scrollableTarget):(null===o.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},o.onStart=function(t){o.lastScrollTop||(o.dragging=!0,t instanceof MouseEvent?o.startY=t.pageY:t instanceof TouchEvent&&(o.startY=t.touches[0].pageY),o.currentY=o.startY,o._infScroll&&(o._infScroll.style.willChange="transform",o._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},o.onMove=function(t){o.dragging&&(t instanceof MouseEvent?o.currentY=t.pageY:t instanceof TouchEvent&&(o.currentY=t.touches[0].pageY),o.currentY<o.startY||(o.currentY-o.startY>=Number(o.props.pullDownToRefreshThreshold)&&o.setState({pullToRefreshThresholdBreached:!0}),o.currentY-o.startY>1.5*o.maxPullDownDistance||o._infScroll&&(o._infScroll.style.overflow="visible",o._infScroll.style.transform="translate3d(0px, "+(o.currentY-o.startY)+"px, 0px)")))},o.onEnd=function(){o.startY=0,o.currentY=0,o.dragging=!1,o.state.pullToRefreshThresholdBreached&&(o.props.refreshFunction&&o.props.refreshFunction(),o.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){o._infScroll&&(o._infScroll.style.overflow="auto",o._infScroll.style.transform="none",o._infScroll.style.willChange="unset")}))},o.onScrollListener=function(t){"function"===typeof o.props.onScroll&&setTimeout((function(){return o.props.onScroll&&o.props.onScroll(t)}),0);var e=o.props.height||o._scrollableNode?t.target:document.documentElement.scrollTop?document.documentElement:document.body;o.actionTriggered||((o.props.inverse?o.isElementAtTop(e,o.props.scrollThreshold):o.isElementAtBottom(e,o.props.scrollThreshold))&&o.props.hasMore&&(o.actionTriggered=!0,o.setState({showLoader:!0}),o.props.next&&o.props.next()),o.lastScrollTop=e.scrollTop)},o.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:e.dataLength},o.throttledOnScrollListener=function(t,e,o,n){var r,i=!1,s=0;function l(){r&&clearTimeout(r)}function a(){var a=this,c=Date.now()-s,h=arguments;function u(){s=Date.now(),o.apply(a,h)}function p(){r=void 0}i||(n&&!r&&u(),l(),void 0===n&&c>t?u():!0!==e&&(r=setTimeout(n?p:u,void 0===n?t-c:t)))}return"boolean"!==typeof e&&(n=o,o=e,e=void 0),a.cancel=function(){l(),i=!0},a}(150,o.onScrollListener).bind(o),o.onStart=o.onStart.bind(o),o.onMove=o.onMove.bind(o),o.onEnd=o.onEnd.bind(o),o}return function(t,e){function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}(e,t),e.prototype.componentDidMount=function(){if("undefined"===typeof this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"===typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!==typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},e.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},e.prototype.componentDidUpdate=function(t){this.props.dataLength!==t.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},e.getDerivedStateFromProps=function(t,e){return t.dataLength!==e.prevDataLength?i(i({},e),{prevDataLength:t.dataLength}):null},e.prototype.isElementAtTop=function(t,e){void 0===e&&(e=.8);var o=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,n=c(e);return n.unit===s?t.scrollTop<=n.value+o-t.scrollHeight+1:t.scrollTop<=n.value/100+o-t.scrollHeight+1},e.prototype.isElementAtBottom=function(t,e){void 0===e&&(e=.8);var o=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,n=c(e);return n.unit===s?t.scrollTop+o>=t.scrollHeight-n.value:t.scrollTop+o>=n.value/100*t.scrollHeight},e.prototype.render=function(){var t=this,e=i({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),o=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),r=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return n.createElement("div",{style:r,className:"infinite-scroll-component__outerdiv"},n.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(e){return t._infScroll=e},style:e},this.props.pullDownToRefresh&&n.createElement("div",{style:{position:"relative"},ref:function(e){return t._pullDown=e}},n.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!o&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},e}(n.Component);e.Z=h}}]);
//# sourceMappingURL=756.284c15ce.chunk.js.map