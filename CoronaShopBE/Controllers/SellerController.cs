﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoronaShopBE.BusinessLogic;
using CoronaShopBE.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace CoronaShopBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        SellersManager m_pSellersManager;
        public SellerController()
        {
            m_pSellersManager = CoronaShopService.getSellerManager();
        }

        private Seller simulateUser()
        {
            Seller temp = new Seller("1", "1");
            temp.shops = new List<Shop>();
            Shop shop1 = new Shop();

            shop1.categories = new List<string>();
            shop1.categories.Add("books");
            shop1.categories.Add("food");
            shop1.config = new ShopConfiguration(){ delivery = true, takeaway = true, hours="14:00 - 18:00" };
            shop1.description = "Test shop that sells nothing, but some text is must be inserted to see how the text looks like and a test text test";
            shop1.location = "Givatayim";
            shop1.name = "Test1 shop";
            shop1.platformLink = "test1_ovo";

            shop1.itemList = new List<Item>();
            shop1.itemList.Add(new Item() { category="books",id="123",description="test item", imgLink="none",name="c++ book",price=12.3,unit="single" });
            shop1.itemList.Add(new Item() { category="food",id="124",description="test item2", imgLink="none",name="potatoes",price=5,unit="kg" });

            temp.shops.Add(shop1);
            temp._id = "123123asdf1";
            

            return temp;
            
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] Credentials creds)
        {
            Seller authenticated;
            if (creds.email == "" && creds.pw == null)
            {
                authenticated = simulateUser();
            }
            else
            {
                authenticated = m_pSellersManager.handleSellerLoginTry(creds);
            }
            string response = responseGenerator<Seller>(authenticated != null, authenticated);
            return Ok(response);
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] Credentials creds)
        {
            bool handleNewUserResult = m_pSellersManager.handleNewSeller(creds);
            string response = responseGenerator<Seller>(handleNewUserResult, new Seller(creds));
            return Ok(response);
        }

        private string responseGenerator<T>(bool isOK, T data_)
        {
            string data = data_ != null ? JsonConvert.SerializeObject(data_) : "none";
            string ret = $"{{\"response\":\"{isOK}\",\"data\":{data}}}";
            return ret;
        }


    }
}