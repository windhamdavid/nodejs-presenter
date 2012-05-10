var flatiron = require('flatiron'),
     app = flatiron.app; 
 
 app.use(flatiron.plugins.http);


var pub = __dirname + '/public';
var Slide = require('./slide');
var Presentation = require('./presentation');
var PresentationController = require('./PresentationController');

var flatiron = require('flatiron'),
     app = flatiron.app; 
 	 app.use(flatiron.plugins.http);

var presentationController = new PresentationController();

var createPresentationNodejs = [];
createPresentationNodejs.push(new Slide("intro","Creating a real time presentation with Node.js"));
createPresentationNodejs.push(new Slide("two","two"));

presentationController.addPresentation(new Presentation("Creating a presentation with Node.js","create-presentation-nodejs",createPresentationNodejs,
    "For my work I had to prepare a short presentation of around 10 minutes. I decided to create a tool to create presentation " +
            "with and present about it. This is the result, a short presentation showing some of the ideas."));

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: 'layout' });
    app.use(flatiron.methodOverride());
    app.use(flatiron.static(pub));
    app.use(flatiron.bodyParser());
});

app.get('/', presentationController.allPresentations);
app.get('/presentation/:urlIdentifier', presentationController.index);
app.get('/presentation/:urlIdentifier/slide/:id', presentationController.slide);
app.post('/presentation/:urlIdentifier/slide/:id', presentationController.command);
app.get('/presentation/:urlIdentifier/all', presentationController.allSlides);

app.listen(8018);
console.log('Express server started on port %s', app.address().port);