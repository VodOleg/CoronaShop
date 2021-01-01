const axios = require('axios').default;
const { mainModule } = require('process');
const util = require('util');

const db_url = "https://coronashop-6a6d.restdb.io/rest/";
const databaseKey = "429ec86b762e23ed6c41a0328b1b7e10d4889";

function printJson(json) {
    console.log(util.inspect(json, { showHidden: false, depth: null }))
};

const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-apikey': databaseKey,
        'cache-control': "no-cache"
    }
};

async function getSellerByEmail(Credentials) {
    let query = `${db_url}sellers?q=${JSON.stringify(Credentials)}`;
    console.log(query);
    let res = await axios.get(query, config);
    return res.data;
}

function getShop(shopID, shopOwner){
    let hint = {
        Shops: {
            $elemMatch: {
                PlatformLink: shopID
            }
        }
    };
    let query = db_url + "sellers/" + shopOwner._id + "?q=" + JSON.stringify(hint);
    axios.get(query, config).then((res,err)=>{
        if(err)
            printJson(err)
        printJson(res.data)

    });
}

async function addItemToShop(shopID, shopOwner, newItem) {
    let hint = {
        Shops: {
            $elemMatch: {
                PlatformLink: shopID
            }
        }
    };
    //let query = db_url + "sellers/" + shopOwner._id + "?q=" + JSON.stringify(hint);
    let query = db_url + "sellers/" + shopOwner._id;
    let content;
    let shopWithoutItem;
    let shopWithItem;
    for (let i in shopOwner.Shops) {
        if (shopOwner.Shops[i].PlatformLink == shopID) {
            shopWithoutItem = shopOwner.Shops[i];
            shopWithItem = shopOwner.Shops[i];
            axios.put(query, {$pull:{shopWithoutItem}}, config).then((res,err)=>{
                // if not error 
                shopWithItem.Items.push(newItem);
                axios.put(query,{$push:{Shops:shopWithItem}}, config);
            })
            break;
        }
    }
}

async function deleteItem(seller) {
    //same like add item just now remove the item
}


async function main() {
    let seller = await getSellerByEmail({ Credentials: { email: "olegoleg" } });
    let item = {
        "Name": "Coffe",
        "Id": "12",
        "Description": "Coffer from node js! The best coffer there is.",
        "Category": "Drinks",
        "ImgLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG",
        "Price": 5.0,
        "Unit": "single"
    }
    addItemToShop("test", seller[0], item);
    setTimeout(()=>{
        getShop("test",seller[0])

    }, 3000);
}


main();


function someShit() {


    for (let i in seller[0].Shops) {
        if (seller[0].Shops[i].PlatformLink == "test") {
            seller[0].Shops[i].Items.push(item);
            break;
        }
        else {
            console.log("PlatformLink:" + seller.Shops[i].PlatformLink);
        }
    }
//deleteItem(seller[0]);

//addItemToShop(seller[0]);
}