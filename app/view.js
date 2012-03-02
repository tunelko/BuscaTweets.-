App.View = (function(lng, app, undefined) {

    var tweet_template_markup = "<li class='selectable' data-icon='user'>\n\
            <img src='{{profile_image_url}}' />\
            {{tweet_touser}}<strong>{{tweet_text}} </strong> <small> {{tweet_author}} {{tweet_date}} {{tweet_url}}</small> </li>";
    lng.View.Template.create('tweet_template', tweet_template_markup);


    var render_list = function(tweets){
        lng.View.Template.List.create ({
            container_id : 'tweet_container',
            template_id: 'tweet_template',
            data : tweets
        });
    }
    return{
        render_list:render_list
    }

})(LUNGO, App);