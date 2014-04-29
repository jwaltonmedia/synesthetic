define(['handlebars'], function(Handlebars) {

    this["synth"] = this["synth"] || {};

    this["synth"]["home"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};



        return "<canvas id=\"viz\"></canvas>\n<article>\n    <h1>let's get started... shall we?</h1>\n    <p>i can interprete the sounds around me but, i see sounds as images.  want to see?  just let me know when you're ready.</p>\n    <a class=\"listener\" href=\"/\">start</a>\n    <audio src=\"\" id=\"audio\"></audio>\n</article>";
    });

    this["synth"]["main"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        partials = this.merge(partials, Handlebars.partials);
        data = data || {};
        var buffer = "",
            stack1, self = this,
            functionType = "function";


        buffer += "<!doctype html>\n<html lang=\"en\">\n    ";
        stack1 = self.invokePartial(partials.global_head, 'global_head', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n<body>\n    <noscript>JS is required</noscript>\n    ";
        stack1 = self.invokePartial(partials.global_header, 'global_header', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n    <main role=\"main\">\n        ";
        if (stack1 = helpers.body) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = (depth0 && depth0.body);
            stack1 = typeof stack1 === functionType ? stack1.call(depth0, {
                hash: {},
                data: data
            }) : stack1;
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n    </main>\n    ";
        stack1 = self.invokePartial(partials.global_footer, 'global_footer', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n    ";
        stack1 = self.invokePartial(partials.global_scripts, 'global_scripts', depth0, helpers, partials, data);
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n</body>\n</html>\n";
        return buffer;
    });

    this["synth"]["global_footer"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};



        return "<footer><pre>I see what you say</pre></footer>";
    });

    this["synth"]["global_head"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {

            var buffer = "",
                stack1;
            buffer += " | ";
            if (stack1 = helpers.title) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = (depth0 && depth0.title);
                stack1 = typeof stack1 === functionType ? stack1.call(depth0, {
                    hash: {},
                    data: data
                }) : stack1;
            }
            buffer += escapeExpression(stack1);
            return buffer;
        }

        buffer += "<head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>synesthetic";
        stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "</title>\n    <link href='css/compiled/main.css' rel='stylesheet' type='text/css'>\n</head>";
        return buffer;
    });

    this["synth"]["global_header"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};



        return "<header>\n    <h1><pre><code>s.y.n.e.s.t.h.e.t.i.c</code></pre></h1>\n</header>";
    });

    this["synth"]["global_scripts"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};



        return "<script type=\"text/javascript\" data-main=\"js/main.js\" src=\"js/vendor/require-2.1.1.js\"></script>";
    });

    this["synth"]["window"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, '>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};



        return "<p>window</p>";
    });

    return this["synth"];

});
