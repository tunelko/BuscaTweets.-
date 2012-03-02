App.Events = (function(lng, app, undefined) {
    var makeSearch = function(){
        app.Services.getSearch(app.Data.getSearchTerm());

    }
       
    var makePullDown = function(){
        var pulldown_offset_top = (lng.dom("#pullDown").offset().top);
        var container_top = (lng.dom("#tweet_container").offset().top);     
        if (pulldown_offset_top >= container_top && !pulldown_offset_top <  container_top){
            lng.dom("#pullDown").toggleClass('flip');
            $$('.pullDownLabel').html('Actualizando ...');
            App.Data.setSearchTerm($$("#text_search_input").val());
            // update the request 
            makeSearch();
        }        
    

    };

    lng.dom('#refresh_button').tap(function(event) {
        if($$("#text_search_input").val() != ''){
            App.Data.setSearchTerm($$("#text_search_input").val());
            makeSearch();        
        }
    })
    lng.dom('#search_button').tap(function(event) {
        if($$("#text_search_input").val() != ''){
            App.Data.setSearchTerm($$("#text_search_input").val());
            makeSearch();        
        }
    })
         
    lng.dom('#tweet_container').on('longTap', function(){
        makePullDown();
    });
    
    return {
        makeSearch:makeSearch, 
        makePullDown:makePullDown
        
    }

})(LUNGO, App);