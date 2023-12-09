import SockJS from "sockjs-client/dist/sockjs.min.js";
import Stomp from "webstomp-client";

export function createClient(address: string) {
  let stompClient = null;

  const socket = new SockJS("http://localhost:8081/stomp-endpoint");
  /*   var access_token = localStorage.getItem("cookie");
  var header = {
    "X-Authorization": "Bearer " + access_token,
  }; */
  stompClient = Stomp.over(socket);

  return stompClient;
}

export function answer(address: string, stompClient: any) {
  var access_token = localStorage.getItem("cookie");
  var header = {
    "X-Authorization": "Bearer " + access_token,
  };

  stompClient.connect(
    header,
    function () {
      stompClient.subscribe("/topic/room/" + address, function (greeting) {
        // uzenetek.value = JSON.parse(greeting.body);
        return JSON.parse(greeting.body);
        console.log(JSON.parse(greeting.body));
      });
    },
    (error) => {
      console.log(error);
    }
  );
}
