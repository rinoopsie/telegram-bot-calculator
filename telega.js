const TelegramBot = require('node-telegram-bot-api');
const token = '5779357399:AAHFORWvZfK-0_vleTOttiiozNqzgqrLg6w';
const bot = new TelegramBot(token, {polling: true});

let url = 'https://auto.ria.com/uk/search/?categories.main.id=1&indexName=auto,order_auto,newauto_search&region.id[0]=10&brand.id[0]=190&model.id[0]=62321&size=20';
let previousPrice;
let chatId;

function checkPrice() {
    const price = getPrice(); // Get price function should be defined
    if (price < previousPrice) {
    const message = 'Price dropped! Check it out: ' + url;
    bot.sendMessage(chatId, message);
  }
  previousPrice = price;
}

// Define the getPrice function
function getPrice() {
  // Get price code
  let price;
  // Make a request to the url
  fetch(url)
  
    .then(response => response.json())
    .then(data =>
	{
      // Get the id, price and html element of the response
      let id = data.result.items[0].id;
      price = data.result.items[0].price;
      let html = data.result.items[0].html;
    });
  // Return the price
  return price;
}

setInterval(checkPrice, 60000);