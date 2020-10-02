using System;
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


        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] Credentials creds)
        {   
            Seller authenticated = m_pSellersManager.handleSellerLoginTry(creds);
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