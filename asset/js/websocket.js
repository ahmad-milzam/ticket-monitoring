$( document ).ready(function() {
    // console.log( "ready!" );
    var socket = new WebSocket("ws://websocket.ngulik.my.id/ws");
    socket.onopen = function (e) {
    console.log("Connection open");
    socket.send("GET");
    };

    socket.onmessage = function (event) {
    console.log(event.data);
    let data = JSON.parse(event.data);
    console.log(data);

    // $('#departement').text(data.total_tickets.gio.departement);

    ticket('#open-gio', data.total_tickets.gio.open);
    ticket('#onprogress-gio', data.total_tickets.gio.on_progress);
    ticket('#onhold-gio', data.total_tickets.gio.on_hold);

    ticket('#open-neo', data.total_tickets.neo.open);
    ticket('#onprogress-neo', data.total_tickets.neo.on_progress);
    ticket('#onhold-neo', data.total_tickets.neo.on_hold);

    ticket('#open-whatsaap', data.total_tickets.whatsaap.open);
    ticket('#onprogress-whatsaap', data.total_tickets.whatsaap.on_progress);
    ticket('#onhold-whatsaap', data.total_tickets.whatsaap.on_hold);
    };

    socket.onclose = function (event) {
    if (event.wasClean) {
        alert(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("[close] Connection died");
    }
    };

    socket.onerror = function (error) {
    console.log(error.message);
    };

    function ticket(id, ticket){
    $(id).text(ticket);
    }

});