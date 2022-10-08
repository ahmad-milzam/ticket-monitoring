$(document).ready(function () {
  //   function for check every 3 second
  var checkInterval = new interval(3000, checkTicket);

  //   function for move element
  function move(parent, child) {
    $(parent).append(child);
  }

  //   function for change color
  function changeColor(child, newColor) {
    $(child).removeClass();
    $(child).addClass(newColor);
  }

  var socket = new WebSocket("wss://monitoring.giostaging.com/wss");

  connectWebsocket(socket);

  function connectWebsocket(socket) {
    socket.onopen = function (e) {
      console.log("Connection open");
      socket.send("GET");
      //   run interval
      checkInterval.run();
    };

    socket.onmessage = function (event) {
      let data = JSON.parse(event.data);

      // empty all child
      $(".group-count-ticket-asap").empty();
      $(".group-ticket-warn").empty();
      $(".group-ticket-new").empty();

      // $('#departement').text(data.total_tickets.gio.departement);

      ticket("#gio-count-open","#open-gio", data.total_tickets.gio.open);
      ticket("#gio-count-onprogress","#onprogress-gio", data.total_tickets.gio.on_progress);
      ticket("#gio-count-onhold","#onhold-gio", data.total_tickets.gio.on_hold);

      ticket("#neo-count-open","#open-neo", data.total_tickets.neo.open);
      ticket("#neo-count-onprogress","#onprogress-neo", data.total_tickets.neo.on_progress);
      ticket("#neo-count-onhold","#onhold-neo", data.total_tickets.neo.on_hold);

      ticket("#wa-count-open","#open-whatsaap", data.total_tickets.whatsaap.open);
      ticket("#wa-count-onprogress","#onprogress-whatsaap", data.total_tickets.whatsaap.on_progress);
      ticket("#wa-count-onhold","#onhold-whatsaap", data.total_tickets.whatsaap.on_hold);

      waiting(data.waiting_responses);
      // checkInterval = setInterval(checkTicket, 5000);
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        alert(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert("[close] Connection died");
      }
      connectWebsocket(socket);
    };

    socket.onerror = function (error) {
      console.log(error.message);
    };
  }

  function ticket(parent, id, ticket) {

    if(ticket > 9) {
      $(parent).addClass("danger-count");
      $(id).text(ticket);
    }else if (ticket >= 6) {
      $(parent).addClass("warning-count");
      $(id).text(ticket);
    }else {
      $(id).text(ticket);
    }

  }

  function checkTicket() {
    // get and parse waiting response from session storage
    let waiting_responses = JSON.parse(
      sessionStorage.getItem("waiting_responses")
    );

    if (waiting_responses == null) {
      return;
    }

    // get timestamp now
    let now = Math.floor(Date.now() / 1000);

    // loop and check if waiting response exist
    waiting_responses.forEach((waiting_response) => {
      // get and detach existing element
      let ticket = $("#" + waiting_response.id_ticket).detach();

      let difference = now - waiting_response.timestamp;
      if (difference >= 900) {
        move(".group-count-ticket-asap", ticket);
        changeColor("#" + waiting_response.id_ticket, "contain-count-asap");
      } else if (difference >= 600) {
        move(".group-ticket-warn", ticket);
        changeColor("#" + waiting_response.id_ticket, "contain-count-warning");
      } else {
        move(".group-ticket-new", ticket);
        changeColor("#" + waiting_response.id_ticket, "contain-count-wait");
      }
    });
  }

  function waiting(waiting_responses) {

    if (waiting_responses != null) {
      // save data to session storage
      sessionStorage.setItem(
        "waiting_responses",
        JSON.stringify(waiting_responses)
      );

      $("#totalticket").text(`
                ${waiting_responses.length > 0 ? waiting_responses.length : 0}
            `);

      waiting_responses.forEach((waiting_response) => {
        let cek2 = Math.floor(Date.now() / 1000) - waiting_response.timestamp;

        let timeTicket = "";
        let colorTicket = "";
        if (cek2 >= 900) {
          timeTicket = ".group-count-ticket-asap";
          colorTicket = "contain-count-asap";
        } else if (cek2 >= 600) {
          timeTicket = ".group-ticket-warn";
          colorTicket = "contain-count-warning";
        } else {
          timeTicket = ".group-ticket-new";
          colorTicket = "contain-count-wait";
        }

        $(timeTicket).append(`
                <div class="${colorTicket}" id="${waiting_response.id_ticket}">
                    <!-- <div class="content-wait"></div> -->
                    <div class="asap-head-ticket d-flex justify-content-center align-items-center">
                        <div class="asap-title-ticket"><img src="./asset/image/vector-asap.png" alt="" class="mr-1">${waiting_response.departement}</div>
                    </div>
                    <div class="status-asap-ticket d-flex flex-wrap align-items-center mt-2">
                        <div class="status-asap">${
                          waiting_response.status_ticket
                        }</div>
                        <div class="id-asap-ticket ml-auto">#${
                          waiting_response.id_ticket
                        }</div>
                    </div>
                    <div class="line-asap-ticket"></div>
                    <div class="asap-ticket-detail">
                        <div class="asap-notif-time d-flex flex-wrap mt-2 align-items-center">
                            <div class="notif-asap">Notification</div>
                            <div class="time-asap ml-auto">${
                              waiting_response.customer_response_time
                            }</div>
                        </div>
                        <div class="subject-asap-ticket d-flex flex-wrap mt-1">
                            <div class="subject-asap">${
                              waiting_response.subject.substring(0, 30) + "..."
                            }</div>
                        </div>
                    </div>
                </div>
                `);
      });
    } else {
      sessionStorage.setItem("waiting_responses", null);
      $("#totalticket").text(`0`);
    }
  }
});
