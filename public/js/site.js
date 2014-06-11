var socket = io();
var map = L.mapbox.map('map', 'bobbysud.ig375fji')
    .setView([0, 0], 2);

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = ''; // dont need #
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function formatData(tweet) {
    var marker = L.marker([tweet.geo.coordinates[0], tweet.geo.coordinates[1]], {
        icon: L.mapbox.marker.icon({
            'marker-symbol': 'soccer',
            'marker-color': getRandomColor()
        })
    })
        .bindPopup('<div class="pad1 round clip tile fl">' +
                '<img src="' + tweet.user.profile_image_url_https + '" class="round" height="50px" width="50px" />' +
                '<p class="small fr col9 white">' +
                    '<span class="display-block small">' +
                        '<span class="white inline">' + tweet.user.name + '</span>' +
                        ' <span class="quiet inline"> @' + tweet.user.screen_name + '</span>' +
                    '</span>' +
                    tweet.text + '' +
                    '<a href="https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str + '" target="_blank"  class="timeago quiet small display-block" title="' + tweet.created_at + '"></a>' +
                '</p>' +
            '</div>' + '')
        .addTo(map);

    marker.on('popupopen', function() {
        $('.timeago').timeago();
    });

    $('.loading').fadeOut();
}

socket.on('tweeted', function(tweet) {
    formatData(tweet);
});
