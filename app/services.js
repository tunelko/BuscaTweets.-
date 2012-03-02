App.Services = (function(lng, app, undefined) {

    var getSearch = function(search_term){
        var twitter_params = {
            q : encodeURIComponent(search_term),
            result_type : 'recent',
            rpp : '100',
            // include_entities: 'false',
            callback : '?'
        };
            
        var twitter_search_url = "http://search.twitter.com/search.json";

        // Sugar Growl loading ...
        lng.Sugar.Growl.show (' Espere', '',  'loading', true, 0);

        lng.Service.json(twitter_search_url, twitter_params, function(data){
            // solo queremos tweets
            data = data['results'];

            var data_to_bind = [];
            var data_to_insert = [];
            var to_user = '';
            var url = '';

            if (data.length == 0){
                data_to_bind.push({
                    tweet_text : "¡ No hay resultados !",
                    tweet_author: '<a href="#back"" data-target="section" data-icon="target">Volver al término de búsqueda</a>',
                    tweet_touser: '',
                    // tweet_url: url,
                    profile_image_url: 'assets/images/icon-72.png'
                });
            }
            for (var i = 0; i < data.length; i++){
                if (data[i]['to_user']){
                    to_user = "<div class='bubble red onright'>Tweet con: @" + data[i]['to_user'] +"</div>";
                }else{
                    to_user = '';
                }

                data_to_bind.push({
                    tweet_date: data[i]['created_at'].replace("+0000",""),
                    tweet_text : "<a href='https://twitter.com/#!/"+ data[i]['from_user']+"/status/"+ data[i]['id_str'] + "' target='_self'>"+data[i]['text']+"</a>",
                    tweet_author: data[i]['from_user'],
                    tweet_touser: to_user,
                    // tweet_url: url,
                    profile_image_url: data[i]['profile_image_url']
                });
                data_to_insert.push({
                    created_at: data[i]['created_at'].replace("+0000",""),
                    from_user: data[i]['from_user'],
                    from_user_id: data[i]['from_user_id'],
                    from_user_id_str: data[i]['from_user_id_str'],
                    from_user_name:  data[i]['from_user_name'],
                    geo: data[i]['geo'],
                    text: data[i]['text'].replace(/"/g,"'")
                });
                 
            // var texto = data[i]['text'].replace(/"/g,"a"); 
            // console.log("<a href='https://twitter.com/#!/"+ data[i]['from_user']+"/status/"+ data[i]['id_str'] + "' target='_self'>"+data[i]['text']+"</a>");
            } 

            // db local .
           // App.Data.cacheTweets(data_to_insert);
            
            lng.View.Template.List.create ({
                container_id : 'tweet_container',
                template_id: 'tweet_template',
                data : data_to_bind
            });

            //ocultamos loading ...
            lng.Sugar.Growl.hide();
        }

        );


    }
    
     
    return {
        getSearch: getSearch
    }

})(LUNGO, App);