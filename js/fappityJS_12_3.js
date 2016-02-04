function fappity() {
! function () {
    function e() {
        this.ErrorMessages = [], this.InfoMessages = [], this.WarnMessages = []
    }

    function t(e, t) {
        this.text = e || "", this.groupKey = t || ""
    }
    e.prototype.AddErrorMessage = function(e, r) {
        this.ErrorMessages.push(new t(e, r))
    }, e.prototype.AddInfoMessage = function(e, r) {
        this.InfoMessages.push(new t(e, r))
    }, e.prototype.AddWarnMessage = function(e, r) {
        this.WarnMessages.push(new t(e, r))
    }, e.prototype.ClearErrorMessages = function(e) {
        this.clear(this.ErrorMessages, e)
    }, e.prototype.ClearInfoMessages = function(e) {
        this.clear(this.InfoMessages, e)
    }, e.prototype.ClearWarnMessages = function(e) {
        this.clear(this.WarnMessages, e)
    }, e.prototype.ClearAll = function(e) {
        this.ClearErrorMessages(e), this.ClearInfoMessages(e), this.ClearWarnMessages(e)
    }, e.prototype.clear = function(e, t) {
        if (t) {
	    for (var r = 0, n = e.length; n > r; r++) {e[r].groupKey === t && (e.splice(r, 1), n--)
    }}
	}, app.constant("Flash", new e)
}(), app.controller("n", ["$route", "$scope",
    function(e, t) {
        t.$on("$routeChangeSuccess", function() {
            if (t.p = {}, e.current && e.current.controller) {
                var r = e.current.controller.replace(/Controller$/, "");
                t.p[r] = !0
            }
        })
    }
]),
function() {
    angular.module("LocalStorageMDL", []).provider("LocalStorageSRVC", function() {
        this.prefix = "ls", this.storageType = "localStorage", this.cookie = {
            expiry: 30,
            path: "/"
        }, this.notify = {
            setItem: !0,
            removeItem: !1
        }, this.setPrefix = function(e) {
            this.prefix = e
        }, this.setStorageType = function(e) {
            this.storageType = e
        }, this.setStorageCookie = function(e, t) {
            this.cookie = {
                expiry: e,
                path: t
            }
        }, this.setStorageCookieDomain = function(e) {
            this.cookie.domain = e
        }, this.setNotify = function(e, t) {
            this.notify = {
                setItem: e,
                removeItem: t
            }
        }, this.$get = ["$rootScope", "$window", "$document",
            function(e, t, r) {
                var n = this.prefix,
                    o = this.cookie,
                    i = this.notify,
                    s = this.storageType,
                    a = t[s];
                r || (r = document), "." !== n.substr(-1) && (n = n ? n + "." : "");
                var d = function() {
                    try {
                        var r = s in t && null !== t[s],
                            o = n + "__" + Math.round(1e7 * Math.random());
                        return r && (a.setItem(o, ""), a.removeItem(o)), !0
                    } catch (i) {
                        return s = "cookie", e.$broadcast("LocalStorageMDL.notification.error", i.message), !1
                    }
                }(),
                    l = function(t, r) {
                        if (!d) return e.$broadcast("LocalStorageMDL.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), i.setItem && e.$broadcast("LocalStorageMDL.notification.setitem", {
                            key: t,
                            newvalue: r,
                            storageType: "cookie"
                        }), h(t, r);
                        "undefined" == typeof r && (r = null);
                        try {
                            (angular.isObject(r) || angular.isArray(r)) && (r = angular.toJson(r)), a.setItem(n + t, r), i.setItem && e.$broadcast("LocalStorageMDL.notification.setitem", {
                                key: t,
                                newvalue: r,
                                storageType: this.storageType
                            })
                        } catch (o) {
                            return e.$broadcast("LocalStorageMDL.notification.error", o.message), h(t, r)
                        }
                        return !0
                    }, u = function(t) {
                        if (!d) return e.$broadcast("LocalStorageMDL.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), i.removeItem && e.$broadcast("LocalStorageMDL.notification.removeitem", {
                            key: t,
                            storageType: "cookie"
                        }), g(t);
                        try {
                            a.removeItem(n + t), i.removeItem && e.$broadcast("LocalStorageMDL.notification.removeitem", {
                                key: t,
                                storageType: this.storageType
                            })
                        } catch (r) {
                            return e.$broadcast("LocalStorageMDL.notification.error", r.message), g(t)
                        }
                        return !0
                    }, c = function() {
                        try {
                            return navigator.cookieEnabled || "cookie" in r && (0 < r.cookie.length || -1 < (r.cookie = "test").indexOf.call(r.cookie, "test"))
                        } catch (t) {
                            return e.$broadcast("LocalStorageMDL.notification.error", t.message), !1
                        }
                    }, h = function(t, i) {
                        if ("undefined" == typeof i) return !1;
                        if (!c()) return e.$broadcast("LocalStorageMDL.notification.error", "COOKIES_NOT_SUPPORTED"), !1;
                        try {
                            var s = "",
                                a = new Date,
                                d = "";
                            if (null === i ? (a.setTime(a.getTime() + -864e5), s = "; expires=" + a.toGMTString(), i = "") : 0 !== o.expiry && (a.setTime(a.getTime() + 864e5 * o.expiry), s = "; expires=" + a.toGMTString()), t) {
                                var l = "; path=" + o.path;
                                o.domain && (d = "; domain=" + o.domain), r.cookie = n + t + "=" + encodeURIComponent(i) + s + l + d
                            }
                        } catch (u) {
                            return e.$broadcast("LocalStorageMDL.notification.error", u.message), !1
                        }
                        return !0
                    }, m = function(t) {
                        if (!c()) return e.$broadcast("LocalStorageMDL.notification.error", "COOKIES_NOT_SUPPORTED"), !1;
                        for (var o = r.cookie && r.cookie.split(";") || [], i = 0; i < o.length; i++) {
                            for (var s = o[i];
                                " " === s.charAt(0);) s = s.substring(1, s.length);
                            if (0 === s.indexOf(n + t + "=")) return decodeURIComponent(s.substring(n.length + t.length + 1, s.length))
                        }
                        return null
                    }, g = function(e) {
                        h(e, null)
                    }, f = function() {
                        for (var e = null, t = n.length, o = r.cookie.split(";"), i = 0; i < o.length; i++) {
                            for (e = o[i];
                                " " === e.charAt(0);) e = e.substring(1, e.length);
                            e = e.substring(t, e.indexOf("=")), g(e)
                        }
                    };
                return {
                    isSupported: d,
                    getStorageType: function() {
                        return s
                    },
                    set: l,
                    add: l,
                    get: function(t) {
                        return d ? (t = a.getItem(n + t)) && "null" !== t ? "{" === t.charAt(0) || "[" === t.charAt(0) ? angular.fromJson(t) : t : null : (e.$broadcast("LocalStorageMDL.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), m(t))
                    },
                    keys: function() {
                        if (!d) return e.$broadcast("LocalStorageMDL.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), !1;
                        var t, r = n.length,
                            o = [];
                        for (t in a)
                            if (t.substr(0, r) === n) try {
                                o.push(t.substr(r))
                            } catch (i) {
                                return e.$broadcast("LocalStorageMDL.notification.error", i.Description), []
                            }
                            return o
                    },
                    remove: u,
                    clearAll: function(t) {
                        t = t || "";
                        var r = n.slice(0, -1);
                        if (t = RegExp(r + "." + t), !d) return e.$broadcast("LocalStorageMDL.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), f();
                        var o, r = n.length;
                        for (o in a)
                            if (t.test(o)) try {
                                u(o.substr(r))
                            } catch (i) {
                                return e.$broadcast("LocalStorageMDL.notification.error", i.message), f()
                            }
                            return !0
                    },
                    cookie: {
                        set: h,
                        add: h,
                        get: m,
                        remove: g,
                        clearAll: f
                    }
                }
            }
        ]
    })
}.call(this), app.controller("a", function() {}), app.controller("b", ["$http", "$scope", "Flash",
    function(e, t, r) {
        function n() {
            r.AddErrorMessage("", i)
        }

        function o() {
            t.message = "", t.sender = "", r.AddInfoMessage("", i)
        }
        var i = "feedback";
        t.$on("$destroy", function() {
            r.ClearAll(i)
        }), t.submit = function() {
            r.ClearAll(i), e.post("/api/1/feedback", {
                message: t.message,
                sender: t.sender
            }).error(n).success(o)
        }
    }
]), app.controller("s", ["$scope", "LocalStorageSRVC", "Settings",
    function(e, t, r) {
        r.setDefaults(), e.i = "true" === t.get(r.keys.I), e.o = "true" === t.get(r.keys.O), e.l = t.isSupported, e.s = function() {
            t.set(r.keys.I, e.i), t.set(r.keys.O, e.o)
        }
    }
]), app.factory("Settings", ["LocalStorageSRVC",
    function(e) {
        var t = {
            keys: {
                I: "settings.I",
                O: "settings.O",
                V: "settings.V"
            },
            setDefaults: function() {
                e.get(t.keys.V) || (e.set(t.keys.O, "true"), e.set(t.keys.V, "2014-02-24-0"))
            }
        };
        return t
    }
]), app.controller("e", ["$http", "$location", "$routeParams", "$scope", "Flash",
    function(e, t, r, n, o) {      
    function i(e, t) {
            this.id = e || "", this.isChecked = t || !1, this.name = e || ""
        }
        n.allAreSelected = !0, n.name = "", n.subreddits = [], n.isValidName = !0, e = r.subredditIds ? r.subredditIds.split("+") : [], r = 0;
        for (var s = e.length; s > r; r++) {
            var a = new i(e[r], !0);
            n.subreddits.push(a)
        }
        n.$on("$destroy", function() {
            o.ClearAll("subredditList")
        }), n.selectAll = function() {
            for (var e = 0, t = n.subreddits.length; t > e; e++) {n.subreddits[e].isChecked = n.allAreSelected
        }}, n.toggle = function() {
            o.ClearErrorMessages("subredditList");
            for (var e = 0, t = n.subreddits.length; t > e; e++)
                if (!n.subreddits[e].isChecked) return void(n.allAreSelected = !1);
            n.allAreSelected = !0
        }, n.view = function() {
            for (var e = [], r = 0, i = n.subreddits.length; i > r; r++) n.subreddits[r].isChecked && e.push(n.subreddits[r].id);
            e.length ? t.path("/r/" + e.join("+")) : (o.ClearErrorMessages("subredditList"), o.AddErrorMessage("", "subredditList"))
        }, n.add = function() {
            if (o.ClearErrorMessages("subredditList"), n.err = "", n.name.match(/^[A-Za-z0-9][A-Za-z0-9_]{2,20}$/)) {
                var e;
                e: {
                    e = 0;
                    for (var t = n.subreddits.length; t > e; e++)
                        if (n.subreddits[e].id === n.name) {
                            e = !0;
                            break e
                        }
                    e = !1
                }
                if (e) n.err = "";
                else {
                    e = [n.name];
                    for (var t = 0, r = n.subreddits.length; r > t; t++) n.subreddits[t].isChecked && e.push(n.subreddits[t].id);
                    2047 < ("/subreddits/" + e.join("+")).length && (n.err = ".")
                }
            } else n.err = "";
            n.err || (e = new i(n.name, !0), n.subreddits.push(e), n.name = "")
        }, n.keyUp = function(e) {
            n.err = "", 13 === e.keyCode && n.add()
        }
    }
]), app.controller("c", ["$http", "$routeParams", "$scope",
    function(e, t, r) {
        function n(e, t, n, o) {
            console.log("success", e, t, n, o), r.comments = e[1].data.children
        }

        function o(e, t, r, n) {
            console.log("error", e, t, r, n)
        }! function() {
            console.log(t);
            var r = e.jsonp("http://www.reddit.com/r/" + t.subredditId + "/comments/" + t.threadId + ".json?jsonp=JSON_CALLBACK");
            
            r.success(n), r.error(o)
        }()
    }
]), app.directive("board", ["$log", "$timeout", "$window", "BoardEventTypes",
    function(e, t, r, n) {
   
        function o() {
            this.boardElement = this.board = null, this.boardItemElements = [], this.columnElements = [], this.columnHeights = [], this.columnWidth = 0, this.isMultiReddit = !1, this.marginBetweenColumns = 0, this.onDidAddItem = angular.noop, this.onlyShowPostsWithImages = !1, this.windowElement = angular.element(r)
        }
        return o.New = function(e, t, r, n, i, s) {            
            if (!(angular.isElement(e) && angular.isObject(t) && angular.isFunction(r) && angular.isNumber(n) && 0 / 0 !== n && angular.isNumber(i) && 0 / 0 !== i) || !0 !== s && !1 !== s) return null;
            var a = new o;
            return a.board = t, a.boardElement = e, a.boardElement.attr("id", "board"), a.columnWidth = n, a.isMultiReddit = s, a.marginBetweenColumns = i, a.onDidAddItem = r, a
        }, o.prototype.rebuildBoardElement = function() {
            var e = this.getOptimalColumnCount();
            if (e !== this.columnElements.length) {
                this.boardElement.empty(), this.columnElements = [], this.columnHeights = [];
                for (var t = 0; e > t; t++) {                    
                    var r = $(document.createElement("ul"));
                    r.attr("class", "board-column"), this.columnElements.push(r), this.columnHeights.push(0)
                }
                this.boardElement.append(this.columnElements), this.distributeItems(this.boardItemElements)
            }
        }, o.prototype.updateBoardElement = function() {
           
            for (var e = [], t = this.board.getNewlyAddedItems(), r = 0, n = t.length; n > r; r++) {
                var o = t[r];                                                                               
                (!this.onlyShowPostsWithImages || o.imagePreviewUrl) && (o = this.boardItemElementFromBoardItem(o), e.push(o), this.boardItemElements.push(o))
            }
            this.distributeItems(e)
        }, o.prototype.distributeItems = function(t) {
            
            for (var r = 0, n = t.length; n > r; r++) {        	
                var o = this.getIndexOfShortestColumn();
                if (null === o) return void e.error("Boarddirective-shortest column index equals null.");
                this.columnElements[o].append(t[r]), this.columnHeights[o] = this.columnElements[o][0].offsetHeight
            }
            this.onDidAddItem(this.isScrolledToBottom())
        }, o.prototype.getOptimalColumnCount = function() {
            return 1 + Math.max(Math.floor((this.boardElement.width() - this.columnWidth) / (this.columnWidth + this.marginBetweenColumns)), 0)
        }, o.prototype.getIndexOfShortestColumn = function() {
            var e = this.columnHeights.length;
            if (0 === e) return null;
            if (1 === e) return 0;
            for (var t = null, r = null, n = 0; e > n; n++)(null === t || this.columnHeights[n] < t) && (t = this.columnHeights[n], r = n);            
            return r
        }, o.prototype.boardItemElementFromBoardItem = function(e) {
           
            var t, r = $(document.createElement("li"));
            var url_prev = null;
            var parts = null;
            var secondParts = null;
            var hashIndex = null;
            
            if(e.threadListItem.url.indexOf("youtube.com") >= 0 ){
              var parts = e.threadListItem.url.split('v=', 2);
             
              if(parts[1] != null){
                if(parts[1].indexOf("&") >= 0){
                     secondParts =  parts[1].split('&', 2);
                     e.imagePreviewUrl = "http://img.youtube.com/vi/" + secondParts[0] + "/0.jpg"
                     url_prev = 1;
                   }
                    else{
                    e.imagePreviewUrl = "http://img.youtube.com/vi/" + parts[1] + "/0.jpg"
                    url_prev = 1;
                  }
              }
              else {
                   var parts = e.threadListItem.url.split('v%3D', 2);
                   if(parts[1] != null ){
                      secondParts =  parts[1].split('%', 2);
                      e.imagePreviewUrl = "http://img.youtube.com/vi/" + secondParts[0] + "/0.jpg"
                      url_prev = 1;
                   } 
                   else {
                     var parts = e.threadListItem.url.split('.com/', 2);
                     if(parts[1] != null ){
                        e.imagePreviewUrl = "http://img.youtube.com/vi/" + parts[1] + "/0.jpg"
                        url_prev = 1;
                   }                  
                }                      
              }    
                     
            }
            else if (e.threadListItem.url.indexOf("youtu.be") >= 0){
                var parts = e.threadListItem.url.split('v=', 2);
             
              if(parts[1] != null){
                if(parts[1].indexOf("&") >= 0){
                     secondParts =  parts[1].split('&', 2);
                     e.imagePreviewUrl = "http://img.youtube.com/vi/" + secondParts[0] + "/0.jpg"
                     url_prev = 1;
                   }
                    else{
                    e.imagePreviewUrl = "http://img.youtube.com/vi/" + parts[1] + "/0.jpg"
                    url_prev = 1;
                  }
              }
              else {
                   var parts = e.threadListItem.url.split('.be/', 2);
                   if(parts[1] != null ){
                      e.imagePreviewUrl = "http://img.youtube.com/vi/" + parts[1] + "/0.jpg"
                      url_prev = 1;
                   }                  
              }      
            
            
            }
                                
            else if(e.threadListItem.url.indexOf("gfycat.com") >= 0 && e.threadListItem.url.indexOf("giant.gfycat.com") == -1){
              var parts = e.threadListItem.url.split('.com', 2);
              if(parts[1] != null && parts[1].indexOf("#") >= 0){
                   secondParts =  parts[1].split('#', 2);
                   e.imagePreviewUrl = "http://thumbs.gfycat.com" + secondParts[0] + "-poster.jpg"
                   url_prev = 2;
              }
              else if (parts[1] != null && parts[1].indexOf(".") >= 0){
                   secondParts =  parts[1].split('.', 2);
                   e.imagePreviewUrl = "http://thumbs.gfycat.com" + secondParts[0] + "-poster.jpg"
                   url_prev = 2;
              }
              else{
                e.imagePreviewUrl = "http://thumbs.gfycat.com" + parts[1] + "-poster.jpg"
                url_prev = 2;
              }
            } 
// else if(e.threadListItem.url.indexOf("imgur.com/gallery/") >= 0){
// var parts = e.threadListItem.url.split('http://imgur.com/gallery/', 2);
// if(parts != null && parts[1] != null ){
// if( parts[1].indexOf("/") >= 0){
// var secondParts = parts[1].split('/', 2);
// e.imagePreviewUrl = "http://i.imgur.com/" + secondParts[0] + ".jpg";
// }
// else{
// e.imagePreviewUrl = "http://i.imgur.com/" + parts[1] + ".jpg";
// }
// }
// }           
            
            if(e.threadListItem.url.indexOf("reddit.com") >= 0){
        	e.threadListItem.thumbnail = "self";
            }
                        
            	
             if (e.threadListItem.title.indexOf("&amp;") >= 0){        	 
        	 e.threadListItem.title = e.threadListItem.title.replace("&amp;", "&");                    	 
            } 
                        
             
            
            if(r.attr("class", "board-item") && e.threadListItem.url.indexOf("imgur.com/a/") >= 0){
              	
        	parts = e.threadListItem.url.split('imgur.com/a/', 2);
        	if( parts != null && parts[1] != null && parts[1].indexOf("#") >= 0){
        	    secondParts = parts[1].split('#', 2);
        	    parts[1] = secondParts[0];
        	}
        	else if(parts != null && parts[1] != null && parts[1].indexOf("?") >= 0){
        	    secondParts = parts[1].split('?', 2);
        	    parts[1] = secondParts[0];
        	}
              	
              	
              	t = $(document.createElement("blockquote")), t.attr("class", "imgur-embed-pub"), t.attr("lang", "en"), 
              	t.attr("data-context", "false"), t.attr("data-id", "a/" + parts[1]), r.append(t);
              	var n = $(document.createElement("a"));
              	n.attr("href", "//imgur.com/a/" + parts[1]), n.attr("class", "board-item-image-anchor");
              	t.append(n);
              	var s = $(document.createElement("script"));
              	s.attr("async"), s.attr("src", "//s.imgur.com/min/embed.js"), s.attr("charset", "utf-8"), t.after(s);                     
            }
            
            
            else if(r.attr("class", "board-item") && e.threadListItem.url.indexOf("imgur.com/gallery") >= 0){        	
        	   
        	   
        	 parts = e.threadListItem.url.split('imgur.com/gallery/', 2);
          	 if(parts != null && parts[1] != null ){
          	     if( parts[1].indexOf("/") >= 0){
          		 secondParts = parts[1].split('/', 2);
          		 parts[1]=secondParts[0];
          	     }          	     
          	 } 
          	 
          	t = $(document.createElement("blockquote")), t.attr("class", "imgur-embed-pub"), t.attr("lang", "en"), 
          			t.attr("data-context", "false"),t.attr("data-id", parts[1]), r.append(t);
                 	var n = $(document.createElement("a"));
                 	n.attr("href", "//imgur.com/" + parts[1]), n.attr("class", "board-item-image-anchor");
                 	t.append(n);
                 	var s = $(document.createElement("script"));
                 	s.attr("async"), s.attr("src", "//s.imgur.com/min/embed.js"), s.attr("charset", "utf-8"), t.after(s);
            }
            
            else if(r.attr("class", "board-item") && e.threadListItem.url.indexOf("imgur.com") >= 0){	        	    	   
	        		
	        		parts = e.threadListItem.url.split('imgur.com/', 2);        	    	        	    
	        	    hashIndex = parts[1].split('.', 2);	        	    
	        			        		
	        		t = $(document.createElement("blockquote")), t.attr("class", "imgur-embed-pub"), t.attr("lang", "en"),
	        		t.attr("data-context", "false"),t.attr("data-id", hashIndex[0]), r.append(t);
                 	var n = $(document.createElement("a"));
                 	n.attr("href", "//imgur.com/" + hashIndex[0]), n.attr("class", "board-item-image-anchor");
                 	t.append(n);
                 	var s = $(document.createElement("script"));
                 	s.attr("async"), s.attr("src", "//s.imgur.com/min/embed.js"), s.attr("charset", "utf-8"), t.after(s);	        		                 		        
        	
        	
            }
        	            
           
            else if(r.attr("class", "board-item") && (e.threadListItem.url.indexOf("tumblr.") >= 0  
            || e.threadListItem.url.indexOf("twitter.com") >= 0 || e.threadListItem.url.indexOf("instagram.com") >= 0 
            || e.threadListItem.url.indexOf("facebook.com") >= 0 || e.threadListItem.url.indexOf("deviantart.com") >= 0 
            || e.threadListItem.url.indexOf("flickr.com") >= 0) ){
        	var n = $(document.createElement("a"));
        	n.attr("href", e.threadListItem.url), n.attr("class", "board-item-image-anchor embedly-card");
        	r.append(n);
        	var s = $(document.createElement("script"));
        	s.attr("async"), s.attr("src", "//cdn.embedly.com/widgets/platform.js"), s.attr("charset", "utf-8"), n.after(s);
            }
            
            else if (r.attr("class", "board-item"), e.imagePreviewUrl) {
                t = $(document.createElement("a")), t.attr("href", e.threadListItem.url), t.attr("class", "board-item-image-anchor"), r.append(t);
                var n = $(document.createElement("img"));
                n.attr("class", "board-item-image"), n.attr("alt", "reddit nsfw | FappityFap"), n.attr("src", e.imagePreviewUrl), t.append(n)
            } else if ("self" != e.threadListItem.thumbnail && "default" != e.threadListItem.thumbnail && url_prev == null) {
                t = $(document.createElement("a")), t.attr("href", e.threadListItem.url), t.attr("class", "board-item-image-anchor"), r.append(t);
                var n = $(document.createElement("img"));
                n.attr("class", "board-item-image"), n.attr("alt", "reddit nsfw | FappityFap"), n.attr("src", e.threadListItem.thumbnail), t.append(n)
            }           
            if (e.threadListItem.url.indexOf("redditmetrics.com") >= 0){
                e.threadListItem.title = "[REDDITMETRICS]" + " " + e.threadListItem.title;
            }          
            else if (url_prev == 2 && e.threadListItem.title.indexOf("[gif]") == -1 && e.threadListItem.title.indexOf("[GIF]") == -1){
                e.threadListItem.title =  "[GIF]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf(".gif") >= 0 && e.threadListItem.title.indexOf("[gif]") == -1 && e.threadListItem.title.indexOf("[GIF]") == -1){
                e.threadListItem.title = "[GIF]" + " " + e.threadListItem.title;
            }            
              
            else if (e.threadListItem.url.indexOf("nhentai.net/g/") >= 0 ){
               e.threadListItem.title =  "[ALBUM]" + " " + e.threadListItem.title;
            }
            
            else if (e.threadListItem.url.indexOf("dynasty-scans.com") >= 0 ){
               e.threadListItem.title =  "[ALBUM]" + " " + e.threadListItem.title;
            } 
             else if (e.threadListItem.url.indexOf("picsporner.com") >= 0 ){
               e.threadListItem.title =  "[ALBUM]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("pichunter.com") >= 0 ){
               e.threadListItem.title =  "[ALBUM]" + " " + e.threadListItem.title;
            }              
            else if (url_prev == 1){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;               
            }
            else if (e.threadListItem.url.indexOf("reddit.com/") >= 0 ){
               e.threadListItem.title = "[DISCUSSION]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("youtu.be/") >= 0 ){
               e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("eroprofile.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            
            else if (e.threadListItem.url.indexOf("pornhub.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("xhamster.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("xvideos.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("youporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("redtube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("vid.me") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("hotgoo.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("hdzog.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("video.fc2.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }                        
             else if (e.threadListItem.url.indexOf("vimeo.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
             else if (e.threadListItem.url.indexOf("vidbox.us") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xvid6.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xvids.us") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xvidz.xyz") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("webmup.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("vidshort.net") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("justbarely18.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("faptube.xyz") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("anybunny.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xnxx.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("peekvids.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xmoviesforyou.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("incestflix.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("vidx.us") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornbot.net") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("eroshare.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("kum.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("sendvid.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("xogogo.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("hdpornpack.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            
             else if (e.threadListItem.url.indexOf("hclips.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
             else if (e.threadListItem.url.indexOf("spankbang.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xcafe.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }            
             else if (e.threadListItem.url.indexOf("lickherz.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("ruleporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("hortoftheweek.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("extremetube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("mofap.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("hd21.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("tubedupe.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("letsgovids.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornbox.ch") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xvicious.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("videosdemadurasx.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornxs.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("thumbzilla.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornmansion.net") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornfun.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("eporner.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("3movs.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("4tube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("youjizz.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("hardsextube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("shooshtime.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("mrgays.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("mobypicture.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("cliphunter.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("drtuber.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            
             else if (e.threadListItem.url.indexOf("vporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("www.porn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("fapality.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("dixyporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("pornjam.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }                        
            else if (e.threadListItem.url.indexOf("porndoe.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("foxtube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("beeg.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("dailymotion.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("palimas.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("tube8.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("sextvx.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("efukt.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("playvids.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("dogfartbehindthescenes.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("pornpros.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("badjojo.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornrabbit.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("efappy.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("webmshare.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("butterwater.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("nippflix.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("streamable.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("likuoo.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("fap2that.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("femjoybabes.net") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("keezmovies.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xtube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("meneandotela.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("foxgay.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("gaytube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("juxtapoz.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("fantasti.cc") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("gayfuror.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("temagay.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("gayfire.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("pornworms.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("html5porn.net") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("supergaybros.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("slutload.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("porndig.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("videos.freeones.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("definebabe.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("playvid.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("jizzman.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornissimo.org") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("fapdu.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("madthumbs.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("trashytube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }                        
             else if (e.threadListItem.url.indexOf("tubeq.xxx/") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("tubecup.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("nofakestars.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("tnaflix.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornhd.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("brazzers.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("igowild.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("submityourflicks.com") >= 0 ){
                   e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
                }
                 else if (e.threadListItem.url.indexOf("anysex.com") >= 0 ){
                   e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
                }
             else if (e.threadListItem.url.indexOf("ghettotube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("sexvideos88.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pornoid.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("exoticfap.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("cumtwice.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("archive.org") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
            else if (e.threadListItem.url.indexOf("fetishshrine.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("pornerbros.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("xxxpornporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
// else if (e.threadListItem.url.indexOf("twitter.com") >= 0){
// e.threadListItem.title = "[TWITTER]" + " " + e.threadListItem.title;
// }
// else if (e.threadListItem.url.indexOf("tumblr.com") >= 0){
// e.threadListItem.title = "[TUMBLR.COM]" + " " + e.threadListItem.title;
// }
             // else if (e.threadListItem.url.indexOf("instagram.com") >= 0){
             // e.threadListItem.title = "[INSTAGRAM]" + " " +
		// e.threadListItem.title;
            // }
             else if (e.threadListItem.url.indexOf("gonewildvideos.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("emptyurballs.xyz") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("jockvideos.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("givemegayporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("xpee.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("dirtyonline.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }            
            else if (e.threadListItem.url.indexOf("myhotjizz.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("fantasygirlpass.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("bdsmstreak.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("pornharmony.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("liveleak.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }                         
             else if (e.threadListItem.url.indexOf("unouwantit.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }  
             else if (e.threadListItem.url.indexOf("hornbunny.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
             else if (e.threadListItem.url.indexOf("dachicky.com/videos") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             } 
             else if (e.threadListItem.url.indexOf("dachicky.com/album") >= 0){
                 e.threadListItem.title = "[ALBUM]" + " " + e.threadListItem.title;
             } 
            else if (e.threadListItem.url.indexOf("tubeshake.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("pornkay.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("sunporno.com") >= 0){
              e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
              
           else if (e.threadListItem.url.indexOf("japan-whores.com") >= 0){
              e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("catalinacruz.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("myvids.ws") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("girlsnaked.net") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("porndoo.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("nubilefilms.tv") >= 0){
                  e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("porndreamer.com") >= 0){
                  e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("empflix.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("forcedorgasmvids.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }  
             else if (e.threadListItem.url.indexOf("nonktube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("daporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }                                   
             else if (e.threadListItem.url.indexOf("xmissy.org") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("yourdailypornvideos.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("nsfwspot.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("focker.info") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("freestreamingporn.net") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("xxxfuel.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            
            else if (e.threadListItem.url.indexOf("jimmyhooligan.tv") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("extremefuse.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("hqbang.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("bdsmtu.be") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("vidhub.us") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("pornfizzle.u") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("bdsmvilla.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("vidx.me") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            } 
            else if (e.threadListItem.url.indexOf("pornenthusiast.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }           
            else if (e.threadListItem.url.indexOf("spankwire.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;  
            }
            else if (e.threadListItem.url.indexOf("porntube.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;  
            }
            else if (e.threadListItem.url.indexOf("nextdoordolls.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("http://tour.") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("pinpornstars.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("pht.sg") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
             else if (e.threadListItem.url.indexOf("boyfriendtv.com") >= 0){
                 e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
             }
            else if (e.threadListItem.url.indexOf("monstercockland.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("totally-gay.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("onlydudes.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("gayvideolife.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("sexvideogif.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
                       
            else if (e.threadListItem.url.indexOf("pornstr8.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("eviantclip.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("nuvid.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("vidble.com/album") >= 0 ){
               e.threadListItem.title =  "[ALBUM]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("vidble.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("daporn.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("studiofow.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }            
            else if (e.threadListItem.url.indexOf("xxxymovies.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("studiofow.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("nl.xhamster.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("de.xhamster") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("analtubed.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("painslave.com") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            
            
            else if (e.threadListItem.url.indexOf("24video.net") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }
            else if (e.threadListItem.url.indexOf("pornhubdeutsch.org") >= 0){
                e.threadListItem.title = "[VIDEO]" + " " + e.threadListItem.title;
            }            
            
            
            
            
             
            
            return  t = $(document.createElement("div")), 
            t.attr("class", "board-item-info"), r.prepend(t), 
            t = $(document.createElement("a")), t.attr("class", "board-item-title-anchor"), t.attr("style", "padding-top:20px;"), t.attr("href", e.threadListItem.url), 
            t.text(e.threadListItem.title), r.prepend(t), n = $(document.createElement("a")), 
            n.attr("class", "board-item-info-cell board-item-comments-anchor"),  n.attr("style", "text-align:left; padding-top:7px;"), 
            n.attr("href", "http://www.reddit.com" + e.threadListItem.commentUrl), 
            n.text(1 === e.threadListItem.commentCount ? e.threadListItem.score + " upvotes /  1 Comment" : e.threadListItem.score + 
        	    " upvotes / " + e.threadListItem.commentCount + " Comments"), 
        	    t.after(n), this.isMultiReddit && (n = $(document.createElement("a")), 
        		    n.attr("class", "board-item-info-cell board-item-info-cell-right board-item-subreddit-anchor"), 
        		    n.attr("href", "/r/" + e.threadListItem.subredditName), n.text("/r/" + e.threadListItem.subredditName), t.after(n)), r
        }, o.prototype.isScrolledToBottom = function() {
            var t = this.getIndexOfShortestColumn();
            if (null === t) return e.error(""), !1;
            var t = angular.element(this.columnElements[t]),
                t = t.offset().top + t.height(),
                r = this.windowElement.scrollTop() + this.windowElement.height();
            return t < r + Math.min(400, 100 * this.columnElements.length)
        }, {
            controller: ["$scope",
                function(e) {
                    e.onlyShowPostsWithImages = !1, e.openExternalLinksInNewTab = !1
                }
            ],
            link: function(i, s, a) {
                function d(e) {
                    if (i.openExternalLinksInNewTab && !(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)) {
                        var t = $(e.target);
                        t.hasClass("board-item-image") && (t = t.parent()), (t.hasClass("board-item-comments-anchor") || t.hasClass("board-item-image-anchor") || t.hasClass("board-item-title-anchor")) && t.attr("href") && (e.preventDefault(), r.open(t.attr("href")))
                    }
                }

                function l() {
                    g && t.cancel(g), g = t(u, 100, !1)
                }

                function u() {
                    if (h.isScrolledToBottom()) {
                        var e = i.getOnDidScrollToBottom();
                        angular.isFunction(e) && e(h.isScrolledToBottom())
                    }
                }

                function c() {
                    p && t.cancel(p), p = t(function() {
                        h.rebuildBoardElement()
                    }, 100, !1)
                }
                var h = o.New(s, i.getServiceObject(), i.getOnDidAddItem(), parseInt(a.boardColumnWidth, 10), parseInt(a.boardMarginBetweenColumns, 10), "true" === a.boardIsMultiReddit);
                if (h) {
                    h.rebuildBoardElement();
                    var m = angular.bind(h, h.updateBoardElement);
                    h.board.addEventListener(n.DID_ADD_ITEMS, m), i.$on("$destroy", function() {
                        h.board.removeEventListener(n.DID_ADD_ITEMS, m)
                    }), h.updateBoardElement(), "undefined" != typeof a.boardOnlyShowPostsWithImages && a.$observe("boardOnlyShowPostsWithImages", function(e) {
                        h.onlyShowPostsWithImages = "true" === e
                    }), "undefined" != typeof a.boardOpenExternalLinksInNewTab && a.$observe("boardOpenExternalLinksInNewTab", function(e) {
                        i.openExternalLinksInNewTab = "true" === e
                    }), h.boardElement.on("click", d), i.$on("$destroy", function() {
                        h.boardElement.off("click", d)
                    });
                    var g, f = angular.element(r);
                    f.on("scroll", l), i.$on("$destroy", function() {
                        f.off("scroll", l)
                    });
                    var p, f = angular.element(r);
                    f.on("resize", c), i.$on("$destroy", function() {
                        f.off("resize", c)
                    })
                } else e.error(".")
            },
            restrict: "EA",
            scope: {
                getOnDidAddItem: "&boardOnDidAddItem",
                getOnDidScrollToBottom: "&boardOnDidScrollToBottom",
                getServiceObject: "&boardServiceObject"
            }
        }
    }
]), app.factory("BoardEventTypes", function() {
    var e = {
        DID_ADD_ITEMS: "DID_ADD_ITEMS",
        isEventType: function(t) {
            return !!e[t]
        }
    };
    return e
}), app.factory("BoardItem", function() {
    function e() {	
        this.imagePreviewUrl = this.imageFullSizeUrl = "", this.threadListItem = null
    }
    return e.New = function(t, r, n) {	        
	
	if (!t || n && !angular.isString(n) || r && !angular.isString(r)) return null;	
	var o = new e;
     
        return o.imageFullSizeUrl = n || "", o.imagePreviewUrl = r || "", o.threadListItem = t || null, o
    }, e
}), app.factory("Board", ["$log", "BoardEventTypes",
    function(e, t) {
        function r() {
            this.items = [], this.listeners = {}, this.newlyAddedItems = []
        }
        return r.New = function() {
            return new r
        }, r.prototype.addItems = function(e) {
            this.items = this.items.concat(e), this.newlyAddedItems = this.newlyAddedItems.concat(e), this.fireEvent(t.DID_ADD_ITEMS)
        }, r.prototype.getNewlyAddedItems = function() {
            return this.newlyAddedItems.splice(0, this.newlyAddedItems.length)
        }, r.prototype.addEventListener = function(e, r) {
            t.isEventType(e) && angular.isFunction(r) && (this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(r))
        }, r.prototype.removeEventListener = function(e, t) {
            if (this.listeners[e] && angular.isFunction(t))
                for (var r = 0, n = this.listeners[e].length; n > r; r++)
                    if (this.listeners[e][r] === t) {
                        this.listeners[e].splice(r, 1);
                        break
                    }
        }, r.prototype.fireEvent = function(e) {
            if (e = this.listeners[e]) {
		for (var t = 0, r = e.length; r > t; t++) {e[t]()
        }}
	    }, r
    }
]), app.controller("d", ["$http", "$location", "$log", "$rootScope", "$route", "$routeParams", "$scope", "$timeout", "$window", "subredditName", "Board", "BoardItem", "LocalStorageSRVC", "Settings", "ThreadList", "threadProcessor",
    function(e, t, r, n, o, i, s, a, d, l, u, c, h, m, g, f) {
        function p() {
            D = Date.now(), S = "hot";
            var t = e.jsonp(L + "/r/" + w.join("+") + "/" + S + ".json?jsonp=JSON_CALLBACK&after=" + E + "&limit=" + T);                         
            
            t.success(b), t.error(v)
        }

        function b(e) {
            $ = !1, e = g.fromRedditThreadList(e) || new g;
            for (var t = e.items, r = !1, n = 0, o = t.length; o > n; n++) f.addToQueue(t[n], I) && (r = !0);
            E = e.lastThreadId, C = !E, r || ($ ? s.loadMoreButtonText = O.LOADING : s.board.items.length === f.threadDict.length && (s.loadMoreButtonText = C ? f.threadDict.length ? O.REACHED_END : O.NO_THREADS : O.LOAD_MORE))
        }

        function I(e, t, r) {
            (e = c.New(e, t, r)) && s.board.addItems([e])
        }

        function v(e, t, n, o) {
            r.info("ThreadList-retrieving from Reddit fail.", e, t, n, o), $ = !1, s.loadMoreButtonText = O.ERROR
        }
        if (m.setDefaults(), f.clear(), d = t.path(), "/r" === d || "/r/" === d) t.path("/");
        else {
            var y = "/" === d || "/controversial" === d || "/new" === d || "/rising" === d || "/top" === d;
            if (y || d.match(/^\/r\//)) {
                var w = y ? l : i.subredditIds.split("+");
                s.isMultiReddit = 1 < w.length || "all" === w[0], n.pageTitle = y ? "" : "/r/" + w.join("+") + " - ", n = {
                    controversial: !0,
                    "new": !0,
                    rising: !0,
                    top: !0
                };
                var S = (y ? i.subredditIds : i.section) || "";
                if (i.section && !n[i.section]) u = "/r/" + w.join("+"), r.info("", i.section, u), t.path(u);
                else {
                    var L = "http://www.reddit.com",
                        E = "",
                        T = 25,
                        $ = !1,
                        D = 0,
                        C = !1,
                        O = {
                            ERROR: "Oops.. Click to Try Again.",
                            LOAD_MORE: "Hold on. Loading...",
                            LOADING: "Hold on. Loading...",
                            NO_THREADS: "",
                            REACHED_END: "This is the end.."
                        };
                    s.loadMoreButtonText = O.LOADING, s.openExternalLinksInNewTab = "true" === h.get(m.keys.O), s.onlyShowPostsWithImages = "true" === h.get(m.keys.I), s.retrieveThreadsFromReddit = function() {
                        if ($){r.info(".");}else if (C){r.info("");}else {
                            s.loadMoreButtonText = O.LOADING;
                            var e = Date.now() - D,
                                t = e > 2e3 ? 0 : 2e3 - e;
                            2e3 > e && r.info("", 2e3, t), $ = !0, a(p, t)
                        }
                    }, s.selectSection = function(e) {
                        var r = "new";
                        switch (e = 1) {
                            case 0:
                                r = "";
                                break;
                            case 1:
                                r = "new";
                                break;
                            case 2:
                                r = "rising";
                                break;
                            case 3:
                                r = "controversial";
                                break;
                            case 4:
                                r = "top"
                        }
                        r === S ? o.reload() : (e = (y ? "" : "/r/" + w.join("+")) + "/" + r, t.path(e))
                    }, s.loadMoreToFillPage = function(e) {
                        !e || !s.board.items.length || s.board.items.length < f.threadDict.length - 1 || s.retrieveThreadsFromReddit()
                    }, s.select, Subreddits = function() {
                        t.path("/subreddits/" + w.join("+"))
                    }, s.board = u.New(), s.board ? s.retrieveThreadsFromReddit() : r.error("")
                }
            } else u = i.subredditIds ? "/r/" + i.subredditIds : "/", t.path(u)
        }
    }
]), app.factory("ThreadListItem", function() {
    function e() {
        this.author = "", this.commentCount = 0, this.score = 0, this.thumbnail = "", this.commentUrl = "", this.downvotes = this.creationTime = 0, this.id = "", this.isNsfw = !1, this.reportCount = 0, this.title = this.subredditName = this.subredditId = "", this.upvotes = 0, this.url = ""
    }
    return e.fromRedditThreadListItem = function(t) {
        if (!angular.isObject(t) || !angular.isObject(t.data)) return !1;
        if (t = t.data, !(angular.isString(t.author) && angular.isNumber(t.num_comments) && 0 / 0 !== t.num_comments && angular.isString(t.permalink) && angular.isNumber(t.created_utc) && 0 / 0 !== t.created_utc && angular.isNumber(t.downs) && 0 / 0 !== t.downs && angular.isString(t.id) && (!0 === t.over_18 || !1 === t.over_18) && (angular.isNumber(t.num_reports) || null === t.num_reports) && 0 / 0 !== t.num_reports && angular.isString(t.subreddit_id) && angular.isString(t.subreddit) && angular.isString(t.title) && angular.isNumber(t.ups) && 0 / 0 !== t.ups && angular.isString(t.url))) return !1;
        
        // Malware && Spam Check - START //
        var urlList = ["shouji56","loans", "alternatingfocus","gulermak","xxxpicsandgifs","miautty",
                       "minisri","pinooo","rabinca","raonicaha","pikig","milicac","aboygym","milunkar",
                       "clubaustinkincaid","catalinacruz","fantasygirlpass","xxxfuel","tour.","pinpornstars",
                       "imgchip","imgfile","tiarota","neboderica","soskish","ogymnews","naughtymalez","blastinggreen",
                       "inishila","lexvoip","kubilash","timesof","theimage.gallery","idolsnap","impek","xxxhotgirls",
                       "lo.pe","dentalalt","dz.gy","bankloans","landagain","realtor","feppcentral","dirtysexyteens","4yimgs",
                       "mislika","inamba","telugudubsm","jobson","motherlessmedia","optochips","usebin","smutty.so","cjpl",
                       "protelecon","winminhas","jyeads","falcohols","searchsync","pwtcity","finixp","dattein","gemin",
                       "smalllinks","sexyjar","imgaa","psamson","gsmcamp","ryane","hansalbers","ftpwap","lbanet","likecrazy",
                       "xxxymovies","hclips","therlook","terminute","shopify","moviegirl","fbcdn","scontent","wordex",
                       "getnutz","xembong","hesmixology","newcareer","hvalu","kop.pl","blackself","imgcloud","imagedunk","lajunta",
                       "ip6.si","jpgbank","kycrew","asenalx","bertbetsbits","im9.eu","lactation-fetish","ultimedia","winryese",
                       "tistrf", "tapmusic","chloefan","dividuals","annex","picnvideos","drtuber","japan-whores","symbolzone","sboxlines",
                       "mysexcam", "sexcureson","myvidste", "media.tumblr", "img.rule34", "siennama","sayxc", "bloginfo"];       
         
        var arrCounter = 0;
        for(arrCounter; arrCounter < urlList.length; arrCounter++){
            if(t.url != null && t.url.indexOf(urlList[arrCounter]) >= 0 ){
        	 return false;        	 
            }
        }
 	// Malware && Spam Check - END
         
        
        
        var r = new e;                

        
        return r.author = t.author, r.thumbnail = t.thumbnail, r.score = t.score, r.commentCount = t.num_comments, r.commentUrl = t.permalink, r.creationTime = t.created_utc, r.downvotes = t.downs, r.id = t.id, r.isNsfw = t.over_18, r.reportCount = t.num_reports || 0, r.subredditId = t.subreddit_id, r.subredditName = t.subreddit, r.title = t.title, r.upvotes = t.ups, r.url = t.url, r
    }, e
}), app.factory("ThreadList", ["$log", "ThreadListItem",
    function(e, t) {
    
        function r() {
            this.items = [], this.lastThreadId = ""
        }
        return r.fromRedditThreadList = function(n) {
            if (!angular.isObject(n) || !angular.isObject(n.data) || !angular.isArray(n.data.children)) return !1;
            for (var o = new r, i = n.data.children, s = 0, a = i.length; a > s; s++) {
        	
        	var d = t.fromRedditThreadListItem(i[s]);                                                          
               
                d ? o.items.push(d) : e.warn("", i[s])
    	}
            return o.lastThreadId = n.data.after || "", o
        }, r
    }
]), app.provider("threadProcessor", function() {
    function e(e) {
        this.threadDict = new n, this.queue = new t, this.threadsBeingProcessedCount = 0, this.runningRequests = [], this.$timeout = e
    }

    function t() {
        this.queueItems = [], this.length = 0
    }

    function r(e, t) {
        this.thread = e, this.callback = t       
    }

    function n() {
        this.dict = {}, this.length = 0
    }
    var o = 2;
    this.setImgurClientId = function() {}, this.setMaxThreadsToProcessSimultaneously = function(e) {
        o = e
    }, this.$get = ["$timeout",
        function(t) {
            return new e(t)
        }
    ], e.prototype.clear = function() {
        this.cancelRequests(), this.threadDict = new n, this.queue = new t
    }, e.prototype.addToQueue = function(e, t) {
        if (this.threadDict.exists(e.id)) return !1;
        var n = new r(e, t);
        return this.queue.addItem(n), this.threadDict.add(e.id), this.processThreads(), !0
    }, e.prototype.processThreads = function() {
        for (; 0 < this.queue.length && this.threadsBeingProcessedCount < o;) {
            this.threadsBeingProcessedCount++;
           
            var e = this.queue.removeItemByIndex(0),
                t = e.thread.url,
                r = t.match(/^(https?):\/\/(?:(?:i|m)\.)?imgur\.com\/([a-zA-Z0-9]+)(\.[a-zA-Z0-9]+)?/);
            if (r && "a" === r[2] && "undefined" == typeof r[3]) this.handleNonImageSuccess(e);
            else if (r) {
                var n = $(new Image),
                    i = angular.bind(this, this.handleImgurImageLoadError),
                    s = angular.bind(this, this.handleImgurImageLoadSuccess),
                    a = this.$timeout(angular.bind(this, function() {
                        n.off(), this.handleNonImageSuccess(e)
                    }), 3e4, !1);
                n.on("error", null, {
                    queueItem: e,
                    timeout: a
                }, i), n.on("load", null, {
                    queueItem: e,
                    timeout: a,
                    image: n[0]
                }, s), t = "", t = r[3] && ".gif" === r[3] ? r[1] + "://i.imgur.com/" + r[2] + ".gif" : r[3] && ".gif" !== r[3] ? r[1] + "://i.imgur.com/" + r[2] + "l" + r[3] : r[1] + "://i.imgur.com/" + r[2] + "l.jpg", n[0].src = t
            } else t.match(/\.(?:gif|jpeg|jpg|png)$/i) ? (n = $(new Image), i = angular.bind(this, this.handleImageLoadError), s = angular.bind(this, this.handleImageLoadSuccess), a = this.$timeout(angular.bind(this, function() {
                n.off(), this.handleNonImageSuccess(e)
            }), 3e4, !1), n.on("error", null, {
                queueItem: e,
                timeout: a
            }, i), n.on("load", null, {
                queueItem: e,
                timeout: a,
                image: n[0]
            }, s), n[0].src = t) : this.handleNonImageSuccess(e)
        }
    }, e.prototype.handleImgurImageLoadError = function(e) {
        this.$timeout.cancel(e.data.timeout), e.data.queueItem.callback(e.data.queueItem.thread, ""), this.threadsBeingProcessedCount--, this.processThreads()
    }, e.prototype.handleImgurImageLoadSuccess = function(e) {
        this.$timeout.cancel(e.data.timeout), 161 === e.data.image.width && 81 === e.data.image.height ? this.handleNonImageSuccess(e.data.queueItem) : (e.data.queueItem.callback(e.data.queueItem.thread, e.data.image.src), this.threadsBeingProcessedCount--, this.processThreads())
    }, e.prototype.handleImageLoadError = function(e) {
        this.$timeout.cancel(e.data.timeout), e.data.queueItem.callback(e.data.queueItem.thread, ""), this.threadsBeingProcessedCount--, this.processThreads()
    }, e.prototype.handleImageLoadSuccess = function(e) {
        this.$timeout.cancel(e.data.timeout), e.data.queueItem.callback(e.data.queueItem.thread, e.data.image.src), this.threadsBeingProcessedCount--, this.processThreads()
    }, e.prototype.handleNonImageSuccess = function(e) {
        e.callback(e.thread, ""), this.threadsBeingProcessedCount--, this.processThreads()
    }, e.prototype.cancelRequests = function() {
        for (var e = 0, t = this.runningRequests.length; t > e; e++) {
	    ;
	}
    }, t.prototype.addItem = function(e) {
	
        this.queueItems.push(e), this.length++
    }, t.prototype.removeItemByIndex = function(e) {
        return 0 === this.queueItems.length ? !1 : (this.length--, this.queueItems.splice(e, 1)[0])
    }, n.prototype.add = function(e) {
        this.dict[e] = !0, this.length++
    }, n.prototype.exists = function(e) {
        return !!this.dict[e]
    }
}), app.config(["$locationProvider",
    function(e) {
        e.html5Mode(!1)
    }
]).config(["$routeProvider",
    function(e) {
        e.when("/donate", {
            controller: "a",
            template: "<h1>Donate</h1>"
        }).when("/feed", {
            controller: "b",
            template: "<h1>Feed</h1>"
        }).when("/r/:subredditId", {
            controller: "c",
            template: "<h1></h1>"
        }).when("/r/:subIds", {
            controller: "d",
            template: "</button></button>"
        }).when("/settin", {
            controller: "s",
            template: "<h1></h1>"
        }).when("/subred/:subred", {
            controller: "e",
            template: "<h1></h1>"
        }).when("/:subredditIds?", {
            controller: "d",
            template: '<div class="panel panel-default" align=center style="background-color: #000000;"><ul class="inline-list"><li class="inline-list-item"><div button-bar button-bar-callback="selectSection" button-bar-labels=\'["Hot", "New", "Rising", "Controversial", "Top"]\'></div></li></ul></div><div board board-column-width="320" board-is-multi-reddit="{{isMultiReddit}}" board-margin-between-columns="10" board-on-did-add-item="loadMoreToFillPage" board-on-did-scroll-to-bottom="loadMoreToFillPage" board-only-show-posts-with-images="{{onlyShowPostsWithImages}}" board-open-external-links-in-new-tab="{{openExternalLinksInNewTab}}" board-service-object="board"></div><div id="board-controls"><button class="animated infinite flash" ng-click="retrieveThreadsFromReddit()">{{loadMoreButtonText}}</button></div>'
        }).otherwise({
            redirectTo: "/"
        })
    }
]).config(["LocalStorageSRVCProvider",
    function(e) {
        e.setPrefix("FappityFap")
    }
]).config(["threadProcessorProvider",
    function(e) {
        e.setImgurClientId("2531d8ee8421681")
    }
]);

}


function navbarinit()
{

    $('#ul-navbar')
	    .html(
		    '<div class="panel-group" id="accordion1"> <div class="panel panel-default"> <div id="fetish-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link9" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link9F()"> Fetish WTF & Gore<br/> </a> </h4> </div><div id="collapse9" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul><li id="BDSMGW"><a href="bdsm.html" target="_self">r/BDSM_GW</a></li><li id="Bondage"><a href="Bondage.html" target="_self">r/Bondage</a></li><li id="collared"><a href="collared.html" target="_self">r/Collared</a></li><li id="cumfetish"><a href="cumfetish.html" target="_self">r/CumFetish</a></li><li id="distension"><a href="distension.html" target="_self">r/Distension</a></li><li id="facesitting"><a href="facesitting.html" target="_self">r/FaceSitting</a></li><li id="felching"><a href="felching.html" target="_self">r/Felching</a></li><li id="forcedorgasms"><a href="forcedorgasms.html" target="_self">r/ForcedOrgasms</a></li><li id="Pee"><a href="Pee.html" target="_self">r/Pee</a></li><li id="PreggoPorn"><a href="PreggoPorn.html" target="_self">r/PreggoPorn</a></li><li id="ProlapseVille"><a href="ProlapseVille.html" target="_self">r/ProlapseVille</a></li><li id="Spanking"><a href="Spanking.html" target="_self">r/Spanking</a></li><br><li id="buttplug"><a href="Buttplug.html" target="_self">r/Buttplug</a></li><li id="ButtSharpies"><a href="ButtSharpies.html" target="_self">r/ButtSharpies</a></li><li id="Objects"><a href="Objects.html" target="_self">r/Objects</a></li><li id="tailplug"><a href="tailplug.html" target="_self">r/TailPlug</a></li></ul></div><div class="col-md-6 col-xs-6"><ul> <li id="NSFW_WTF"><a href="nsfw_wtf.html" target="_self">r/NSFW_WTF</a></li><li id="VintageSmut"><a href="VintageSmut.html" target="_self">r/VintageSmut</a></li><li id="WoahPoon"><a href="WoahPoon.html" target="_self">r/WoahPoon</a></li><li id="WouldTotallyFuck"><a href="WouldTotallyFuck.html" target="_self">r/WouldTotallyFuck</a></li><br><li id="AnimalsKillingPeople"><a href="AnimalsKillingPeople.html" target="_self">r/AnimalsKillingPeople</a></li><li id="awwwtf"><a href="awwwtf.html" target="_self">r/AwwwWTF</a></li><li id="NatureISscary"><a href="NatureISscary.html" target="_self">r/NatureIsScary</a></li><br><li id="yesyesyesyesno"><a href="yesyesyesyesno.html" target="_self">r/YesYesYesNo!</a></li><li id="nonononoyes"><a href="nonononoyes.html" target="_self">r/NoNoNoYes!</a></li><li id="RussiansOnTheInternet"><a href="RussiansOnTheInternet.html" target="_self">r/RussiansOnTheNet</a></li><br><li id="carcrash"><a href="carcrash.html" target="_self">r/CarCrash</a></li><li id="creepy"><a href="creepy.html" target="_self">r/Creepy</a></li><li id="ScaredShitless"><a href="scaredshitless.html" target="_self">r/ScaredShitless</a></li><li id="shitpeoplesurvive"><a href="shitpeoplesurvive.html" target="_self">r/ShitPeopleSurvive</a></li><li id="watchpeopledie"><a href="watchpeopledie.html" target="_self">r/WatchPeopleDie</a></li><li id="WTF"><a href="WTF.html" target="_self">r/WTF</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="video-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link1" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion1" href="javascript: void(0);" onclick="link1F()"> XXX Videos & Gifs<br/> </a> </h4> </div><div id="collapse1" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"> <ul> <li id="AmateurPorn"><a href="AmateurPorn.html" target="_self">r/AmateurPorn</a></li><li id="homemadexxx"><a href="homemadexxx.html" target="_self">r/HomemadeXXX</a></li><li id="YAYamateurs"><a href="YAYamateurs.html" target="_self">r/YAYamateurs</a></li><br><li id="BlowjobGifs"><a href="BlowjobGifs.html" target="_self">r/BlowjobGifs</a></li><li id="BoobGifs"><a href="BoobGifs.html" target="_self">r/BoobGifs</a></li><li id="CumshotGifs"><a href="CumshotGifs.html" target="_self">r/CumShotGifs</a></li><li id="OralCreampie"><a href="OralCreampie.html" target="_self">r/OralCreampie</a></li><br><li id="60fpsporn"><a href="60fpsporn.html">r/60fpsPorn</a></li><li id="NSFW_HTML5"><a href="NSFW_HTML5.html" target="_self">r/NSFW_HTML5</a></li><li id="NSFW_GFY"><a href="NSFW_GFY.html" target="_self">r/NSFW_GFY</a></li><li id="nsfw_gifs"><a href="nsfw_gifs.html" target="_self">r/NSFW_Gifs</a></li><br><li id="ArabPorn"><a href="ArabPorn.html" target="_self">r/ArabPorn</a></li><li id="AsianPorn"><a href="AsianPorn.html" target="_self">r/AsianPorn</a></li><li id="IndianPorn"><a href="IndianPorn.html" target="_self">r/IndianPorn</a></li></ul></div><div class="col-md-6 col-xs-6"> <ul> <li id="CuteModeSlutMode"><a href="CuteModeSlutMode.html">r/CuteModeSlutMode</a></li><li id="holdthemoan"><a href="holdthemoan.html" target="_self">r/HoldTheMoan</a></li><li id="WatchItForThePlot"><a href="WatchItForThePlot.html" target="_self">r/WatchItForThePlot</a></li><br><li id="BorednIgnored"><a href="BorednIgnored.html" target="_self">r/BorednIgnored</a></li><li id="cumvids"><a href="cumvids.html" target="_self">r/CumVids</a></li><li id="Exxxtras"><a href="Exxxtras.html" target="_self">r/Exxxtras</a></li><li id="freexxxvideos"><a href="freexxxvideos.html" target="_self">r/FreeXXXVideos</a></li><li id="hugeboobvideos"><a href="hugeboobvideos.html" target="_self">r/HugeBoobVideos</a></li><li id="interracial_vids"><a href="interracial_vids.html" target="_self">r/InterracialPorn</a></li><li id="massivecockvids"><a href="massivecockvids.html" target="_self">r/MassiveCockVids</a></li><li id="milfvideos"><a href="milfvideos.html" target="_self">r/MilfVideos</a></li><li id="nsfw_videos"><a href="nsfw_videos.html" target="_self">r/NSFW_Videos</a></li><li id="PassionX"><a href="PassionX.html" target="_self">r/PassionX</a></li><li id="pornvids"><a href="pornvids.html" target="_self">r/PornVids</a></li><li id="POVPornVids"><a href="POVPornVids.html" target="_self">r/POVPornVids</a></li><li id="UncutPorn"><a href="UncutPorn.html" target="_self">r/UncutPorn</a></li></ul> </div></div></div></div></div><div class="panel panel-default"> <div id="general-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link3" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link3F()"> Tits Ass Pussy Cum<br/> </a> </h4> </div><div id="collapse3" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul> <li id="anal"><a href="anal.html" target="_self">r/Anal</a></li><li id="ass"><a href="ass.html" target="_self">r/Ass</a></li><li id="Asstastic"><a href="asstastic.html" target="_self">r/Asstastic</a></li><li id="Ass_to_Ass"><a href="Ass_to_Ass.html" target="_self">r/Ass_to_Ass</a></li><li id="assinthong"><a href="assinthong.html" target="_self">r/AssInThong</a></li><li id="bigasses"><a href="bigasses.html" target="_self">r/BigAsses</a></li><li id="datgap"><a href="datgap.html" target="_self">r/DatGap</a></li><li id="facedownassup"><a href="facedownassup.html" target="_self">r/FaceDownAssUp</a></li><li id="pawg"><a href="pawg.html" target="_self">r/Pawg</a></li><br><li id="Blowjobs"><a href="Blowjobs.html" target="_self">r/Blowjobs</a></li><li id="blowjobsandwich"><a href="blowjobsandwich.html" target="_self">r/BJSandwich</a></li><li id="LickingDick"><a href="lickingdick.html" target="_self">r/LickingDick</a></li><br><li id="O_Faces"><a href="O_Faces.html" target="_self">r/O_Faces</a></li><li id="nsfw"><a href="nsfw.html" target="_self">r/NSFW</a></li><li id="nsfwhardcore"><a href="nsfwhardcore.html" target="_self">r/NSFWHardcore</a></li><br><li id="Boobies"><a href="Boobies.html" target="_self">r/Boobies</a></li><li id="boltedontits"><a href="BoltedOnTits.html" target="_self">r/BoltedOnTits</a></li><li id="hugeboobs"><a href="hugeboobs.html" target="_self">r/HugeBoobs</a></li><li id="pokies"><a href="pokies.html" target="_self">r/Pokies</a></li><li id="stacked"><a href="Stacked.html" target="_self">r/Stacked</a></li><li id="TinyTits"><a href="TinyTits.html" target="_self">r/TinyTits</a></li><li id="TittyDrop"><a href="TittyDrop.html" target="_self">r/TittyDrop</a></li><br><li id="creampies"><a href="creampies.html" target="_self">r/CreamPies</a></li><li id="cumsluts"><a href="cumsluts.html" target="_self">r/CumSluts</a></li><li id="GirlsFinishingTheJob"><a href="GirlsFinishingTheJob.html">r/FinishingTheJob</a></li><li id="thickloads"><a href="thickloads.html" target="_self">r/ThickLoads</a></li></ul></div><div class="col-md-6 col-xs-6"><ul> <li id="Amateur"><a href="Amateur.html" target="_self">r/Amateur</a></li><li id="ChangingRooms"><a href="ChangingRooms.html" target="_self">r/ChangingRooms</a></li><li id="RealGirls"><a href="RealGirls.html" target="_self">r/RealGirls</a></li><li id="randomsexiness"><a href="randomsexiness.html" target="_self">r/RandomSexiness</a></li><li id="Unashamed"><a href="Unashamed.html" target="_self">r/Unashamed</a></li><br><li id="grool"><a href="grool.html" target="_self">r/Grool</a></li><li id="HairyPussy"><a href=HairyPussy.html target="_self">r/HairyPussy</a></li><li id="Innie"><a href=Innie.html target="_self">r/Innie</a></li><li id="Jilling"><a href="jilling.html" target="_self">r/Jilling</a></li><li id="LipsThatGrip"><a href="LipsThatGrip.html" target="_self">r/LipsThatGrip</a></li><li id="pussy"><a href="pussy.html" target="_self">r/Pussy</a></li><li id="rearpussy"><a href="rearpussy.html" target="_self">r/RearPussy</a></li><li id="squirting"><a href="squirting.html" target="_self">r/Squirting</a></li><br><li id="lesbians"><a href="lesbians.html" target="_self">r/Lesbians</a></li><li id="scissoring"><a href="scissoring.html" target="_self">r/Scissoring</a></li><li id="StraightGirlsPlaying"><a href="StraightGirlsPlaying.html" target="_self">r/StraightGirlsPlaying</a></li><br><li id="bikinis"><a href="bikinis.html" target="_self">r/Bikinis</a></li><li id="bikinibridge"><a href="bikinibridge.html" target="_self">r/BikiniBridge</a></li><li id="downblouse"><a href="downblouse.html" target="_self">r/DownBlouse</a></li><li id="DownBra"><a href="DownBra.html" target="_self">r/DownBra</a></li><li id="girlsinyogapants"><a href="girlsinyogapants.html" target="_self">r/GirlsInYogaPants</a></li><li id="lingerie"><a href="lingerie.html" target="_self">r/Lingerie</a></li><li id="OnOff"><a href="OnOff.html" target="_self">r/OnOff</a></li><li id="sexygirlsinjeans"><a href="SexyGirlsInJeans.html" target="_self">r/SexyGirlsInJeans</a></li><li id="ShortShorts"><a href="ShortShorts.html" target="_self">r/ShortShorts</a></li><li id="stockings"><a href="stockings.html" target="_self">r/Stockings</a></li><li id="tightdresses"><a href="tightdresses.html" target="_self">r/TightDresses</a></li><li id="Upskirt"><a href="Upskirt.html" target="_self">r/UpSkirt</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="bodytype-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link4" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link4F()"> Petite to BBW<br/> </a> </h4> </div><div id="collapse4" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul><li id="petite"><a href="petite.html" target="_self">r/Petite</a></li><li id="bustyPetite"><a href="bustyPetite.html" target="_self">r/BustyPetite</a></li><li id="dirtysmall"><a href="dirtysmall.html" target="_self">r/DirtySmall</a></li><li id="xsmallgirls"><a href="xsmallgirls.html" target="_self">r/XSmallgirls</a></li><br><li id="SkinnyWithAbs"><a href="SkinnyWithAbs.html" target="_self">r/SkinnyWithAbs</a></li><li id="skinnytail"><a href="skinnytail.html" target="_self">r/SkinnyTail</a></li><li id="slimgirls"><a href="slimgirls.html" target="_self">r/SlimGirls</a></li><li id="thinspo"><a href="thinspo.html" target="_self">r/Thinspo</a></li></ul></div><div class="col-md-6 col-xs-6"><ul> <li id="CrossFitGirls"><a href="CrossFitGirls.html" target="_self">r/CrossFitGirls</a></li><li id="fitgirls"><a href="fitgirls.html" target="_self">r/FitGirls</a></li><li id="FlexiGirls"><a href="FlexiGirls.html" target="_self">r/FlexiGirls</a></li><li id="HardBodies"><a href="hardbodies.html" target="_self">r/HardBodies</a></li><br><li id="Chubby"><a href="Chubby.html" target="_self">r/Chubby</a></li><li id="curvy"><a href="curvy.html" target="_self">r/Curvy</a></li><li id="thick"><a href="thick.html" target="_self">r/Thick</a></li><li id="ThickThighs"><a href="ThickThighs.html" target="_self">r/ThickThighs</a></li><li id="voluptuous"><a href="voluptuous.html" target="_self">r/Voluptuous</a></li><li id="BBW"><a href="BBW.html" target="_self">r/BBW</a></li><li id="bbwbikinis"><a href="bbwbikinis.html" target="_self">r/BBW_Bikinis</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="teen-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link5" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link5F()"> Teens to Gilfs<br/> </a> </h4> </div><div id="collapse5" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul> <li id="barelylegalteens"><a href="barelylegalteens.html" target="_self">r/BarelyLegalTeens</a></li><li id="Just18"><a href="Just18.html" target="_self">r/Just18</a></li><li id="LegalTeens"><a href="LegalTeens.html" target="_self">r/LegalTeens</a></li><li id="LegalTeensXXX"><a href="LegalTeensXXX.html" target="_self">r/LegalTeensXXX</a></li><li id="youngporn"><a href="youngporn.html" target="_self">r/YoungPorn</a></li><br><li id="DrunkGirls"><a href="DrunkGirls.html" target="_self">r/DrunkGirls</a></li><li id="FestivalSluts"><a href="FestivalSluts.html" target="_self">r/FestivalSluts</a></li><li id="SceneGirls"><a href="SceneGirls.html" target="_self">r/SceneGirls</a></li></ul></div><div class="col-md-6 col-xs-6"><ul><li id="CollegeAmateurs"><a href="CollegeAmateurs.html" target="_self">r/CollegeAmateurs</a></li><li id="CollegeInitiation"><a href="CollegeInitiation.html" target="_self">r/CollegeInitiation</a></li><li id="collegensfw"><a href="collegensfw.html" target="_self">r/CollegeNSFW</a></li><li id="collegesluts"><a href="collegesluts.html" target="_self">r/CollegeSluts</a></li><br><li id="cougars"><a href="cougars.html" target="_self">r/Cougars</a></li><li id="gilf"><a href="gilf.html" target="_self">r/Gilf</a></li><li id="milf"><a href="milf.html" target="_self">r/Milf</a></li><li id="realolderwomen"><a href="realolderwomen.html" target="_self">r/RealOlderWomen</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="gonewild-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link2" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link2F()"> Gone Wild<br/> </a> </h4> </div><div id="collapse2" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul> <li id="gonewild"><a href="gonewild.html" target="_self">r/GoneWild</a></li><li id="GWCouples"><a href="GWCouples.html" target="_self">r/GWCouples</a></li><li id="Gonewild_GIFS"><a href="Gonewild_GIFS.html" target="_self">r/Gonewild_GIFS</a></li><li id="GoneWildTube"><a href="GoneWildTube.html" target="_self">r/GoneWildTube</a></li><br><li id="PetiteGoneWild"><a href="PetiteGoneWild.html" target="_self">r/PetiteGoneWild</a></li><li id="gonewildcurvy"><a href="gonewildcurvy.html" target="_self">r/GoneWildCurvy</a></li><li id="GoneWildPlus"><a href="GoneWildPlus.html" target="_self">r/GoneWildPlus</a></li><li id="BBWGW"><a href="BBWGW.html" target="_self">r/BBWGW</a></li><br><li id="AnalGW"><a href="AnalGW.html" target="_self">r/AnalGW</a></li><li id="assholegonewild"><a href="assholegonewild.html" target="_self">r/AssholeGoneWild</a></li><li id="BigBoobsGW"><a href="BigBoobsGW.html" target="_self">r/BigBoobsGW</a></li><li id="gwcumsluts"><a href="gwcumsluts.html" target="_self">r/GWcumsluts</a></li><li id="GoneWildHairy"><a href="GoneWildHairy.html" target="_self">r/GoneWildHairy</a></li><li id="LabiaGW"><a href="LabiaGW.html" target="_self">r/LabiaGW</a></li></ul> </div><div class="col-md-6 col-xs-6"> <ul> <li id="gwcosplay"><a href="gwcosplay.html" target="_self">r/GWcosplay</a></li><li id="GoneMild"><a href="GoneMild.html" target="_self">r/GoneMild</a></li><li id="GWNerdy"><a href="GWNerdy.html" target="_self">r/GWNerdy</a></li><li id="MilitaryGoneWild"><a href="MilitaryGoneWild.html" target="_self">r/MilitaryGoneWild</a></li><br><li id="LeggingsGoneWild"><a href="LeggingsGoneWild.html" target="_self">r/LeggingsGoneWild</a></li><li id="LingerieGW"><a href="LingerieGW.html" target="_self">r/LingerieGW</a></li><li id="UnderwearGW"><a href="UnderwearGW.html" target="_self">r/UnderwearGW</a></li><br><li id="AsiansGoneWild"><a href="AsiansGoneWild.html" target="_self">r/AsiansGoneWild</a></li><li id="DesiMilfsGW"><a href="DesiMilfsGW.html" target="_self">r/DesiMilfsGW</a></li><li id="GoneWildColor"><a href="GoneWildColor.html" target="_self">r/GoneWildColor</a></li><li id="IndiansGoneWild"><a href="IndiansGoneWild.html" target="_self">r/IndiansGoneWild</a></li><li id="LatinasGW"><a href="LatinasGW.html" target="_self">r/LatinasGW</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="babes-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link7" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link7F()"> Color Faith Flag <br/> </a> </h4> </div><div id="collapse7" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul><li id="Blonde"><a href="Blonde.html" target="_self">r/Blonde</a></li><li id="brunette"><a href="brunette.html" target="_self">r/Brunette</a></li><li id="Curls"><a href="Curls.html" target="_self">r/Curls</a></li><li id="ginger"><a href="ginger.html" target="_self">r/Ginger</a></li><li id="ravenhaired"><a href="ravenhaired.html" target="_self">r/RavenHaired</a></li><li id="DarkAngels"><a href="DarkAngels.html" target="_self">r/DarkAngels</a></li><li id="OliveSkin"><a href="OliveSkin.html" target="_self">r/OliveSkin</a></li><li id="palegirls"><a href="palegirls.html" target="_self">r/PaleGirls</a></li><li id="sexyfrex"><a href="SexyFrex.html" target="_self">r/SexyFrex</a></li><li id="WomenOfColor"><a href="WomenOfColor.html" target="_self">r/WomenOfColor</a></li><br><li id="JewishBabes"><a href="JewishBabes.html" target="_self">r/JewishBabes</a></li><li id="christiangirls"><a href="ChristianGirls.html" target="_self">r/ChristianGirls</a></li><br><li id="AsianHotties"><a href="AsianHotties.html" target="_self">r/AsianHotties</a></li><li id="AsianNSFW"><a href="AsianNSFW.html" target="_self">r/AsianNSFW</a></li><li id="juicyasians"><a href="juicyasians.html" target="_self">r/JuicyAsians</a></li><li id="ChineseHotties"><a href="ChineseHotties.html" target="_self">r/ChineseHotties</a></li><li id="NSFW_China"><a href="NSFW_China.html" target="_self">r/NSFW_China</a></li></ul></div><div class="col-md-6 col-xs-6"><ul> <li id="Chakuero"><a href="Chakuero.html" target="_self">r/Chakuero</a></li><li id="JapaneseHotties"><a href="JapaneseHotties.html" target="_self">r/JapaneseHotties</a></li><li id="NSFW_Japan"><a href="NSFW_Japan.html" target="_self">r/NSFW_Japan</a></li><li id="serafuku"><a href="serafuku.html" target="_self">r/Serafuku</a></li><li id="KoreanHotties"><a href="KoreanHotties.html" target="_self">r/KoreanHotties</a></li><li id="NSFW_Korea"><a href="NSFW_Korea.html" target="_self">r/NSFW_Korea</a></li><br><li id="BrazilianBabes"><a href="BrazilianBabes.html" target="_self">r/BrazilianBabes</a></li><li id="CaribbeanGirls"><a href="CaribbeanGirls.html" target="_self">r/CaribbeanGirls</a></li><li id="easterneuropeangirls"><a href="easterneuropeangirls.html" target="_self">r/EastEuropeGirls</a></li><li id="Eurogirls"><a href="Eurogirls.html" target="_self">r/Eurogirls</a></li><li id="Latinas"><a href="Latinas.html" target="_self">r/Latinas</a></li><li id="Mexicana"><a href="Mexicana.html" target="_self">r/Mexicana</a></li><li id="MiddleEasternHotties"><a href="MiddleEasternHotties.html" target="_self">r/MiddleEastHotty</a></li><li id="PersianBabes"><a href="PersianBabes.html" target="_self">r/PersianBabes</a></li><li id="PolishNSFW"><a href="PolishNSFW.html" target="_self">r/PolishNSFW</a></li><li id="russiangirls"><a href="russiangirls.html" target="_self">r/RussianGirls</a></li><li id="Scandinaviangirls"><a href="Scandinaviangirls.html" target="_self">r/ScandinavianGirls</a></li><li id="SweNsfw"><a href="SweNsfw.html" target="_self">r/SwedishNSFW</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="comics-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link8" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link8F()"> Comics Gaming & Cosplay<br/> </a> </h4> </div><div id="collapse8" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul> <li id="hentai"><a href="hentai.html" target="_self">r/Hentai</a></li><li id="hentaibondage"><a href="hentaibondage.html" target="_self">r/HentaiBondage</a></li><li id="Naruto_Hentai"><a href="Naruto_Hentai.html" target="_self">r/Naruto_Hentai</a></li><li id="WesternHentai"><a href="WesternHentai.html" target="_self">r/WesternHentai</a></li><li id="doujinshi"><a href="doujinshi.html" target="_self">r/Doujinshi</a></li><li id="ecchi"><a href="ecchi.html" target="_self">r/Ecchi</a></li><li id="MonsterGirl"><a href="MonsterGirl.html" target="_self">r/MonsterGirl</a></li><li id="pantsu"><a href="pantsu.html" target="_self">r/Pantsu</a></li><li id="yuri"><a href="yuri.html" target="_self">r/Yuri</a></li><br><li id="3DPorncraft"><a href="3DPorncraft.html" target="_self">r/3DPornCraft</a></li><li id="WarriorWomen"><a href="WarriorWomen.html" target="_self">r/WarriorWomen</a></li><br><li id="rule34"><a href="rule34.html" target="_self">r/Rule34</a></li><li id="rule34_ass"><a href="rule34_ass.html" target="_self">r/Rule34_Ass</a></li><li id="Rule34_anal"><a href="Rule34_anal.html" target="_self">r/Rule34_Anal</a></li><li id="rule34_futanari"><a href="Rule34_Futanari.html" target="_self">r/Rule34_Futanari</a></li></ul></div><div class="col-md-6 col-xs-6"><ul> <li id="cat_girls"><a href="cat_girls.html" target="_self">r/Cat_Girls</a></li><li id="cosplaygirls"><a href="cosplaygirls.html" target="_self">r/CosplayGirls</a></li><li id="cosplayheels"><a href="cosplayheels.html" target="_self">r/CosplayHeels</a></li><li id="cosplayonoff"><a href="cosplayonoff.html" target="_self">r/CosplayOnOff</a></li><li id="nsfwcosplay"><a href="nsfwcosplay.html" target="_self">r/NSFWcosplay</a></li><br><li id="BioshockPorn"><a href="BioshockPorn.html" target="_self">r/BioshockPorn</a></li><li id="DirtyGaming"><a href="DirtyGaming.html" target="_self">r/DirtyGaming</a></li><li id="laracroftNSFW"><a href="laracroftNSFW.html" target="_self">r/LaraCroftNSFW</a></li><br><li id="AvatarPorn"><a href="AvatarPorn.html" target="_self">r/AvatarPorn</a></li><li id="ben10porn"><a href="ben10porn.html" target="_self">r/Ben10Porn</a></li><li id="disneyporn"><a href="disneyporn.html" target="_self">r/DisneyPorn</a></li><li id="FitDrawnGirls"><a href="fitdrawngirls.html" target="_self">r/FitDrawnGirls</a></li><li id="Slutoon"><a href="Slutoon.html" target="_self">r/Slutoon</a></li><li id="superheroporn"><a href="superheroporn.html" target="_self">r/SuperHeroPorn</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="celeb-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link6" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link6F()"> Celebrities<br/> </a> </h4> </div><div id="collapse6" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul><li id="CelebrityButts"><a href="CelebrityButts.html" target="_self">r/CelebrityButts</a></li><li id="CelebrityNipples"><a href="CelebrityNipples.html" target="_self">r/CelebrityNipples</a></li><li id="CelebrityPussy"><a href="CelebrityPussy.html" target="_self">r/CelebrityPussy</a></li><br><li id="CelebFakes"><a href="CelebFakes.html" target="_self">r/CelebFakes</a></li><li id="fuxtaposition"><a href="fuxtaposition.html" target="_self">r/Fuxtaposition</a></li></ul></div><div class="col-md-6 col-xs-6"><ul> <li id="CelebGifs"><a href="celebgifs.html" target="_self">r/CelebGifs</a></li><li id="nakedcelebs"><a href="nakedcelebs.html" target="_self">r/CelebsNaked</a></li><li id="celebnsfw"><a href="celebnsfw.html" target="_self">r/CelebNSFW</a></li><li id="CelebSexScenes"><a href="CelebSexScenes.html" target="_self">r/CelebSexScenes</a></li><li id="VintageCelebsNSFW"><a href="VintageCelebsNSFW.html" target="_self">r/VintageCelebsNSFW</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="portstar-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link11" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link11F()"> Porn Stars<br/> </a> </h4> </div><div id="collapse11" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul><li id="Anjelica_Ebbi"><a href="Anjelica_Ebbi.html" target="_self">r/Anjelica_Ebbi</a></li><li id="arielrebel"><a href="arielrebel.html" target="_self">r/ArielRebel</a></li><li id="BibiJones"><a href="BibiJones.html" target="_self">r/BibiJones</a></li><li id="DakotaSkye"><a href="DakotaSkye.html" target="_self">r/DakotaSkye</a></li><li id="EmilyGrey"><a href="EmilyGrey.html" target="_self">r/EmilyGrey</a></li><li id="eva_angelina"><a href="eva_angelina.html" target="_self">r/Eva_Angelina</a></li><li id="EvaLovia"><a href="EvaLovia.html" target="_self">r/EvaLovia</a></li><li id="fayereagan"><a href="fayereagan.html" target="_self">r/FayeReagan</a></li><li id="FoxyDi"><a href="FoxyDi.html" target="_self">r/FoxyDi</a></li><li id="GiannaMichaels"><a href="GiannaMichaels.html" target="_self">r/GiannaMichaels</a></li><li id="jenniferwhite"><a href="jenniferwhite.html" target="_self">r/JenniferWhite</a></li><li id="JessieAndrews"><a href="JessieAndrews.html" target="_self">r/JessieAndrews</a></li></ul></div><div class="col-md-6 col-xs-6"><ul><li id="kati3kat"><a href="kati3kat.html" target="_self">r/Kati3Kat</a></li><li id="LexiBelle"><a href="LexiBelle.html" target="_self">r/LexiBelle</a></li><li id="MistyStone"><a href="MistyStone.html" target="_self">r/MistyStone</a></li><li id="MyCherryCrush"><a href="MyCherryCrush.html" target="_self">r/MyCherryCrush</a></li><li id="patriciacaprice"><a href="patriciacaprice.html" target="_self">r/PatriciaCaprice</a></li><li id="PornStars"><a href="PornStars.html" target="_self">r/PornStars</a></li><li id="SaraJay"><a href="SaraJay.html" target="_self">r/SaraJay</a></li><li id="Sashagrey"><a href="Sashagrey.html" target="_self">r/SashaGrey</a></li><li id="Stoyaxxx"><a href="Stoyaxxx.html" target="_self">r/StoyaXXX</a></li><li id="TessaFowler"><a href="TessaFowler.html" target="_self">r/TessaFowler</a></li><li id="TheRedFox"><a href="TheRedFox.html" target="_self">r/TheRedFox</a></li><li id="Tori_Black"><a href="Tori_Black.html" target="_self">r/Tori_Black</a></li></ul></div></div></div></div></div><div class="panel panel-default"> <div id="gay-panel" class="panel-heading panel-navbar"> <h4 class="panel-title"> <a id="link5" style="color:#fff; " data-toggle="collapse" class="nav-link" data-parent="#accordion" href="javascript: void(0);" onclick="link10F()"> Gay<br/> </a> </h4> </div><div id="collapse10" class="panel-collapse collapse" style="background-color: #000000;"> <div class="panel-body"> <div class="row nav-item"><div class="col-md-6 col-xs-6"><ul><li id="broslikeus"><a href="broslikeus.html" target="_self">r/BrosLikeUs</a></li><li id="BlackBalled"><a href="BlackBalled.html" target="_self">r/BlackBalled</a></li><li id="BlackMale"><a href="BlackMale.html" target="_self">r/BlackMale</a></li><li id="gaybears"><a href="gaybears.html" target="_self">r/GayBears</a></li><li id="GayChubs"><a href="GayChubs.html" target="_self">r/GayChubs</a></li><li id="GayDaddiesPics"><a href="GayDaddiesPics.html" target="_self">r/GayDaddiesPics</a></li><li id="HotGuysWithTattoos"><a href="HotGuysWithTattoos.html" target="_self">r/GuysWithTattoos</a></li><li id="Jockstraps"><a href="Jockstraps.html" target="_self">r/Jockstraps</a></li><li id="ladybonersgw"><a href="ladybonersgw.html" target="_self">r/LadybonersGW</a></li><li id="PublicBoys"><a href="PublicBoys.html" target="_self">r/PublicBoys</a></li><li id="Singlets"><a href="Singlets.html" target="_self">r/Singlets</a></li><li id="TotallyStraight"><a href="TotallyStraight.html" target="_self">r/TotallyStraight</a></li><br><li id="GayGifs"><a href="GayGifs.html" target="_self">r/GayGifs</a></li><li id="GayHiddenCams"><a href="GayHiddenCams.html" target="_self">r/GayHiddenCams</a></li><li id="gayporn"><a href="gayporn.html" target="_self">r/GayPorn</a></li><li id="gaynsfw"><a href="gaynsfw.html" target="_self">r/GayNSFW</a></li><li id="gayvideos"><a href="gayvideos.html" target="_self">r/GayVideos</a></li></ul></div><div class="col-md-6 col-xs-6"><ul> <li id="Balls"><a href="Balls.html" target="_self">r/Balls</a></li><li id="BonersInPublic"><a href="BonersInPublic.html" target="_self">r/BonersInPublic</a></li><li id="ChestHairPorn"><a href="ChestHairPorn.html" target="_self">r/ChestHairPorn</a></li><li id="DatV"><a href="DatV.html" target="_self">r/DatV</a></li><li id="DickSlips"><a href="DickSlips.html" target="_self">r/DickSlips</a></li><li id="ForearmPorn"><a href="ForearmPorn.html" target="_self">r/ForearmPorn</a></li><li id="GayCumSluts"><a href="GayCumSluts.html" target="_self">r/GayCumSluts</a></li><li id="GayWaterSports"><a href="GayWaterSports.html" target="_self">r/GayWaterSports</a></li><li id="MassiveCock"><a href="MassiveCock.html" target="_self">r/MassiveCock</a></li><li id="penis"><a href="penis.html" target="_self">r/Penis</a></li><br><li id="Bisexy"><a href="Bisexy.html" target="_self">r/Bisexy</a></li><li id="FemBoys"><a href="FemBoys.html">r/FemBoys</a></li><li id="GayKink"><a href="GayKink.html" target="_self">r/GayKink</a></li><li id="Shemales"><a href="Shemales.html">r/Shemales</a></li><li id="Sissies"><a href="Sissies.html">r/Sissies</a></li><li id="traps"><a href="traps.html" target="_self">r/Traps</a></li><li id="Twinks"><a href="twinks.html" target="_self">r/Twinks</a></li></ul></div></div></div></div></div></div>');
    
    $('#fapLinks')
    .html('<div class="panel panel-default hidden-xs hidden-sm hidden-md" style="margin-right:-6px; margin-left:-6px;"><div class="panel-heading fappity text-center" style="background-color: #000000;"><div class="row" style="padding-top:30px; margin-bottom:-50px;"><ul class="board-column" style="margin-right:5px;"><li class="board-item" style="background-color: #DBDBD9;"><a id="href1" target="_blank" class="board-item-title-anchor fappity"style="padding-top: 20px;"><span id="href1Text"></span></a><div class="board-item-info"></div></li></ul><ul class="board-column" style="margin-right:5px; margin-left:5px;"><li class="board-item" style="background-color: #DBDBD9;"><a id="href2" target="_blank" class="board-item-title-anchor fappity"style="padding-top: 20px;"><span id="href2Text"></span></a><div class="board-item-info"></div></li></ul><ul class="board-column" style="margin-left:5px;"><li class="board-item" style="background-color: #DBDBD9;"><a id="href3" target="_blank" class="board-item-title-anchor fappity"style="padding-top: 20px;"><span id="href3Text"></span></a><div class="board-item-info"></div></li></ul></div></div></div><div class="panel panel-default visible-xs visible-sm" style="margin-right:-6px; margin-left:-6px;"><div class="panel-heading fappity text-center" style="background-color: #000000;"><div class="row" style="padding-right:0px; padding-left:0px; padding-top:20px; margin-bottom:-36px; width:100%;"><ul class="board-column fappity"><li class="board-item" style="background-color: #DBDBD9;"><a target="_blank" style="padding-top: 20px;" id="href4" class="board-item-title-anchor fappity"><span id="href4Text"></span></a><div class="board-item-info"></div></li></ul></div></div></div>');
}



function promoLinks(text1, extLinkAddress1, text2,  extLinkAddress2, text3,  extLinkAddress3, text4,  extLinkAddress4){        
        var a = document.getElementById('href1'); 
        a.href = extLinkAddress1;
        var text = document.getElementById('href1Text'); 
        text.innerHTML = text1;
        
        a = document.getElementById('href2'); 
        a.href = extLinkAddress2;
        text = document.getElementById('href2Text'); 
        text.innerHTML = text2;
        
        a = document.getElementById('href3'); 
        a.href = extLinkAddress3;
        text = document.getElementById('href3Text'); 
        text.innerHTML = text3;
        
        a = document.getElementById('href4'); 
        a.href = extLinkAddress4;
        text = document.getElementById('href4Text'); 
        text.innerHTML = text4;
}




link1F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse1') {
            lastaccordion.collapse('hide');           
            lastaccordion = $('#collapse1');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
        
    }
    else{
		lastaccordion = $('#collapse1');
		lastaccordion.collapse('toggle'); 
    }    
}

link2F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse2') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse2');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse2');
		lastaccordion.collapse('toggle'); 
    }
    
}

link3F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse3') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse3');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse3');
		lastaccordion.collapse('toggle'); 
    }
    
}

link4F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse4') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse4');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse4');
		lastaccordion.collapse('toggle'); 
    }
    
}

link5F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse5') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse5');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse5');
		lastaccordion.collapse('toggle'); 
    }
    
}

link6F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse6') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse6');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse6');
		lastaccordion.collapse('toggle'); 
    }
    
}

link7F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse7') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse7');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse7');
		lastaccordion.collapse('toggle'); 
    }
    
}

link8F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse8') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse8');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse8');
		lastaccordion.collapse('toggle'); 
    }
    
}

link9F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse9') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse9');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse9');
		lastaccordion.collapse('toggle'); 
    }
    
}


link10F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse10') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse10');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse10');
		lastaccordion.collapse('toggle'); 
    }
    
}

link11F = function() {
    if (lastaccordion != null) {
        if (lastaccordion.attr('id') != 'collapse11') {
            lastaccordion.collapse('hide');
            lastaccordion = $('#collapse11');
            lastaccordion.collapse('toggle');             
        }
        else{
            lastaccordion.collapse('toggle'); 
        }
    }
    else{
		lastaccordion = $('#collapse11');
		lastaccordion.collapse('toggle'); 
    }
    
} 
