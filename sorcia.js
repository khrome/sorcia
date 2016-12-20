(function (root, factory) {
    if (typeof define === 'function' && define.amd) { //AMD
        define([
            'browser-request', 
            'tag-parser/html', 
            'curses', 
            'ello'
        ], factory);
    } else if (typeof module === 'object' && module.exports) { //Node.js
        module.exports = factory(
            require('request'), 
            require('tag-parser/html'), 
            require('curses'), 
            require('ello')
        );
    } else { // global
        root.Sorcia = factory(root.request, root.HTMLTagParser, root.curses, root.Ello);
    }
}(this, function(request, parseHTML, curses, ello) {
    var statics = {
        nodeTree : function(root, cb){
            
        },
        render : function(html, curses, cb){
            console.log('>>', html, curses);
        },
        renderTag : function(node, curses){
            switch(node.type){
                case 'tag':
                    switch(node.name){
                        case 'html':
                            
                            break;
                                
                        case 'head':
                            
                            break;
                        case 'script':
                            
                            break;
                        default : throw new Error('unknown tag type');
                    }
                    break;
                default : console.log('unknown tag type: '+node.type);
            }
        }
    }
    
    var colorIndex = [];
    //curses uses ids, which would otherwise lead to a bunch of literals :P 
    function colorId(name){
        if(colorIndex.indexOf(name) === -1){
            colorIndex.push(name)
        }
        return colorIndex.indexOf(name);
    }
    
    function color(name, background, foreground){
        if(!)
        if(value){
            curses.init_pair(
                colorId(name), 
                cc(background), 
                foreground?cc(foreground):curses.COLOR_BLACK
            );
        }else{
            return curses.color_pair(name);
        }
    }
    
    function cc(name){ //curses color
        return curses['COLOR_'+name.toUpperCase()];
    }
    
    function optionalColor(options, name, defaultValue){
        ( options && options[name] && cursesColor(options[name]) ) || defaultValue;
    }
    
    function Window(options){
        this.options = options || {};
        var borderForeground = optionalColor(options.border, 'foreground', cc('black'));
        var borderColor = optionalColor(options.border, 'color', cc('green'));
        var bodyForeground = optionalColor(options.border, 'foreground', cc('black'));
        var bodyColor = optionalColor(options.border, 'color', cc('white'));
        this.cursesWindow = curses.initscr();
        if(curses.has_colors()) {
            curses.start_color();
            color('glyph', 'green', 'black');
            color('border', 'white', 'black');
        }
    }
    
    Window.prototype.open = function(opts, cb){
        var ob = this;
        request(opts, function(err, req, data){
            if(err) return cb(err);
            new Document(ob.activeWindow);
        });
    }
    
    Window.prototype.redraw = function(){
        curses.wattrset(this.cursesWindow, curses.color_pair(BORDER_COLOR));
        curses.wclear(this.cursesWindow);
        curses.box(this.cursesWindow, 0, 0);
        curses.wrefresh(this.cursesWindow);
    }
    
    function Document(options){
        this.options = options || {};
        var body = typeof options == 'string'?options:(options.html || '');
        this.outerHTML = body;
        this.window = this.options.window;
        var ob = this;
        request(opts, function(err, req, data){
            if(err) return cb(err);
            parseHTML(data, function(err, tree){
                if(err) return cb(err);
                cb(undefined, new Document({window:ob.activeWindow}));
            });
        });
        this.window.redraw();
        this.redraw();
    }
    
    Document.prototype.redraw = function(cursesWindow){
        if(!this.documentFrame){
            curses.subwin(this.cursesWindow, 400, 400, 0, 0);
        }
        curses.wbkgd(
            subwin, ' '.charCodeAt(0)|
            color('glyph')|
            curses.A_REVERSE
        );
        curses.wclear(subwin);
        curses.box(subwin, 0, 0);
        curses.wmove(subwin, 1, 8);
        curses.wattrset(subwin, curses.color_pair(GLYPH_COLOR));
        curses.waddstr(subwin, "Hello world!");
        curses.wrefresh(subwin);
    }
    
    function Node(options){
        this.options = options || {};
    }
    
    Node.prototype.redraw = function(){
        switch(this.type){
            case 'tag':
                switch(this.name){
                    case 'html':
                        
                        break;
                            
                    case 'head':
                        
                        break;
                    case 'script':
                        
                        break;
                    default : throw new Error('unknown tag type');
                }
                break;
            default : console.log('unknown tag type: '+node.type);
        }
    }
    
    function Browser(options){
        this.options = options || {};
        this.activeWindow = new Window();
    }
    
    Browser.prototype.open = function(opts, cb){
        var ob = this;
        cb(undefined, new Document({
            window:ob.activeWindow,
            url : typeof opts == 'string'?string:(opts.url || opts.uri)
        }));
    }
    
    Browser.prototype.open = function(opts, cb){
        curses.endwin();
    }
    
    return {
        Browser  : Browser,
        Document : Document,
        Window   : Window
    };
}));