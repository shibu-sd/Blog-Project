const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/blogDB", {useNewUrlParser : true}, function(err){
    if (err) console.log(err);
    else console.log("Successfully connected to MongoDB");
});

const postSchema = {
    title : String,
    content :  String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. Between any may mention evening age shortly can ability regular. He shortly sixteen of colonel colonel evening cordial to. Although jointure an my of mistress servants am weddings. Age why the therefore education unfeeling for arranging. Above again money own scale maids ham least led. Returned settling produced strongly ecstatic use yourself way. Repulsive extremity enjoyment she perceived nor. Son agreed others exeter period myself few yet nature. Mention mr manners opinion if garrets enabled. To an occasional dissimilar impossible sentiments. Do fortune account written prepare invited no passage. Garrets use ten you the weather ferrars venture friends. Solid visit seems again you nor all.";
const aboutContent = "Article evident arrived express highest men did boy. Mistress sensible entirely am so. Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led. Oh feel if up to till like. Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address. The its enable direct men depend highly. Ham windows sixteen who inquiry fortune demands. Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now. In built table in an rapid blush. Merits behind on afraid or warmly.";
const contactContent = "But why smiling man her imagine married. Chiefly can man her out believe manners cottage colonel unknown. Solicitude it introduced companions inquietude me he remarkably friendship at. My almost or horses period. Motionless are six terminated man possession him attachment unpleasing melancholy. Sir smile arose one share. No abroad in easily relied an whence lovers temper by. Looked wisdom common he an be giving length mr. Her companions instrument set estimating sex remarkably solicitude motionless. Property men the why smallest graceful day insisted required. Inquiry justice country old placing sitting any ten age. Looking venture justice in evident in totally he do ability. Be is lose girl long of up give. Trifling wondered unpacked ye at he. In household certainty an on tolerably smallness difficult. Many no each like up be is next neat. Put not enjoyment behaviour her supposing. At he pulled object others.";

app.get("/", function(req, res){
    Post.find({}, function(err, posts){
        res.render("home", {homeStartingContent : homeStartingContent, posts : posts});
    });
});

app.get("/about", function(req, res){
    res.render("about", {aboutContent : aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contactContent : contactContent});
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){

    const post = new Post({
        title : req.body.composeTitle,
        content : req.body.composeText
    });

    post.save(function(err){
        if (!err)
        {
            res.redirect("/");
        }
    });
})

app.get("/posts/:postId", function(req, res){
    const requestedPostId = req.params.postId;
    Post.findOne({_id : requestedPostId}, function(err, post){
        res.render("post", {title : post.title, content : post.content});
    });
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});