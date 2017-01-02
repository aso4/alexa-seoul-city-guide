var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE',
    TOPFIVE: '_TOPFIVE'
};

var location = "Seoul";

var numberOfResults = 3;

var APIKey = "4844d21f760b47359945751b9f875877";

var welcomeMessage = location + " Guide. You can ask me for an attraction, the local news, or  say help. What will it be?";

var welcomeRepromt = "You can ask me for an attraction, the local news, or  say help. What will it be?";

var locationOverview = "Seoul - officially the Seoul Special City – is the capital and largest metropolis of South Korea, forming the heart of the Seoul Capital Area, which includes the surrounding Incheon metropolis and Gyeonggi province, the world's 16th largest city. It is home to over half of all South Koreans along with 678,102 international residents.";

var HelpMessage = "Here are some things you  can say: Give me an attraction. Tell me about " + location + ". Tell me the top five things to do. Tell me the local news.  What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noAttractionErrorMessage = "There was an error finding this attraction, " + tryAgainMessage;

var topFiveMoreInfo = " You can tell me a number for more information. For example open number one.";

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice time in " + location + ".";

var newsIntroMessage = "These are the " + numberOfResults + " most recent " + location + " headlines, you can read more on your Alexa app. ";

var hearMoreMessage = "Would you like to hear about another top thing that you can do in " + location +"?";

var newline = "\n";

var output = "";

var alexa;

var attractions = [
    { name: "Gyeong-buk-goong.", content: "  Gyeong-buk-goong Palace is arguably the most beautiful and remains the grandest of all five palaces is also called 'Northern Palace' because it is the furthest north when compared to the neighboring palaces of Chaang-duk-goong (Eastern Palace) and Gyeong-hee-goong (Western Palace).", location: "161 Sah-jeek-ro, Jong-no-gu, Seoul", contact: "02 3700 3900" },
    { name: "Dong-dae-moon.", content: "  Dong-dae-moon is Korea’s largest wholesale and retail shopping district has 26 shopping malls, 30,000 specialty shops, and 50,000 manufacturers. Open from 10:30 a.m. to 5:00 a.m. most days, you can literally shop all night!", location: "253 Jaang-chung-dan-ro, Jung-gu, Seoul, 04564", contact: "02 120" },
    { name: "Chung-wa-dae.", content: "  Chung-wa-dae is the executive office and official residence of the President of the Republic of Korea. The Korean name literally translates to 'pavilion of blue tiles.'", location: "1 Chung-wa-dae-ro, Jong-no-gu, Seoul", contact: "02 730 5800" },
    { name: "hong-dae.", content: "  Head to hong-dae, where you can enjoy an endless stream of fashion, music and dance. It an urban oasis that'll get you buzzing faster than a six-pack of energy drinks, especially after hours.", location: "ool-ma-dahng-ro, Ma-po-gu, Seoul", contact: "02 3153 8363" },
    { name: "ee-te-won.", content: "  Located smack-dab in the center of Seoul, ee-te-won is home for the majority of expats that reside in Korea, making ee-te-won a mini melting pot of cultures and religions from all over the world. The Seoul Central Mosque is also located in ee-te-won along with a number of halal food stores, and large numbers of US military personnel can be seen here as the yong-sahn Garrison that is stationed nearby.", location: "27 Na-gil, ee-te-won-ro, Yong-sahn-gu, Seoul", contact: "02 3707 9416" },
    { name: "Everland.", content: "  Everland Resort entertains visitors all year long with various rides, festivals like Global Fair, theme parks including Magic Land, European Adventure and Zootopia, perfect for a great amusement park. It houses diverse attractions which are available to enjoy regardless of ages, different themed festivals including Tulip Festival, Rose Festival, Summer Splash, Halloween Festival, Romantic Illumination, and other festivals all year long. One of the park’s most famous rides is T-Express, Korea’s first wooden roller coaster, popular among young visitors.", location: "199 Everland-ro, Po-guk-oop, Cho-in-gu, Yong-in-si, Gyeong-gi-do", contact: "031 320 5000" }
];

var topFive = [
    { number: "1", caption: "Visit N Seoul Tower and see Seoul from above.  ", more: "  N Seoul Tower located on Mt. Nam-sahn offers great panoramic views of the city, and has been a symbol of Seoul since it first opened to the public in 1980. Not only the tower was recently undergone a major remodeling, but also a new name following a complete makeover. It is now a true cultural space with various performances, movies, exhibitions as well as upscale restaurants and snack bars.", location: "105 Namsangongwon-gil, Yongsan-gu, Seoul, 04340", contact: "staff@seoulwelcome.com \n 02 3455 9277" },
    { number: "2", caption: "Get shopping at Myung-dong.  ", more: "  It is all about fashion, fashion & fashion in Myung-dong, Seoul’s primary & most famous shopping district. If it’s variety that you’re after, there’s no better place to shop than Myeong-dong where you’ll find everything from internationally-recognized name brands to unique items.", location: "Myung-dong-gil, Jung-gu, Seoul", contact: "02 774 3238" },
    { number: "3", caption: "Immerse yourself in the amusement park of Lot-tae World.  ", more: "  Located in the heart of the city, Lot-tae World is the perfect spot for entertainment and sightseeing. It is a theme park filled with thrilling rides, an ice rink and different kinds of parades, as well as a folk museum, a lake, and much more. Approximately 6,000,000 visitors are welcomed every year, and about 10% of the visitors are international tourists.", location: "240 Olympic-ro, Song-pa-gu, Seoul", contact: "02 411 3502" },
    { number: "4", caption: "See traditional crafts brought to the modern day at Inssa-dong.  ", more: "  One of the most memorable Seoul attractions and represents the focal point of Korean traditional culture and crafts. Stores in Inssa-dong specialize in a wide variety of goods that can only be purchased or appreciated in Korea: han-boak (traditional clothing), han-ji (traditional paper), traditional teas, pottery, and folk crafts.", location: "39-1 Inssa-dong-gil, Jong-no-gu, Seoul, 03145", contact: "02 737 7890" },
    { number: "5", caption: "Breathe in the culture at the Book-chun Han-oak Village.  ", more: "  Surrounded by Gyeong-buk-goong Palace, Chaang-duk-goong Palace and Jong-myo Shrine, Book-chun Hanok Village is home to hundreds of traditional houses, called han-oak, that date back to the Jo-sun Dynasty.", location: "37 Gae-dong-gil, Jong-no-gu, Seoul", contact: "02 2148 4160" }
];

var topFiveIntro = "Here are the top five things to do in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;

        output = welcomeMessage;

        this.emit(':ask', output, welcomeRepromt);
    },
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    }
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'AMAZON.HelpIntent': function () {

        output = HelpMessage;

        this.emit(':ask', output, HelpMessage);
    },

    'getOverview': function () {

        output = locationOverview;

        this.emit(':tellWithCard', output, location, locationOverview);
    },

    'getAttractionIntent': function () {

        var cardTitle = location;
        var cardContent = "";

        var attraction = attractions[Math.floor(Math.random() * attractions.length)];
        if (attraction) {
            output = attraction.name + " " + attraction.content + newline + moreInformation;
            cardTitle = attraction.name;
            cardContent = attraction.content + newline + attraction.contact;

            this.emit(':tellWithCard', output, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage, tryAgainMessage);
        }
    },

    'getTopFiveIntent': function () {

        output = topFiveIntro;

        var cardTitle = "";

        for (var counter = topFive.length - 1; counter >= 0; counter--) {
            output += " Number " + topFive[counter].number + ": " + topFive[counter].caption + newline;
        }

        output += topFiveMoreInfo;

        this.handler.state = states.TOPFIVE;
        this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
    },

    'AMAZON.YesIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },

    'AMAZON.NoIntent': function () {
        output = HelpMessage;
        this.emit(':ask', HelpMessage, HelpMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'getNewsIntent': function () {
        httpGet(location, function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by New York Times\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = newsIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.response.docs.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData.response.docs[i].headline.main;
                        var index = i + 1;

                        output += " Headline " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " See your Alexa app for more information.";
            }

            var cardTitle = location + " News";

            alexa.emit(':tellWithCard', output, cardTitle, cardContent);
        });
    },

    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },

    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

var topFiveHandlers = Alexa.CreateStateHandler(states.TOPFIVE, {
    'AMAZON.HelpIntent': function () {

        output = HelpMessage;

        this.emit(':ask', output, HelpMessage);
    },

    'getMoreInfoIntent': function () {
        var slotValue = this.event.request.intent.slots.attraction.value;
        var index = parseInt(slotValue) - 1;

        var selectedAttraction = topFive[index];
        if (selectedAttraction) {

            output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
            var cardTitle = selectedAttraction.name;
            var cardContent = selectedAttraction.caption + newline + newline + selectedAttraction.more + newline + newline + selectedAttraction.location + newline + newline + selectedAttraction.contact;

            this.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage);
        }
    },

    'AMAZON.YesIntent': function () {
        output = getMoreInfoMessage;
        alexa.emit(':ask', output, getMoreInfoRepromtMessage);
    },

    'AMAZON.NoIntent': function () {
        output = goodbyeMessage;
        alexa.emit(':tell', output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },

    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
  console.log("/n QUERY: "+query);

    var options = {
      //http://api.nytimes.com/svc/search/v2/articlesearch.json?q=seattle&sort=newest&api-key=
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?q=' + query + '&sort=newest&api-key=' + APIKey,
        method: 'GET'
    };

    var req = http.request(options, (res) => {

        var body = '';

        res.on('data', (d) => {
            body += d;
        });

        res.on('end', function () {
            callback(body);
        });

    });
    req.end();

    req.on('error', (e) => {
        console.error(e);
    });
}

String.prototype.trunc =
      function (n) {
          return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
      };
