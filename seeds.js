var mongoose = require("mongoose");
var Article = require("./models/article");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1443890923422-7819ed4101c0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=a9c79afe3d7a158a876502b1cc548332",
        description: "This is a mountain for combat training. No bathrooms or help nearby. Wild animals on the move."
    },
    {
        name: "Class A Climbers",
        image: "https://images.unsplash.com/photo-1440347306022-52a6c51b8dc1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8ce900c2b46e89b23ba4b8ae0ba1e689",
        description: "Class A rated mountain. Home for professional mountain climbers."
    },
    {
        name: "Arctic Soldier",
        image: "https://images.unsplash.com/photo-1447876394678-42a7efa1b6db?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=e20dd23bf8f3008a1a0f81e153452d27",
        description: "Rough terrains and frequent blizzards. There are no bathrooms or people nearby. Wolf Territory."
    },
    {
        name: "Last Stand", 
        image: "https://images.unsplash.com/photo-1448960968772-b63b3f40dfc1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=52fd787fc4128cf385afe683a55a1ab5",
        description: "The burial of the strongest soldier."
    },
    {
        name: "To The Top",
        image: "https://images.unsplash.com/photo-1458400411386-5ae465c4e57e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=47756f965e991bf72aa756b410929b04",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet lorem vel risus viverra pulvinar. Pellentesque eu facilisis enim. Praesent nec massa vitae massa luctus blandit non tristique libero. Proin vel eleifend ligula. Praesent a mauris ac ligula vehicula venenatis. Aenean suscipit arcu quis eros tincidunt congue. Donec sed nisl porttitor, condimentum ante vel, dictum libero. Phasellus nec ex enim.Nulla sed malesuada elit, in scelerisque ligula. Maecenas vehicula sem nec viverra suscipit. Phasellus consectetur lorem ac turpis posuere, at pharetra ligula imperdiet. Vivamus scelerisque ac ipsum non viverra. Vivamus justo ipsum, posuere eget nibh nec, hendrerit feugiat justo. Morbi gravida orci eget felis fermentum, ut gravida urna tincidunt. Duis purus lacus, dapibus ut ullamcorper quis, convallis in lorem. Nunc scelerisque diam lacus, id iaculis libero commodo nec. Praesent tempor felis felis, pulvinar pretium lorem tincidunt in. Nulla pellentesque ipsum non dignissim consequat."
    },
    {
        name: "Interstellar",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=c2447a69043e39f174216c5440f0fb2d",
        description: "A majestic and mystical view of space."
    },
    {
        name: "New York",
        image: "https://images.unsplash.com/photo-1442551382982-e59a4efb3c86?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=e131e5a1a12b40fca905f81eb90df89d",
        description: "A million dollar view."
    },
    {
        name: "Breakfast Waffles", 
        image: "https://images.unsplash.com/photo-1459789034005-ba29c5783491?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=f027770e0539597a3eb888a2fe07200a",
        description: "A sweeeet breakfast."
    },
    {
        name: "Fly",
        image: "https://images.unsplash.com/photo-1453743327117-664e2bf4e951?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=d5447d7f37886d9890d448d0858da12f",
        description: "The early bird gets the worm."
    },
    {
        name: "Living At The Top",
        image: "https://images.unsplash.com/photo-1434434319959-1f886517e1fe?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=218dfdd2c0735dbd6ca0f718064a748b",
        description: "Tranquillity at its best."
    },
    {
        name: "Spark",
        image: "https://images.unsplash.com/photo-1453668069544-b8dbea7a0477?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=ac479c6bdac208162a40af860c12ef54",
        description: "A portal to the other side"
    },
    {
        name: "Speed",
        image: "https://images.unsplash.com/photo-1452573992436-6d508f200b30?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=daee730ee0dc07303ea944759e5de1ea",
        description: "Move like the wind."
    },
    {
        name: "CN Tower",
        image: "https://images.unsplash.com/photo-1437326516294-01d0da392e11?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=5fd871029d3b4011e04f09d533fea68e",
        description: "A beautiful view in Toronto."
    }
]       

// Add initial data for first execution of the web server
function seedDB(){
    // Remove all articles
    Article.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed articles!"); 
        // Add initial articles
        data.forEach(function(seed){
           Article.create(seed, function(err, article){
              if(err){
                  console.log(err);
              } else {
                  console.log("Added article");
                  // Create comment
                  Comment.create(
                      {
                          text: "Wow the view looks great!",
                          author: {
                              username: "John"
                          }
                      }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                article.comments.push(comment);
                                article.save();
                                console.log("Added comment");
                            }
                      });
              }
           }); 
        });        
    });
}

module.exports = seedDB;