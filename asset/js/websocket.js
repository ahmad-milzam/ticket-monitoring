$( document ).ready(function() {
    // console.log( "ready!" );

    // let element = $("#1").detach();

    // function move(parent, child) {
    //     $(parent).append(child);
    // }

    // console.log(element);

    // move(".group-count-ticket-asap", element);

    // function changeColor(child, oldColor, newColor) {
    //     $(child).removeClass(oldColor);
    //     $(child).addClass(newColor);
    // }

    // changeColor("#1", "contain-count-wait", "contain-count-asap");
    
    // function tes() {
    //     console.log("ready!")
    // }

    // var timeouts = [];
    // timeouts.push(setInterval(tes, 2000));

    // for (var i=0; i<timeouts.length; i++) {
    //     clearInterval(timeouts[i]);
    // }

    var socket = new WebSocket("wss://api.ngulik.my.id/wss");
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

        waiting(data.waiting_responses);
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

    function waiting(waiting_responses){
        $(".group-count-ticket-asap").empty();
        $(".group-ticket-warn").empty();
        $(".group-ticket-wait").empty();
        console.log(Math.floor(Date.now() / 1000))

        // console.log(warn);

        if (waiting_responses != null) {

            $("#totalticket").text(`
                ${waiting_responses.length > 0 ? waiting_responses.length : 0}
            `);

            waiting_responses.forEach(waiting_response => {

                let cek2 = Math.floor(Date.now() / 1000) - waiting_response.timestamp;

                let timeTicket = '';
                let colorTicket = '';
                if (cek2 >= 900) {
                    timeTicket = '.group-count-ticket-asap'
                    colorTicket = 'contain-count-asap'
                    // timeTicket = '.group-ticket-warn'
                    // let element = $(waiting_response.id_ticket).detach();

                    // function move(parent, child) {
                    //     $(parent).append(child);
                    // }

                    // move(".group-count-ticket-asap", element);
                    // // colorTicket = 'contain-count-warning'
                    // function changeColor(child, oldColor, newColor) {
                    //     $(child).removeClass(oldColor);
                    //     $(child).addClass(newColor);
                    // }
                    // changeColor(waiting_response.id_ticket, "contain-count-warn", "contain-count-asap");
                } else if (cek2 >= 600) {
                    timeTicket = '.group-ticket-warn'
                    colorTicket = 'contain-count-warning'
                    // let element = $(waiting_response.id_ticket).detach();

                    // console.log(element);

                    // function move(parent, child) {
                    //     $(parent).append(child);
                    // }

                    // move(".group-count-ticket-warn", element);
                    
                    // function changeColor(child, oldColor, newColor) {
                    //     $(child).removeClass(oldColor);
                    //     $(child).addClass(newColor);
                    // }
                    // changeColor(waiting_response.id_ticket, "contain-count-new", "contain-count-warn");

                } else {
                    timeTicket = '.group-ticket-new'
                    colorTicket = 'contain-count-wait'
                }

                console.log(timeTicket);

                $(timeTicket).append(`
                <div class="${colorTicket} ticket-1" id="${waiting_response.id_ticket}">
                    <!-- <div class="content-wait"></div> -->
                    <div class="asap-head-ticket d-flex flex-wrap align-items-center">
                        <div class="asap-title-ticket"><img src="./asset/image/vector-asap.png" alt="" class="mr-1">GIO</div>
                        <button class="ml-auto ignore-ticket"><img src="./asset/image/close-ingnore.png" alt=""></button>
                    </div>
                    <div class="status-asap-ticket d-flex flex-wrap align-items-center mt-2">
                        <div class="status-asap">${waiting_response.status_ticket}</div>
                        <div class="id-asap-ticket ml-auto">#${waiting_response.id_ticket}</div>
                    </div>
                    <div class="line-asap-ticket"></div>
                    <div class="asap-ticket-detail">
                        <div class="asap-notif-time d-flex flex-wrap mt-2 align-items-center">
                            <div class="notif-asap">Notification</div>
                            <div class="time-asap ml-auto">${waiting_response.customer_response_time}</div>
                        </div>
                        <div class="subject-asap-ticket d-flex flex-wrap mt-1">
                            <div class="subject-asap">${waiting_response.subject.substring(0, 30) + "..."}</div>
                        </div>
                    </div>
                </div>
                `)
                // console.log("id ticket", waiting_response.subject)
            });
        }   
    }
});