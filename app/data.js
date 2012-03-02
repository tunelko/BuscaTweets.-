App.Data = (function(lng, app, undefined) {

    var term = "<nothing>";
    var setSearchTerm = function(par_term) {
        term = par_term;
    }

    var getSearchTerm = function ()
    {
        return term;
    }


    lng.Data.Sql.init({
    name: 'tweeter_db',
    version: '1.0',
    drop: true,
    schema: [
        {
            name: 'tweets',
            drop: true,
            fields: {
                created_at: "TEXT",
                from_user: "TEXT",
                from_user_id: "INTEGER",
                from_user_id_str: "INTEGER",
                from_user_name: "TEXT",
                geo: "TEXT",
                 text: "TEXT"
               /* id: "TEXT",
                id_str: "INTEGER",
                in_reply_to_status_id: "INTEGER",
                in_reply_to_status_id_str: "INTEGER",
                iso_language_code: "TEXT",
                metadata: "TEXT",
                profile_image_url: "TEXT",
                profile_image_url_https: "TEXT",
                source: "TEXT",
                text: "TEXT",
                to_user: "TEXT",
                to_user_id: "INTEGER",
                to_user_id_str: "INTEGER",
                to_user_name: "TEXT"
                */
            }
        },

    ]
});

    var cacheTweets = function(tweets){
       lng.Data.Sql.insert('tweets', tweets);

    };
    
    return {
        //cacheTweets: cacheTweets,
        setSearchTerm : setSearchTerm,
        getSearchTerm : getSearchTerm, 
cacheTweets:cacheTweets

    }

    

})(LUNGO, App);